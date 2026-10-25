-- Container configuration: the repository's config.lua (copied to
-- config.base.lua) with deployment settings taken from the environment.
dofile("config.base.lua")

local function env(name, default)
	local value = os.getenv(name)
	if value == nil or value == "" then
		return default
	end
	return value
end

-- Address handed to desktop clients in the character list. Browser clients
-- ignore it and reuse the hostname they logged in with.
ip = env("PUBLIC_IP", "127.0.0.1")
bindOnlyGlobalAddress = false

-- Only the reverse proxy can reach the game ports inside the compose network,
-- so the client address it forwards can be trusted.
trustForwardedFor = true

-- Packets a connection may send per second (averaged over a few seconds)
-- before it is disconnected. Normal play, even fast hotkey use, stays far
-- below 25; a modified client flooding the server does not.
maxPacketsPerSecond = tonumber(env("MAX_PACKETS_PER_SECOND", "25"))

serverName = env("SERVER_NAME", serverName)
motd = env("MOTD", motd)

mysqlHost = env("DB_HOST", "db")
mysqlPort = tonumber(env("DB_PORT", "3306"))
mysqlUser = env("DB_USER", "sabrehaven")
mysqlPass = env("DB_PASSWORD", "")
mysqlDatabase = env("DB_NAME", "sabrehaven")
