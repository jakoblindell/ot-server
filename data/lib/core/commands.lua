-- Chat commands as our client lists them when a player types / or !
-- (ot-client#24): what each does, its parameters and who may use it.
-- Who may use one matches the check in its script, so the list never shows
-- a command that would do nothing; the scripts still check when it runs.
--
-- need: "player" anyone | "access" staff (a group with access) |
-- "gamemaster" / "god" staff of at least that account type |
-- "seniortutor" senior tutors and up | "broadcast" the broadcast flag
-- params: the parts after the command, in order (separated by commas); no
-- commas inside a name (the client shows alternatives with slashes)

ChatCommands = {
	-- Moving around
	{words = "/goto", params = {"name"}, need = "access", text = "Teleport to a player, monster or NPC."},
	{words = "/gotopos", params = {"x", "y", "z"}, need = "access", text = "Teleport to a position."},
	{words = "/c", params = {"name"}, need = "access", text = "Bring a creature to you."},
	{words = "/town", params = {"town name or id"}, need = "access", text = "Teleport to a town's temple."},
	{words = "/t", params = {}, need = "access", text = "Teleport to your home temple."},
	{words = "/a", params = {"tiles"}, need = "access", text = "Jump the given number of tiles in the direction you face."},
	{words = "/up", params = {}, need = "access", text = "Go one floor up."},
	{words = "/down", params = {}, need = "access", text = "Go one floor down."},
	{words = "/pos", params = {}, need = "player", text = "Show your position (staff: give x, y, z to teleport there)."},

	-- Players
	{words = "/info", params = {"player name"}, need = "access", text = "Show a player's level, magic level, speed, position and IP."},
	{words = "/kick", params = {"player name"}, need = "access", text = "Disconnect a player."},
	{words = "/ban", params = {"player name", "reason"}, need = "access", text = "Ban a player's account."},
	{words = "/ipban", params = {"player name"}, need = "access", text = "Ban a player's IP address."},
	{words = "/unban", params = {"player name"}, need = "access", text = "Lift a player's bans."},
	{words = "/impersonate", params = {"player name", "text"}, need = "access", text = "Make a player say something."},
	{words = "/addskill", params = {"player name", "level/magic/skill name", "amount"}, need = "god", text = "Raise a player's level, magic level or a skill."},
	{words = "/addtutor", params = {"player name"}, need = "seniortutor", text = "Make a player a tutor."},
	{words = "/removetutor", params = {"player name"}, need = "seniortutor", text = "Make a tutor a normal player again."},
	{words = "/storagevalue", params = {"key", "value"}, need = "access", text = "Set one of your storage values (quest progress)."},

	-- Creating things
	{words = "/i", params = {"item id or name", "count"}, need = "god", text = "Create an item."},
	{words = "/m", params = {"monster name"}, need = "god", text = "Place a monster in front of you."},
	{words = "/s", params = {"npc name"}, need = "god", text = "Place an NPC in front of you."},
	{words = "/summon", params = {"monster name"}, need = "god", text = "Summon a monster that follows you."},
	{words = "/r", params = {"count"}, need = "access", text = "Remove the item (or creature) in front of you."},
	{words = "/looktype", params = {"look type id"}, need = "access", text = "Change your outfit to any look type."},
	{words = "/chameleon", params = {"item id or name"}, need = "god", text = "Look like an item."},
	{words = "/ghost", params = {}, need = "gamemaster", text = "Become invisible to players (again: visible)."},
	{words = "!z", params = {"effect id"}, need = "access", text = "Show a magic effect (testing)."},
	{words = "!x", params = {"animation id"}, need = "access", text = "Show an animated text (testing)."},

	-- World and server
	{words = "/B", params = {"message"}, need = "broadcast", text = "Send a message to everyone online."},
	{words = "/raid", params = {"raid name"}, need = "god", text = "Start a raid."},
	{words = "/event", params = {}, need = "god", text = "Start the Serpentine Tower event."},
	{words = "/globalboost", params = {"exp/skill/loot/magic", "percent", "hours"}, need = "god", text = "Boost a rate for everyone for a while."},
	{words = "/clean", params = {}, need = "god", text = "Remove loose items from the map."},
	{words = "/save", params = {}, need = "god", text = "Save the game now."},
	{words = "/reload", params = {"actions/monsters/npcs/config/..."}, need = "gamemaster", text = "Reload server files without a restart."},
	{words = "/openserver", params = {}, need = "god", text = "Let players log in again."},
	{words = "/closeserver", params = {"shutdown (optional)"}, need = "god", text = "Close the server to players, or shut it down."},
	{words = "/owner", params = {"player name or none"}, need = "god", text = "Set the owner of the house you stand in."},
	{words = "/removehouse", params = {}, need = "god", text = "Clear the house you stand in."},
	{words = "/queryhouses", params = {"item id"}, need = "god", text = "Find an item in all houses."},
	{words = "/minimap", params = {"min x", "max x", "min y", "max y", "z"}, need = "god", text = "Scan an area so it shows on the minimap."},
	{words = "/mccheck", params = {}, need = "god", text = "List players playing more than one character from one IP."},
	{words = "/loottest", params = {}, need = "god", text = "Spawn 1000 cyclopes near Thais to test loot (heavy!)."},
	{words = "!online", params = {}, need = "god", text = "List who is online."},

	-- Everyone
	{words = "!serverinfo", params = {}, need = "player", text = "Show the experience, skill, magic and loot rates."},
	{words = "!uptime", params = {}, need = "player", text = "How long the server has been running."},
	{words = "!deathlist", params = {"player name"}, need = "player", text = "Show a player's recent deaths."},
	{words = "!kills", params = {}, need = "player", text = "Show your unjustified kills."},
	{words = "!frags", params = {}, need = "player", text = "Show your unjustified kills."},
	{words = "!share", params = {}, need = "player", text = "Turn shared experience on or off (party leader)."},
	{words = "!vial", params = {}, need = "player", text = "Turn removing empty vials on or off."},
	{words = "!physicaldamage", params = {"creature", "skill", "vocation", "weapon"}, need = "player", text = "Work out the damage a hit would do."},
	{words = "!shop", params = {}, need = "player", text = "Collect items bought in the website shop."},
	{words = "!leavehouse", params = {}, need = "player", text = "Give up the house you stand in."},
	{words = "!sellhouse", params = {"player name"}, need = "player", text = "Sell your house to a player."},
	{words = "!buyhouse", params = {}, need = "player", text = "How to buy a house."},
	{words = "!war", params = {"invite/accept/reject/end/cancel", "guild name", "frags"}, need = "player", text = "Guild war commands (guild leaders)."},
}

local function mayUse(player, need)
	if need == "player" then
		return true
	elseif need == "broadcast" then
		return getPlayerFlagValue(player, PlayerFlag_CanBroadcast)
	elseif need == "seniortutor" then
		return player:getAccountType() >= ACCOUNT_TYPE_SENIORTUTOR
	end
	if not player:getGroup():getAccess() then
		return false
	end
	if need == "gamemaster" then
		return player:getAccountType() >= ACCOUNT_TYPE_GAMEMASTER
	elseif need == "god" then
		return player:getAccountType() >= ACCOUNT_TYPE_GOD
	end
	return true
end

local function jsonString(text)
	return '"' .. text:gsub('\\', '\\\\'):gsub('"', '\\"') .. '"'
end

-- The commands this player may use, as JSON for the client (opcode 104):
-- {"commands":[{"words":"/i","params":["item id or name","count"],"text":"..."}]}
function chatCommandsJson(player)
	local entries = {}
	for _, command in ipairs(ChatCommands) do
		if mayUse(player, command.need) then
			local params = {}
			for _, param in ipairs(command.params) do
				params[#params + 1] = jsonString(param)
			end
			entries[#entries + 1] = string.format('{"words":%s,"params":[%s],"text":%s}',
				jsonString(command.words), table.concat(params, ","), jsonString(command.text))
		end
	end
	return '{"commands":[' .. table.concat(entries, ",") .. ']}'
end
