-- Daily hunts (ot-server#21): our client asks for the Tasks page (opcode 106)
function onExtendedOpcode(player, opcode, buffer)
	if opcode == DailyHunts.OPCODE then
		DailyHunts.sendStatus(player)
	end
	return true
end
