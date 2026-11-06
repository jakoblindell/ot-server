-- Client bug reports (ot-server#48, ot-client#67).
--
-- A player sends a report from inside the client: text, device details, UI
-- state, a screenshot and recent log lines. The report goes to the website
-- (POST /api/client-report), not through the game connection (it is large).
-- So the website knows who sent it, the client first asks the game server
-- for a one-time token (extended opcode 106, "reportToken"):
--   client_report_tokens   token, account, character, time
-- The website accepts a token once, within TOKEN_LIFETIME.

ClientReports = ClientReports or {}

local TOKEN_LIFETIME = 10 * 60
-- one token per character per minute
local MIN_INTERVAL = 60
local lastIssued = {}

-- (the website's migration creates the same table; whichever starts first)
db.query([[CREATE TABLE IF NOT EXISTS `client_report_tokens` (
	`token` CHAR(32) NOT NULL PRIMARY KEY,
	`account_id` INT NOT NULL,
	`player_id` INT NOT NULL,
	`player_name` VARCHAR(255) NOT NULL,
	`created_at` INT NOT NULL,
	KEY `created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4]])

ClientReports.TOKEN_LIFETIME = TOKEN_LIFETIME

-- 128 random bits as hex, from the system's random source
local function randomToken()
	local file = io.open('/dev/urandom', 'rb')
	if not file then
		return nil
	end
	local bytes = file:read(16)
	file:close()
	if not bytes or #bytes ~= 16 then
		return nil
	end
	return (bytes:gsub('.', function(c) return string.format('%02x', c:byte()) end))
end

local function send(player, payload)
	player:sendExtendedOpcode(DailyHunts.OPCODE, json.encode({ reportToken = payload }))
end

-- The client asked for a token: {"reportToken":{"token":"...","url":"..."}},
-- or {"reportToken":{"error":"..."}}
function ClientReports.issue(player)
	local now = os.time()
	local guid = player:getGuid()
	if lastIssued[guid] and now - lastIssued[guid] < MIN_INTERVAL then
		send(player, { error = 'Please wait a minute before sending another report.' })
		return
	end
	local token = randomToken()
	if not token then
		send(player, { error = 'Reports cannot be sent right now.' })
		return
	end
	lastIssued[guid] = now
	db.asyncQuery('DELETE FROM `client_report_tokens` WHERE `created_at` < ' .. (now - TOKEN_LIFETIME))
	db.query(string.format(
		'INSERT INTO `client_report_tokens` (`token`, `account_id`, `player_id`, `player_name`, `created_at`) VALUES (%s, %d, %d, %s, %d)',
		db.escapeString(token), player:getAccountId(), guid, db.escapeString(player:getName()), now))
	-- the website's address (config.lua url); empty: the client's own site
	local url = configManager.getString(configKeys.URL) or ''
	if url ~= '' then
		url = url:gsub('/+$', '') .. '/api/client-report'
	end
	send(player, { token = token, url = url })
end
