-- Moments (ot-server#52, ot-client#25): the server tells our client when
-- something worth a picture happened, and the client takes a screenshot (if
-- the player wants that kind). Extended opcode 106:
--   {"moment":{"kind":"level","text":"You advanced from Level 113 to Level 114.","at":1767268800}}
-- Kinds: level, skill (skills and magic level), death, achievement, chest,
-- unjustified. Pictures stay on the player's device for now (phase 1).

Moments = Moments or {}

function Moments.send(player, kind, text)
	if not player or not player:isPlayer() then
		return
	end
	player:sendExtendedOpcode(DailyHunts.OPCODE, json.encode({ moment = { kind = kind, text = text or '', at = os.time() } }))
end

local SKILL_NAMES = {
	[SKILL_FIST] = 'fist fighting', [SKILL_CLUB] = 'club fighting', [SKILL_SWORD] = 'sword fighting',
	[SKILL_AXE] = 'axe fighting', [SKILL_DISTANCE] = 'distance fighting', [SKILL_SHIELD] = 'shielding',
	[SKILL_FISHING] = 'fishing',
}

-- A level, magic level or skill went up
function Moments.onAdvance(player, skill, oldLevel, newLevel)
	if newLevel <= oldLevel then
		return
	end
	if skill == SKILL_LEVEL then
		Moments.send(player, 'level', string.format('You advanced from Level %d to Level %d.', oldLevel, newLevel))
	elseif skill == SKILL_MAGLEVEL then
		Moments.send(player, 'skill', string.format('You advanced to magic level %d.', newLevel))
	elseif SKILL_NAMES[skill] then
		Moments.send(player, 'skill', string.format('You advanced to %s level %d.', SKILL_NAMES[skill], newLevel))
	end
end

-- The player is about to die (still connected: the client can take the picture)
function Moments.onPrepareDeath(player, killer)
	local by = killer and killer:getName() or nil
	Moments.send(player, 'death', by and ('Killed by ' .. (killer:isMonster() and 'a ' .. by:lower() or by) .. '.') or 'You died.')
end

-- The player killed another player: an unjustified kill is counted just after
-- this (Player::onKilledCreature), so look a moment later
function Moments.onKill(player, target)
	if not target or not target:isPlayer() or not player.getUnjustifiedKills then
		return
	end
	local before = #player:getUnjustifiedKills()
	local playerId, name = player:getId(), target:getName()
	addEvent(function()
		local killer = Player(playerId)
		if killer and #killer:getUnjustifiedKills() > before then
			Moments.send(killer, 'unjustified', 'The murder of ' .. name .. ' was not justified.')
		end
	end, 0)
end
