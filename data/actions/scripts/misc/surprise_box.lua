-- Daily hunt presents (ot-server#21): open into gold, sometimes an item
function onUse(player, item, fromPosition, target, toPosition)
	return DailyHunts.openBox(player, item, item:getActionId() - DailyHunts.boxActionBase)
end
