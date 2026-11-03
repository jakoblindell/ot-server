-- !dailyhunt: your daily hunt, its progress and your streak (ot-server#21)
function onSay(player, words, param)
	player:sendTextMessage(MESSAGE_INFO_DESCR, DailyHunts.statusText(player))
	DailyHunts.sendStatus(player)
	return false
end
