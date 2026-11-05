-- Daily hunts, hunting tasks and achievements (ot-server#21, #29, #30)

-- On every monster (monsters="all"): a kill for everyone who damaged it
function onDeath(creature, corpse, killer, mostDamageKiller, lastHitUnjustified, mostDamageUnjustified)
	if creature:isMonster() then
		DailyHunts.onMonsterDeath(creature)
		HuntingTasks.onMonsterDeath(creature)
		Achievements.onMonsterDeath(creature, corpse, killer, mostDamageKiller)
	end
	return true
end
