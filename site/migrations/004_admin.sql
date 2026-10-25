-- Two-step login (TOTP): the secret, when it was turned on, and the last
-- time step used (a code works only once)
ALTER TABLE site_accounts
	ADD COLUMN totp_secret VARCHAR(64) NULL,
	ADD COLUMN totp_enabled_at DATETIME NULL,
	ADD COLUMN totp_last_step BIGINT NOT NULL DEFAULT 0;

-- A login waiting for its two-step code
ALTER TABLE site_sessions ADD COLUMN pending TINYINT(1) NOT NULL DEFAULT 0;

-- Every staff action, with who did it and to what
CREATE TABLE IF NOT EXISTS site_audit_log (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	account_id INT NULL,
	actor VARCHAR(64) NOT NULL,
	action VARCHAR(64) NOT NULL,
	target_account_id INT NULL,
	target_player VARCHAR(255) NULL,
	details TEXT NOT NULL,
	ip VARCHAR(45) NOT NULL DEFAULT '',
	KEY created (created_at),
	KEY target_account (target_account_id),
	KEY target_player (target_player)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Commands for the game server, run by data/globalevents/scripts/admin_commands.lua
-- (it checks every second)
CREATE TABLE IF NOT EXISTS site_admin_commands (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	command VARCHAR(32) NOT NULL,
	target VARCHAR(255) NOT NULL DEFAULT '',
	text TEXT NOT NULL,
	number INT NOT NULL DEFAULT 0,
	status ENUM('pending', 'done', 'failed') NOT NULL DEFAULT 'pending',
	result VARCHAR(255) NOT NULL DEFAULT '',
	created_by VARCHAR(64) NOT NULL DEFAULT '',
	created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	done_at DATETIME NULL,
	KEY status (status, id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Staff notes on accounts and characters (notations)
CREATE TABLE IF NOT EXISTS site_notes (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	account_id INT NOT NULL,
	player_name VARCHAR(255) NOT NULL DEFAULT '',
	text TEXT NOT NULL,
	created_by VARCHAR(64) NOT NULL,
	created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	KEY account (account_id),
	CONSTRAINT site_notes_account FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Players online over time, for the dashboard chart (every 5 minutes)
CREATE TABLE IF NOT EXISTS site_online_samples (
	sampled_at DATETIME NOT NULL PRIMARY KEY,
	players INT NOT NULL
) ENGINE=InnoDB;
