-- !achievements: how many are unlocked and the points (ot-server#30)
function onSay(player, words, param)
	player:sendTextMessage(MESSAGE_INFO_DESCR, Achievements.statusText(player))
	DailyHunts.sendStatus(player)
	return false
end
