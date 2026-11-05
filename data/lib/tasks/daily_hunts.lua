-- Daily hunts (ot-server#21): one random kill task a game day, picked up and
-- handed in at a taskmaster (data/npc/taskmaster.npc, Script("...")).
--
--   task      get today's hunt (or hear it again)
--   progress  how many are left and how long
--   reward    hand it in: experience (times the streak) and a present
--   cancel    give it up (streak lost; wait for the cooldown)
--
-- Kills count for everyone who damaged the monster (creaturescripts
-- daily_hunts.lua, registered on every monster). The settings and the hunts
-- are in daily_hunts_config.lua.

dofile('data/lib/tasks/daily_hunts_config.lua')

local config = DailyHunts.config

-- Player storage
local S = {
	hunt = 47000, -- the hunt id, 0 = none
	kills = 47001,
	required = 47002,
	pickedAt = 47003, -- os.time()
	pickedDay = 47004, -- game day number
	endedAt = 47005, -- last hand-in, cancel or failure (cooldown)
	streak = 47006, -- finished days in a row
	streakDay = 47007, -- game day of the last finished hunt
	lastHunt = 47008, -- not the same hunt twice in a row
}
DailyHunts.storage = S

local huntsById, huntsByMonster = {}, {}

local function index()
	huntsById, huntsByMonster = {}, {}
	for _, hunt in ipairs(DailyHunts.hunts) do
		huntsById[hunt.id] = hunt
		for _, name in ipairs(hunt.monsters) do
			huntsByMonster[name:lower()] = huntsByMonster[name:lower()] or {}
			table.insert(huntsByMonster[name:lower()], hunt.id)
		end
	end
end
index()

-- Which area a position is in (DailyHunts.areas in the config): 'premium',
-- 'excluded' (Rookgaard) or 'free' (everywhere else)
function DailyHunts.areaAt(x, y)
	for _, area in ipairs(DailyHunts.areas or {}) do
		if x >= area.from[1] and x <= area.to[1] and y >= area.from[2] and y <= area.to[2] then
			return area.kind, area.name
		end
	end
	return 'free'
end

-- Spawns on the map per monster name (data/world792/spawns.xml), read once:
-- all of them (outside excluded areas) and those in free areas
local spawnCounts, freeCounts
local function readSpawns()
	spawnCounts, freeCounts = {}, {}
	local mapName = configManager and configKeys and configManager.getString(configKeys.MAP_NAME) or 'map'
	local file = io.open('data/world792/spawns.xml', 'r') or io.open('data/world792/' .. mapName .. '-spawn.xml', 'r')
	if not file then
		return
	end
	local xml = file:read('*a')
	file:close()
	for cx, cy, block in xml:gmatch('<spawn centerx="(%d+)" centery="(%d+)"[^>]*>(.-)</spawn>') do
		local area = DailyHunts.areaAt(tonumber(cx), tonumber(cy))
		if area ~= 'excluded' then
			for name in block:gmatch('<monster name="([^"]+)"') do
				name = name:lower()
				spawnCounts[name] = (spawnCounts[name] or 0) + 1
				if area == 'free' then
					freeCounts[name] = (freeCounts[name] or 0) + 1
				end
			end
		end
	end
end

-- The hunt's spawns: everywhere a premium account can go, or only free
-- areas (freeOnly). nil when there is no spawn file (no limits).
function DailyHunts.spawns(hunt, freeOnly)
	if not spawnCounts then
		readSpawns()
	end
	if not next(spawnCounts) then
		return nil
	end
	local counts = freeOnly and freeCounts or spawnCounts
	local total = 0
	for _, name in ipairs(hunt.monsters) do
		total = total + (counts[name:lower()] or 0)
	end
	return total
end

-- Can a free account do this hunt? `premium = true/false` on the hunt
-- decides; otherwise it needs minSpawns spawns in free areas
function DailyHunts.freeAccounts(hunt)
	if hunt.premium ~= nil then
		return not hunt.premium
	end
	local spawns = DailyHunts.spawns(hunt, true)
	return spawns == nil or spawns >= config.minSpawns
end

-- Enough of its monsters on the map (that this account can reach)
function DailyHunts.onMap(hunt, premium)
	if premium == false and not DailyHunts.freeAccounts(hunt) then
		return false
	end
	local spawns = DailyHunts.spawns(hunt)
	return spawns == nil or spawns >= config.minSpawns
end

-- At most killsPerSpawn per spawn the account can reach (free accounts:
-- only spawns in free areas, unless the hunt says otherwise)
function DailyHunts.spawnCap(hunt, premium)
	local spawns = DailyHunts.spawns(hunt, premium == false and hunt.premium == nil)
	return spawns and math.max(1, math.floor(spawns * config.killsPerSpawn)) or nil
end

function DailyHunts.getHunt(id)
	return huntsById[id]
end

-- Game days ------------------------------------------------------------------

-- The game day starts when the server save shuts the server down: the
-- "Server Save" global event time plus its 5 minutes of warnings
local dayStart = (function()
	local file = io.open('data/globalevents/globalevents.xml', 'r')
	if file then
		local xml = file:read('*a')
		file:close()
		for line in xml:gmatch('[^\n]+') do
			if line:find('serversave.lua', 1, true) then
				local hour, min = line:match('time="(%d+):(%d+)')
				if hour then
					local minutes = (tonumber(hour) * 60 + tonumber(min) + 5) % (24 * 60)
					return { hour = math.floor(minutes / 60), min = minutes % 60 }
				end
			end
		end
	end
	return config.dayStart
end)()

-- When the current game day began (os time) and its number (days since
-- 1970, by the calendar date it began on)
function DailyHunts.gameDay(now)
	now = now or os.time()
	local t = os.date('*t', now)
	local start = os.time({ year = t.year, month = t.month, day = t.day, hour = dayStart.hour, min = dayStart.min, sec = 0 })
	if now < start then
		t = os.date('*t', now - 24 * 60 * 60)
		start = os.time({ year = t.year, month = t.month, day = t.day, hour = dayStart.hour, min = dayStart.min, sec = 0 })
	end
	local noon = os.time({ year = t.year, month = t.month, day = t.day, hour = 12 })
	return math.floor(noon / 86400), start
end

local function nextDayStart(now)
	local _, start = DailyHunts.gameDay(now)
	-- 26 hours on is always inside the next game day (23-25 hour days at
	-- daylight saving changes)
	local _, nextStart = DailyHunts.gameDay(start + 26 * 60 * 60)
	return nextStart
end

-- "3 hours and 20 minutes", "40 minutes", "a moment"
function DailyHunts.duration(seconds)
	local minutes = math.ceil(math.max(0, seconds) / 60)
	local hours = math.floor(minutes / 60)
	minutes = minutes % 60
	local function plural(n, word)
		return n .. ' ' .. word .. (n == 1 and '' or 's')
	end
	if hours > 0 and minutes > 0 then
		return plural(hours, 'hour') .. ' and ' .. plural(minutes, 'minute')
	elseif hours > 0 then
		return plural(hours, 'hour')
	elseif minutes > 0 then
		return plural(minutes, 'minute')
	end
	return 'a moment'
end

-- State -----------------------------------------------------------------------

local function get(player, key)
	return math.max(0, player:getStorageValue(key))
end

-- The streak as it stands today: it is broken when a whole game day passed
-- without a finished hunt
function DailyHunts.currentStreak(player, day)
	day = day or DailyHunts.gameDay()
	local last = get(player, S.streakDay)
	if last == 0 or day - last > 1 then
		return 0
	end
	return get(player, S.streak)
end

local function streakMultiplier(days)
	local list = config.streak
	return list[math.max(1, math.min(days, #list))]
end

local function finish(player, now)
	player:setStorageValue(S.hunt, 0)
	player:setStorageValue(S.kills, 0)
	player:setStorageValue(S.required, 0)
	player:setStorageValue(S.endedAt, now)
end

-- A picked up hunt that ran out of time: failed, streak lost. Returns true
-- when it just failed.
function DailyHunts.checkExpired(player, now)
	now = now or os.time()
	local id = get(player, S.hunt)
	if id == 0 then
		return false
	end
	local expires = get(player, S.pickedAt) + config.expiry
	if now < expires then
		return false
	end
	finish(player, expires)
	player:setStorageValue(S.streak, 0)
	player:setStorageValue(S.streakDay, 0)
	return true
end

-- When the next hunt can be picked up (os time): a new game day and the
-- cooldown after the last one
function DailyHunts.availableAt(player, now)
	now = now or os.time()
	local day = DailyHunts.gameDay(now)
	local ready = get(player, S.endedAt) + config.cooldown
	if get(player, S.pickedDay) >= day then
		-- today's is used up: tomorrow, and the cooldown
		ready = math.max(ready, nextDayStart(now))
	end
	return math.max(ready, now)
end

-- Choosing a hunt -----------------------------------------------------------------

function DailyHunts.levelGroup(level)
	local name = DailyHunts.groups[1].name
	for _, group in ipairs(DailyHunts.groups) do
		if level >= group.from then
			name = group.name
		end
	end
	return name
end

-- The hunts for this level; premium = false: only hunts free accounts can reach
function DailyHunts.eligible(level, premium)
	local list = {}
	for _, hunt in ipairs(DailyHunts.hunts) do
		if level >= hunt.level[1] and level <= hunt.level[2] and DailyHunts.onMap(hunt, premium) then
			table.insert(list, hunt)
		end
	end
	return list
end

local function pickHunt(player)
	local list = DailyHunts.eligible(player:getLevel(), player:isPremium())
	if #list == 0 then
		return nil
	end
	-- how many online players have each hunt now
	local crowd = {}
	for _, other in ipairs(Game.getPlayers()) do
		local id = other:getStorageValue(S.hunt)
		if id > 0 then
			crowd[id] = (crowd[id] or 0) + 1
		end
	end
	local last = get(player, S.lastHunt)
	local total, weights = 0, {}
	for i, hunt in ipairs(list) do
		local weight = 100 / (1 + config.crowdPenalty * (crowd[hunt.id] or 0))
		if hunt.id == last and #list > 1 then
			weight = 0
		end
		weights[i] = weight
		total = total + weight
	end
	local roll = math.random() * total
	for i, hunt in ipairs(list) do
		roll = roll - weights[i]
		if roll <= 0 and weights[i] > 0 then
			return hunt
		end
	end
	return list[#list]
end

-- How many to kill: rises from kills[1] at the hunt's lowest level to
-- kills[2] at its `full` level, +-variance, never more than the map's
-- spawns allow, rounded to 5 when that large
function DailyHunts.killCount(hunt, level, roll, premium)
	roll = roll or math.random()
	local low, high = hunt.kills[1], hunt.kills[2]
	local from = hunt.level[1]
	local full = hunt.full or (hunt.level[2] >= 999 and from + config.openEndedSpan or hunt.level[2])
	local along = full > from and math.max(0, math.min(1, (level - from) / (full - from))) or 0
	local count = (low + (high - low) * along) * (1 + config.variance * (roll * 2 - 1))
	local cap = DailyHunts.spawnCap(hunt, premium)
	if cap then
		count = math.min(count, cap)
	end
	if count >= 20 then
		count = math.floor(count / 5 + 0.5) * 5
	else
		count = math.floor(count + 0.5)
	end
	return math.max(1, count)
end

local function rollKills(hunt, player)
	return DailyHunts.killCount(hunt, player:getLevel(), nil, player:isPremium())
end

-- Rewards --------------------------------------------------------------------

local function averageExperience(hunt)
	local total, count = 0, 0
	for _, name in ipairs(hunt.monsters) do
		local monsterType = MonsterType(name)
		if monsterType then
			total = total + monsterType:getExperience()
			count = count + 1
		end
	end
	return count > 0 and total / count or 0
end

function DailyHunts.experience(player, hunt, kills, streakDays)
	local stage = Game.getExperienceStage and Game.getExperienceStage(player:getLevel()) or 1
	return math.floor(averageExperience(hunt) * kills * stage * config.expShare * streakMultiplier(streakDays))
end

-- Which box: every better box gets more likely with luck. Anyone can get the
-- best one; a low level on an easy hunt very rarely does.
function DailyHunts.rollBox(difficulty, level, streakDays)
	local l = config.luck
	local luck = l.difficulty * (difficulty - 1) + l.perHundredLevels * math.min(level, l.maxLevel) / 100 +
		l.streakDay * (math.max(1, math.min(streakDays, 7)) - 1)
	local total, weights = 0, {}
	for i, box in ipairs(DailyHunts.boxes) do
		weights[i] = box.weight * math.exp(luck * config.luckSteepness * (i - 1))
		total = total + weights[i]
	end
	local roll = math.random() * total
	for i in ipairs(DailyHunts.boxes) do
		roll = roll - weights[i]
		if roll <= 0 then
			return i
		end
	end
	return 1
end

function DailyHunts.createBox(player, tier)
	local box = DailyHunts.boxes[tier]
	local item = player:addItem(DailyHunts.presentItem, 1)
	if not item then
		return nil
	end
	item:setAttribute(ITEM_ATTRIBUTE_NAME, box.name)
	item:setAttribute(ITEM_ATTRIBUTE_ARTICLE, 'a')
	item:setActionId(DailyHunts.boxActionBase + tier)
	return item
end

local function pickWeighted(list)
	local total = 0
	for _, entry in ipairs(list) do
		total = total + entry[3]
	end
	local roll = math.random() * total
	for _, entry in ipairs(list) do
		roll = roll - entry[3]
		if roll <= 0 then
			return entry
		end
	end
	return list[#list]
end

-- Opening a box: gold (60-140% of the box's average), sometimes an item too
function DailyHunts.openBox(player, item, tier)
	local box = DailyHunts.boxes[tier]
	if not box then
		return false
	end
	local gold = math.floor(box.gold * (0.6 + math.random() * 0.8))
	local got = { gold .. ' gold coins' }
	local position = player:getPosition()
	item:remove()
	if Achievements then
		Achievements.trigger(player, 'box', tier)
	end
	player:addMoney(gold)
	if #box.items > 0 and math.random(100) <= box.itemChance then
		local entry = pickWeighted(box.items)
		local reward = player:addItem(entry[1], entry[2])
		if reward then
			table.insert(got, reward:getNameDescription())
		end
	end
	position:sendMagicEffect(CONST_ME_GIFT_WRAPS or CONST_ME_MAGIC_GREEN or 13)
	player:sendTextMessage(MESSAGE_INFO_DESCR, 'The ' .. box.name .. ' contained ' .. table.concat(got, ' and ') .. '.')
	return true
end

-- Kills ------------------------------------------------------------------------

-- A monster died: every player who damaged it (or whose summon did) and has
-- a hunt for it gets a kill
function DailyHunts.onMonsterDeath(monster)
	local hunts = huntsByMonster[monster:getName():lower()]
	if not hunts or monster:getMaster() then
		return
	end
	local credited = {}
	for creatureId in pairs(monster:getDamageMap()) do
		local attacker = Creature(creatureId)
		local player = attacker and (attacker:getPlayer() or (attacker:getMaster() and attacker:getMaster():getPlayer()))
		if player and not credited[player:getId()] then
			credited[player:getId()] = true
			DailyHunts.addKill(player, hunts)
		end
	end
end

function DailyHunts.addKill(player, hunts)
	local id = get(player, S.hunt)
	if id == 0 or not table.contains(hunts, id) then
		return
	end
	if DailyHunts.checkExpired(player) then
		player:sendTextMessage(MESSAGE_STATUS_CONSOLE_ORANGE, 'Your daily hunt ran out of time and failed. Your streak is lost.')
		return
	end
	local required = get(player, S.required)
	local kills = get(player, S.kills)
	if kills >= required then
		return
	end
	kills = kills + 1
	player:setStorageValue(S.kills, kills)
	addEvent(function(cid)
		local target = Player(cid)
		if target then
			DailyHunts.sendStatus(target)
		end
	end, 0, player:getId())
	local hunt = huntsById[id]
	if kills >= required then
		player:sendTextMessage(MESSAGE_EVENT_ADVANCE, 'Daily hunt done: ' .. kills .. ' ' .. hunt.name .. '. Return to a taskmaster for your reward.')
	else
		player:sendTextMessage(MESSAGE_STATUS_DEFAULT, 'Daily hunt: ' .. kills .. ' of ' .. required .. ' ' .. hunt.name .. '.')
	end
end

-- The taskmaster -------------------------------------------------------------------

local function describe(player, now)
	local hunt = huntsById[get(player, S.hunt)]
	local kills, required = get(player, S.kills), get(player, S.required)
	local left = DailyHunts.duration(get(player, S.pickedAt) + config.expiry - now)
	if kills >= required then
		return 'You have killed all ' .. required .. ' ' .. hunt.name .. '. Say reward to claim your present.'
	end
	return 'You have killed ' .. kills .. ' of ' .. required .. ' ' .. hunt.name .. '. You have ' .. left .. ' left.'
end

local function notAvailable(player, now)
	local at = DailyHunts.availableAt(player, now)
	return 'You have had your hunt for today. Come back in ' .. DailyHunts.duration(at - now) .. ' for a new one.'
end

local handlers = {}

function handlers.task(npc, player, now)
	if player:getLevel() < config.minLevel then
		return 'Come back when you are level ' .. config.minLevel .. '. The creatures out there would eat you alive.'
	end
	if get(player, S.hunt) ~= 0 then
		return describe(player, now)
	end
	if DailyHunts.availableAt(player, now) > now then
		return notAvailable(player, now)
	end
	local hunt = pickHunt(player)
	if not hunt then
		return 'I have no hunt for someone of your strength right now.'
	end
	local day = DailyHunts.gameDay(now)
	local required = rollKills(hunt, player)
	player:setStorageValue(S.hunt, hunt.id)
	player:setStorageValue(S.kills, 0)
	player:setStorageValue(S.required, required)
	player:setStorageValue(S.pickedAt, now)
	player:setStorageValue(S.pickedDay, day)
	player:setStorageValue(S.lastHunt, hunt.id)
	local streak = DailyHunts.currentStreak(player, day)
	local lines = {
		'Your hunt for today: kill ' .. required .. ' ' .. hunt.name .. '. Any blow you land counts; you need not strike the last one.',
		'Return within ' .. DailyHunts.duration(config.expiry) .. ' and say reward.',
	}
	if streak > 0 then
		lines[2] = lines[2] .. ' You are on a streak of ' .. streak .. (streak == 1 and ' day' or ' days') .. '; keep it going.'
	end
	return lines
end

function handlers.progress(npc, player, now)
	if get(player, S.hunt) == 0 then
		if DailyHunts.availableAt(player, now) > now then
			return notAvailable(player, now)
		end
		return 'You have no hunt. Ask me for a task.'
	end
	return describe(player, now)
end

function handlers.reward(npc, player, now)
	local id = get(player, S.hunt)
	if id == 0 then
		return 'You have no hunt to hand in. Ask me for a task.'
	end
	local kills, required = get(player, S.kills), get(player, S.required)
	if kills < required then
		return describe(player, now)
	end
	local hunt = huntsById[id]
	local day = get(player, S.pickedDay)
	local last = get(player, S.streakDay)
	local streak = (last > 0 and day - last == 1) and get(player, S.streak) + 1 or (last == day and get(player, S.streak) or 1)
	local experience = hunt and DailyHunts.experience(player, hunt, required, streak) or 0
	local tier = DailyHunts.rollBox(hunt and hunt.difficulty or 1, player:getLevel(), streak)
	finish(player, now)
	player:setStorageValue(S.streak, streak)
	player:setStorageValue(S.streakDay, day)
	if experience > 0 then
		player:addExperience(experience, true)
	end
	local box = DailyHunts.createBox(player, tier)
	player:getPosition():sendMagicEffect(CONST_ME_MAGIC_BLUE or 12)
	if Achievements then
		Achievements.trigger(player, 'dailyhunt')
		Achievements.trigger(player, 'streak', streak)
	end
	local lines = { 'Well hunted, %N! Here are ' .. experience .. ' experience points' ..
		(box and ' and a ' .. DailyHunts.boxes[tier].name or '') .. '.' }
	if not box then
		lines[1] = lines[1] .. ' You had no room for your present.'
	end
	if streak >= #config.streak then
		table.insert(lines, 'That is ' .. streak .. ' days in a row, the best reward there is. Come back tomorrow.')
	elseif streak > 1 then
		table.insert(lines, 'That is ' .. streak .. ' days in a row. Keep it going and the rewards grow.')
	end
	return lines
end

-- "cancel" asks; "cancelconfirm" (the yes) gives it up
function handlers.cancel(npc, player, now)
	if get(player, S.hunt) == 0 then
		return 'You have no hunt to give up.'
	end
	return 'Give up your hunt? You will lose your streak and wait for a new hunt. Say yes to give it up.'
end

function handlers.cancelconfirm(npc, player, now)
	if get(player, S.hunt) == 0 then
		return 'You have no hunt to give up.'
	end
	finish(player, now)
	player:setStorageValue(S.streak, 0)
	player:setStorageValue(S.streakDay, 0)
	return 'So be it. ' .. notAvailable(player, now)
end

function DailyHunts.talk(npc, player, what)
	local handler = handlers[what]
	if not handler then
		return nil
	end
	local now = os.time()
	local answer
	if DailyHunts.checkExpired(player, now) then
		answer = { 'You did not finish your hunt in time. It has failed and your streak is lost.' }
		if what == 'task' then
			table.insert(answer, notAvailable(player, now))
		end
	else
		answer = handler(npc, player, now)
	end
	DailyHunts.sendStatus(player)
	return answer
end

-- Login: tell about a hunt that failed while away, or how one is going
function DailyHunts.onLogin(player)
	player:registerEvent('DailyHuntOpcode')
	if DailyHunts.checkExpired(player) then
		player:sendTextMessage(MESSAGE_STATUS_CONSOLE_ORANGE, 'Your daily hunt ran out of time and failed. Your streak is lost.')
		return
	end
	local id = get(player, S.hunt)
	if id ~= 0 and huntsById[id] then
		player:sendTextMessage(MESSAGE_STATUS_DEFAULT, 'Daily hunt: ' .. get(player, S.kills) .. ' of ' .. get(player, S.required) ..
			' ' .. huntsById[id].name .. ', ' .. DailyHunts.duration(get(player, S.pickedAt) + config.expiry - os.time()) .. ' left.')
	end
end

NpcScripts.dailyhunt = DailyHunts.talk

-- Status for !dailyhunt and the client's Tasks page --------------------------

DailyHunts.OPCODE = 106 -- (105: hunt analyzer prices, ot-client#29)

-- state: locked (below the level) | available | active | done (hand in) |
-- waiting (had today's)
function DailyHunts.status(player)
	local now = os.time()
	DailyHunts.checkExpired(player, now)
	local day = DailyHunts.gameDay(now)
	local status = {
		minLevel = config.minLevel,
		streak = DailyHunts.currentStreak(player, day),
		streakMax = #config.streak,
		multiplier = config.streak,
		expiry = config.expiry,
	}
	local id = get(player, S.hunt)
	local hunt = huntsById[id]
	if player:getLevel() < config.minLevel then
		status.state = 'locked'
	elseif hunt then
		status.kills = get(player, S.kills)
		status.required = get(player, S.required)
		status.state = status.kills >= status.required and 'done' or 'active'
		status.timeLeft = math.max(0, get(player, S.pickedAt) + config.expiry - now)
		status.hunt = { name = hunt.name, monsters = hunt.monsters, group = DailyHunts.levelGroup(hunt.level[1]) }
	else
		local at = DailyHunts.availableAt(player, now)
		status.state = at > now and 'waiting' or 'available'
		status.availableIn = math.max(0, at - now)
	end
	return status
end

-- The status in words (!dailyhunt)
function DailyHunts.statusText(player)
	local s = DailyHunts.status(player)
	local lines = {}
	if s.state == 'locked' then
		lines[1] = 'Daily hunts start at level ' .. s.minLevel .. '.'
	elseif s.state == 'available' then
		lines[1] = 'Your daily hunt is ready. Ask a taskmaster for a task.'
	elseif s.state == 'waiting' then
		lines[1] = 'You have had your daily hunt. The next one is ready in ' .. DailyHunts.duration(s.availableIn) .. '.'
	elseif s.state == 'done' then
		lines[1] = 'Daily hunt done: ' .. s.kills .. ' ' .. s.hunt.name .. '. Return to a taskmaster for your reward (' ..
			DailyHunts.duration(s.timeLeft) .. ' left).'
	else
		lines[1] = 'Daily hunt: ' .. s.kills .. ' of ' .. s.required .. ' ' .. s.hunt.name .. ', ' ..
			DailyHunts.duration(s.timeLeft) .. ' left.'
	end
	if s.streak > 0 then
		lines[#lines + 1] = 'Streak: ' .. s.streak .. (s.streak == 1 and ' day' or ' days') .. ' (' ..
			config.streak[math.min(s.streak + 1, #config.streak)] .. 'x experience on your next hunt).'
	end
	return table.concat(lines, '\n')
end

-- Our client's Daily page and Journal: {"daily":{...},"hunting":{...},"achievements":{...}}
function DailyHunts.sendStatus(player)
	local payload = { daily = DailyHunts.status(player) }
	if HuntingTasks and HuntingTasks.status then
		payload.hunting = HuntingTasks.status(player)
	end
	if Achievements and Achievements.status then
		payload.achievements = Achievements.status(player)
	end
	player:sendExtendedOpcode(DailyHunts.OPCODE, json.encode(payload))
end
