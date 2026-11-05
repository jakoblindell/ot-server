-- Achievements (ot-server#30, data/lib/achievements)

function onLogin(player)
	Achievements.onLogin(player)
	return true
end

-- Registered at login: levels, magic level and skills
function onAdvance(player, skill, oldLevel, newLevel)
	if skill == SKILL_LEVEL then
		Achievements.trigger(player, 'level', newLevel)
	else
		Achievements.trigger(player, 'skill', { skill = skill, level = newLevel })
	end
	return true
end

-- Registered at login: who killed the player
function onDeath(player, corpse, killer, mostDamageKiller)
	local by = killer or mostDamageKiller
	if by and by:isMonster() then
		Achievements.trigger(player, 'death', by:getName():lower())
	end
	return true
end
