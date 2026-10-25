-- Tables the website owns. The game server's own tables (accounts, players,
-- ...) come from sabrehaven.sql; the server widens accounts.name and
-- accounts.password itself on startup, and so does this file, in case the
-- site starts first.
ALTER TABLE accounts MODIFY name VARCHAR(32) NOT NULL, MODIFY password VARCHAR(255) NOT NULL;

CREATE TABLE IF NOT EXISTS site_sessions (
	id CHAR(64) NOT NULL PRIMARY KEY,
	account_id INT NOT NULL,
	created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	expires_at DATETIME NOT NULL,
	ip VARCHAR(45) NOT NULL DEFAULT '',
	user_agent VARCHAR(255) NOT NULL DEFAULT '',
	KEY account_id (account_id),
	CONSTRAINT site_sessions_account FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS site_login_history (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	account_id INT NOT NULL,
	created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	ip VARCHAR(45) NOT NULL DEFAULT '',
	user_agent VARCHAR(255) NOT NULL DEFAULT '',
	success TINYINT(1) NOT NULL,
	KEY account_time (account_id, created_at),
	CONSTRAINT site_login_history_account FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS site_settings (
	name VARCHAR(64) NOT NULL PRIMARY KEY,
	value TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
