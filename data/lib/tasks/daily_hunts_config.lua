-- Daily hunts (ot-server#21): the settings and the list of hunts.
--
-- Chances and numbers here are server-only. Players (and the website guide)
-- only see words: "Beginner", "a better present", never percentages.

DailyHunts = DailyHunts or {}

DailyHunts.config = {
	minLevel = 8, -- no daily hunts below this level

	-- A new hunt: a new game day (server save to server save) AND this long
	-- after the last hand-in, cancel or failure
	cooldown = 8 * 60 * 60,
	-- A hunt that is picked up must be handed in within this time, or it
	-- fails and the streak ends
	expiry = 16 * 60 * 60,
	-- The game day starts here when the server save time cannot be read
	-- from data/globalevents/globalevents.xml ("Server Save" + 5 minutes of
	-- warnings)
	dayStart = { hour = 8, min = 0 },

	-- Experience: this share of what the hunt's monsters give (at the
	-- player's experience stage), times the streak
	expShare = 0.5,
	streak = { 1, 1.5, 2, 2.75, 3.5, 4.25, 5 }, -- day 1..7 (7+ stays at 5)

	-- How the present is chosen: each better box gets more likely with
	-- luck = difficulty + level + streak (see DailyHunts.rollBox)
	luck = { difficulty = 0.12, perHundredLevels = 0.15, maxLevel = 200, streakDay = 0.08 },
	luckSteepness = 0.5,

	-- Hunts that many online players have right now are less likely, so one
	-- spawn is not crowded
	crowdPenalty = 1,

	-- Kill counts follow the map: a hunt is left out when its monsters have
	-- fewer spawns than minSpawns in data/world792/spawns.xml, and asks for
	-- at most killsPerSpawn kills per spawn (respawns included)
	minSpawns = 8,
	killsPerSpawn = 2,
	-- The count also follows the player's level: kills[1] at the hunt's
	-- lowest level, rising to kills[2] at `full` (default: its highest
	-- level, or 100 levels above the lowest for open-ended hunts), then a
	-- random +-variance on top
	openEndedSpan = 100,
	variance = 0.15,
}

-- Level groups: names for the guide and the NPC, nothing else
DailyHunts.groups = {
	{ name = 'Beginner', from = 8 },
	{ name = 'Intermediate', from = 20 },
	{ name = 'Advanced', from = 50 },
	{ name = 'Elite', from = 100 },
}

-- The present boxes. `weight` is the base chance before luck; `gold` the
-- average gold; `itemChance` how often there is an item too (0-100) and
-- `items` what it can be ({id, count, weight}).
-- Until boxes have their own sprites they are the present (3218) with a name.
DailyHunts.presentItem = 3218
DailyHunts.boxActionBase = 47100 -- box n has action id base + n
DailyHunts.boxes = {
	{ name = 'brown surprise box', weight = 6000, gold = 500, itemChance = 5, items = {
		{ 3026, 1, 10 }, { 3029, 1, 10 }, { 3033, 1, 10 }, { 3032, 1, 10 }, { 3030, 1, 10 }, { 3054, 1, 5 } } },
	{ name = 'orange surprise box', weight = 1500, gold = 650, itemChance = 10, items = {
		{ 3026, 2, 10 }, { 3028, 1, 10 }, { 3027, 1, 10 }, { 3082, 1, 5 }, { 3083, 1, 5 }, { 3097, 1, 5 } } },
	{ name = 'yellow surprise box', weight = 1200, gold = 750, itemChance = 15, items = {
		{ 3028, 2, 10 }, { 3027, 2, 10 }, { 3034, 1, 5 }, { 3098, 1, 5 }, { 3052, 1, 5 }, { 3049, 1, 5 } } },
	{ name = 'green surprise box', weight = 600, gold = 950, itemChance = 25, items = {
		{ 3034, 1, 10 }, { 3053, 1, 10 }, { 3048, 1, 10 }, { 3084, 1, 10 }, { 3081, 1, 10 }, { 3055, 1, 5 } } },
	{ name = 'blue surprise box', weight = 400, gold = 1250, itemChance = 40, items = {
		{ 3055, 1, 10 }, { 3416, 1, 10 }, { 3370, 1, 10 }, { 3369, 1, 10 }, { 3271, 1, 10 }, { 3373, 1, 5 } } },
	{ name = 'pink surprise box', weight = 60, gold = 3000, itemChance = 70, items = {
		{ 3381, 1, 10 }, { 3419, 1, 10 }, { 3380, 1, 10 }, { 3280, 1, 10 }, { 3281, 1, 10 }, { 3079, 1, 5 } } },
	{ name = 'purple surprise box', weight = 4, gold = 25000, itemChance = 100, items = {
		{ 3360, 1, 35 }, { 3392, 1, 35 }, { 3079, 1, 30 } } },
}

-- The hunts. Each has its own level window and a kill range: kills[1] for
-- a player at the lowest level, rising with level (see config above), and
-- never more than the map's spawns allow. difficulty 1-5: better presents.
-- `monsters`: every one of them counts ("Hunt orcs": any orc).
DailyHunts.hunts = {
	-- Beginner
	{ id = 1, name = 'rotworms', monsters = { 'rotworm', 'carrion worm' }, level = { 8, 20 }, kills = { 40, 80 }, difficulty = 1 },
	{ id = 2, name = 'wolves', monsters = { 'wolf' }, level = { 8, 14 }, kills = { 40, 60 }, difficulty = 1 },
	{ id = 3, name = 'trolls', monsters = { 'troll', 'swamp troll', 'frost troll', 'island troll' }, level = { 8, 18 }, kills = { 40, 80 }, difficulty = 1 },
	{ id = 4, name = 'poison spiders and scorpions', monsters = { 'poison spider', 'scorpion' }, level = { 8, 22 }, kills = { 40, 80 }, difficulty = 1 },
	{ id = 5, name = 'orcs', monsters = { 'orc', 'orc spearman', 'orc warrior', 'orc shaman', 'orc rider', 'orc berserker', 'orc leader', 'orc warlord' }, level = { 8, 30 }, kills = { 40, 100 }, difficulty = 2 },
	{ id = 6, name = 'skeletons and ghouls', monsters = { 'skeleton', 'ghoul' }, level = { 10, 25 }, kills = { 40, 80 }, difficulty = 2 },
	{ id = 7, name = 'dwarves', monsters = { 'dwarf', 'dwarf soldier', 'dwarf guard', 'dwarf geomancer' }, level = { 12, 30 }, kills = { 40, 90 }, difficulty = 2 },
	{ id = 8, name = 'amazons and valkyries', monsters = { 'amazon', 'valkyrie' }, level = { 12, 30 }, kills = { 30, 60 }, difficulty = 2 },
	{ id = 9, name = 'minotaurs', monsters = { 'minotaur', 'minotaur archer', 'minotaur guard', 'minotaur mage' }, level = { 14, 35 }, kills = { 40, 100 }, difficulty = 2 },
	{ id = 10, name = 'elves', monsters = { 'elf', 'elf scout', 'elf arcanist' }, level = { 14, 35 }, kills = { 30, 70 }, difficulty = 2 },
	{ id = 11, name = 'crocodiles', monsters = { 'crocodile' }, level = { 15, 35 }, kills = { 30, 60 }, difficulty = 2 },
	{ id = 25, name = 'dworcs', monsters = { 'dworc fleshhunter', 'dworc venomsniper', 'dworc voodoomaster' }, level = { 15, 35 }, kills = { 40, 90 }, difficulty = 2 },
	-- Intermediate
	{ id = 20, name = 'cyclopes', monsters = { 'cyclops' }, level = { 20, 45 }, kills = { 30, 70 }, difficulty = 3 },
	{ id = 21, name = 'fire devils', monsters = { 'fire devil' }, level = { 22, 45 }, kills = { 30, 60 }, difficulty = 2 },
	{ id = 22, name = 'scarabs', monsters = { 'scarab', 'ancient scarab', 'larva' }, level = { 20, 45 }, kills = { 40, 100 }, difficulty = 3 },
	{ id = 23, name = 'restless dead', monsters = { 'demon skeleton', 'ghost', 'crypt shambler', 'mummy' }, level = { 25, 55 }, kills = { 40, 100 }, difficulty = 3 },
	{ id = 24, name = 'lizards', monsters = { 'lizard sentinel', 'lizard snakecharmer', 'lizard templar' }, level = { 25, 55 }, kills = { 30, 70 }, difficulty = 3 },
	{ id = 42, name = 'beholders', monsters = { 'beholder', 'elder beholder' }, level = { 25, 50 }, kills = { 30, 70 }, difficulty = 3 },
	{ id = 26, name = 'pirates', monsters = { 'pirate buccaneer', 'pirate corsair', 'pirate cutthroat', 'pirate marauder', 'pirate skeleton' }, level = { 30, 60 }, kills = { 30, 80 }, difficulty = 3 },
	{ id = 27, name = 'stone golems and gargoyles', monsters = { 'stone golem', 'gargoyle' }, level = { 30, 60 }, kills = { 30, 70 }, difficulty = 3 },
	{ id = 30, name = 'cultists', monsters = { 'novice of the cult', 'acolyte of the cult', 'adept of the cult', 'enlightened of the cult' }, level = { 35, 65 }, kills = { 30, 70 }, difficulty = 3 },
	{ id = 32, name = 'vampires', monsters = { 'vampire' }, level = { 35, 70 }, kills = { 25, 60 }, difficulty = 3 },
	{ id = 31, name = 'quara scouts', monsters = { 'quara constrictor scout', 'quara hydromancer scout', 'quara mantassin scout', 'quara pincher scout', 'quara predator scout' }, level = { 40, 75 }, kills = { 30, 70 }, difficulty = 3 },
	-- Advanced
	{ id = 40, name = 'dragons', monsters = { 'dragon' }, level = { 45, 90 }, kills = { 20, 60 }, difficulty = 4 },
	{ id = 41, name = 'necromancers and priestesses', monsters = { 'necromancer', 'priestess' }, level = { 45, 85 }, kills = { 25, 60 }, difficulty = 3 },
	{ id = 29, name = 'bonebeasts', monsters = { 'bonebeast' }, level = { 50, 90 }, kills = { 25, 60 }, difficulty = 4 },
	{ id = 28, name = 'wyverns', monsters = { 'wyvern' }, level = { 50, 90 }, kills = { 20, 50 }, difficulty = 4 },
	{ id = 44, name = 'giant spiders', monsters = { 'giant spider' }, level = { 60, 110 }, kills = { 15, 40 }, difficulty = 4 },
	{ id = 46, name = 'liches and banshees', monsters = { 'lich', 'banshee' }, level = { 60, 110 }, kills = { 20, 50 }, difficulty = 4 },
	{ id = 47, name = 'quara', monsters = { 'quara constrictor', 'quara hydromancer', 'quara mantassin', 'quara pincher', 'quara predator' }, level = { 60, 110 }, kills = { 25, 60 }, difficulty = 4 },
	{ id = 43, name = 'heroes', monsters = { 'hero' }, level = { 60, 100 }, kills = { 10, 18 }, difficulty = 4 },
	-- Elite
	{ id = 60, name = 'dragon lords', monsters = { 'dragon lord' }, level = { 100, 999 }, kills = { 15, 50 }, difficulty = 5 },
	{ id = 48, name = 'hydras', monsters = { 'hydra' }, level = { 100, 999 }, kills = { 15, 50 }, difficulty = 5 },
	{ id = 50, name = 'behemoths', monsters = { 'behemoth' }, level = { 100, 999 }, kills = { 15, 50 }, difficulty = 5 },
	{ id = 49, name = 'serpent spawns', monsters = { 'serpent spawn' }, level = { 100, 999 }, kills = { 10, 40 }, difficulty = 5 },
	{ id = 51, name = 'warlocks', monsters = { 'warlock' }, level = { 110, 999 }, kills = { 10, 40 }, difficulty = 5 },
	{ id = 61, name = 'demons', monsters = { 'demon' }, level = { 130, 999 }, kills = { 8, 30 }, difficulty = 5 },
	{ id = 63, name = 'hellhounds', monsters = { 'hellhound' }, level = { 150, 999 }, kills = { 5, 15 }, difficulty = 5 },
}
