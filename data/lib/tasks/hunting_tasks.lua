-- Hunting tasks (ot-server#29): long kill tasks at the taskmaster
-- (data/npc/taskmaster.npc, Script("huntingtask.<what>")), and the hunter
-- rank they build.
--
--   hunting        your task and progress, or the tasks you can start
--   start <name>   start a task ("start trolls")
--   report         hand in a finished task: reward and rank points
--   abandon        give the task up (asks first)
--   rank           your hunter rank and the next one
--
-- One task at a time, no time limit. Kills count for everyone who damaged
-- the monster, like daily hunts. Settings and tasks: hunting_tasks_config.lua.

dofile('data/lib/tasks/hunting_tasks_config.lua')

local config = HuntingTasks.config

local S = {
	task = 47200, -- the active task id, 0 = none
	kills = 47201,
	points = 47202, -- rank points
	abandonedAt = 47203,
	finishedBase = 47300, -- + task id: times finished
}
HuntingTasks.storage = S

local tasksById, tasksByMonster = {}, {}
for _, task in ipairs(HuntingTasks.tasks) do
	tasksById[task.id] = task
	for _, name in ipairs(task.monsters) do
		tasksByMonster[name:lower()] = tasksByMonster[name:lower()] or {}
		table.insert(tasksByMonster[name:lower()], task.id)
	end
end

local function get(player, key)
	return math.max(0, player:getStorageValue(key))
end

local function capitalize(text)
	return (text:gsub('^%l', string.upper))
end

function HuntingTasks.getTask(id)
	return tasksById[id]
end

-- Ranks ---------------------------------------------------------------------------

-- The rank number (1..#ranks) for these rank points
function HuntingTasks.rankFor(points)
	local rank = 1
	for i, entry in ipairs(HuntingTasks.ranks) do
		if points >= entry.points then
			rank = i
		end
	end
	return rank
end

function HuntingTasks.rank(player)
	local points = get(player, S.points)
	local rank = HuntingTasks.rankFor(points)
	return rank, HuntingTasks.ranks[rank], points
end

-- Which tasks --------------------------------------------------------------------------

function HuntingTasks.timesFinished(player, task)
	return get(player, S.finishedBase + task.id)
end

-- nil when the player can start it, else why not
function HuntingTasks.whyNot(player, task)
	if player:getLevel() < (task.level or 1) then
		return 'You need level ' .. task.level .. ' for that one.'
	end
	local rank = HuntingTasks.rank(player)
	if rank < (task.rank or 1) then
		return 'That task is for a ' .. HuntingTasks.ranks[task.rank].name .. ' or better.'
	end
	if not task.repeatable and HuntingTasks.timesFinished(player, task) > 0 then
		return 'You have already done that task.'
	end
	return nil
end

-- The tasks this player can start now, and the ones a higher rank unlocks
function HuntingTasks.available(player)
	local open, locked = {}, {}
	for _, task in ipairs(HuntingTasks.tasks) do
		local why = HuntingTasks.whyNot(player, task)
		if not why then
			table.insert(open, task)
		elseif player:getLevel() >= (task.level or 1) and HuntingTasks.rank(player) < (task.rank or 1) then
			table.insert(locked, task)
		end
	end
	return open, locked
end

-- The task a message names ("start trolls" -> trolls): the longest name in it
local function findTask(message)
	message = message:lower()
	local best
	for _, task in ipairs(HuntingTasks.tasks) do
		if message:find(task.name:lower(), 1, true) and (not best or #task.name > #best.name) then
			best = task
		end
	end
	return best
end

-- Rewards -----------------------------------------------------------------------------

-- The reward with the rank bonus on experience and gold
function HuntingTasks.reward(player, task)
	local _, rank = HuntingTasks.rank(player)
	local reward = task.reward or {}
	return {
		exp = math.floor((reward.exp or 0) * (1 + rank.bonus)),
		gold = math.floor((reward.gold or 0) * (1 + rank.bonus)),
		items = reward.items or {},
	}
end

local function rewardText(reward)
	local parts = {}
	if reward.exp > 0 then
		table.insert(parts, reward.exp .. ' experience points')
	end
	if reward.gold > 0 then
		table.insert(parts, reward.gold .. ' gold')
	end
	for _, entry in ipairs(reward.items) do
		local itemType = ItemType(entry[1])
		local name = itemType and itemType:getName() or 'item'
		local article = itemType and itemType:getArticle() or ''
		if (entry[2] or 1) > 1 then
			table.insert(parts, entry[2] .. ' ' .. (itemType and itemType:getPluralName() or name))
		else
			table.insert(parts, (article ~= '' and (article .. ' ') or '') .. name)
		end
	end
	if #parts == 0 then
		return 'nothing but my respect'
	end
	if #parts == 1 then
		return parts[1]
	end
	return table.concat(parts, ', ', 1, #parts - 1) .. ' and ' .. parts[#parts]
end

-- Kills ---------------------------------------------------------------------------------

local function sendStatus(player)
	if DailyHunts and DailyHunts.sendStatus then
		DailyHunts.sendStatus(player)
	end
end

function HuntingTasks.addKill(player, taskIds)
	local id = get(player, S.task)
	if id == 0 or not table.contains(taskIds, id) then
		return
	end
	local task = tasksById[id]
	local kills = get(player, S.kills)
	if not task or kills >= task.kills then
		return
	end
	kills = kills + 1
	player:setStorageValue(S.kills, kills)
	if kills >= task.kills then
		player:sendTextMessage(MESSAGE_EVENT_ADVANCE, 'Hunting task done: ' .. kills .. ' ' .. task.name ..
			'. Report to a taskmaster for your reward.')
	elseif kills % 10 == 0 or task.kills - kills <= 5 then
		-- every 10th kill and the last few (a long task should not flood the log)
		player:sendTextMessage(MESSAGE_STATUS_DEFAULT, 'Hunting task: ' .. kills .. ' of ' .. task.kills .. ' ' .. task.name .. '.')
	end
	addEvent(function(cid)
		local target = Player(cid)
		if target then
			sendStatus(target)
		end
	end, 0, player:getId())
end

-- A monster died: every player who damaged it (or whose summon did) and has
-- a task for it gets a kill
function HuntingTasks.onMonsterDeath(monster)
	local taskIds = tasksByMonster[monster:getName():lower()]
	if not taskIds or monster:getMaster() then
		return
	end
	local credited = {}
	for creatureId in pairs(monster:getDamageMap()) do
		local attacker = Creature(creatureId)
		local player = attacker and (attacker:getPlayer() or (attacker:getMaster() and attacker:getMaster():getPlayer()))
		if player and not credited[player:getId()] then
			credited[player:getId()] = true
			HuntingTasks.addKill(player, taskIds)
		end
	end
end

-- The taskmaster ---------------------------------------------------------------------------

local function progressText(player)
	local task = tasksById[get(player, S.task)]
	local kills = get(player, S.kills)
	if kills >= task.kills then
		return 'You have killed all ' .. task.kills .. ' ' .. task.name .. '. Say report for your reward.'
	end
	return 'Your hunting task: ' .. kills .. ' of ' .. task.kills .. ' ' .. task.name .. '. Say report when you are done, or abandon to give it up.'
end

local function listText(player)
	local open, locked = HuntingTasks.available(player)
	local lines = {}
	if #open == 0 then
		lines[1] = 'I have no hunting task for you right now.'
	else
		local names = {}
		for _, task in ipairs(open) do
			table.insert(names, task.name .. ' (' .. task.kills .. ')')
		end
		lines[1] = 'Hunting tasks for you: ' .. table.concat(names, ', ') .. '. Say "start ' .. open[1].name .. '" to begin one.'
	end
	if #locked > 0 then
		local _, rank = HuntingTasks.rank(player)
		lines[#lines + 1] = 'A higher hunter rank unlocks ' .. #locked .. (#locked == 1 and ' more task' or ' more tasks') ..
			'. You are a ' .. rank.name .. '.'
	end
	return lines
end

local handlers = {}

function handlers.list(npc, player, message)
	if get(player, S.task) ~= 0 then
		return progressText(player)
	end
	return listText(player)
end

function handlers.start(npc, player, message)
	if get(player, S.task) ~= 0 then
		return 'Finish your task first, or abandon it. ' .. progressText(player)
	end
	local wait = get(player, S.abandonedAt) + config.abandonCooldown - os.time()
	if wait > 0 then
		return 'You gave up a task not long ago. Come back in ' .. DailyHunts.duration(wait) .. '.'
	end
	local task = findTask(message)
	if not task then
		return listText(player)
	end
	local why = HuntingTasks.whyNot(player, task)
	if why then
		return why
	end
	player:setStorageValue(S.task, task.id)
	player:setStorageValue(S.kills, 0)
	return 'So be it: kill ' .. task.kills .. ' ' .. task.name .. '. Any blow you land counts. There is no hurry; report to me when you are done.'
end

function handlers.report(npc, player, message)
	local id = get(player, S.task)
	local task = tasksById[id]
	if not task then
		return 'You have no hunting task. Say hunting to see what I have.'
	end
	if get(player, S.kills) < task.kills then
		return progressText(player)
	end
	local reward = HuntingTasks.reward(player, task)
	local oldRank = HuntingTasks.rank(player)
	player:setStorageValue(S.task, 0)
	player:setStorageValue(S.kills, 0)
	player:setStorageValue(S.finishedBase + task.id, HuntingTasks.timesFinished(player, task) + 1)
	player:setStorageValue(S.points, get(player, S.points) + (task.points or 0))
	if reward.exp > 0 then
		player:addExperience(reward.exp, true)
	end
	if reward.gold > 0 then
		player:addMoney(reward.gold)
	end
	for _, entry in ipairs(reward.items) do
		player:addItem(entry[1], entry[2] or 1)
	end
	player:getPosition():sendMagicEffect(CONST_ME_MAGIC_BLUE or 12)
	local lines = { 'Well done, %N! Your reward: ' .. rewardText(reward) .. '.' }
	local newRank, rank = HuntingTasks.rank(player)
	if newRank > oldRank then
		lines[#lines + 1] = 'You are now a ' .. rank.name .. '! New tasks are open to you, and my rewards grow.'
		player:sendTextMessage(MESSAGE_EVENT_ADVANCE, 'You advanced to ' .. rank.name .. '.')
	end
	return lines
end

-- "abandon" asks; "abandonconfirm" (the yes) gives it up
function handlers.abandon(npc, player, message)
	local task = tasksById[get(player, S.task)]
	if not task then
		return 'You have no hunting task to give up.'
	end
	return 'Give up your ' .. task.name .. ' task? Your kills so far are lost. Say yes to give it up.'
end

function handlers.abandonconfirm(npc, player, message)
	if get(player, S.task) == 0 then
		return 'You have no hunting task to give up.'
	end
	player:setStorageValue(S.task, 0)
	player:setStorageValue(S.kills, 0)
	player:setStorageValue(S.abandonedAt, os.time())
	return 'As you wish. Come back in ' .. DailyHunts.duration(config.abandonCooldown) .. ' for a new task.'
end

function handlers.rank(npc, player, message)
	local rankNo, rank, points = HuntingTasks.rank(player)
	local nextRank = HuntingTasks.ranks[rankNo + 1]
	local text = 'You are a ' .. rank.name .. ' with ' .. points .. ' rank points.'
	if nextRank then
		text = text .. ' ' .. (nextRank.points - points) .. ' more make you a ' .. nextRank.name .. '.'
	else
		text = text .. ' There is no higher rank.'
	end
	return text
end

function HuntingTasks.talk(npc, player, what, message)
	local handler = handlers[what]
	if not handler then
		return nil
	end
	local answer = handler(npc, player, message or '')
	sendStatus(player)
	return answer
end

NpcScripts.huntingtask = HuntingTasks.talk

-- Status for !tasks and the client's Tasks page ----------------------------------

function HuntingTasks.status(player)
	local rankNo, rank, points = HuntingTasks.rank(player)
	local nextRank = HuntingTasks.ranks[rankNo + 1]
	local status = {
		rank = rank.name,
		rankNumber = rankNo,
		points = points,
		nextRank = nextRank and nextRank.name or nil,
		nextPoints = nextRank and nextRank.points or nil,
		bonus = rank.bonus,
	}
	local task = tasksById[get(player, S.task)]
	if task then
		status.task = { name = task.name, monsters = task.monsters, kills = get(player, S.kills), required = task.kills,
			reward = HuntingTasks.reward(player, task) }
	else
		local open, locked = HuntingTasks.available(player)
		status.available = {}
		for _, entry in ipairs(open) do
			table.insert(status.available, { name = entry.name, kills = entry.kills, monsters = entry.monsters })
		end
		status.locked = #locked
	end
	return status
end

function HuntingTasks.statusText(player)
	local s = HuntingTasks.status(player)
	local line = 'Hunter rank: ' .. s.rank .. ' (' .. s.points .. ' points' ..
		(s.nextRank and (', ' .. (s.nextPoints - s.points) .. ' to ' .. s.nextRank) or '') .. ').'
	if s.task then
		return 'Hunting task: ' .. s.task.kills .. ' of ' .. s.task.required .. ' ' .. s.task.name .. '.\n' .. line
	end
	return 'No hunting task. ' .. #s.available .. ' to choose from at a taskmaster.\n' .. line
end
