-- Daily hunts (ot-server#21, data/lib/tasks/daily_hunts.lua)

-- On every monster (monsters="all"): a kill for everyone who damaged it
function onDeath(creature, corpse, killer, mostDamageKiller, lastHitUnjustified, mostDamageUnjustified)
	if creature:isMonster() then
		DailyHunts.onMonsterDeath(creature)
	end
	return true
end
