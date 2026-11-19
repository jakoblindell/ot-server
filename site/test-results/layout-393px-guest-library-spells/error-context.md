# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: layout.spec.ts >> 393px, guest >> /library/spells
- Location: tests/layout.spec.ts:159:5

# Error details

```
Error: /library/spells fits 393px

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 27

- Array []
+ Array [
+   "scrolls sideways: <div.scroll.s--CwEjjBX_zZa> \"NameWordsMagic levelManaVocationsPremium\" is 704px in 361px",
+   "off screen: <table.table.s--CwEjjBX_zZa> \"NameWordsMagic levelManaVocationsPremium\" spans 28..708px",
+   "off screen: <thead.s--CwEjjBX_zZa> \"NameWordsMagic levelManaVocationsPremium\" spans 28..708px",
+   "off screen: <tr.s--CwEjjBX_zZa> \"NameWordsMagic levelManaVocationsPremium\" spans 28..708px",
+   "off screen: <th.num.s--CwEjjBX_zZa> \"Mana\" spans 389..452px",
+   "off screen: <th.s--CwEjjBX_zZa> \"Vocations\" spans 452..622px",
+   "off screen: <th.s--CwEjjBX_zZa> \"Premium\" spans 622..708px",
+   "off screen: <tbody.s--CwEjjBX_zZa> \"Find Person exiva020Sorcerer, Druid, Pal\" spans 28..708px",
+   "off screen: <tr#Find%20Person.s--CwEjjBX_zZa> \"Find Person exiva020Sorcerer, Druid, Pal\" spans 28..708px",
+   "off screen: <td.num.pixel.s--CwEjjBX_zZa> \"20\" spans 389..452px",
+   "off screen: <td.s--CwEjjBX_zZa> \"Sorcerer, Druid, Paladin, Knight\" spans 452..622px",
+   "off screen: <td.s--CwEjjBX_zZa> spans 622..708px",
+   "off screen: <tr#Food.s--CwEjjBX_zZa> \"Food exevo pan030Druid, Paladin\" spans 28..708px",
+   "off screen: <td.num.pixel.s--CwEjjBX_zZa> \"30\" spans 389..452px",
+   "off screen: <td.s--CwEjjBX_zZa> \"Druid, Paladin\" spans 452..622px",
+   "off screen: <tr#House%20Door%20List.s--CwEjjBX_zZa> \"House Door List aleta grav0––\" spans 28..708px",
+   "off screen: <td.num.pixel.s--CwEjjBX_zZa> \"–\" spans 389..452px",
+   "off screen: <td.s--CwEjjBX_zZa> \"–\" spans 452..622px",
+   "off screen: <tr#House%20Guest%20List.s--CwEjjBX_zZa> \"House Guest List aleta sio0––\" spans 28..708px",
+   "off screen: <tr#House%20Kick.s--CwEjjBX_zZa> \"House Kick alana sio0––\" spans 28..708px",
+   "off screen: <tr#House%20Subowner%20List.s--CwEjjBX_zZa> \"House Subowner List aleta som0––\" spans 28..708px",
+   "off screen: <tr#Light.s--CwEjjBX_zZa> \"Light utevo lux020Sorcerer, Druid, Palad\" spans 28..708px",
+   "off screen: <tr#Light%20Healing.s--CwEjjBX_zZa> \"Light Healing exura125Sorcerer, Druid, P\" spans 28..708px",
+   "off screen: <td.num.pixel.s--CwEjjBX_zZa> \"25\" spans 389..452px",
+   "off screen: <tr#Magic%20Rope.s--CwEjjBX_zZa> \"Magic Rope exani tera120Sorcerer, Druid,\" spans 28..708px",
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
    - navigation "Breadcrumbs" [ref=e37]:
      - link "Library" [ref=e38] [cursor=pointer]:
        - /url: /library
      - text: › Spells
    - navigation "Vocation" [ref=e39]:
      - link "All vocations" [ref=e40] [cursor=pointer]:
        - /url: "?vocation="
      - link "Knights" [ref=e41] [cursor=pointer]:
        - /url: "?vocation=Knight"
      - link "Paladins" [ref=e42] [cursor=pointer]:
        - /url: "?vocation=Paladin"
      - link "Sorcerers" [ref=e43] [cursor=pointer]:
        - /url: "?vocation=Sorcerer"
      - link "Druids" [ref=e44] [cursor=pointer]:
        - /url: "?vocation=Druid"
    - generic [ref=e45]:
      - heading "Instant spells" [level=2] [ref=e47]
      - table [ref=e49]:
        - rowgroup [ref=e50]:
          - row [ref=e51]:
            - columnheader "Name" [ref=e52]
            - columnheader "Words" [ref=e53]
            - columnheader "Magic level" [ref=e54]
            - columnheader "Mana" [ref=e55]
            - columnheader "Vocations" [ref=e56]
            - columnheader "Premium" [ref=e57]
        - rowgroup [ref=e58]:
          - row [ref=e59]:
            - cell [ref=e60]:
              - strong [ref=e61]: Find Person
            - cell "exiva" [ref=e62]
            - cell "0" [ref=e63]
            - cell "20" [ref=e64]
            - cell "Sorcerer, Druid, Paladin, Knight" [ref=e65]
            - cell [ref=e66]
          - row [ref=e67]:
            - cell [ref=e68]:
              - strong [ref=e69]: Food
            - cell "exevo pan" [ref=e70]
            - cell "0" [ref=e71]
            - cell "30" [ref=e72]
            - cell "Druid, Paladin" [ref=e73]
            - cell [ref=e74]
          - row [ref=e75]:
            - cell [ref=e76]:
              - strong [ref=e77]: House Door List
            - cell "aleta grav" [ref=e78]
            - cell "0" [ref=e79]
            - cell "–" [ref=e80]
            - cell "–" [ref=e81]
            - cell [ref=e82]
          - row [ref=e83]:
            - cell [ref=e84]:
              - strong [ref=e85]: House Guest List
            - cell "aleta sio" [ref=e86]
            - cell "0" [ref=e87]
            - cell "–" [ref=e88]
            - cell "–" [ref=e89]
            - cell [ref=e90]
          - row [ref=e91]:
            - cell [ref=e92]:
              - strong [ref=e93]: House Kick
            - cell "alana sio" [ref=e94]
            - cell "0" [ref=e95]
            - cell "–" [ref=e96]
            - cell "–" [ref=e97]
            - cell [ref=e98]
          - row [ref=e99]:
            - cell [ref=e100]:
              - strong [ref=e101]: House Subowner List
            - cell "aleta som" [ref=e102]
            - cell "0" [ref=e103]
            - cell "–" [ref=e104]
            - cell "–" [ref=e105]
            - cell [ref=e106]
          - row [ref=e107]:
            - cell [ref=e108]:
              - strong [ref=e109]: Light
            - cell "utevo lux" [ref=e110]
            - cell "0" [ref=e111]
            - cell "20" [ref=e112]
            - cell "Sorcerer, Druid, Paladin, Knight" [ref=e113]
            - cell [ref=e114]
          - row [ref=e115]:
            - cell [ref=e116]:
              - strong [ref=e117]: Light Healing
            - cell "exura" [ref=e118]
            - cell "1" [ref=e119]
            - cell "25" [ref=e120]
            - cell "Sorcerer, Druid, Paladin, Knight" [ref=e121]
            - cell [ref=e122]
          - row [ref=e123]:
            - cell [ref=e124]:
              - strong [ref=e125]: Magic Rope
            - cell "exani tera" [ref=e126]
            - cell "1" [ref=e127]
            - cell "20" [ref=e128]
            - cell "Sorcerer, Druid, Paladin, Knight" [ref=e129]
            - cell [ref=e130]
          - row [ref=e131]:
            - cell [ref=e132]:
              - strong [ref=e133]: Antidote
            - cell "exana pox" [ref=e134]
            - cell "2" [ref=e135]
            - cell "30" [ref=e136]
            - cell "Sorcerer, Druid, Paladin, Knight" [ref=e137]
            - cell [ref=e138]
          - row [ref=e139]:
            - cell [ref=e140]:
              - strong [ref=e141]: Force Strike
            - cell "exori mort" [ref=e142]
            - cell "2" [ref=e143]
            - cell "20" [ref=e144]
            - cell "Sorcerer, Druid" [ref=e145]
            - cell [ref=e146]
          - row [ref=e147]:
            - cell [ref=e148]:
              - strong [ref=e149]: Intense Healing
            - cell "exura gran" [ref=e150]
            - cell "2" [ref=e151]
            - cell "40" [ref=e152]
            - cell "Sorcerer, Druid, Paladin" [ref=e153]
            - cell [ref=e154]
          - row [ref=e155]:
            - cell [ref=e156]:
              - strong [ref=e157]: Poison Strike
            - cell "exori pox" [ref=e158]
            - cell "2" [ref=e159]
            - cell "20" [ref=e160]
            - cell "Sorcerer, Druid" [ref=e161]
            - cell [ref=e162]
          - row [ref=e163]:
            - cell [ref=e164]:
              - strong [ref=e165]: Flame Strike
            - cell "exori flam" [ref=e166]
            - cell "3" [ref=e167]
            - cell "20" [ref=e168]
            - cell "Sorcerer, Druid" [ref=e169]
            - cell [ref=e170]
          - row [ref=e171]:
            - cell [ref=e172]:
              - strong [ref=e173]: Great Light
            - cell "utevo gran lux" [ref=e174]
            - cell "3" [ref=e175]
            - cell "60" [ref=e176]
            - cell "Sorcerer, Druid, Paladin, Knight" [ref=e177]
            - cell [ref=e178]
          - row [ref=e179]:
            - cell [ref=e180]:
              - strong [ref=e181]: Levitate
            - cell "exani hur" [ref=e182]
            - cell "3" [ref=e183]
            - cell "50" [ref=e184]
            - cell "Sorcerer, Druid, Paladin, Knight" [ref=e185]
            - cell [ref=e186]
          - row [ref=e187]:
            - cell [ref=e188]:
              - strong [ref=e189]: Challenge
            - cell "exeta res" [ref=e190]
            - cell "4" [ref=e191]
            - cell "30" [ref=e192]
            - cell "–" [ref=e193]
            - cell [ref=e194]
          - row [ref=e195]:
            - cell [ref=e196]:
              - strong [ref=e197]: Energy Strike
            - cell "exori vis" [ref=e198]
            - cell "4" [ref=e199]
            - cell "20" [ref=e200]
            - cell "Sorcerer, Druid" [ref=e201]
            - cell [ref=e202]
          - row [ref=e203]:
            - cell [ref=e204]:
              - strong [ref=e205]: Haste
            - cell "utani hur" [ref=e206]
            - cell "4" [ref=e207]
            - cell "60" [ref=e208]
            - cell "Sorcerer, Druid, Paladin, Knight" [ref=e209]
            - cell [ref=e210]
          - row [ref=e211]:
            - cell [ref=e212]:
              - strong [ref=e213]: Magic Shield
            - cell "utamo vita" [ref=e214]
            - cell "4" [ref=e215]
            - cell "50" [ref=e216]
            - cell "Sorcerer, Druid, Paladin" [ref=e217]
            - cell [ref=e218]
          - row [ref=e219]:
            - cell [ref=e220]:
              - strong [ref=e221]: Berserk
            - cell "exori" [ref=e222]
            - cell "5" [ref=e223]
            - cell "150" [ref=e224]
            - cell "Knight" [ref=e225]
            - cell [ref=e226]
          - row [ref=e227]:
            - cell [ref=e228]:
              - strong [ref=e229]: Fire Wave
            - cell "exevo flam hur" [ref=e230]
            - cell "7" [ref=e231]
            - cell "80" [ref=e232]
            - cell "Sorcerer" [ref=e233]
            - cell [ref=e234]
          - row [ref=e235]:
            - cell [ref=e236]:
              - strong [ref=e237]: Heal Friend
            - cell "exura sio" [ref=e238]
            - cell "7" [ref=e239]
            - cell "70" [ref=e240]
            - cell "Druid" [ref=e241]
            - cell [ref=e242]
          - row [ref=e243]:
            - cell [ref=e244]:
              - strong [ref=e245]: Strong Haste
            - cell "utani gran hur" [ref=e246]
            - cell "8" [ref=e247]
            - cell "100" [ref=e248]
            - cell "Sorcerer, Druid" [ref=e249]
            - cell [ref=e250]
          - row [ref=e251]:
            - cell [ref=e252]:
              - strong [ref=e253]: Ultimate Healing
            - cell "exura vita" [ref=e254]
            - cell "8" [ref=e255]
            - cell "80" [ref=e256]
            - cell "Sorcerer, Druid, Paladin" [ref=e257]
            - cell [ref=e258]
          - row [ref=e259]:
            - cell [ref=e260]:
              - strong [ref=e261]: Creature Illusion
            - cell "utevo res ina" [ref=e262]
            - cell "10" [ref=e263]
            - cell "100" [ref=e264]
            - cell "Sorcerer, Druid" [ref=e265]
            - cell [ref=e266]
          - row [ref=e267]:
            - cell [ref=e268]:
              - strong [ref=e269]: Energy Beam
            - cell "exevo vis lux" [ref=e270]
            - cell "10" [ref=e271]
            - cell "100" [ref=e272]
            - cell "Sorcerer" [ref=e273]
            - cell [ref=e274]
          - row [ref=e275]:
            - cell [ref=e276]:
              - strong [ref=e277]: Cancel Invisibility
            - cell "exana ina" [ref=e278]
            - cell "12" [ref=e279]
            - cell "250" [ref=e280]
            - cell "Sorcerer, Druid" [ref=e281]
            - cell [ref=e282]
          - row [ref=e283]:
            - cell [ref=e284]:
              - strong [ref=e285]: Ultimate Light
            - cell "utevo vis lux" [ref=e286]
            - cell "12" [ref=e287]
            - cell "140" [ref=e288]
            - cell "Sorcerer, Druid" [ref=e289]
            - cell [ref=e290]
          - row [ref=e291]:
            - cell [ref=e292]:
              - strong [ref=e293]: Wild Growth
            - cell "exevo grav vita" [ref=e294]
            - cell "13" [ref=e295]
            - cell "150" [ref=e296]
            - cell "Druid" [ref=e297]
            - cell [ref=e298]
          - row [ref=e299]:
            - cell [ref=e300]:
              - strong [ref=e301]: Great Energy Beam
            - cell "exevo gran vis lux" [ref=e302]
            - cell "14" [ref=e303]
            - cell "200" [ref=e304]
            - cell "Sorcerer" [ref=e305]
            - cell [ref=e306]
          - row [ref=e307]:
            - cell [ref=e308]:
              - strong [ref=e309]: Invisible
            - cell "utana vid" [ref=e310]
            - cell "15" [ref=e311]
            - cell "210" [ref=e312]
            - cell "Sorcerer, Druid, Paladin" [ref=e313]
            - cell [ref=e314]
          - row [ref=e315]:
            - cell [ref=e316]:
              - strong [ref=e317]: Undead Legion
            - cell "exana mas mort" [ref=e318]
            - cell "15" [ref=e319]
            - cell "400" [ref=e320]
            - cell "Druid" [ref=e321]
            - cell [ref=e322]
          - row [ref=e323]:
            - cell [ref=e324]:
              - strong [ref=e325]: Summon Creature
            - cell "utevo res" [ref=e326]
            - cell "16" [ref=e327]
            - cell "–" [ref=e328]
            - cell "Sorcerer, Druid" [ref=e329]
            - cell [ref=e330]
          - row [ref=e331]:
            - cell [ref=e332]:
              - strong [ref=e333]: Mass Healing
            - cell "exura gran mas res" [ref=e334]
            - cell "19" [ref=e335]
            - cell "120" [ref=e336]
            - cell "Druid" [ref=e337]
            - cell [ref=e338]
          - row [ref=e339]:
            - cell [ref=e340]:
              - strong [ref=e341]: Energy Wave
            - cell "exevo mort hur" [ref=e342]
            - cell "20" [ref=e343]
            - cell "250" [ref=e344]
            - cell "Sorcerer" [ref=e345]
            - cell [ref=e346]
          - row [ref=e347]:
            - cell [ref=e348]:
              - strong [ref=e349]: Poison Wave
            - cell "exevo pox hur" [ref=e350]
            - cell "20" [ref=e351]
            - cell "250" [ref=e352]
            - cell "Druid" [ref=e353]
            - cell [ref=e354]
          - row [ref=e355]:
            - cell [ref=e356]:
              - strong [ref=e357]: Poison Storm
            - cell "exevo gran mas pox" [ref=e358]
            - cell "28" [ref=e359]
            - cell "400" [ref=e360]
            - cell "Druid" [ref=e361]
            - cell [ref=e362]
          - row [ref=e363]:
            - cell [ref=e364]:
              - strong [ref=e365]: Ultimate Explosion
            - cell "exevo gran mas vis" [ref=e366]
            - cell "40" [ref=e367]
            - cell "800" [ref=e368]
            - cell "Sorcerer" [ref=e369]
            - cell [ref=e370]
    - generic [ref=e371]:
      - heading "Conjuring spells" [level=2] [ref=e373]
      - table [ref=e375]:
        - rowgroup [ref=e376]:
          - row [ref=e377]:
            - columnheader "Name" [ref=e378]
            - columnheader "Words" [ref=e379]
            - columnheader "Magic level" [ref=e380]
            - columnheader "Mana" [ref=e381]
            - columnheader "Vocations" [ref=e382]
            - columnheader "Premium" [ref=e383]
        - rowgroup [ref=e384]:
          - row [ref=e385]:
            - cell [ref=e386]:
              - strong [ref=e387]: Light Magic Missile
              - text: → 5× a spell rune
            - cell "adori" [ref=e388]
            - cell "1" [ref=e389]
            - cell "40" [ref=e390]
            - cell "Sorcerer, Druid, Paladin" [ref=e391]
            - cell [ref=e392]
          - row [ref=e393]:
            - cell [ref=e394]:
              - strong [ref=e395]: Conjure Arrow
              - text: → 15× an arrow
            - cell "exevo con" [ref=e396]
            - cell "2" [ref=e397]
            - cell "40" [ref=e398]
            - cell "Paladin" [ref=e399]
            - cell [ref=e400]
          - row [ref=e401]:
            - cell [ref=e402]:
              - strong [ref=e403]: Poison Field
              - text: → 3× a spell rune
            - cell "adevo grav pox" [ref=e404]
            - cell "2" [ref=e405]
            - cell "50" [ref=e406]
            - cell "Sorcerer, Druid" [ref=e407]
            - cell [ref=e408]
          - row [ref=e409]:
            - cell [ref=e410]:
              - strong [ref=e411]: Fire Field
              - text: → 3× a spell rune
            - cell "adevo grav flam" [ref=e412]
            - cell "3" [ref=e413]
            - cell "60" [ref=e414]
            - cell "Sorcerer, Druid" [ref=e415]
            - cell [ref=e416]
          - row [ref=e417]:
            - cell [ref=e418]:
              - strong [ref=e419]: Heavy Magic Missile
              - text: → 5× a spell rune
            - cell "adori gran" [ref=e420]
            - cell "3" [ref=e421]
            - cell "70" [ref=e422]
            - cell "Sorcerer, Druid, Paladin" [ref=e423]
            - cell [ref=e424]
          - row [ref=e425]:
            - cell [ref=e426]:
              - strong [ref=e427]: Intense Healing Rune
              - text: → a spell rune
            - cell "adura gran" [ref=e428]
            - cell "4" [ref=e429]
            - cell "60" [ref=e430]
            - cell "Druid" [ref=e431]
            - cell [ref=e432]
          - row [ref=e433]:
            - cell [ref=e434]:
              - strong [ref=e435]: Antidote Rune
              - text: → a spell rune
            - cell "adana pox" [ref=e436]
            - cell "5" [ref=e437]
            - cell "50" [ref=e438]
            - cell "Druid" [ref=e439]
            - cell [ref=e440]
          - row [ref=e441]:
            - cell [ref=e442]:
              - strong [ref=e443]: Conjure Poison Arrow
              - text: → 5× a poison arrow
            - cell "exevo con pox" [ref=e444]
            - cell "5" [ref=e445]
            - cell "70" [ref=e446]
            - cell "Paladin" [ref=e447]
            - cell [ref=e448]
          - row [ref=e449]:
            - cell [ref=e450]:
              - strong [ref=e451]: Energy Field
              - text: → 3× a spell rune
            - cell "adevo grav vis" [ref=e452]
            - cell "5" [ref=e453]
            - cell "80" [ref=e454]
            - cell "Sorcerer, Druid" [ref=e455]
            - cell [ref=e456]
          - row [ref=e457]:
            - cell [ref=e458]:
              - strong [ref=e459]: Fireball
              - text: → 3× a spell rune
            - cell "adori flam" [ref=e460]
            - cell "5" [ref=e461]
            - cell "60" [ref=e462]
            - cell "Sorcerer, Paladin, Druid" [ref=e463]
            - cell [ref=e464]
          - row [ref=e465]:
            - cell [ref=e466]:
              - strong [ref=e467]: Conjure Bolt
              - text: → 10× a bolt
            - cell "exevo con mort" [ref=e468]
            - cell "6" [ref=e469]
            - cell "70" [ref=e470]
            - cell "Paladin" [ref=e471]
            - cell [ref=e472]
          - row [ref=e473]:
            - cell [ref=e474]:
              - strong [ref=e475]: Destroy Field
              - text: → 3× a spell rune
            - cell "adito grav" [ref=e476]
            - cell "6" [ref=e477]
            - cell "60" [ref=e478]
            - cell "Sorcerer, Druid, Paladin" [ref=e479]
            - cell [ref=e480]
          - row [ref=e481]:
            - cell [ref=e482]:
              - strong [ref=e483]: Animate Dead
              - text: → 2× a spell rune
            - cell "adana mort" [ref=e484]
            - cell "7" [ref=e485]
            - cell "300" [ref=e486]
            - cell "Sorcerer, Druid" [ref=e487]
            - cell [ref=e488]
          - row [ref=e489]:
            - cell [ref=e490]:
              - strong [ref=e491]: Envenom
              - text: → 3× a spell rune
            - cell "adevo res pox" [ref=e492]
            - cell "7" [ref=e493]
            - cell "100" [ref=e494]
            - cell "Druid" [ref=e495]
            - cell [ref=e496]
          - row [ref=e497]:
            - cell [ref=e498]:
              - strong [ref=e499]: Desintegrate
              - text: → 3× a spell rune
            - cell "adito tera" [ref=e500]
            - cell "8" [ref=e501]
            - cell "100" [ref=e502]
            - cell "Sorcerer, Druid, Paladin" [ref=e503]
            - cell [ref=e504]
          - row [ref=e505]:
            - cell [ref=e506]:
              - strong [ref=e507]: Poison Bomb
              - text: → 2× a spell rune
            - cell "adevo mas pox" [ref=e508]
            - cell "8" [ref=e509]
            - cell "130" [ref=e510]
            - cell "Druid" [ref=e511]
            - cell [ref=e512]
          - row [ref=e513]:
            - cell [ref=e514]:
              - strong [ref=e515]: Fire Bomb
              - text: → 2× a spell rune
            - cell "adevo mas flam" [ref=e516]
            - cell "9" [ref=e517]
            - cell "150" [ref=e518]
            - cell "Sorcerer, Druid" [ref=e519]
            - cell [ref=e520]
          - row [ref=e521]:
            - cell [ref=e522]:
              - strong [ref=e523]: Great Fireball
              - text: → 2× a spell rune
            - cell "adori gran flam" [ref=e524]
            - cell "9" [ref=e525]
            - cell "120" [ref=e526]
            - cell "Sorcerer, Druid" [ref=e527]
            - cell [ref=e528]
          - row [ref=e529]:
            - cell [ref=e530]:
              - strong [ref=e531]: Conjure Blank Rune
              - text: → a blank rune
            - cell "adori blank" [ref=e532]
            - cell "10" [ref=e533]
            - cell "10" [ref=e534]
            - cell "Paladin, Sorcerer, Druid" [ref=e535]
            - cell [ref=e536]
          - row [ref=e537]:
            - cell [ref=e538]:
              - strong [ref=e539]: Conjure Explosive Arrow
              - text: → 8× a burst arrow
            - cell "exevo con flam" [ref=e540]
            - cell "10" [ref=e541]
            - cell "120" [ref=e542]
            - cell "Paladin" [ref=e543]
            - cell [ref=e544]
          - row [ref=e545]:
            - cell [ref=e546]:
              - strong [ref=e547]: Convince Creature
              - text: → a spell rune
            - cell "adeta sio" [ref=e548]
            - cell "10" [ref=e549]
            - cell "100" [ref=e550]
            - cell "Druid" [ref=e551]
            - cell [ref=e552]
          - row [ref=e553]:
            - cell [ref=e554]:
              - strong [ref=e555]: Chameleon
              - text: → a spell rune
            - cell "adevo ina" [ref=e556]
            - cell "11" [ref=e557]
            - cell "150" [ref=e558]
            - cell "Druid" [ref=e559]
            - cell [ref=e560]
          - row [ref=e561]:
            - cell [ref=e562]:
              - strong [ref=e563]: Poison Wall
              - text: → 4× a spell rune
            - cell "adevo mas grav pox" [ref=e564]
            - cell "11" [ref=e565]
            - cell "160" [ref=e566]
            - cell "Sorcerer, Druid" [ref=e567]
            - cell [ref=e568]
          - row [ref=e569]:
            - cell [ref=e570]:
              - strong [ref=e571]: Ultimate Healing Rune
              - text: → a spell rune
            - cell "adura vita" [ref=e572]
            - cell "11" [ref=e573]
            - cell "100" [ref=e574]
            - cell "Druid" [ref=e575]
            - cell [ref=e576]
          - row [ref=e577]:
            - cell [ref=e578]:
              - strong [ref=e579]: Explosion
              - text: → 3× a spell rune
            - cell "adevo mas hur" [ref=e580]
            - cell "12" [ref=e581]
            - cell "180" [ref=e582]
            - cell "Sorcerer, Druid" [ref=e583]
            - cell [ref=e584]
          - row [ref=e585]:
            - cell [ref=e586]:
              - strong [ref=e587]: Fire Wall
              - text: → 4× a spell rune
            - cell "adevo mas grav flam" [ref=e588]
            - cell "13" [ref=e589]
            - cell "200" [ref=e590]
            - cell "Sorcerer, Druid" [ref=e591]
            - cell [ref=e592]
          - row [ref=e593]:
            - cell [ref=e594]:
              - strong [ref=e595]: Soulfire
              - text: → 2× a spell rune
            - cell "adevo res flam" [ref=e596]
            - cell "13" [ref=e597]
            - cell "150" [ref=e598]
            - cell "Sorcerer, Druid" [ref=e599]
            - cell [ref=e600]
          - row [ref=e601]:
            - cell [ref=e602]:
              - strong [ref=e603]: Conjure Power Bolt
              - text: → 2× a power bolt
            - cell "exevo con vis" [ref=e604]
            - cell "14" [ref=e605]
            - cell "200" [ref=e606]
            - cell "–" [ref=e607]
            - cell [ref=e608]
          - row [ref=e609]:
            - cell [ref=e610]:
              - strong [ref=e611]: Magic Wall
              - text: → 4× a spell rune
            - cell "adevo grav tera" [ref=e612]
            - cell "14" [ref=e613]
            - cell "250" [ref=e614]
            - cell "Sorcerer" [ref=e615]
            - cell [ref=e616]
          - row [ref=e617]:
            - cell [ref=e618]:
              - strong [ref=e619]: Conjure Infernal Bolt
              - text: → an infernal bolt
            - cell "exevo con mort flam" [ref=e620]
            - cell "16" [ref=e621]
            - cell "180" [ref=e622]
            - cell "–" [ref=e623]
            - cell [ref=e624]
          - row [ref=e625]:
            - cell [ref=e626]:
              - strong [ref=e627]: Energy Bomb
              - text: → 2× a spell rune
            - cell "adevo mas vis" [ref=e628]
            - cell "18" [ref=e629]
            - cell "220" [ref=e630]
            - cell "Sorcerer" [ref=e631]
            - cell [ref=e632]
          - row [ref=e633]:
            - cell [ref=e634]:
              - strong [ref=e635]: Energy Wall
              - text: → 4× a spell rune
            - cell "adevo mas grav vis" [ref=e636]
            - cell "18" [ref=e637]
            - cell "250" [ref=e638]
            - cell "Sorcerer, Druid" [ref=e639]
            - cell [ref=e640]
          - row [ref=e641]:
            - cell [ref=e642]:
              - strong [ref=e643]: Enchant Staff
              - text: → an enchanted staff
            - cell "exeta vis" [ref=e644]
            - cell "22" [ref=e645]
            - cell "80" [ref=e646]
            - cell "–" [ref=e647]
            - cell [ref=e648]
          - row [ref=e649]:
            - cell [ref=e650]:
              - strong [ref=e651]: Sudden Death
              - text: → a spell rune
            - cell "adori vita vis" [ref=e652]
            - cell "25" [ref=e653]
            - cell "220" [ref=e654]
            - cell "Sorcerer" [ref=e655]
            - cell [ref=e656]
          - row [ref=e657]:
            - cell [ref=e658]:
              - strong [ref=e659]: Paralyze
              - text: → a spell rune
            - cell "adana ani" [ref=e660]
            - cell "35" [ref=e661]
            - cell "600" [ref=e662]
            - cell "Druid" [ref=e663]
            - cell [ref=e664]
    - generic [ref=e665]:
      - heading "Runes" [level=2] [ref=e667]
      - table [ref=e669]:
        - rowgroup [ref=e670]:
          - row [ref=e671]:
            - columnheader "Name" [ref=e672]
            - columnheader "Words" [ref=e673]
            - columnheader "Magic level" [ref=e674]
            - columnheader "Mana" [ref=e675]
            - columnheader "Vocations" [ref=e676]
            - columnheader "Premium" [ref=e677]
        - rowgroup [ref=e678]:
          - row [ref=e679]:
            - cell [ref=e680]:
              - strong [ref=e681]: Antidote Rune
            - cell [ref=e682]
            - cell "0" [ref=e683]
            - cell "–" [ref=e684]
            - cell "–" [ref=e685]
            - cell [ref=e686]
          - row [ref=e687]:
            - cell [ref=e688]:
              - strong [ref=e689]: Light Magic Missile
            - cell [ref=e690]
            - cell "0" [ref=e691]
            - cell "–" [ref=e692]
            - cell "–" [ref=e693]
            - cell [ref=e694]
          - row [ref=e695]:
            - cell [ref=e696]:
              - strong [ref=e697]: Poison Field
            - cell [ref=e698]
            - cell "0" [ref=e699]
            - cell "–" [ref=e700]
            - cell "–" [ref=e701]
            - cell [ref=e702]
          - row [ref=e703]:
            - cell [ref=e704]:
              - strong [ref=e705]: Fire Field
            - cell [ref=e706]
            - cell "1" [ref=e707]
            - cell "–" [ref=e708]
            - cell "–" [ref=e709]
            - cell [ref=e710]
          - row [ref=e711]:
            - cell [ref=e712]:
              - strong [ref=e713]: Heavy Magic Missile
            - cell [ref=e714]
            - cell "1" [ref=e715]
            - cell "–" [ref=e716]
            - cell "–" [ref=e717]
            - cell [ref=e718]
          - row [ref=e719]:
            - cell [ref=e720]:
              - strong [ref=e721]: Intense Healing Rune
            - cell [ref=e722]
            - cell "1" [ref=e723]
            - cell "–" [ref=e724]
            - cell "–" [ref=e725]
            - cell [ref=e726]
          - row [ref=e727]:
            - cell [ref=e728]:
              - strong [ref=e729]: Fireball
            - cell [ref=e730]
            - cell "2" [ref=e731]
            - cell "–" [ref=e732]
            - cell "–" [ref=e733]
            - cell [ref=e734]
          - row [ref=e735]:
            - cell [ref=e736]:
              - strong [ref=e737]: Destroy Field
            - cell [ref=e738]
            - cell "3" [ref=e739]
            - cell "–" [ref=e740]
            - cell "–" [ref=e741]
            - cell [ref=e742]
          - row [ref=e743]:
            - cell [ref=e744]:
              - strong [ref=e745]: Energy Field
            - cell [ref=e746]
            - cell "3" [ref=e747]
            - cell "–" [ref=e748]
            - cell "–" [ref=e749]
            - cell [ref=e750]
          - row [ref=e751]:
            - cell [ref=e752]:
              - strong [ref=e753]: Animate Dead
            - cell [ref=e754]
            - cell "4" [ref=e755]
            - cell "–" [ref=e756]
            - cell "–" [ref=e757]
            - cell [ref=e758]
          - row [ref=e759]:
            - cell [ref=e760]:
              - strong [ref=e761]: Chameleon
            - cell [ref=e762]
            - cell "4" [ref=e763]
            - cell "–" [ref=e764]
            - cell "–" [ref=e765]
            - cell [ref=e766]
          - row [ref=e767]:
            - cell [ref=e768]:
              - strong [ref=e769]: Disintegrate
            - cell [ref=e770]
            - cell "4" [ref=e771]
            - cell "–" [ref=e772]
            - cell "–" [ref=e773]
            - cell [ref=e774]
          - row [ref=e775]:
            - cell [ref=e776]:
              - strong [ref=e777]: Envenom
            - cell [ref=e778]
            - cell "4" [ref=e779]
            - cell "–" [ref=e780]
            - cell "–" [ref=e781]
            - cell [ref=e782]
          - row [ref=e783]:
            - cell [ref=e784]:
              - strong [ref=e785]: Great Fireball
            - cell [ref=e786]
            - cell "4" [ref=e787]
            - cell "–" [ref=e788]
            - cell "–" [ref=e789]
            - cell [ref=e790]
          - row [ref=e791]:
            - cell [ref=e792]:
              - strong [ref=e793]: Poison Bomb
            - cell [ref=e794]
            - cell "4" [ref=e795]
            - cell "–" [ref=e796]
            - cell "–" [ref=e797]
            - cell [ref=e798]
          - row [ref=e799]:
            - cell [ref=e800]:
              - strong [ref=e801]: Ultimate Healing Rune
            - cell [ref=e802]
            - cell "4" [ref=e803]
            - cell "–" [ref=e804]
            - cell "–" [ref=e805]
            - cell [ref=e806]
          - row [ref=e807]:
            - cell [ref=e808]:
              - strong [ref=e809]: Convince Creature
            - cell [ref=e810]
            - cell "5" [ref=e811]
            - cell "–" [ref=e812]
            - cell "–" [ref=e813]
            - cell [ref=e814]
          - row [ref=e815]:
            - cell [ref=e816]:
              - strong [ref=e817]: Fire Bomb
            - cell [ref=e818]
            - cell "5" [ref=e819]
            - cell "–" [ref=e820]
            - cell "–" [ref=e821]
            - cell [ref=e822]
          - row [ref=e823]:
            - cell [ref=e824]:
              - strong [ref=e825]: Poison Wall
            - cell [ref=e826]
            - cell "5" [ref=e827]
            - cell "–" [ref=e828]
            - cell "–" [ref=e829]
            - cell [ref=e830]
          - row [ref=e831]:
            - cell [ref=e832]:
              - strong [ref=e833]: Explosion
            - cell [ref=e834]
            - cell "6" [ref=e835]
            - cell "–" [ref=e836]
            - cell "–" [ref=e837]
            - cell [ref=e838]
          - row [ref=e839]:
            - cell [ref=e840]:
              - strong [ref=e841]: Fire Wall
            - cell [ref=e842]
            - cell "6" [ref=e843]
            - cell "–" [ref=e844]
            - cell "–" [ref=e845]
            - cell [ref=e846]
          - row [ref=e847]:
            - cell [ref=e848]:
              - strong [ref=e849]: Soulfire
            - cell [ref=e850]
            - cell "7" [ref=e851]
            - cell "–" [ref=e852]
            - cell "–" [ref=e853]
            - cell [ref=e854]
          - row [ref=e855]:
            - cell [ref=e856]:
              - strong [ref=e857]: Energy Wall
            - cell [ref=e858]
            - cell "9" [ref=e859]
            - cell "–" [ref=e860]
            - cell "–" [ref=e861]
            - cell [ref=e862]
          - row [ref=e863]:
            - cell [ref=e864]:
              - strong [ref=e865]: Magic Wall
            - cell [ref=e866]
            - cell "9" [ref=e867]
            - cell "–" [ref=e868]
            - cell "–" [ref=e869]
            - cell [ref=e870]
          - row [ref=e871]:
            - cell [ref=e872]:
              - strong [ref=e873]: Energy Bomb
            - cell [ref=e874]
            - cell "10" [ref=e875]
            - cell "–" [ref=e876]
            - cell "–" [ref=e877]
            - cell [ref=e878]
          - row [ref=e879]:
            - cell [ref=e880]:
              - strong [ref=e881]: Sudden Death
            - cell [ref=e882]
            - cell "15" [ref=e883]
            - cell "–" [ref=e884]
            - cell "–" [ref=e885]
            - cell [ref=e886]
          - row [ref=e887]:
            - cell [ref=e888]:
              - strong [ref=e889]: Paralyze
            - cell [ref=e890]
            - cell "18" [ref=e891]
            - cell "900" [ref=e892]
            - cell "Druid" [ref=e893]
            - cell [ref=e894]
  - contentinfo [ref=e895]:
    - generic [ref=e896]:
      - generic [ref=e897]: Elderwood · A fan-run server, not affiliated with CipSoft.
      - navigation "Footer" [ref=e898]:
        - link "Rules" [ref=e899] [cursor=pointer]:
          - /url: /rules
        - link "Houses" [ref=e900] [cursor=pointer]:
          - /url: /houses
        - link "Latest deaths" [ref=e901] [cursor=pointer]:
          - /url: /deaths
        - link "Support" [ref=e902] [cursor=pointer]:
          - /url: /support
        - link "Privacy" [ref=e903] [cursor=pointer]:
          - /url: /privacy
      - generic [ref=e904]:
        - generic [ref=e905]: Colours
        - combobox "Colours" [ref=e906]:
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
      |                                                                             ^ Error: /library/spells fits 393px
  168 | 				});
  169 | 			}
  170 | 		});
  171 | 	}
  172 | }
  173 | 
```