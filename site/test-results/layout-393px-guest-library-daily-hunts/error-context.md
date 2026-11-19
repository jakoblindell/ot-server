# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: layout.spec.ts >> 393px, guest >> /library/daily-hunts
- Location: tests/layout.spec.ts:159:5

# Error details

```
Error: /library/daily-hunts fits 393px

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 12

- Array []
+ Array [
+   "cut off: <section.card.s-Yr8wFZ4S8Yev> \"Daily huntsOne hunt a day, a present eve\" shows 361px of 465px",
+   "off screen: <table.table.streak.s-Yr8wFZ4S8Yev> \"Day1234567+Experience1×1.5×2×2.75×3.5×4.\" spans 44..481px",
+   "off screen: <thead.s-Yr8wFZ4S8Yev> \"Day1234567+\" spans 44..481px",
+   "off screen: <tr.s-Yr8wFZ4S8Yev> \"Day1234567+\" spans 44..481px",
+   "off screen: <th.s-Yr8wFZ4S8Yev> \"6\" spans 382..441px",
+   "off screen: <th.s-Yr8wFZ4S8Yev> \"7+\" spans 441..481px",
+   "off screen: <tbody.s-Yr8wFZ4S8Yev> \"Experience1×1.5×2×2.75×3.5×4.25×5×\" spans 44..481px",
+   "off screen: <tr.s-Yr8wFZ4S8Yev> \"Experience1×1.5×2×2.75×3.5×4.25×5×\" spans 44..481px",
+   "off screen: <td.s-Yr8wFZ4S8Yev> \"4.25×\" spans 382..441px",
+   "off screen: <td.s-Yr8wFZ4S8Yev> \"5×\" spans 441..481px",
+ ]
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e5]:
      - link "Elderwood Classic 7.92 world" [ref=e6] [cursor=pointer]:
        - /url: /
        - generic [ref=e18]:
          - generic [ref=e19]: Elderwood
          - generic [ref=e20]: Classic 7.92 world
      - navigation "Main" [ref=e21]:
        - link "News" [ref=e22] [cursor=pointer]:
          - /url: /
        - link "Highscores" [ref=e23] [cursor=pointer]:
          - /url: /highscores
        - link "Characters" [ref=e24] [cursor=pointer]:
          - /url: /characters
        - link "Library" [ref=e25] [cursor=pointer]:
          - /url: /library
        - link "Guilds" [ref=e26] [cursor=pointer]:
          - /url: /guilds
        - link "Online" [ref=e27] [cursor=pointer]:
          - /url: /online
        - link "Play" [ref=e28] [cursor=pointer]:
          - /url: /download
        - link "Support" [ref=e29] [cursor=pointer]:
          - /url: /support
      - generic [ref=e30]:
        - link "Offline" [ref=e31] [cursor=pointer]:
          - /url: /online
        - link "Log in" [ref=e33] [cursor=pointer]:
          - /url: /login
        - link "Play now" [ref=e34] [cursor=pointer]:
          - /url: /play/
  - main [ref=e36]:
    - region [ref=e37]:
      - generic [ref=e38]:
        - heading "Daily hunts" [level=1] [ref=e39]
        - generic [ref=e40]: One hunt a day, a present every time
      - generic [ref=e41]:
        - paragraph [ref=e42]: "Every day a taskmaster has a hunt for you: a creature that fits your level, somewhere you may never have hunted. Finish it and you get experience and a surprise box. Finish one every day and the rewards grow."
        - heading "How it works" [level=2] [ref=e43]
        - list [ref=e44]:
          - listitem [ref=e45]:
            - generic [ref=e46]: "1"
            - text: Greet a taskmaster and say task to get your hunt (from level 8).
          - listitem [ref=e47]:
            - generic [ref=e48]: "2"
            - text: "Kill the creatures. Any blow you land counts: you need not strike the last one, so hunting together counts for everyone."
          - listitem [ref=e49]:
            - generic [ref=e50]: "3"
            - text: Return and say reward for your experience and present.
          - listitem [ref=e51]:
            - generic [ref=e52]: "4"
            - text: Say progress at any time to see your count and the time left.
          - listitem [ref=e53]:
            - generic [ref=e54]: "5"
            - text: Say cancel to give a hunt up. Your streak ends and you wait for the next one.
        - heading "When" [level=2] [ref=e55]
        - list [ref=e56]:
          - listitem [ref=e57]: A new hunt comes with each server save, and at least 8 hours after your last one ended. Finish at 08:00 with the save at 09:00, and the next one is ready at 16:00.
          - listitem [ref=e58]:
            - text: Once you pick a hunt up you have
            - strong [ref=e59]: 16 hours
            - text: to hand it in. After that it fails and your streak ends.
          - listitem [ref=e60]: A hunt like “orcs” counts every kind of orc.
          - listitem [ref=e61]: Free accounts only get hunts they can reach without premium; hunts marked Premium are for premium accounts.
        - heading "Streak" [level=2] [ref=e62]
        - paragraph [ref=e63]: Finish a hunt on days in a row and your experience grows. Miss a day, cancel or run out of time and it starts over.
        - table [ref=e65]:
          - rowgroup [ref=e66]:
            - row [ref=e67]:
              - columnheader "Day" [ref=e68]
              - columnheader "1" [ref=e69]
              - columnheader "2" [ref=e70]
              - columnheader "3" [ref=e71]
              - columnheader "4" [ref=e72]
              - columnheader "5" [ref=e73]
              - columnheader "6" [ref=e74]
              - columnheader "7+" [ref=e75]
          - rowgroup [ref=e76]:
            - row [ref=e77]:
              - rowheader "Experience" [ref=e78]
              - cell "1×" [ref=e79]
              - cell "1.5×" [ref=e80]
              - cell "2×" [ref=e81]
              - cell "2.75×" [ref=e82]
              - cell "3.5×" [ref=e83]
              - cell "4.25×" [ref=e84]
              - cell "5×" [ref=e85]
        - paragraph [ref=e86]: A longer streak also brings better presents.
        - heading "Surprise boxes" [level=2] [ref=e87]
        - paragraph [ref=e88]: "Every box holds gold, and with luck something more: gems, rings, and in the best boxes rare equipment. Harder hunts, a higher level and a longer streak make a better box more likely. Anyone can find the best one; it just takes luck."
        - list [ref=e89]:
          - listitem [ref=e90]:
            - strong [ref=e91]: Brown surprise box
            - generic [ref=e92]: about 500 gold
            - emphasis [ref=e93]: very common
          - listitem [ref=e94]:
            - strong [ref=e95]: Orange surprise box
            - generic [ref=e96]: about 650 gold
            - emphasis [ref=e97]: common
          - listitem [ref=e98]:
            - strong [ref=e99]: Yellow surprise box
            - generic [ref=e100]: about 750 gold
            - emphasis [ref=e101]: uncommon
          - listitem [ref=e102]:
            - strong [ref=e103]: Green surprise box
            - generic [ref=e104]: about 950 gold
            - emphasis [ref=e105]: rare
          - listitem [ref=e106]:
            - strong [ref=e107]: Blue surprise box
            - generic [ref=e108]: about 1,250 gold
            - emphasis [ref=e109]: very rare
          - listitem [ref=e110]:
            - strong [ref=e111]: Pink surprise box
            - generic [ref=e112]: about 3,000 gold
            - emphasis [ref=e113]: incredibly rare
          - listitem [ref=e114]:
            - strong [ref=e115]: Purple surprise box
            - generic [ref=e116]: about 25,000 gold
            - emphasis [ref=e117]: extremely rare
    - region [ref=e118]:
      - generic [ref=e119]:
        - heading "Beginner" [level=2] [ref=e120]
        - generic [ref=e121]: Levels 8–19
      - list [ref=e123]:
        - listitem [ref=e124]:
          - generic [ref=e125]:
            - strong [ref=e126]: Orcs
            - generic [ref=e127]: Levels 8–30
            - generic "Difficulty 2 of 5" [ref=e128]: ★★☆☆☆
          - generic [ref=e129]:
            - link "Orc" [ref=e130] [cursor=pointer]:
              - /url: /library/creatures/orc
            - link "Orc Spearman" [ref=e131] [cursor=pointer]:
              - /url: /library/creatures/orc-spearman
            - link "Orc Warrior" [ref=e132] [cursor=pointer]:
              - /url: /library/creatures/orc-warrior
            - link "Orc Shaman" [ref=e133] [cursor=pointer]:
              - /url: /library/creatures/orc-shaman
            - link "Orc Rider" [ref=e134] [cursor=pointer]:
              - /url: /library/creatures/orc-rider
            - link "Orc Berserker" [ref=e135] [cursor=pointer]:
              - /url: /library/creatures/orc-berserker
            - link "Orc Leader" [ref=e136] [cursor=pointer]:
              - /url: /library/creatures/orc-leader
            - link "Orc Warlord" [ref=e137] [cursor=pointer]:
              - /url: /library/creatures/orc-warlord
        - listitem [ref=e138]:
          - generic [ref=e139]:
            - strong [ref=e140]: Poison spiders and scorpions
            - generic [ref=e141]: Levels 8–22
            - generic "Difficulty 1 of 5" [ref=e142]: ★☆☆☆☆
          - generic [ref=e143]:
            - link "Poison Spider" [ref=e144] [cursor=pointer]:
              - /url: /library/creatures/poison-spider
            - link "Scorpion" [ref=e145] [cursor=pointer]:
              - /url: /library/creatures/scorpion
        - listitem [ref=e146]:
          - generic [ref=e147]:
            - strong [ref=e148]: Rotworms
            - generic [ref=e149]: Levels 8–20
            - generic "Difficulty 1 of 5" [ref=e150]: ★☆☆☆☆
          - generic [ref=e151]:
            - link "Rotworm" [ref=e152] [cursor=pointer]:
              - /url: /library/creatures/rotworm
            - link "Carrion Worm" [ref=e153] [cursor=pointer]:
              - /url: /library/creatures/carrion-worm
        - listitem [ref=e154]:
          - generic [ref=e155]:
            - strong [ref=e156]: Trolls
            - generic [ref=e157]: Levels 8–18
            - generic "Difficulty 1 of 5" [ref=e158]: ★☆☆☆☆
          - generic [ref=e159]:
            - link "Troll" [ref=e160] [cursor=pointer]:
              - /url: /library/creatures/troll
            - link "Swamp Troll" [ref=e161] [cursor=pointer]:
              - /url: /library/creatures/swamp-troll
            - link "Frost Troll" [ref=e162] [cursor=pointer]:
              - /url: /library/creatures/frost-troll
            - link "Island Troll" [ref=e163] [cursor=pointer]:
              - /url: /library/creatures/island-troll
        - listitem [ref=e164]:
          - generic [ref=e165]:
            - strong [ref=e166]: Wolves
            - generic [ref=e167]: Levels 8–14
            - generic "Difficulty 1 of 5" [ref=e168]: ★☆☆☆☆
          - link "Wolf" [ref=e170] [cursor=pointer]:
            - /url: /library/creatures/wolf
        - listitem [ref=e171]:
          - generic [ref=e172]:
            - strong [ref=e173]: Skeletons and ghouls
            - generic [ref=e174]: Levels 10–25
            - generic "Difficulty 2 of 5" [ref=e175]: ★★☆☆☆
          - generic [ref=e176]:
            - link "Skeleton" [ref=e177] [cursor=pointer]:
              - /url: /library/creatures/skeleton
            - link "Ghoul" [ref=e178] [cursor=pointer]:
              - /url: /library/creatures/ghoul
        - listitem [ref=e179]:
          - generic [ref=e180]:
            - strong [ref=e181]: Amazons and valkyries
            - generic [ref=e182]: Levels 12–30
            - generic "Difficulty 2 of 5" [ref=e183]: ★★☆☆☆
          - generic [ref=e184]:
            - link "Amazon" [ref=e185] [cursor=pointer]:
              - /url: /library/creatures/amazon
            - link "Valkyrie" [ref=e186] [cursor=pointer]:
              - /url: /library/creatures/valkyrie
        - listitem [ref=e187]:
          - generic [ref=e188]:
            - strong [ref=e189]: Dwarves
            - generic [ref=e190]: Levels 12–30
            - generic "Difficulty 2 of 5" [ref=e191]: ★★☆☆☆
          - generic [ref=e192]:
            - link "Dwarf" [ref=e193] [cursor=pointer]:
              - /url: /library/creatures/dwarf
            - link "Dwarf Soldier" [ref=e194] [cursor=pointer]:
              - /url: /library/creatures/dwarf-soldier
            - link "Dwarf Guard" [ref=e195] [cursor=pointer]:
              - /url: /library/creatures/dwarf-guard
            - link "Dwarf Geomancer" [ref=e196] [cursor=pointer]:
              - /url: /library/creatures/dwarf-geomancer
        - listitem [ref=e197]:
          - generic [ref=e198]:
            - strong [ref=e199]: Elves
            - generic [ref=e200]: Levels 14–35
            - generic "Difficulty 2 of 5" [ref=e201]: ★★☆☆☆
          - generic [ref=e202]:
            - link "Elf" [ref=e203] [cursor=pointer]:
              - /url: /library/creatures/elf
            - link "Elf Scout" [ref=e204] [cursor=pointer]:
              - /url: /library/creatures/elf-scout
            - link "Elf Arcanist" [ref=e205] [cursor=pointer]:
              - /url: /library/creatures/elf-arcanist
        - listitem [ref=e206]:
          - generic [ref=e207]:
            - strong [ref=e208]: Minotaurs
            - generic [ref=e209]: Levels 14–35
            - generic "Difficulty 2 of 5" [ref=e210]: ★★☆☆☆
          - generic [ref=e211]:
            - link "Minotaur" [ref=e212] [cursor=pointer]:
              - /url: /library/creatures/minotaur
            - link "Minotaur Archer" [ref=e213] [cursor=pointer]:
              - /url: /library/creatures/minotaur-archer
            - link "Minotaur Guard" [ref=e214] [cursor=pointer]:
              - /url: /library/creatures/minotaur-guard
            - link "Minotaur Mage" [ref=e215] [cursor=pointer]:
              - /url: /library/creatures/minotaur-mage
        - listitem [ref=e216]:
          - generic [ref=e217]:
            - strong [ref=e218]: Crocodiles
            - generic [ref=e219]: Levels 15–35
            - 'generic "Only for premium accounts: its creatures live in premium areas" [ref=e220]': Premium
            - generic "Difficulty 2 of 5" [ref=e221]: ★★☆☆☆
          - link "Crocodile" [ref=e223] [cursor=pointer]:
            - /url: /library/creatures/crocodile
        - listitem [ref=e224]:
          - generic [ref=e225]:
            - strong [ref=e226]: Dworcs
            - generic [ref=e227]: Levels 15–35
            - 'generic "Only for premium accounts: its creatures live in premium areas" [ref=e228]': Premium
            - generic "Difficulty 2 of 5" [ref=e229]: ★★☆☆☆
          - generic [ref=e230]:
            - link "Dworc Fleshhunter" [ref=e231] [cursor=pointer]:
              - /url: /library/creatures/dworc-fleshhunter
            - link "Dworc Venomsniper" [ref=e232] [cursor=pointer]:
              - /url: /library/creatures/dworc-venomsniper
            - link "Dworc Voodoomaster" [ref=e233] [cursor=pointer]:
              - /url: /library/creatures/dworc-voodoomaster
    - region [ref=e234]:
      - generic [ref=e235]:
        - heading "Intermediate" [level=2] [ref=e236]
        - generic [ref=e237]: Levels 20–49
      - list [ref=e239]:
        - listitem [ref=e240]:
          - generic [ref=e241]:
            - strong [ref=e242]: Cyclopes
            - generic [ref=e243]: Levels 20–45
            - generic "Difficulty 3 of 5" [ref=e244]: ★★★☆☆
          - link "Cyclops" [ref=e246] [cursor=pointer]:
            - /url: /library/creatures/cyclops
        - listitem [ref=e247]:
          - generic [ref=e248]:
            - strong [ref=e249]: Scarabs
            - generic [ref=e250]: Levels 20–45
            - 'generic "Only for premium accounts: its creatures live in premium areas" [ref=e251]': Premium
            - generic "Difficulty 3 of 5" [ref=e252]: ★★★☆☆
          - generic [ref=e253]:
            - link "Scarab" [ref=e254] [cursor=pointer]:
              - /url: /library/creatures/scarab
            - link "Ancient Scarab" [ref=e255] [cursor=pointer]:
              - /url: /library/creatures/ancient-scarab
            - link "Larva" [ref=e256] [cursor=pointer]:
              - /url: /library/creatures/larva
        - listitem [ref=e257]:
          - generic [ref=e258]:
            - strong [ref=e259]: Fire devils
            - generic [ref=e260]: Levels 22–45
            - generic "Difficulty 2 of 5" [ref=e261]: ★★☆☆☆
          - link "Fire Devil" [ref=e263] [cursor=pointer]:
            - /url: /library/creatures/fire-devil
        - listitem [ref=e264]:
          - generic [ref=e265]:
            - strong [ref=e266]: Beholders
            - generic [ref=e267]: Levels 25–50
            - generic "Difficulty 3 of 5" [ref=e268]: ★★★☆☆
          - generic [ref=e269]:
            - link "Beholder" [ref=e270] [cursor=pointer]:
              - /url: /library/creatures/beholder
            - link "Elder Beholder" [ref=e271] [cursor=pointer]:
              - /url: /library/creatures/elder-beholder
        - listitem [ref=e272]:
          - generic [ref=e273]:
            - strong [ref=e274]: Lizards
            - generic [ref=e275]: Levels 25–55
            - 'generic "Only for premium accounts: its creatures live in premium areas" [ref=e276]': Premium
            - generic "Difficulty 3 of 5" [ref=e277]: ★★★☆☆
          - generic [ref=e278]:
            - link "Lizard Sentinel" [ref=e279] [cursor=pointer]:
              - /url: /library/creatures/lizard-sentinel
            - link "Lizard Snakecharmer" [ref=e280] [cursor=pointer]:
              - /url: /library/creatures/lizard-snakecharmer
            - link "Lizard Templar" [ref=e281] [cursor=pointer]:
              - /url: /library/creatures/lizard-templar
        - listitem [ref=e282]:
          - generic [ref=e283]:
            - strong [ref=e284]: Restless dead
            - generic [ref=e285]: Levels 25–55
            - generic "Difficulty 3 of 5" [ref=e286]: ★★★☆☆
          - generic [ref=e287]:
            - link "Demon Skeleton" [ref=e288] [cursor=pointer]:
              - /url: /library/creatures/demon-skeleton
            - link "Ghost" [ref=e289] [cursor=pointer]:
              - /url: /library/creatures/ghost
            - link "Crypt Shambler" [ref=e290] [cursor=pointer]:
              - /url: /library/creatures/crypt-shambler
            - link "Mummy" [ref=e291] [cursor=pointer]:
              - /url: /library/creatures/mummy
        - listitem [ref=e292]:
          - generic [ref=e293]:
            - strong [ref=e294]: Pirates
            - generic [ref=e295]: Levels 30–60
            - 'generic "Only for premium accounts: its creatures live in premium areas" [ref=e296]': Premium
            - generic "Difficulty 3 of 5" [ref=e297]: ★★★☆☆
          - generic [ref=e298]:
            - link "Pirate Buccaneer" [ref=e299] [cursor=pointer]:
              - /url: /library/creatures/pirate-buccaneer
            - link "Pirate Corsair" [ref=e300] [cursor=pointer]:
              - /url: /library/creatures/pirate-corsair
            - link "Pirate Cutthroat" [ref=e301] [cursor=pointer]:
              - /url: /library/creatures/pirate-cutthroat
            - link "Pirate Marauder" [ref=e302] [cursor=pointer]:
              - /url: /library/creatures/pirate-marauder
            - link "Pirate Skeleton" [ref=e303] [cursor=pointer]:
              - /url: /library/creatures/pirate-skeleton
        - listitem [ref=e304]:
          - generic [ref=e305]:
            - strong [ref=e306]: Stone golems and gargoyles
            - generic [ref=e307]: Levels 30–60
            - generic "Difficulty 3 of 5" [ref=e308]: ★★★☆☆
          - generic [ref=e309]:
            - link "Stone Golem" [ref=e310] [cursor=pointer]:
              - /url: /library/creatures/stone-golem
            - link "Gargoyle" [ref=e311] [cursor=pointer]:
              - /url: /library/creatures/gargoyle
        - listitem [ref=e312]:
          - generic [ref=e313]:
            - strong [ref=e314]: Cultists
            - generic [ref=e315]: Levels 35–65
            - 'generic "Only for premium accounts: its creatures live in premium areas" [ref=e316]': Premium
            - generic "Difficulty 3 of 5" [ref=e317]: ★★★☆☆
          - generic [ref=e318]:
            - link "Novice Of The Cult" [ref=e319] [cursor=pointer]:
              - /url: /library/creatures/novice-of-the-cult
            - link "Acolyte Of The Cult" [ref=e320] [cursor=pointer]:
              - /url: /library/creatures/acolyte-of-the-cult
            - link "Adept Of The Cult" [ref=e321] [cursor=pointer]:
              - /url: /library/creatures/adept-of-the-cult
            - link "Enlightened Of The Cult" [ref=e322] [cursor=pointer]:
              - /url: /library/creatures/enlightened-of-the-cult
        - listitem [ref=e323]:
          - generic [ref=e324]:
            - strong [ref=e325]: Vampires
            - generic [ref=e326]: Levels 35–70
            - 'generic "Only for premium accounts: its creatures live in premium areas" [ref=e327]': Premium
            - generic "Difficulty 3 of 5" [ref=e328]: ★★★☆☆
          - link "Vampire" [ref=e330] [cursor=pointer]:
            - /url: /library/creatures/vampire
        - listitem [ref=e331]:
          - generic [ref=e332]:
            - strong [ref=e333]: Quara scouts
            - generic [ref=e334]: Levels 40–75
            - 'generic "Only for premium accounts: its creatures live in premium areas" [ref=e335]': Premium
            - generic "Difficulty 3 of 5" [ref=e336]: ★★★☆☆
          - generic [ref=e337]:
            - link "Quara Constrictor Scout" [ref=e338] [cursor=pointer]:
              - /url: /library/creatures/quara-constrictor-scout
            - link "Quara Hydromancer Scout" [ref=e339] [cursor=pointer]:
              - /url: /library/creatures/quara-hydromancer-scout
            - link "Quara Mantassin Scout" [ref=e340] [cursor=pointer]:
              - /url: /library/creatures/quara-mantassin-scout
            - link "Quara Pincher Scout" [ref=e341] [cursor=pointer]:
              - /url: /library/creatures/quara-pincher-scout
            - link "Quara Predator Scout" [ref=e342] [cursor=pointer]:
              - /url: /library/creatures/quara-predator-scout
        - listitem [ref=e343]:
          - generic [ref=e344]:
            - strong [ref=e345]: Dragons
            - generic [ref=e346]: Levels 45–90
            - generic "Difficulty 4 of 5" [ref=e347]: ★★★★☆
          - link "Dragon" [ref=e349] [cursor=pointer]:
            - /url: /library/creatures/dragon
        - listitem [ref=e350]:
          - generic [ref=e351]:
            - strong [ref=e352]: Necromancers and priestesses
            - generic [ref=e353]: Levels 45–85
            - 'generic "Only for premium accounts: its creatures live in premium areas" [ref=e354]': Premium
            - generic "Difficulty 3 of 5" [ref=e355]: ★★★☆☆
          - generic [ref=e356]:
            - link "Necromancer" [ref=e357] [cursor=pointer]:
              - /url: /library/creatures/necromancer
            - link "Priestess" [ref=e358] [cursor=pointer]:
              - /url: /library/creatures/priestess
    - region [ref=e359]:
      - generic [ref=e360]:
        - heading "Advanced" [level=2] [ref=e361]
        - generic [ref=e362]: Levels 50–99
      - list [ref=e364]:
        - listitem [ref=e365]:
          - generic [ref=e366]:
            - strong [ref=e367]: Bonebeasts
            - generic [ref=e368]: Levels 50–90
            - 'generic "Only for premium accounts: its creatures live in premium areas" [ref=e369]': Premium
            - generic "Difficulty 4 of 5" [ref=e370]: ★★★★☆
          - link "Bonebeast" [ref=e372] [cursor=pointer]:
            - /url: /library/creatures/bonebeast
        - listitem [ref=e373]:
          - generic [ref=e374]:
            - strong [ref=e375]: Wyverns
            - generic [ref=e376]: Levels 50–90
            - generic "Difficulty 4 of 5" [ref=e377]: ★★★★☆
          - link "Wyvern" [ref=e379] [cursor=pointer]:
            - /url: /library/creatures/wyvern
        - listitem [ref=e380]:
          - generic [ref=e381]:
            - strong [ref=e382]: Giant spiders
            - generic [ref=e383]: Levels 60–110
            - generic "Difficulty 4 of 5" [ref=e384]: ★★★★☆
          - link "Giant Spider" [ref=e386] [cursor=pointer]:
            - /url: /library/creatures/giant-spider
        - listitem [ref=e387]:
          - generic [ref=e388]:
            - strong [ref=e389]: Heroes
            - generic [ref=e390]: Levels 60–100
            - 'generic "Only for premium accounts: its creatures live in premium areas" [ref=e391]': Premium
            - generic "Difficulty 4 of 5" [ref=e392]: ★★★★☆
          - link "Hero" [ref=e394] [cursor=pointer]:
            - /url: /library/creatures/hero
        - listitem [ref=e395]:
          - generic [ref=e396]:
            - strong [ref=e397]: Liches and banshees
            - generic [ref=e398]: Levels 60–110
            - generic "Difficulty 4 of 5" [ref=e399]: ★★★★☆
          - generic [ref=e400]:
            - link "Lich" [ref=e401] [cursor=pointer]:
              - /url: /library/creatures/lich
            - link "Banshee" [ref=e402] [cursor=pointer]:
              - /url: /library/creatures/banshee
        - listitem [ref=e403]:
          - generic [ref=e404]:
            - strong [ref=e405]: Quara
            - generic [ref=e406]: Levels 60–110
            - 'generic "Only for premium accounts: its creatures live in premium areas" [ref=e407]': Premium
            - generic "Difficulty 4 of 5" [ref=e408]: ★★★★☆
          - generic [ref=e409]:
            - link "Quara Constrictor" [ref=e410] [cursor=pointer]:
              - /url: /library/creatures/quara-constrictor
            - link "Quara Hydromancer" [ref=e411] [cursor=pointer]:
              - /url: /library/creatures/quara-hydromancer
            - link "Quara Mantassin" [ref=e412] [cursor=pointer]:
              - /url: /library/creatures/quara-mantassin
            - link "Quara Pincher" [ref=e413] [cursor=pointer]:
              - /url: /library/creatures/quara-pincher
            - link "Quara Predator" [ref=e414] [cursor=pointer]:
              - /url: /library/creatures/quara-predator
    - region [ref=e415]:
      - generic [ref=e416]:
        - heading "Elite" [level=2] [ref=e417]
        - generic [ref=e418]: Levels 100+
      - list [ref=e420]:
        - listitem [ref=e421]:
          - generic [ref=e422]:
            - strong [ref=e423]: Behemoths
            - generic [ref=e424]: Levels 100+
            - 'generic "Only for premium accounts: its creatures live in premium areas" [ref=e425]': Premium
            - generic "Difficulty 5 of 5" [ref=e426]: ★★★★★
          - link "Behemoth" [ref=e428] [cursor=pointer]:
            - /url: /library/creatures/behemoth
        - listitem [ref=e429]:
          - generic [ref=e430]:
            - strong [ref=e431]: Dragon lords
            - generic [ref=e432]: Levels 100+
            - generic "Difficulty 5 of 5" [ref=e433]: ★★★★★
          - link "Dragon Lord" [ref=e435] [cursor=pointer]:
            - /url: /library/creatures/dragon-lord
        - listitem [ref=e436]:
          - generic [ref=e437]:
            - strong [ref=e438]: Hydras
            - generic [ref=e439]: Levels 100+
            - 'generic "Only for premium accounts: its creatures live in premium areas" [ref=e440]': Premium
            - generic "Difficulty 5 of 5" [ref=e441]: ★★★★★
          - link "Hydra" [ref=e443] [cursor=pointer]:
            - /url: /library/creatures/hydra
        - listitem [ref=e444]:
          - generic [ref=e445]:
            - strong [ref=e446]: Serpent spawns
            - generic [ref=e447]: Levels 100+
            - 'generic "Only for premium accounts: its creatures live in premium areas" [ref=e448]': Premium
            - generic "Difficulty 5 of 5" [ref=e449]: ★★★★★
          - link "Serpent Spawn" [ref=e451] [cursor=pointer]:
            - /url: /library/creatures/serpent-spawn
        - listitem [ref=e452]:
          - generic [ref=e453]:
            - strong [ref=e454]: Warlocks
            - generic [ref=e455]: Levels 110+
            - generic "Difficulty 5 of 5" [ref=e456]: ★★★★★
          - link "Warlock" [ref=e458] [cursor=pointer]:
            - /url: /library/creatures/warlock
        - listitem [ref=e459]:
          - generic [ref=e460]:
            - strong [ref=e461]: Demons
            - generic [ref=e462]: Levels 130+
            - generic "Difficulty 5 of 5" [ref=e463]: ★★★★★
          - link "Demon" [ref=e465] [cursor=pointer]:
            - /url: /library/creatures/demon
        - listitem [ref=e466]:
          - generic [ref=e467]:
            - strong [ref=e468]: Hellhounds
            - generic [ref=e469]: Levels 150+
            - generic "Difficulty 5 of 5" [ref=e470]: ★★★★★
          - link "Hellhound" [ref=e472] [cursor=pointer]:
            - /url: /library/creatures/hellhound
  - contentinfo [ref=e473]:
    - generic [ref=e474]:
      - generic [ref=e475]: Elderwood · A fan-run server, not affiliated with CipSoft.
      - navigation "Footer" [ref=e476]:
        - link "Rules" [ref=e477] [cursor=pointer]:
          - /url: /rules
        - link "Houses" [ref=e478] [cursor=pointer]:
          - /url: /houses
        - link "Latest deaths" [ref=e479] [cursor=pointer]:
          - /url: /deaths
        - link "Support" [ref=e480] [cursor=pointer]:
          - /url: /support
        - link "Privacy" [ref=e481] [cursor=pointer]:
          - /url: /privacy
      - generic [ref=e482]:
        - generic [ref=e483]: Colours
        - combobox "Colours" [ref=e484]:
          - option "Gold" [selected]
          - option "Ember"
          - option "Bone"
          - option "Moss"
          - option "Frost"
          - option "Scroll"
```

# Test source

```ts
  67  | 		'/guilds/create',
  68  | 		GUILD,
  69  | 		CHARACTER,
  70  | 		'/news/9401',
  71  | 		'/highscores'
  72  | 	],
  73  | 	god: [
  74  | 		'/account',
  75  | 		'/admin',
  76  | 		'/admin/players',
  77  | 		'/admin/players?q=a',
  78  | 		'/admin/players?player=Grumbold%20Axebeard',
  79  | 		'/admin/bans',
  80  | 		'/admin/reports',
  81  | 		'/admin/client-reports',
  82  | 		'/admin/client-reports/9501',
  83  | 		'/admin/news',
  84  | 		'/admin/news?edit=9401',
  85  | 		'/admin/audit',
  86  | 		'/admin/staff',
  87  | 		'/admin/backups',
  88  | 		'/admin/changes',
  89  | 		'/admin/config',
  90  | 		'/admin/files',
  91  | 		'/admin/files?file=data%2FXML%2Fcommands.xml',
  92  | 		'/admin/library',
  93  | 		'/admin/log',
  94  | 		'/admin/monsters',
  95  | 		'/admin/monsters?file=data%2Fmonster%2Famazon.xml'
  96  | 	]
  97  | };
  98  | 
  99  | const VIEWPORTS = [
  100 | 	{ width: 393, height: 660 }, // iPhone 15 Pro
  101 | 	{ width: 360, height: 640 } // small Android phones
  102 | ];
  103 | 
  104 | /** What does not fit, as readable lines; empty when the page fits */
  105 | async function layoutProblems(page: Page) {
  106 | 	return page.evaluate(() => {
  107 | 		const problems: string[] = [];
  108 | 		const root = document.documentElement;
  109 | 		const width = root.clientWidth;
  110 | 		if (root.scrollWidth > width) problems.push(`the page scrolls sideways: ${root.scrollWidth}px wide on a ${width}px screen`);
  111 | 
  112 | 		const describe = (el: Element) => {
  113 | 			const id = el.id ? `#${el.id}` : '';
  114 | 			const cls = typeof el.className === 'string' && el.className.trim() ? '.' + el.className.trim().split(/\s+/).join('.') : '';
  115 | 			const text = (el.textContent ?? '').trim().replace(/\s+/g, ' ').slice(0, 40);
  116 | 			return `<${el.tagName.toLowerCase()}${id}${cls}>${text ? ` "${text}"` : ''}`;
  117 | 		};
  118 | 		const visible = (el: Element) => {
  119 | 			const box = el.getBoundingClientRect();
  120 | 			if (box.width <= 1 || box.height <= 1) return false;
  121 | 			const style = getComputedStyle(el);
  122 | 			return style.visibility !== 'hidden' && style.display !== 'none';
  123 | 		};
  124 | 		// Form fields scroll their own text; rows marked data-scroll-x scroll on purpose
  125 | 		const skip = (el: Element) =>
  126 | 			el.matches('input, textarea, select, option, svg *, .visually-hidden, .visually-hidden *') || !!el.closest('[data-scroll-x]');
  127 | 
  128 | 		for (const el of document.body.querySelectorAll('*')) {
  129 | 			if (skip(el) || !visible(el)) continue;
  130 | 			const style = getComputedStyle(el);
  131 | 			const overflowX = style.overflowX;
  132 | 			// Cut off: a box that hides what does not fit (not an intended ellipsis)
  133 | 			if ((overflowX === 'hidden' || overflowX === 'clip') && style.textOverflow !== 'ellipsis' && el.scrollWidth > el.clientWidth + 1) {
  134 | 				problems.push(`cut off: ${describe(el)} shows ${el.clientWidth}px of ${el.scrollWidth}px`);
  135 | 			}
  136 | 			// Scrolls sideways without being meant to
  137 | 			if ((overflowX === 'auto' || overflowX === 'scroll') && el.scrollWidth > el.clientWidth + 1) {
  138 | 				problems.push(`scrolls sideways: ${describe(el)} is ${el.scrollWidth}px in ${el.clientWidth}px`);
  139 | 			}
  140 | 			// Sticks out of the screen (fixed and absolutely placed things included)
  141 | 			const box = el.getBoundingClientRect();
  142 | 			if (box.right > width + 1 || box.left < -1) {
  143 | 				if (style.position !== 'fixed' || box.left < width) {
  144 | 					problems.push(`off screen: ${describe(el)} spans ${Math.round(box.left)}..${Math.round(box.right)}px`);
  145 | 				}
  146 | 			}
  147 | 		}
  148 | 		// One line per element: the innermost causes are enough
  149 | 		return [...new Set(problems)].slice(0, 25);
  150 | 	});
  151 | }
  152 | 
  153 | for (const viewport of VIEWPORTS) {
  154 | 	for (const [visitor, paths] of Object.entries(PAGES) as [Visitor, string[]][]) {
  155 | 		test.describe(`${viewport.width}px, ${visitor}`, () => {
  156 | 			test.use({ viewport, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
  157 | 
  158 | 			for (const path of paths) {
  159 | 				test(path, async ({ page, context, baseURL }) => {
  160 | 					const session = SESSIONS[visitor];
  161 | 					if (session) await context.addCookies([{ name: 'ew_session', value: session, url: baseURL! }]);
  162 | 					const response = await page.goto(path, { waitUntil: 'load' });
  163 | 					expect(response?.status(), `${path} answers`).toBeLessThan(400);
  164 | 					// Logged-in pages must not bounce to the login page
  165 | 					if (session) expect(new URL(page.url()).pathname).not.toBe('/login');
  166 | 					await page.evaluate(() => document.fonts.ready);
> 167 | 					expect(await layoutProblems(page), `${path} fits ${viewport.width}px`).toEqual([]);
      |                                                                             ^ Error: /library/daily-hunts fits 393px
  168 | 				});
  169 | 			}
  170 | 		});
  171 | 	}
  172 | }
  173 | 
```