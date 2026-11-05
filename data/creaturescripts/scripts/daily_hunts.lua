-- Daily hunts and hunting tasks (ot-server#21, #29; data/lib/tasks)

-- On every monster (monsters="all"): a kill for everyone who damaged it
function onDeath(creature, corpse, killer, mostDamageKiller, lastHitUnjustified, mostDamageUnjustified)
	if creature:isMonster() then
		DailyHunts.onMonsterDeath(creature)
		HuntingTasks.onMonsterDeath(creature)
	end
	return true
end
