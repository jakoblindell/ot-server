-- Core API functions implemented in Lua
dofile('data/lib/core/core.lua')

-- Compatibility library for our old Lua API
dofile('data/lib/compat/compat.lua')

-- Daily hunts and hunting tasks (ot-server#21)
dofile('data/lib/tasks/daily_hunts.lua')
dofile('data/lib/tasks/hunting_tasks.lua')

-- Achievements (ot-server#30)
dofile('data/lib/achievements/achievements.lua')

-- The Journal's Quests and Chests (ot-server#44)
dofile('data/lib/journal/journal.lua')

-- The hub's character sheet: blessings, frags, skull time (ot-server#50)
dofile('data/lib/character/character.lua')

-- Moments: tells our client when to take a screenshot (ot-server#52)
dofile('data/lib/moments/moments.lua')
