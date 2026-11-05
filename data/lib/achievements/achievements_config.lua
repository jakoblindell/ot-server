-- Achievements (ot-server#30): things a character earns by playing, once.
-- Staff add achievements here. Never reuse or change an id: unlocks and
-- progress are stored by it (storage 48000 + id, 48500 + id; ids 1..499).
--
--   name, text    shown to players ("???" until unlocked when hidden)
--   category      milestones | hunting | daily | luck | funny
--   points        1 (easy) .. 5 (very rare)
--   hidden        true: name and text stay "???" until unlocked
--   trigger       when it unlocks:
--     { event = 'level', level = N }                 reach a level
--     { event = 'skill', skill = SKILL_..., level = N }  reach a skill or magic level
--     { event = 'kill', monsters = {...}, count = N }  kills (any of the monsters;
--                                                     no list: any creature)
--     { event = 'loot', item = id, from = {...} }      the item in a corpse you own
--                                                     (from: those monsters only)
--     { event = 'death', by = {...} }                  killed by one of these
--     { event = 'dailyhunt', count = N }               daily hunts handed in
--     { event = 'streak', days = N }                   a daily hunt streak
--     { event = 'box', tier = N }                      open a surprise box of tier N or better
--     { event = 'task', count = N }                    hunting tasks reported
--     { event = 'rank', rank = N }                     reach hunter rank N

Achievements = Achievements or {}

Achievements.list = {
	-- Milestones
	{ id = 1, name = 'First Steps', text = 'Reach level 20.', category = 'milestones', points = 1,
		trigger = { event = 'level', level = 20 } },
	{ id = 2, name = 'Seasoned', text = 'Reach level 50.', category = 'milestones', points = 2,
		trigger = { event = 'level', level = 50 } },
	{ id = 3, name = 'Veteran', text = 'Reach level 100.', category = 'milestones', points = 3,
		trigger = { event = 'level', level = 100 } },
	{ id = 4, name = 'Living Legend', text = 'Reach level 150.', category = 'milestones', points = 5,
		trigger = { event = 'level', level = 150 } },
	{ id = 5, name = 'Arcane Scholar', text = 'Reach magic level 50.', category = 'milestones', points = 3,
		trigger = { event = 'skill', skill = SKILL_MAGLEVEL, level = 50 } },

	-- Hunting
	{ id = 20, name = 'Rat Catcher', text = 'Kill 100 rats.', category = 'hunting', points = 1,
		trigger = { event = 'kill', monsters = { 'rat', 'cave rat' }, count = 100 } },
	{ id = 21, name = 'Orc Bane', text = 'Kill 500 orcs of any kind.', category = 'hunting', points = 2,
		trigger = { event = 'kill', monsters = { 'orc', 'orc spearman', 'orc warrior', 'orc shaman', 'orc rider', 'orc berserker', 'orc leader', 'orc warlord' }, count = 500 } },
	{ id = 22, name = 'Dragon Slayer', text = 'Kill 1,000 dragons.', category = 'hunting', points = 3,
		trigger = { event = 'kill', monsters = { 'dragon' }, count = 1000 } },
	{ id = 23, name = 'Demon Hunter', text = 'Kill 100 demons.', category = 'hunting', points = 4,
		trigger = { event = 'kill', monsters = { 'demon' }, count = 100 } },
	{ id = 24, name = 'Exterminator', text = 'Kill 10,000 creatures.', category = 'hunting', points = 3,
		trigger = { event = 'kill', count = 10000 } },
	{ id = 25, name = 'Taskmaster\'s Friend', text = 'Report your first hunting task.', category = 'hunting', points = 1,
		trigger = { event = 'task', count = 1 } },
	{ id = 26, name = 'Skilled Hunter', text = 'Reach the hunter rank Skilled Hunter.', category = 'hunting', points = 2,
		trigger = { event = 'rank', rank = 3 } },
	{ id = 27, name = 'Master Hunter', text = 'Reach the hunter rank Master Hunter.', category = 'hunting', points = 4,
		trigger = { event = 'rank', rank = 6 } },

	-- Daily hunts
	{ id = 40, name = 'Daily Bread', text = 'Hand in your first daily hunt.', category = 'daily', points = 1,
		trigger = { event = 'dailyhunt', count = 1 } },
	{ id = 41, name = 'Creature of Habit', text = 'Hand in 30 daily hunts.', category = 'daily', points = 3,
		trigger = { event = 'dailyhunt', count = 30 } },
	{ id = 42, name = 'Unbroken', text = 'Reach a 7-day daily hunt streak.', category = 'daily', points = 3,
		trigger = { event = 'streak', days = 7 } },

	-- Luck (hidden: a surprise when it happens)
	{ id = 60, name = 'Plated in Luck', text = 'Loot a magic plate armor from a demon.', category = 'luck', points = 5, hidden = true,
		trigger = { event = 'loot', item = 3366, from = { 'demon' } } },
	{ id = 61, name = 'Swift Feet', text = 'Loot a pair of boots of haste.', category = 'luck', points = 4, hidden = true,
		trigger = { event = 'loot', item = 3079 } },
	{ id = 62, name = 'Scales of Fortune', text = 'Loot a dragon scale mail from a dragon lord.', category = 'luck', points = 4, hidden = true,
		trigger = { event = 'loot', item = 3386, from = { 'dragon lord' } } },
	{ id = 63, name = 'Purple Haze', text = 'Open a purple surprise box.', category = 'luck', points = 5, hidden = true,
		trigger = { event = 'box', tier = 7 } },

	-- Funny (hidden)
	{ id = 80, name = 'Humbled', text = 'Get killed by a rabbit, a chicken or a sheep.', category = 'funny', points = 1, hidden = true,
		trigger = { event = 'death', by = { 'rabbit', 'chicken', 'sheep', 'black sheep' } } },
	{ id = 81, name = 'Cheese Thief', text = 'Get killed by a rat.', category = 'funny', points = 1, hidden = true,
		trigger = { event = 'death', by = { 'rat', 'cave rat' } } },
}

Achievements.categories = {
	{ id = 'milestones', name = 'Milestones' },
	{ id = 'hunting', name = 'Hunting' },
	{ id = 'daily', name = 'Daily hunts' },
	{ id = 'luck', name = 'Luck' },
	{ id = 'funny', name = 'Odd ones' },
}
