-- Columns used by data/globalevents/scripts/powergamers.lua (Znote AAC's
-- power gamers page): experience gained and time online per day for the
-- last week. Not part of Znote's base schema.
ALTER TABLE `znote_players`
  ADD COLUMN `exphist_lastexp` BIGINT NOT NULL DEFAULT 0,
  ADD COLUMN `exphist1` BIGINT NOT NULL DEFAULT 0,
  ADD COLUMN `exphist2` BIGINT NOT NULL DEFAULT 0,
  ADD COLUMN `exphist3` BIGINT NOT NULL DEFAULT 0,
  ADD COLUMN `exphist4` BIGINT NOT NULL DEFAULT 0,
  ADD COLUMN `exphist5` BIGINT NOT NULL DEFAULT 0,
  ADD COLUMN `exphist6` BIGINT NOT NULL DEFAULT 0,
  ADD COLUMN `exphist7` BIGINT NOT NULL DEFAULT 0,
  ADD COLUMN `onlinetimetoday` INT UNSIGNED NOT NULL DEFAULT 0,
  ADD COLUMN `onlinetime1` INT UNSIGNED NOT NULL DEFAULT 0,
  ADD COLUMN `onlinetime2` INT UNSIGNED NOT NULL DEFAULT 0,
  ADD COLUMN `onlinetime3` INT UNSIGNED NOT NULL DEFAULT 0,
  ADD COLUMN `onlinetime4` INT UNSIGNED NOT NULL DEFAULT 0,
  ADD COLUMN `onlinetime5` INT UNSIGNED NOT NULL DEFAULT 0,
  ADD COLUMN `onlinetime6` INT UNSIGNED NOT NULL DEFAULT 0,
  ADD COLUMN `onlinetime7` INT UNSIGNED NOT NULL DEFAULT 0,
  ADD COLUMN `onlinetimeall` INT UNSIGNED NOT NULL DEFAULT 0;
