-- Core API functions implemented in Lua
dofile('data/lib/core/core.lua')

-- Compatibility library for our old Lua API
dofile('data/lib/compat/compat.lua')

-- Daily hunts and hunting tasks (ot-server#21)
dofile('data/lib/tasks/daily_hunts.lua')
dofile('data/lib/tasks/hunting_tasks.lua')

-- Achievements (ot-server#30)
dofile('data/lib/achievements/achievements.lua')
