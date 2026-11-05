-- The Journal's Quests and Chests tabs (ot-server#44, ot-client#60).
--
-- Quests: data/XML/quests.xml (quests > missions > mission states, by
-- storage values), read once. Chests: the quest chests on the map, found
-- when it loaded (Game.getQuestChests: position, quest number = the storage
-- key the chest sets, the reward inside). Per character, so each world's
-- characters have their own (ot-server#43).
--
-- Sent to our client on request only (extended opcode 106, "journal"): the
-- lists are long, and they change rarely.

Journal = Journal or {}

local function unescape(text)
	return (text:gsub('&quot;', '"'):gsub('&apos;', "'"):gsub('&lt;', '<'):gsub('&gt;', '>'):gsub('&amp;', '&'))
end

local function attr(tag, name)
	return tag:match(name .. '="([^"]*)"')
end

-- Quests ------------------------------------------------------------------------

local quests -- { name, startStorage, startValue, missions = { { name, storage, startValue, endValue, ignoreEnd, states = { [value] = text } } } }

local function loadQuests()
	quests = {}
	local file = io.open('data/XML/quests.xml', 'r')
	if not file then
		return
	end
	local xml = file:read('*a')
	file:close()
	for questTag, questBody in xml:gmatch('<quest%s([^>]*)>(.-)</quest>') do
		local quest = {
			name = unescape(attr(questTag, 'name') or '?'),
			startStorage = tonumber(attr(questTag, 'startstorageid')) or 0,
			startValue = tonumber(attr(questTag, 'startstoragevalue')) or 1,
			missions = {},
		}
		-- missions: <mission ...>states</mission>, or <mission ... description="..." /> (one text)
		local missionTags = {}
		for tag, rest in questBody:gmatch('<mission%s([^>]-)(/?)>') do
			table.insert(missionTags, { tag = tag, single = rest == '/' })
		end
		local bodies = {}
		for body in questBody:gmatch('<mission%s[^>]-[^/]>(.-)</mission>') do
			table.insert(bodies, body)
		end
		local bodyIndex = 0
		for _, entry in ipairs(missionTags) do
			local missionTag, missionBody = entry.tag, ''
			if not entry.single then
				bodyIndex = bodyIndex + 1
				missionBody = bodies[bodyIndex] or ''
			end
			local mission = {
				name = unescape(attr(missionTag, 'name') or '?'),
				storage = tonumber(attr(missionTag, 'storageid')) or 0,
				startValue = tonumber(attr(missionTag, 'startvalue')) or 1,
				endValue = tonumber(attr(missionTag, 'endvalue')) or 1,
				ignoreEnd = attr(missionTag, 'ignoreendvalue') == 'true',
				states = {},
			}
			for stateTag in missionBody:gmatch('<missionstate%s([^>]*)/>') do
				local id = tonumber(attr(stateTag, 'id'))
				if id then
					mission.states[id] = unescape(attr(stateTag, 'description') or '')
				end
			end
			-- one text for the whole mission
			local description = attr(missionTag, 'description')
			if description and not next(mission.states) then
				mission.states[mission.startValue] = unescape(description)
			end
			table.insert(quest.missions, mission)
		end
		table.insert(quests, quest)
	end
end

-- Started, done and the text for a mission, as the quest log has them
local function missionState(player, mission)
	local value = player:getStorageValue(mission.storage)
	if value < mission.startValue then
		return 'none'
	end
	local done = mission.ignoreEnd and value >= mission.endValue or value == mission.endValue
	-- the text for this value, or the nearest one below it
	local text
	for v = math.min(value, mission.endValue), mission.startValue, -1 do
		if mission.states[v] then
			text = mission.states[v]
			break
		end
	end
	return done and 'done' or 'active', text
end

function Journal.quests(player)
	if not quests then
		loadQuests()
	end
	local list = {}
	for _, quest in ipairs(quests) do
		local started = player:getStorageValue(quest.startStorage) >= quest.startValue
		local done, total, text, anyStarted = 0, #quest.missions, nil, false
		for _, mission in ipairs(quest.missions) do
			local state, missionText = missionState(player, mission)
			if state ~= 'none' then
				anyStarted = true
				-- the last started mission tells where the quest stands
				text = missionText or text
			end
			if state == 'done' then
				done = done + 1
			end
		end
		started = started or anyStarted
		table.insert(list, {
			name = quest.name,
			started = started,
			complete = started and total > 0 and done == total,
			done = done,
			missions = total,
			text = started and text or nil,
		})
	end
	return list
end

-- Chests ------------------------------------------------------------------------

local chests -- { { questNumber, name, reward, region } }

local romans = { '', ' II', ' III', ' IV', ' V', ' VI', ' VII', ' VIII', ' IX', ' X' }

local function titleCase(text)
	return (text:gsub("(%a)([%w']*)", function(first, rest) return first:upper() .. rest end))
end

-- "10x Small Diamond", "Boots Of Haste" -> the chest's name and reward
local function rewardName(id, count)
	local itemType = ItemType(id)
	if not itemType or id == 0 then
		return 'Something'
	end
	if count > 1 and itemType:isStackable() then
		return count .. 'x ' .. titleCase(itemType:getName())
	end
	return titleCase(itemType:getName())
end

-- Where a chest is: the areas used by daily hunts (Rookgaard, the premium
-- islands...), else Mainland
local function regionAt(position)
	if DailyHunts and DailyHunts.areaAt then
		local kind, name = DailyHunts.areaAt(position.x, position.y)
		if kind ~= 'free' and name then
			return name
		end
	end
	return 'Mainland'
end

local function loadChests()
	chests = {}
	if not Game.getQuestChests then
		return
	end
	local seen, names = {}, {}
	for _, chest in ipairs(Game.getQuestChests()) do
		-- several chests can share one quest number (choose one of them)
		if not seen[chest.questNumber] then
			seen[chest.questNumber] = true
			local reward = rewardName(chest.rewardId, chest.rewardCount)
			names[reward] = (names[reward] or 0) + 1
			table.insert(chests, {
				questNumber = chest.questNumber,
				reward = reward,
				name = reward .. ' Quest' .. (romans[names[reward]] or (' ' .. names[reward])),
				region = regionAt(chest.position),
			})
		end
	end
	table.sort(chests, function(a, b) return a.name < b.name end)
end

function Journal.chests(player)
	if not chests then
		loadChests()
	end
	local list = {}
	for _, chest in ipairs(chests) do
		table.insert(list, {
			name = chest.name,
			reward = chest.reward,
			region = chest.region,
			opened = player:getStorageValue(chest.questNumber) > 0,
		})
	end
	return list
end

-- The regions for the filter (Mainland first)
function Journal.regions()
	if not chests then
		loadChests()
	end
	local list, seen = { 'Mainland' }, { Mainland = true }
	for _, chest in ipairs(chests) do
		if not seen[chest.region] then
			seen[chest.region] = true
			table.insert(list, chest.region)
		end
	end
	return list
end

function Journal.status(player)
	return { quests = Journal.quests(player), chests = Journal.chests(player), regions = Journal.regions() }
end

-- The Journal's Quests and Chests: sent when the client asks ("journal").
-- One message holds about 8 KB, so the lists go in parts:
--   {"journal":{"part":"quests","quests":[...],"regions":[...]}}
--   {"journal":{"part":"chests","chests":[...],"more":true}}  (as many as needed)
local CHUNK = 6000

function Journal.send(player)
	local opcode = DailyHunts.OPCODE
	player:sendExtendedOpcode(opcode, json.encode({ journal = { part = 'quests',
		quests = Journal.quests(player), regions = Journal.regions() } }))
	local batch, size, first = {}, 0, true
	local function flush(more)
		player:sendExtendedOpcode(opcode, json.encode({ journal = { part = 'chests', chests = batch,
			first = first, more = more } }))
		first = false
	end
	for _, chest in ipairs(Journal.chests(player)) do
		local encoded = #json.encode(chest)
		if size + encoded > CHUNK and #batch > 0 then
			flush(true)
			batch, size = {}, 0
		end
		table.insert(batch, chest)
		size = size + encoded
	end
	flush(false)
end
