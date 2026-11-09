-- Bug reports sent from inside the game client (ot-server#48, ot-client#67)

-- One-time tokens the game server gives a player for one report (the game
-- server creates the same table at start; whichever runs first)
CREATE TABLE IF NOT EXISTS client_report_tokens (
	token CHAR(32) NOT NULL PRIMARY KEY,
	account_id INT NOT NULL,
	player_id INT NOT NULL,
	player_name VARCHAR(255) NOT NULL,
	created_at INT NOT NULL,
	KEY created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS client_reports (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	account_id INT NOT NULL,
	player_id INT NOT NULL,
	player_name VARCHAR(255) NOT NULL,
	text TEXT NOT NULL,
	-- device, client and UI details (JSON from the client)
	info MEDIUMTEXT NOT NULL,
	logs MEDIUMTEXT NOT NULL,
	screenshot MEDIUMBLOB NULL,
	ip VARCHAR(64) NOT NULL DEFAULT '',
	created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	status ENUM('open', 'closed') NOT NULL DEFAULT 'open',
	handled_by VARCHAR(64) NULL,
	handled_at DATETIME NULL,
	outcome VARCHAR(255) NOT NULL DEFAULT '',
	KEY status (status, id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
