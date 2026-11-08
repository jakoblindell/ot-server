-- The hub's character sheet (ot-server#50, ot-client#60): what the 7.92
-- protocol does not send. Our client asks with extended opcode 106,
-- "character", and gets:
--   {"character":{"blessings":[true,false,...],      the five, in order
--     "frags":{"day":0,"week":1,"month":1,             unjustified kills that count
--              "red":{"day":4,"week":12,"month":35},   red skull at
--              "ban":{"day":7,"week":18,"month":60}},  banishment at
--     "skull":0,"skullLeft":0,                          skull, seconds until it ends
--     "premiumDays":0,"vocation":"Elite Knight"}}

CharacterSheet = CharacterSheet or {}

local DAY = 24 * 60 * 60

local function count(kills, since)
	local n = 0
	for _, time in ipairs(kills) do
		if time > since then
			n = n + 1
		end
	end
	return n
end

local function config(key)
	return configKeys[key] and configManager.getNumber(configKeys[key]) or 0
end

function CharacterSheet.status(player)
	local blessings = {}
	for i = 1, 5 do
		blessings[i] = player:hasBlessing(i)
	end
	local now = os.time()
	local kills = player.getUnjustifiedKills and player:getUnjustifiedKills() or {}
	local skullEnd = player.getSkullEnd and player:getSkullEnd() or 0
	return {
		blessings = blessings,
		frags = {
			day = count(kills, now - DAY),
			week = count(kills, now - 7 * DAY),
			month = count(kills, now - 30 * DAY),
			red = { day = config('KILLS_DAY_RED_SKULL'), week = config('KILLS_WEEK_RED_SKULL'), month = config('KILLS_MONTH_RED_SKULL') },
			ban = { day = config('KILLS_DAY_BANISHMENT'), week = config('KILLS_WEEK_BANISHMENT'), month = config('KILLS_MONTH_BANISHMENT') },
		},
		skull = player:getSkull(),
		skullLeft = math.max(0, skullEnd - now),
		premiumDays = player:getPremiumDays(),
		-- (the 7.92 protocol has no vocation)
		vocation = player:getVocation():getName(),
	}
end

function CharacterSheet.send(player)
	player:sendExtendedOpcode(DailyHunts.OPCODE, json.encode({ character = CharacterSheet.status(player) }))
end
