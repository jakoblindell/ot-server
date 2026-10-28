-- Item prices for our client's hunt analyzer (ot-client#29), read from the
-- NPCs' trade lines once:
--   sell: the most an NPC pays for one (what loot is worth)
--   buy:  the least an NPC asks for one (what supplies cost)
-- by item id, or "id:fluid" for a vial with something in it
-- Coins count at their value.

local COINS = {[3031] = 1, [3035] = 100, [3043] = 10000}


local function readPrices()
	local sell, buy = {}, {}
	local list = io.popen('ls data/npc/*.npc 2>/dev/null')
	if not list then
		return sell, buy
	end
	for path in list:lines() do
		local file = io.open(path, 'r')
		if file then
			for line in file:lines() do
				-- (lines for an amount, %1, repeat the one-item price; a
				-- backpack of them, Price=11*20, is a price for several)
				if not line:find('%%1') and not line:find('Price=%d+%*') then
					local itemId = line:match('Type=(%d+)')
					-- a fluid's price depends on what is in the vial:
					-- "2874:10" (mana fluid)
					local data = line:match('Data=(%d+)')
					local amount = line:match('Amount=(%d+)')
					local price = line:match('Price=(%d+)')
					if itemId and amount and price then
						itemId = data and data ~= '0' and (itemId .. ':' .. data) or tonumber(itemId)
						amount, price = tonumber(amount), tonumber(price)
						local each = math.floor(price / math.max(1, amount))
						if line:match('^%s*"sell"') then
							if not sell[itemId] or each > sell[itemId] then
								sell[itemId] = each
							end
						elseif each > 0 and (not buy[itemId] or each < buy[itemId]) then
							buy[itemId] = each
						end
					end
				end
			end
			file:close()
		end
	end
	list:close()
	for itemId, value in pairs(COINS) do
		sell[itemId], buy[itemId] = value, value
	end
	return sell, buy
end

local function jsonString(text)
	return '"' .. text:gsub('\\', '\\\\'):gsub('"', '\\"') .. '"'
end

local MAX_ITEM_ID = 7000

-- Sent in parts (opcode 105), each a JSON object under the protocol's 8 KB
-- string limit: {"part":1,"items":[[id,"name","plural",sell,buy],...]}, the
-- last with "last":true and the fluids {"2874:10":[sell,buy]}. Every item that
-- can be moved, so loot messages (by name) and looted items (by id) can be
-- priced and named.
local CHUNK = 7000
local cachedParts

function itemPricesJson()
	if cachedParts then
		return cachedParts
	end
	local sell, buy = readPrices()
	local entries = {}
	for itemId = 100, MAX_ITEM_ID do
		local itemType = ItemType(itemId)
		if itemType and itemType:getId() == itemId and itemType:isMovable() then
			local name = itemType:getName()
			if name ~= '' then
				entries[#entries + 1] = string.format('[%d,%s,%s,%d,%d]', itemId, jsonString(name),
					jsonString(itemType:getPluralName()), sell[itemId] or 0, buy[itemId] or 0)
			end
		end
	end
	local fluids = {}
	for key, price in pairs(sell) do
		if type(key) == 'string' then
			fluids[#fluids + 1] = string.format('"%s":[%d,%d]', key, price, buy[key] or 0)
		end
	end
	for key, price in pairs(buy) do
		if type(key) == 'string' and not sell[key] then
			fluids[#fluids + 1] = string.format('"%s":[0,%d]', key, price)
		end
	end
	local parts, current, size = {}, {}, 0
	local function flush(last)
		local text = '{"part":' .. (#parts + 1) .. ',"items":[' .. table.concat(current, ',') .. ']'
		if last then
			text = text .. ',"last":true,"fluids":{' .. table.concat(fluids, ',') .. '}'
		end
		parts[#parts + 1] = text .. '}'
		current, size = {}, 0
	end
	for _, entry in ipairs(entries) do
		if size + #entry > CHUNK then
			flush(false)
		end
		current[#current + 1] = entry
		size = size + #entry + 1
	end
	flush(true)
	cachedParts = parts
	return parts
end
