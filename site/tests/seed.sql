-- Test data for the layout checks (tests/layout.spec.ts): run after the
-- schemas (sabrehaven.sql, deploy/db/*.sql) and the site's migrations, on a
-- throwaway database. Long names on purpose, to catch layouts that only fit
-- short ones.
--
-- Two logged-in sessions, by cookie (ew_session):
--   "layout-test-player" -> account layoutplayer (a player)
--   "layout-test-god"    -> account layoutgod (a god with two-step login)

SET @now = UNIX_TIMESTAMP();

INSERT INTO accounts (id, name, password, type, premdays, email, creation) VALUES
	(9001, 'layoutplayer', SHA1('layout'), 1, 30, 'a.rather.long.email.address@example.com', @now - 86400 * 40),
	(9002, 'layoutgod', SHA1('layout'), 5, 0, 'god@example.com', @now - 86400 * 400),
	(9003, 'layoutothers', SHA1('layout'), 1, 0, '', @now - 86400 * 10);

INSERT INTO site_accounts (account_id, show_characters, totp_secret, totp_enabled_at, email_verified_at) VALUES
	(9001, 1, NULL, NULL, UTC_TIMESTAMP()),
	(9002, 0, 'JBSWY3DPEHPK3PXPJBSWY3DPEHPK3PXP', UTC_TIMESTAMP(), UTC_TIMESTAMP());

INSERT INTO site_sessions (id, account_id, expires_at) VALUES
	(SHA2('layout-test-player', 256), 9001, UTC_TIMESTAMP() + INTERVAL 1 DAY),
	(SHA2('layout-test-god', 256), 9002, UTC_TIMESTAMP() + INTERVAL 1 DAY);

INSERT INTO site_login_history (account_id, ip, user_agent, success) VALUES
	(9001, '203.0.113.17', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1', 1),
	(9001, '2001:db8:85a3:0000:0000:8a2e:0370:7334', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36', 0);

-- Characters: every vocation, skills that differ per character
INSERT INTO players (id, name, group_id, account_id, level, vocation, health, healthmax, experience,
	looktype, lookhead, lookbody, looklegs, lookfeet, maglevel, mana, manamax, town_id, posx, posy, posz,
	cap, sex, conditions, lastlogin, lastlogout,
	skill_fist, skill_club, skill_sword, skill_axe, skill_dist, skill_shielding, skill_fishing) VALUES
	(9101, 'Sir Bartholomew Longname', 1, 9001, 187, 8, 2000, 2000, 1080000000, 131, 78, 69, 58, 76, 11, 900, 900, 1, 32369, 32241, 7, 3000, 1, '', @now - 3600, @now - 1800, 12, 30, 102, 95, 40, 98, 20),
	(9102, 'Elara Moonwhisper', 1, 9001, 132, 5, 900, 900, 380000000, 138, 95, 94, 86, 115, 88, 3500, 3500, 1, 32369, 32241, 7, 1500, 0, '', @now - 7200, @now - 7000, 10, 12, 14, 10, 20, 30, 15),
	(9103, 'Quickshot Hawkeye', 1, 9003, 104, 7, 1100, 1100, 180000000, 137, 0, 0, 0, 0, 22, 1300, 1300, 2, 32369, 32241, 7, 2000, 0, '', @now - 100, 0, 15, 12, 18, 15, 99, 85, 30),
	(9104, 'Druidess Fernleaf', 1, 9003, 98, 2, 600, 600, 150000000, 148, 0, 0, 0, 0, 70, 2800, 2800, 2, 32369, 32241, 7, 1200, 0, '', @now - 50000, @now - 40000, 10, 11, 10, 10, 15, 25, 60),
	(9105, 'Grumbold Axebeard', 1, 9003, 85, 4, 1000, 1000, 95000000, 131, 0, 0, 0, 0, 6, 400, 400, 1, 32369, 32241, 7, 2200, 1, '', @now - 90000, @now - 80000, 20, 40, 30, 92, 25, 88, 10),
	(9106, 'Tiny Tim', 1, 9003, 8, 0, 185, 185, 4200, 128, 0, 0, 0, 0, 0, 35, 35, 1, 32369, 32241, 7, 470, 1, '', 0, 0, 14, 12, 13, 12, 11, 15, 10),
	(9107, 'Archmage Vel', 1, 9003, 61, 1, 400, 400, 36000000, 130, 0, 0, 0, 0, 55, 1700, 1700, 1, 32369, 32241, 7, 900, 1, '', @now - 4000, @now - 3000, 10, 10, 10, 10, 10, 20, 10),
	(9108, 'Paladin Sarah', 1, 9003, 40, 3, 400, 400, 9000000, 137, 0, 0, 0, 0, 14, 500, 500, 1, 32369, 32241, 7, 900, 0, '', @now - 4000, @now - 3000, 10, 10, 10, 10, 70, 60, 10),
	(9109, 'Gamemaster Layout', 3, 9002, 8, 0, 185, 185, 4200, 75, 0, 0, 0, 0, 0, 35, 35, 1, 32369, 32241, 7, 470, 1, '', 0, 0, 10, 10, 10, 10, 10, 10, 10);

INSERT INTO znote_players (player_id, created, hide_char, comment) VALUES
	(9101, @now - 86400 * 40, 0, 'Knight of the old order. Looking for a guild that hunts on weekends; send a letter to the depot in Thais.'),
	(9102, @now - 86400 * 30, 0, ''), (9103, @now, 0, ''), (9104, @now, 0, ''), (9105, @now, 0, ''),
	(9106, @now, 0, ''), (9107, @now, 0, ''), (9108, @now, 0, ''), (9109, @now, 0, '');

INSERT INTO players_online (player_id) VALUES (9101), (9103), (9107);

INSERT INTO player_deaths (player_id, time, level, killed_by, is_player, mostdamage_by, mostdamage_is_player, unjustified, mostdamage_unjustified) VALUES
	(9101, @now - 3600, 186, 'a dragon lord', 0, 'Quickshot Hawkeye', 1, 0, 1),
	(9102, @now - 7200, 131, 'Grumbold Axebeard', 1, 'a giant spider', 0, 1, 0),
	(9105, @now - 9000, 84, 'a demon skeleton', 0, 'a demon skeleton', 0, 0, 0),
	(9106, @now - 9900, 7, 'a rat', 0, 'a rat', 0, 0, 0);

-- A guild with ranks, members and an invite
INSERT INTO guilds (id, name, ownerid, creationdata, motd) VALUES
	(9201, 'Knights of the Eternal Twilight', 9101, @now - 86400 * 20, 'Hunt on Saturday at the Thais depot.'),
	(9202, 'Rats', 9105, @now - 86400 * 2, '');
INSERT INTO guild_ranks (id, guild_id, name, level) VALUES
	(9301, 9201, 'Grand Commander', 3), (9302, 9201, 'Vice Leader', 2), (9303, 9201, 'Member', 1),
	(9304, 9202, 'Leader', 3), (9305, 9202, 'Vice', 2), (9306, 9202, 'Member', 1);
INSERT INTO guild_membership (player_id, guild_id, rank_id, nick) VALUES
	(9101, 9201, 9301, 'The Unbreakable'), (9102, 9201, 9302, ''), (9104, 9201, 9303, 'Leafy'),
	(9105, 9202, 9304, '');
INSERT INTO guild_invites (player_id, guild_id) VALUES (9103, 9201);
INSERT INTO site_guilds (guild_id, description) VALUES
	(9201, 'We are a friendly guild of adventurers from all over the world. Everyone above level 50 is welcome; ask any vice leader for an invite.');

-- Houses: one rented, one in auction
UPDATE houses SET owner = 9101, paid = @now + 86400 * 20 WHERE id = 1;
UPDATE houses SET bid = 50000, bid_end = @now + 86400 * 3, highest_bidder = 9102 WHERE id = 2;

-- News: an article with comments, a ticker
INSERT INTO site_news (id, kind, title, body, author, published_at) VALUES
	(9401, 'article', 'Patch notes: rotworms behave, the post office opens, and a much longer headline',
	'Rotworms no longer walk through walls.\n\n- The post office in Thais is open\n- Letters cost 8 gold\n\nSee https://example.com/a/very/long/link/that/should/wrap/instead/of/overflowing/the/page for details.',
	'Gamemaster Layout', UTC_TIMESTAMP()),
	(9402, 'ticker', '', 'Server save at 08:00 every morning.', 'Gamemaster Layout', UTC_TIMESTAMP());
INSERT INTO site_news_comments (news_id, player_id, account_id, text) VALUES
	(9401, 9101, 9001, 'Finally! Thanks for the fix.'),
	(9401, 9102, 9001, 'Averyveryveryverylongwordwithoutanyspacesthatshouldstillwrapinsidethecommentbox.');

-- Moderation: bans, a namelock, notes, reports, an audit trail
INSERT INTO account_bans (account_id, reason, banned_at, expires_at, banned_by) VALUES
	(9003, 'Insulting other players repeatedly in the trade channel', @now - 3600, @now + 86400 * 7, 9109);
INSERT INTO player_namelocks (player_id, reason, namelocked_at, namelocked_by) VALUES (9108, 'Offensive name', @now - 600, 9109);
INSERT INTO ip_bans (ip, reason, banned_at, expires_at, banned_by) VALUES (3405803793, 'Spam', @now - 600, @now + 86400, 9109);
INSERT INTO site_notes (account_id, player_name, text, created_by) VALUES
	(9003, 'Grumbold Axebeard', 'Warned about language on the trade channel.', 'layoutgod');
INSERT INTO site_reports (kind, target_player, reason, text, reporter_account_id, reporter) VALUES
	('character', 'Grumbold Axebeard', 'name', 'The name is fine, but the comment on the character page is not.', 9001, 'Sir Bartholomew Longname');
INSERT INTO site_audit_log (account_id, actor, action, target_account_id, target_player, details, ip) VALUES
	(9002, 'layoutgod', 'ban', 9003, 'Grumbold Axebeard', '7 days: Insulting other players repeatedly in the trade channel', '203.0.113.5'),
	(9002, 'layoutgod', 'news.publish', NULL, NULL, 'Patch notes: rotworms behave, the post office opens, and a much longer headline', '203.0.113.5');
INSERT INTO site_admin_commands (command, target, text, status, result, created_by, done_at) VALUES
	('broadcast', '', 'Server save in 5 minutes.', 'done', 'sent', 'layoutgod', UTC_TIMESTAMP());
INSERT INTO client_reports (id, account_id, player_id, player_name, text, info, logs, ip) VALUES
	(9501, 9001, 9101, 'Sir Bartholomew Longname', 'The battle list overlaps the minimap when I rotate my phone to landscape.',
	'{"device":"iPhone","screen":"393x852","client":"web-792","userAgent":"Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1"}',
	'[12:00:01] info: connected\n[12:00:02] warning: a/very/long/log/line/without/spaces/that/could/push/the/page/wider/than/the/screen/if/it/is/not/wrapped/or/scrolled', '203.0.113.17');

-- Players online over the last day, for the admin dashboard
INSERT INTO site_online_samples (sampled_at, players)
	SELECT UTC_TIMESTAMP() - INTERVAL seq HOUR, (seq * 7) % 23 FROM (
		SELECT 1 AS seq UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6
		UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12) hours;
