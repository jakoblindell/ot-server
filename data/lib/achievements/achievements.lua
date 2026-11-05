-- Achievements (ot-server#30): things a character earns by playing, once.
-- Tasks are taken on for a reward; achievements are noticed. The list is in
-- achievements_config.lua.
--
-- Per character (so each world's characters have their own, ot-server#43):
--   storage 48000 + id   unlocked at (os.time), -1 = not yet
--   storage 48500 + id   progress of a counted one (kills, hand-ins)
--   player_achievements  the unlocks, for the website (player id, id, time)
--
-- Other code reports what happened with Achievements.trigger(player, event,
-- value): kills and loot (creaturescripts/daily_hunts.lua), level and skill
-- advances, deaths, daily hunts, boxes, hunting tasks and ranks.

dofile('data/lib/achievements/achievements_config.lua')

local UNLOCKED_BASE = 48000
local PROGRESS_BASE = 48500

local byId, byEvent = {}, {}
for _, achievement in ipairs(Achievements.list) do
	byId[achievement.id] = achievement
	local event = achievement.trigger.event
	byEvent[event] = byEvent[event] or {}
	table.insert(byEvent[event], achievement)
	-- monster names in lower case, for matching
	for _, key in ipairs({ 'monsters', 'from', 'by' }) do
		if achievement.trigger[key] then
			local set = {}
			for _, name in ipairs(achievement.trigger[key]) do
				set[name:lower()] = true
			end
			achievement.trigger[key .. 'Set'] = set
		end
	end
end

-- The website reads unlocks from this table
db.query([[CREATE TABLE IF NOT EXISTS `player_achievements` (
	`player_id` int(11) NOT NULL,
	`achievement_id` int(11) NOT NULL,
	`unlocked_at` int(11) NOT NULL,
	PRIMARY KEY (`player_id`, `achievement_id`),
	KEY `achievement_id` (`achievement_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8]])

function Achievements.get(id)
	return byId[id]
end

function Achievements.unlockedAt(player, achievement)
	local at = player:getStorageValue(UNLOCKED_BASE + achievement.id)
	return at > 0 and at or nil
end

function Achievements.progress(player, achievement)
	return math.max(0, player:getStorageValue(PROGRESS_BASE + achievement.id))
end

-- What a counted achievement needs (1 for one-off ones)
local function target(achievement)
	return achievement.trigger.count or 1
end

function Achievements.points(player)
	local total = 0
	for _, achievement in ipairs(Achievements.list) do
		if Achievements.unlockedAt(player, achievement) then
			total = total + achievement.points
		end
	end
	return total
end

local function sendStatus(player)
	if DailyHunts and DailyHunts.sendStatus then
		DailyHunts.sendStatus(player)
	end
end

function Achievements.unlock(player, achievement)
	if Achievements.unlockedAt(player, achievement) then
		return false
	end
	local now = os.time()
	player:setStorageValue(UNLOCKED_BASE + achievement.id, now)
	db.asyncQuery(string.format(
		'INSERT IGNORE INTO `player_achievements` (`player_id`, `achievement_id`, `unlocked_at`) VALUES (%d, %d, %d)',
		player:getGuid(), achievement.id, now))
	player:sendTextMessage(MESSAGE_EVENT_ADVANCE, 'Achievement unlocked: ' .. achievement.name .. '!')
	player:sendTextMessage(MESSAGE_INFO_DESCR, achievement.name .. ': ' .. achievement.text ..
		' (' .. achievement.points .. (achievement.points == 1 and ' point' or ' points') .. ')')
	player:getPosition():sendMagicEffect(CONST_ME_FIREWORK_YELLOW or CONST_ME_MAGIC_GREEN or 13)
	addEvent(function(cid)
		local target = Player(cid)
		if target then
			sendStatus(target)
		end
	end, 0, player:getId())
	return true
end

-- Add to a counted achievement; unlocks it at its count
local function advance(player, achievement, amount)
	if Achievements.unlockedAt(player, achievement) then
		return
	end
	local progress = Achievements.progress(player, achievement) + (amount or 1)
	if progress >= target(achievement) then
		Achievements.unlock(player, achievement)
	else
		player:setStorageValue(PROGRESS_BASE + achievement.id, progress)
	end
end

-- Something happened. value depends on the event: a monster name (kill,
-- death), { item, from } (loot), a level (level), { skill, level } (skill),
-- days (streak), a tier (box), a rank (rank); nothing for counted events.
function Achievements.trigger(player, event, value)
	local list = byEvent[event]
	if not list or not player then
		return
	end
	for _, achievement in ipairs(list) do
		local t = achievement.trigger
		if event == 'kill' then
			if not t.monstersSet or t.monstersSet[value] then
				advance(player, achievement)
			end
		elseif event == 'loot' then
			if value.item == t.item and (not t.fromSet or t.fromSet[value.from]) then
				Achievements.unlock(player, achievement)
			end
		elseif event == 'death' then
			if t.bySet and t.bySet[value] then
				Achievements.unlock(player, achievement)
			end
		elseif event == 'level' then
			if value >= t.level then
				Achievements.unlock(player, achievement)
			end
		elseif event == 'skill' then
			if value.skill == t.skill and value.level >= t.level then
				Achievements.unlock(player, achievement)
			end
		elseif event == 'streak' then
			if value >= t.days then
				Achievements.unlock(player, achievement)
			end
		elseif event == 'box' then
			if value >= t.tier then
				Achievements.unlock(player, achievement)
			end
		elseif event == 'rank' then
			if value >= t.rank then
				Achievements.unlock(player, achievement)
			end
		elseif event == 'dailyhunt' or event == 'task' then
			advance(player, achievement)
		end
	end
end

-- Kills and loot ------------------------------------------------------------------

-- A monster died: a kill for everyone who damaged it; a moment later (the
-- loot goes in after the death event) its loot for the corpse's owner
function Achievements.onMonsterDeath(monster, corpse, killer, mostDamageKiller)
	if monster:getMaster() then
		return
	end
	local name = monster:getName():lower()
	local credited = {}
	for creatureId in pairs(monster:getDamageMap()) do
		local attacker = Creature(creatureId)
		local player = attacker and (attacker:getPlayer() or (attacker:getMaster() and attacker:getMaster():getPlayer()))
		if player and not credited[player:getId()] then
			credited[player:getId()] = true
			Achievements.trigger(player, 'kill', name)
		end
	end

	if not byEvent.loot or not corpse or not corpse:isContainer() then
		return
	end
	local function playerOf(creature)
		if not creature then
			return nil
		end
		return creature:getPlayer() or (creature:getMaster() and creature:getMaster():getPlayer())
	end
	local owner = playerOf(mostDamageKiller) or playerOf(killer)
	if not owner then
		return
	end
	local position, corpseId, ownerId = corpse:getPosition(), corpse:getId(), owner:getId()
	addEvent(function()
		local player = Player(ownerId)
		local tile = Tile(position)
		local found = tile and tile:getItemById(corpseId)
		if not player or not found or not found:isContainer() then
			return
		end
		local function walk(container)
			for index = 0, container:getSize() - 1 do
				local item = container:getItem(index)
				if item then
					Achievements.trigger(player, 'loot', { item = item:getId(), from = name })
					if item:isContainer() then
						walk(item)
					end
				end
			end
		end
		walk(found)
	end, 0)
end

-- Login: catch up on what a character already has (level, skills, rank)
function Achievements.onLogin(player)
	player:registerEvent('AchievementAdvance')
	player:registerEvent('AchievementDeath')
	Achievements.trigger(player, 'level', player:getLevel())
	Achievements.trigger(player, 'skill', { skill = SKILL_MAGLEVEL, level = player:getMagicLevel() })
	if HuntingTasks and HuntingTasks.rank then
		Achievements.trigger(player, 'rank', (HuntingTasks.rank(player)))
		-- hunting tasks reported before achievements existed
		local reported = 0
		for _, task in ipairs(HuntingTasks.tasks) do
			reported = reported + HuntingTasks.timesFinished(player, task)
		end
		for _, achievement in ipairs(byEvent.task or {}) do
			if reported > Achievements.progress(player, achievement) and not Achievements.unlockedAt(player, achievement) then
				if reported >= target(achievement) then
					Achievements.unlock(player, achievement)
				else
					player:setStorageValue(PROGRESS_BASE + achievement.id, reported)
				end
			end
		end
	end
end

-- Status for the Journal (opcode 106) and !achievements ------------------------------

function Achievements.status(player)
	local list, unlocked, points, total = {}, 0, 0, 0
	for _, achievement in ipairs(Achievements.list) do
		local at = Achievements.unlockedAt(player, achievement)
		local entry = { category = achievement.category, points = achievement.points }
		if at then
			unlocked = unlocked + 1
			points = points + achievement.points
			entry.unlockedAt = at
		end
		if at or not achievement.hidden then
			entry.id = achievement.id
			entry.name = achievement.name
			entry.text = achievement.text
			if not at and target(achievement) > 1 then
				entry.progress = Achievements.progress(player, achievement)
				entry.target = target(achievement)
			end
		else
			-- a hidden one gives nothing away: no name, text, id or progress
			entry.hidden = true
		end
		total = total + achievement.points
		table.insert(list, entry)
	end
	return { list = list, unlocked = unlocked, count = #Achievements.list, points = points, totalPoints = total,
		categories = Achievements.categories }
end

function Achievements.statusText(player)
	local s = Achievements.status(player)
	return 'Achievements: ' .. s.unlocked .. ' of ' .. s.count .. ' unlocked, ' .. s.points .. ' points.'
end
