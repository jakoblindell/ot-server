-- News: articles on the home page and short "ticker" lines. Written by staff
-- in the admin pages; body is plain text (blank lines separate paragraphs,
-- lines starting with "- " are list items).
CREATE TABLE IF NOT EXISTS site_news (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	kind ENUM('article', 'ticker') NOT NULL DEFAULT 'article',
	title VARCHAR(120) NOT NULL DEFAULT '',
	body TEXT NOT NULL,
	author VARCHAR(64) NOT NULL DEFAULT '',
	published_at DATETIME NULL,
	created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	KEY published (published_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO site_news (kind, title, body, author, published_at) VALUES
('article', 'The gates of Elderwood open',
'Elderwood is a classic Tibia 7.92 world. Everyone starts on Rookgaard: no shop, no shortcuts, just the world as it was.

Create your account ahead of time to reserve your character name, then press Play now. The game runs in your browser, on a computer or a phone.

- Play in the browser, or install it as an app
- One free premium day a day while we test
- Report bugs to a gamemaster', 'The Elderwood team', UTC_TIMESTAMP());

-- Players choose whether their characters list each other on the
-- character page
ALTER TABLE site_accounts ADD COLUMN show_characters TINYINT(1) NOT NULL DEFAULT 0;
