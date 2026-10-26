-- Guild pages: a longer description than the game's motd
CREATE TABLE IF NOT EXISTS site_guilds (
	guild_id INT NOT NULL PRIMARY KEY,
	description TEXT NOT NULL,
	CONSTRAINT site_guilds_guild FOREIGN KEY (guild_id) REFERENCES guilds (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Comments on news articles, written as one of the account's characters
CREATE TABLE IF NOT EXISTS site_news_comments (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	news_id INT NOT NULL,
	player_id INT NOT NULL,
	account_id INT NOT NULL,
	text TEXT NOT NULL,
	created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	hidden_by VARCHAR(64) NULL,
	KEY news (news_id, id),
	CONSTRAINT site_news_comments_news FOREIGN KEY (news_id) REFERENCES site_news (id) ON DELETE CASCADE,
	CONSTRAINT site_news_comments_player FOREIGN KEY (player_id) REFERENCES players (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Reports from players: a character (name, behaviour) or a comment
CREATE TABLE IF NOT EXISTS site_reports (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	kind ENUM('character', 'comment') NOT NULL,
	target_player VARCHAR(255) NOT NULL DEFAULT '',
	comment_id INT NULL,
	reason VARCHAR(64) NOT NULL,
	text TEXT NOT NULL,
	reporter_account_id INT NULL,
	reporter VARCHAR(255) NOT NULL DEFAULT '',
	created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	status ENUM('open', 'closed') NOT NULL DEFAULT 'open',
	handled_by VARCHAR(64) NULL,
	handled_at DATETIME NULL,
	outcome VARCHAR(255) NOT NULL DEFAULT '',
	KEY status (status, id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Links sent by email: confirm the address, reset the password
CREATE TABLE IF NOT EXISTS site_email_tokens (
	id CHAR(64) NOT NULL PRIMARY KEY,
	account_id INT NOT NULL,
	kind ENUM('verify', 'reset') NOT NULL,
	email VARCHAR(255) NOT NULL,
	expires_at DATETIME NOT NULL,
	CONSTRAINT site_email_tokens_account FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE site_accounts ADD COLUMN email_verified_at DATETIME NULL;
