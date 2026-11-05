-- !tasks: your daily hunt, your hunting task and your hunter rank (ot-server#21, #29)
function onSay(player, words, param)
	player:sendTextMessage(MESSAGE_INFO_DESCR, DailyHunts.statusText(player) .. '\n' .. HuntingTasks.statusText(player))
	DailyHunts.sendStatus(player)
	return false
end
