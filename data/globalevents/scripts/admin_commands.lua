-- Runs commands from the website's admin pages (table site_admin_commands,
-- written by the site; see site/src/lib/server/commands.ts). Checked every
-- second; each command is marked done or failed with a short result.

local tableReady = false
local nextTableCheck = 0

local reloadTypes = {
	actions = RELOAD_TYPE_ACTIONS,
	chat = RELOAD_TYPE_CHAT,
	config = RELOAD_TYPE_CONFIG,
	creaturescripts = RELOAD_TYPE_CREATURESCRIPTS,
	events = RELOAD_TYPE_EVENTS,
	global = RELOAD_TYPE_GLOBAL,
	globalevents = RELOAD_TYPE_GLOBALEVENTS,
	items = RELOAD_TYPE_ITEMS,
	monsters = RELOAD_TYPE_MONSTERS,
	movements = RELOAD_TYPE_MOVEMENTS,
	npcs = RELOAD_TYPE_NPCS,
	quests = RELOAD_TYPE_QUESTS,
	raids = RELOAD_TYPE_RAIDS,
	spells = RELOAD_TYPE_SPELLS,
	talkactions = RELOAD_TYPE_TALKACTIONS,
	weapons = RELOAD_TYPE_WEAPONS,
}

local function findPlayer(name)
	local player = Player(name)
	if not player then
		return nil, name .. " is not online"
	end
	return player
end

-- Restart: warnings, then the same shutdown as the server save (Docker
-- starts the server again)
local function restartIn(minutes)
	if minutes <= 0 then
		Game.setGameState(GAME_STATE_SHUTDOWN)
		return
	end
	broadcastMessage(string.format("Server is restarting in %d minute%s.\nPlease log out.", minutes, minutes == 1 and "" or "s"), MESSAGE_STATUS_WARNING)
	local nextWarning = minutes > 5 and minutes - 5 or minutes - 1
	addEvent(restartIn, (minutes - nextWarning) * 60 * 1000, nextWarning)
end

local commands = {
	broadcast = function(target, text)
		if text == "" then
			return false, "no message"
		end
		broadcastMessage(text, MESSAGE_STATUS_WARNING)
		return true, "sent to " .. #Game.getPlayers() .. " players"
	end,
	save = function()
		saveServer()
		return true, "saved"
	end,
	clean = function()
		return true, cleanMap() .. " items removed"
	end,
	reload = function(target)
		local reloadType = reloadTypes[target]
		if not reloadType then
			return false, "unknown reload type " .. target
		end
		Game.reload(reloadType)
		return true, target .. " reloaded"
	end,
	kick = function(target)
		local player, err = findPlayer(target)
		if not player then
			return false, err
		end
		player:remove()
		return true, target .. " kicked"
	end,
	message = function(target, text)
		local player, err = findPlayer(target)
		if not player then
			return false, err
		end
		player:sendTextMessage(MESSAGE_STATUS_WARNING, text)
		return true, "message shown to " .. target
	end,
	temple = function(target)
		local player, err = findPlayer(target)
		if not player then
			return false, err
		end
		local position = player:getTown():getTemplePosition()
		player:teleportTo(position)
		position:sendMagicEffect(CONST_ME_TELEPORT)
		return true, target .. " sent to the temple"
	end,
	mute = function(target, text, number)
		local player, err = findPlayer(target)
		if not player then
			return false, err
		end
		local condition = Condition(CONDITION_MUTED)
		condition:setParameter(CONDITION_PARAM_TICKS, number * 60 * 1000)
		player:addCondition(condition)
		player:sendTextMessage(MESSAGE_STATUS_WARNING, string.format("You have been muted for %d minutes.", number))
		return true, string.format("%s muted for %d minutes", target, number)
	end,
	restart = function(target, text, number)
		restartIn(math.max(0, number))
		return true, number > 0 and string.format("restart in %d minutes", number) or "restarting now"
	end,
}

local function finish(id, ok, result)
	db.query(string.format("UPDATE `site_admin_commands` SET `status` = %s, `result` = %s, `done_at` = UTC_TIMESTAMP() WHERE `id` = %d",
		db.escapeString(ok and "done" or "failed"), db.escapeString(tostring(result):sub(1, 255)), id))
end

function onThink(interval)
	if not tableReady then
		if os.time() < nextTableCheck then
			return true
		end
		local check = db.storeQuery("SELECT 1 FROM `information_schema`.`tables` WHERE `table_schema` = DATABASE() AND `table_name` = 'site_admin_commands'")
		if not check then
			nextTableCheck = os.time() + 60
			return true
		end
		result.free(check)
		tableReady = true
	end

	local resultId = db.storeQuery("SELECT `id`, `command`, `target`, `text`, `number` FROM `site_admin_commands` WHERE `status` = 'pending' ORDER BY `id` LIMIT 20")
	if not resultId then
		return true
	end
	repeat
		local id = result.getNumber(resultId, "id")
		local name = result.getString(resultId, "command")
		local handler = commands[name]
		if handler then
			local done, ok, outcome = pcall(handler, result.getString(resultId, "target"), result.getString(resultId, "text"), result.getNumber(resultId, "number"))
			if done then
				finish(id, ok, outcome)
			else
				finish(id, false, ok)
			end
		else
			finish(id, false, "unknown command " .. name)
		end
	until not result.next(resultId)
	result.free(resultId)
	return true
end
