-- NPC answers written in Lua. A behaviour line in an .npc file such as
--   "task" -> Script("dailyhunt.task")
-- calls NpcScripts.dailyhunt(npc, player, "task", message). The answer (a
-- line, a list of lines or nil) is said like a "..." answer, %N included.
NpcScripts = NpcScripts or {}

function onNpcScript(npc, player, name, message)
	local module, action = name:match('^([^.]+)%.?(.*)$')
	local handler = module and NpcScripts[module]
	if not handler then
		print('[Warning - onNpcScript] No NPC script "' .. name .. '"')
		return nil
	end
	return handler(npc, player, action, message)
end
