/**
 * Tibia GIMUD Server - a free and open-source MMORPG server emulator
 * Copyright (C) 2019 Sabrehaven and Mark Samman <mark.samman@gmail.com>
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

#include "otpch.h"

#include "configmanager.h"
#include "databasemanager.h"
#include "luascript.h"

extern ConfigManager g_config;

bool DatabaseManager::optimizeTables()
{
	Database* db = Database::getInstance();
	std::ostringstream query;

	query << "SELECT `TABLE_NAME` FROM `information_schema`.`TABLES` WHERE `TABLE_SCHEMA` = " << db->escapeString(g_config.getString(ConfigManager::MYSQL_DB)) << " AND `DATA_FREE` > 0";
	DBResult_ptr result = db->storeQuery(query.str());
	if (!result) {
		return false;
	}

	do {
		std::string tableName = result->getString("TABLE_NAME");
		std::cout << "> Optimizing table " << tableName << "..." << std::flush;

		query.str(std::string());
		query << "OPTIMIZE TABLE `" << tableName << '`';

		if (db->executeQuery(query.str())) {
			std::cout << " [success]" << std::endl;
		} else {
			std::cout << " [failed]" << std::endl;
		}
	} while (result->next());
	return true;
}

bool DatabaseManager::tableExists(const std::string& tableName)
{
	Database* db = Database::getInstance();

	std::ostringstream query;
	query << "SELECT `TABLE_NAME` FROM `information_schema`.`tables` WHERE `TABLE_SCHEMA` = " << db->escapeString(g_config.getString(ConfigManager::MYSQL_DB)) << " AND `TABLE_NAME` = " << db->escapeString(tableName) << " LIMIT 1";
	return db->storeQuery(query.str()).get() != nullptr;
}

bool DatabaseManager::updateAccountColumns()
{
	Database* db = Database::getInstance();
	std::ostringstream query;
	query << "SELECT `DATA_TYPE` FROM `information_schema`.`columns` WHERE `TABLE_SCHEMA` = " << db->escapeString(g_config.getString(ConfigManager::MYSQL_DB))
	      << " AND `TABLE_NAME` = 'accounts' AND `COLUMN_NAME` = 'password' AND `CHARACTER_MAXIMUM_LENGTH` >= 255";
	if (db->storeQuery(query.str())) {
		return true;
	}

	std::cout << "> Updating the accounts table: account names and password hashes" << std::endl;
	return db->executeQuery("ALTER TABLE `accounts` MODIFY `name` VARCHAR(32) NOT NULL, MODIFY `password` VARCHAR(255) NOT NULL");
}

bool DatabaseManager::updatePowerGamerColumns()
{
	if (!tableExists("znote_players")) {
		return true;
	}

	Database* db = Database::getInstance();
	std::ostringstream query;
	query << "SELECT `COLUMN_NAME` FROM `information_schema`.`columns` WHERE `TABLE_SCHEMA` = " << db->escapeString(g_config.getString(ConfigManager::MYSQL_DB))
	      << " AND `TABLE_NAME` = 'znote_players' AND `COLUMN_NAME` = 'onlinetimeall'";
	if (db->storeQuery(query.str())) {
		return true;
	}

	std::cout << "> Updating the znote_players table: power gamers columns" << std::endl;
	std::ostringstream alter;
	alter << "ALTER TABLE `znote_players` ADD COLUMN IF NOT EXISTS `exphist_lastexp` BIGINT NOT NULL DEFAULT 0";
	for (int day = 1; day <= 7; ++day) {
		alter << ", ADD COLUMN IF NOT EXISTS `exphist" << day << "` BIGINT NOT NULL DEFAULT 0";
	}
	alter << ", ADD COLUMN IF NOT EXISTS `onlinetimetoday` INT UNSIGNED NOT NULL DEFAULT 0";
	for (int day = 1; day <= 7; ++day) {
		alter << ", ADD COLUMN IF NOT EXISTS `onlinetime" << day << "` INT UNSIGNED NOT NULL DEFAULT 0";
	}
	alter << ", ADD COLUMN IF NOT EXISTS `onlinetimeall` INT UNSIGNED NOT NULL DEFAULT 0";
	return db->executeQuery(alter.str());
}

bool DatabaseManager::isDatabaseSetup()
{
	Database* db = Database::getInstance();
	std::ostringstream query;
	query << "SELECT `TABLE_NAME` FROM `information_schema`.`tables` WHERE `TABLE_SCHEMA` = " << db->escapeString(g_config.getString(ConfigManager::MYSQL_DB));
	return db->storeQuery(query.str()).get() != nullptr;
}

int32_t DatabaseManager::getDatabaseVersion()
{
	if (!tableExists("server_config")) {
		Database* db = Database::getInstance();
		db->executeQuery("CREATE TABLE `server_config` (`config` VARCHAR(50) NOT NULL, `value` VARCHAR(256) NOT NULL DEFAULT '', UNIQUE(`config`)) ENGINE = InnoDB");
		db->executeQuery("INSERT INTO `server_config` VALUES ('db_version', 0)");
		return 0;
	}

	int32_t version = 0;
	if (getDatabaseConfig("db_version", version)) {
		return version;
	}
	return -1;
}

bool DatabaseManager::getDatabaseConfig(const std::string& config, int32_t& value)
{
	Database* db = Database::getInstance();
	std::ostringstream query;
	query << "SELECT `value` FROM `server_config` WHERE `config` = " << db->escapeString(config);

	DBResult_ptr result = db->storeQuery(query.str());
	if (!result) {
		return false;
	}

	value = result->getNumber<int32_t>("value");
	return true;
}

void DatabaseManager::registerDatabaseConfig(const std::string& config, int32_t value)
{
	Database* db = Database::getInstance();
	std::ostringstream query;

	int32_t tmp;

	if (!getDatabaseConfig(config, tmp)) {
		query << "INSERT INTO `server_config` VALUES (" << db->escapeString(config) << ", '" << value << "')";
	} else {
		query << "UPDATE `server_config` SET `value` = '" << value << "' WHERE `config` = " << db->escapeString(config);
	}

	db->executeQuery(query.str());
}
