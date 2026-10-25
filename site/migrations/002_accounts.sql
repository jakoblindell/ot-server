-- Website data per account: recovery key (SHA-256 of it) and when the free
-- premium day was last taken
CREATE TABLE IF NOT EXISTS site_accounts (
	account_id INT NOT NULL PRIMARY KEY,
	recovery_key_hash CHAR(64) NULL,
	recovery_key_created DATETIME NULL,
	free_premium_at DATETIME NULL,
	CONSTRAINT site_accounts_account FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
