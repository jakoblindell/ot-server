-- Hunting tasks (ot-server#29): long kill tasks at the taskmaster, and the
-- hunter rank. Settings and the task list; staff add tasks here.
--
-- One task at a time. It runs until it is done or abandoned (no time limit).
-- Finished tasks give their reward and rank points; ranks unlock harder
-- tasks and raise the experience and gold of task rewards.

HuntingTasks = HuntingTasks or {}

HuntingTasks.config = {
	-- abandoning a task: wait this long before starting another
	abandonCooldown = 30 * 60,
}

-- Hunter ranks: reached at `points` rank points (from finished tasks).
-- `bonus`: extra experience and gold on task rewards at this rank (0.05 = +5%).
HuntingTasks.ranks = {
	{ name = 'Novice Hunter', points = 0, bonus = 0 },
	{ name = 'Hunter', points = 5, bonus = 0.05 },
	{ name = 'Skilled Hunter', points = 15, bonus = 0.10 },
	{ name = 'Veteran Hunter', points = 35, bonus = 0.15 },
	{ name = 'Elite Hunter', points = 70, bonus = 0.20 },
	{ name = 'Master Hunter', points = 120, bonus = 0.25 },
	{ name = 'Legendary Hunter', points = 200, bonus = 0.30 },
}

-- The tasks.
--   id          never reuse or change: progress is stored by it
--   name        what players say and see ("start trolls")
--   monsters    every one of them counts
--   kills       how many
--   level       lowest level to start it
--   rank        lowest hunter rank to start it (1 = Novice)
--   points      rank points when finished
--   repeatable  can be done again after finishing (default: once)
--   reward      exp, gold and items ({ id, count }); exp and gold grow with rank
HuntingTasks.tasks = {
	{ id = 1, name = 'rotworms', monsters = { 'rotworm', 'carrion worm' }, kills = 100, level = 8, rank = 1, points = 2,
		repeatable = true, reward = { exp = 3000, gold = 300 } },
	{ id = 2, name = 'trolls', monsters = { 'troll', 'swamp troll', 'frost troll', 'island troll' }, kills = 100, level = 8, rank = 1, points = 3,
		reward = { exp = 4000, gold = 500, items = { { 3052, 1 } } } }, -- life ring
	{ id = 3, name = 'orcs', monsters = { 'orc', 'orc spearman', 'orc warrior', 'orc shaman', 'orc rider', 'orc berserker', 'orc leader', 'orc warlord' },
		kills = 150, level = 15, rank = 2, points = 5, reward = { exp = 15000, gold = 1500 } },
}
