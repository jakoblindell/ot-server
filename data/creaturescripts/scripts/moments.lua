-- Moments (ot-server#52, data/lib/moments): advances, deaths and unjustified
-- kills; achievements and quest chests send theirs where they happen

function onLogin(player)
	player:registerEvent('MomentAdvance')
	player:registerEvent('MomentPrepareDeath')
	player:registerEvent('MomentKill')
	return true
end

function onAdvance(player, skill, oldLevel, newLevel)
	Moments.onAdvance(player, skill, oldLevel, newLevel)
	return true
end

function onPrepareDeath(player, killer)
	Moments.onPrepareDeath(player, killer)
	return true
end

function onKill(player, target)
	Moments.onKill(player, target)
	return true
end
