-- Daily hunts (ot-server#21): our client asks for the Tasks page (opcode 106)
function onExtendedOpcode(player, opcode, buffer)
	if opcode == DailyHunts.OPCODE then
		-- "journal": the Journal's Quests and Chests (long lists, sent when asked)
		if buffer == 'journal' and Journal then
			Journal.send(player)
		else
			DailyHunts.sendStatus(player)
		end
	end
	return true
end
