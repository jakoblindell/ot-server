# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: layout.spec.ts >> 393px, guest >> /houses
- Location: tests/layout.spec.ts:159:5

# Error details

```
Error: /houses fits 393px

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 27

- Array []
+ Array [
+   "scrolls sideways: <div.scroll.s-FPFgfVjPilNf> \"HouseSizeBedsRentOwnerAlai Flats, Flat 0\" is 584px in 361px",
+   "off screen: <table.table.s-FPFgfVjPilNf> \"HouseSizeBedsRentOwnerAlai Flats, Flat 0\" spans 28..588px",
+   "off screen: <thead.s-FPFgfVjPilNf> \"HouseSizeBedsRentOwner\" spans 28..588px",
+   "off screen: <tr.s-FPFgfVjPilNf> \"HouseSizeBedsRentOwner\" spans 28..588px",
+   "off screen: <th.num.s-FPFgfVjPilNf> \"Rent\" spans 334..424px",
+   "off screen: <th.s-FPFgfVjPilNf> \"Owner\" spans 424..588px",
+   "off screen: <tbody.s-FPFgfVjPilNf> \"Alai Flats, Flat 0117 sqm11,530 gpFreeAl\" spans 28..588px",
+   "off screen: <tr.s-FPFgfVjPilNf> \"Alai Flats, Flat 0117 sqm11,530 gpFree\" spans 28..588px",
+   "off screen: <td.num.pixel.s-FPFgfVjPilNf> \"1,530 gp\" spans 334..424px",
+   "off screen: <td.s-FPFgfVjPilNf> \"Free\" spans 424..588px",
+   "off screen: <span.free.s-FPFgfVjPilNf> \"Free\" spans 436..465px",
+   "off screen: <tr.s-FPFgfVjPilNf> \"Alai Flats, Flat 0217 sqm11,530 gpFree\" spans 28..588px",
+   "off screen: <tr.s-FPFgfVjPilNf> \"Alai Flats, Flat 0317 sqm11,530 gpFree\" spans 28..588px",
+   "off screen: <tr.s-FPFgfVjPilNf> \"Alai Flats, Flat 0417 sqm11,530 gpFree\" spans 28..588px",
+   "off screen: <tr.s-FPFgfVjPilNf> \"Alai Flats, Flat 0525 sqm22,350 gpFree\" spans 28..588px",
+   "off screen: <td.num.pixel.s-FPFgfVjPilNf> \"2,350 gp\" spans 334..424px",
+   "off screen: <tr.s-FPFgfVjPilNf> \"Alai Flats, Flat 0625 sqm22,350 gpFree\" spans 28..588px",
+   "off screen: <tr.s-FPFgfVjPilNf> \"Alai Flats, Flat 0717 sqm11,530 gpFree\" spans 28..588px",
+   "off screen: <tr.s-FPFgfVjPilNf> \"Alai Flats, Flat 0817 sqm11,530 gpFree\" spans 28..588px",
+   "off screen: <tr.s-FPFgfVjPilNf> \"Alai Flats, Flat 1117 sqm11,530 gpFree\" spans 28..588px",
+   "off screen: <tr.s-FPFgfVjPilNf> \"Alai Flats, Flat 1217 sqm11,530 gpFree\" spans 28..588px",
+   "off screen: <tr.s-FPFgfVjPilNf> \"Alai Flats, Flat 1317 sqm11,530 gpFree\" spans 28..588px",
+   "off screen: <tr.s-FPFgfVjPilNf> \"Alai Flats, Flat 1420 sqm11,800 gpFree\" spans 28..588px",
+   "off screen: <td.num.pixel.s-FPFgfVjPilNf> \"1,800 gp\" spans 334..424px",
+   "off screen: <tr.s-FPFgfVjPilNf> \"Alai Flats, Flat 1530 sqm22,800 gpFree\" spans 28..588px",
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
    - navigation "Towns" [ref=e37]:
      - link "Ab'Dendriel" [ref=e38] [cursor=pointer]:
        - /url: "?town=4"
      - link "Ankrahmun" [ref=e39] [cursor=pointer]:
        - /url: "?town=8"
      - link "Carlin" [ref=e40] [cursor=pointer]:
        - /url: "?town=2"
      - link "Darashia" [ref=e41] [cursor=pointer]:
        - /url: "?town=6"
      - link "Edron" [ref=e42] [cursor=pointer]:
        - /url: "?town=5"
      - link "Kazordoon" [ref=e43] [cursor=pointer]:
        - /url: "?town=3"
      - link "Port Hope" [ref=e44] [cursor=pointer]:
        - /url: "?town=9"
      - link "Thais" [ref=e45] [cursor=pointer]:
        - /url: "?town=1"
      - link "Venore" [ref=e46] [cursor=pointer]:
        - /url: "?town=7"
    - generic [ref=e47]:
      - generic [ref=e48]:
        - heading "Houses in Thais" [level=1] [ref=e49]
        - generic [ref=e50]: 132 of 133 free
      - table [ref=e52]:
        - rowgroup [ref=e53]:
          - row [ref=e54]:
            - columnheader "House" [ref=e55]
            - columnheader "Size" [ref=e56]
            - columnheader "Beds" [ref=e57]
            - columnheader "Rent" [ref=e58]
            - columnheader "Owner" [ref=e59]
        - rowgroup [ref=e60]:
          - row [ref=e61]:
            - cell [ref=e62]:
              - strong [ref=e63]: Alai Flats, Flat 01
            - cell "17 sqm" [ref=e64]
            - cell "1" [ref=e65]
            - cell "1,530 gp" [ref=e66]
            - cell "Free" [ref=e67]
          - row [ref=e68]:
            - cell [ref=e69]:
              - strong [ref=e70]: Alai Flats, Flat 02
            - cell "17 sqm" [ref=e71]
            - cell "1" [ref=e72]
            - cell "1,530 gp" [ref=e73]
            - cell "Free" [ref=e74]
          - row [ref=e75]:
            - cell [ref=e76]:
              - strong [ref=e77]: Alai Flats, Flat 03
            - cell "17 sqm" [ref=e78]
            - cell "1" [ref=e79]
            - cell "1,530 gp" [ref=e80]
            - cell "Free" [ref=e81]
          - row [ref=e82]:
            - cell [ref=e83]:
              - strong [ref=e84]: Alai Flats, Flat 04
            - cell "17 sqm" [ref=e85]
            - cell "1" [ref=e86]
            - cell "1,530 gp" [ref=e87]
            - cell "Free" [ref=e88]
          - row [ref=e89]:
            - cell [ref=e90]:
              - strong [ref=e91]: Alai Flats, Flat 05
            - cell "25 sqm" [ref=e92]
            - cell "2" [ref=e93]
            - cell "2,350 gp" [ref=e94]
            - cell "Free" [ref=e95]
          - row [ref=e96]:
            - cell [ref=e97]:
              - strong [ref=e98]: Alai Flats, Flat 06
            - cell "25 sqm" [ref=e99]
            - cell "2" [ref=e100]
            - cell "2,350 gp" [ref=e101]
            - cell "Free" [ref=e102]
          - row [ref=e103]:
            - cell [ref=e104]:
              - strong [ref=e105]: Alai Flats, Flat 07
            - cell "17 sqm" [ref=e106]
            - cell "1" [ref=e107]
            - cell "1,530 gp" [ref=e108]
            - cell "Free" [ref=e109]
          - row [ref=e110]:
            - cell [ref=e111]:
              - strong [ref=e112]: Alai Flats, Flat 08
            - cell "17 sqm" [ref=e113]
            - cell "1" [ref=e114]
            - cell "1,530 gp" [ref=e115]
            - cell "Free" [ref=e116]
          - row [ref=e117]:
            - cell [ref=e118]:
              - strong [ref=e119]: Alai Flats, Flat 11
            - cell "17 sqm" [ref=e120]
            - cell "1" [ref=e121]
            - cell "1,530 gp" [ref=e122]
            - cell "Free" [ref=e123]
          - row [ref=e124]:
            - cell [ref=e125]:
              - strong [ref=e126]: Alai Flats, Flat 12
            - cell "17 sqm" [ref=e127]
            - cell "1" [ref=e128]
            - cell "1,530 gp" [ref=e129]
            - cell "Free" [ref=e130]
          - row [ref=e131]:
            - cell [ref=e132]:
              - strong [ref=e133]: Alai Flats, Flat 13
            - cell "17 sqm" [ref=e134]
            - cell "1" [ref=e135]
            - cell "1,530 gp" [ref=e136]
            - cell "Free" [ref=e137]
          - row [ref=e138]:
            - cell [ref=e139]:
              - strong [ref=e140]: Alai Flats, Flat 14
            - cell "20 sqm" [ref=e141]
            - cell "1" [ref=e142]
            - cell "1,800 gp" [ref=e143]
            - cell "Free" [ref=e144]
          - row [ref=e145]:
            - cell [ref=e146]:
              - strong [ref=e147]: Alai Flats, Flat 15
            - cell "30 sqm" [ref=e148]
            - cell "2" [ref=e149]
            - cell "2,800 gp" [ref=e150]
            - cell "Free" [ref=e151]
          - row [ref=e152]:
            - cell [ref=e153]:
              - strong [ref=e154]: Alai Flats, Flat 16
            - cell "30 sqm" [ref=e155]
            - cell "2" [ref=e156]
            - cell "2,800 gp" [ref=e157]
            - cell "Free" [ref=e158]
          - row [ref=e159]:
            - cell [ref=e160]:
              - strong [ref=e161]: Alai Flats, Flat 17
            - cell "20 sqm" [ref=e162]
            - cell "1" [ref=e163]
            - cell "1,800 gp" [ref=e164]
            - cell "Free" [ref=e165]
          - row [ref=e166]:
            - cell [ref=e167]:
              - strong [ref=e168]: Alai Flats, Flat 18
            - cell "20 sqm" [ref=e169]
            - cell "1" [ref=e170]
            - cell "1,800 gp" [ref=e171]
            - cell "Free" [ref=e172]
          - row [ref=e173]:
            - cell [ref=e174]:
              - strong [ref=e175]: Alai Flats, Flat 21
            - cell "17 sqm" [ref=e176]
            - cell "1" [ref=e177]
            - cell "1,530 gp" [ref=e178]
            - cell "Free" [ref=e179]
          - row [ref=e180]:
            - cell [ref=e181]:
              - strong [ref=e182]: Alai Flats, Flat 22
            - cell "17 sqm" [ref=e183]
            - cell "1" [ref=e184]
            - cell "1,530 gp" [ref=e185]
            - cell "Free" [ref=e186]
          - row [ref=e187]:
            - cell [ref=e188]:
              - strong [ref=e189]: Alai Flats, Flat 23
            - cell "17 sqm" [ref=e190]
            - cell "1" [ref=e191]
            - cell "1,530 gp" [ref=e192]
            - cell "Free" [ref=e193]
          - row [ref=e194]:
            - cell [ref=e195]:
              - strong [ref=e196]: Alai Flats, Flat 24
            - cell "20 sqm" [ref=e197]
            - cell "1" [ref=e198]
            - cell "1,800 gp" [ref=e199]
            - cell "Free" [ref=e200]
          - row [ref=e201]:
            - cell [ref=e202]:
              - strong [ref=e203]: Alai Flats, Flat 25
            - cell "30 sqm" [ref=e204]
            - cell "2" [ref=e205]
            - cell "2,800 gp" [ref=e206]
            - cell "Free" [ref=e207]
          - row [ref=e208]:
            - cell [ref=e209]:
              - strong [ref=e210]: Alai Flats, Flat 26
            - cell "30 sqm" [ref=e211]
            - cell "2" [ref=e212]
            - cell "2,800 gp" [ref=e213]
            - cell "Free" [ref=e214]
          - row [ref=e215]:
            - cell [ref=e216]:
              - strong [ref=e217]: Alai Flats, Flat 27
            - cell "20 sqm" [ref=e218]
            - cell "1" [ref=e219]
            - cell "1,800 gp" [ref=e220]
            - cell "Free" [ref=e221]
          - row [ref=e222]:
            - cell [ref=e223]:
              - strong [ref=e224]: Alai Flats, Flat 28
            - cell "20 sqm" [ref=e225]
            - cell "1" [ref=e226]
            - cell "1,800 gp" [ref=e227]
            - cell "Free" [ref=e228]
          - row [ref=e229]:
            - cell [ref=e230]:
              - strong [ref=e231]: Beach Home Apartments, Flat 01
            - cell "13 sqm" [ref=e232]
            - cell "1" [ref=e233]
            - cell "1,430 gp" [ref=e234]
            - cell "Free" [ref=e235]
          - row [ref=e236]:
            - cell [ref=e237]:
              - strong [ref=e238]: Beach Home Apartments, Flat 02
            - cell "13 sqm" [ref=e239]
            - cell "1" [ref=e240]
            - cell "1,430 gp" [ref=e241]
            - cell "Free" [ref=e242]
          - row [ref=e243]:
            - cell [ref=e244]:
              - strong [ref=e245]: Beach Home Apartments, Flat 03
            - cell "13 sqm" [ref=e246]
            - cell "1" [ref=e247]
            - cell "1,430 gp" [ref=e248]
            - cell "Free" [ref=e249]
          - row [ref=e250]:
            - cell [ref=e251]:
              - strong [ref=e252]: Beach Home Apartments, Flat 04
            - cell "13 sqm" [ref=e253]
            - cell "1" [ref=e254]
            - cell "1,430 gp" [ref=e255]
            - cell "Free" [ref=e256]
          - row [ref=e257]:
            - cell [ref=e258]:
              - strong [ref=e259]: Beach Home Apartments, Flat 05
            - cell "13 sqm" [ref=e260]
            - cell "1" [ref=e261]
            - cell "1,430 gp" [ref=e262]
            - cell "Free" [ref=e263]
          - row [ref=e264]:
            - cell [ref=e265]:
              - strong [ref=e266]: Beach Home Apartments, Flat 06
            - cell "19 sqm" [ref=e267]
            - cell "2" [ref=e268]
            - cell "2,190 gp" [ref=e269]
            - cell "Free" [ref=e270]
          - row [ref=e271]:
            - cell [ref=e272]:
              - strong [ref=e273]: Beach Home Apartments, Flat 11
            - cell "13 sqm" [ref=e274]
            - cell "1" [ref=e275]
            - cell "1,430 gp" [ref=e276]
            - cell "Free" [ref=e277]
          - row [ref=e278]:
            - cell [ref=e279]:
              - strong [ref=e280]: Beach Home Apartments, Flat 12
            - cell "16 sqm" [ref=e281]
            - cell "1" [ref=e282]
            - cell "1,760 gp" [ref=e283]
            - cell "Free" [ref=e284]
          - row [ref=e285]:
            - cell [ref=e286]:
              - strong [ref=e287]: Beach Home Apartments, Flat 13
            - cell "16 sqm" [ref=e288]
            - cell "1" [ref=e289]
            - cell "1,760 gp" [ref=e290]
            - cell "Free" [ref=e291]
          - row [ref=e292]:
            - cell [ref=e293]:
              - strong [ref=e294]: Beach Home Apartments, Flat 14
            - cell "7 sqm" [ref=e295]
            - cell "1" [ref=e296]
            - cell "770 gp" [ref=e297]
            - cell "Free" [ref=e298]
          - row [ref=e299]:
            - cell [ref=e300]:
              - strong [ref=e301]: Beach Home Apartments, Flat 15
            - cell "7 sqm" [ref=e302]
            - cell "1" [ref=e303]
            - cell "770 gp" [ref=e304]
            - cell "Free" [ref=e305]
          - row [ref=e306]:
            - cell [ref=e307]:
              - strong [ref=e308]: Beach Home Apartments, Flat 16
            - cell "19 sqm" [ref=e309]
            - cell "2" [ref=e310]
            - cell "2,190 gp" [ref=e311]
            - cell "Free" [ref=e312]
          - row [ref=e313]:
            - cell [ref=e314]:
              - strong [ref=e315]: Bloodhall
            - cell "306 sqm" [ref=e316]
            - cell "16" [ref=e317]
            - cell "29,040 gp" [ref=e318]
            - cell "Free" [ref=e319]
          - row [ref=e320]:
            - cell [ref=e321]:
              - strong [ref=e322]: Castle of Greenshore
            - cell "294 sqm" [ref=e323]
            - cell "12" [ref=e324]
            - cell "36,380 gp" [ref=e325]
            - cell "Free" [ref=e326]
          - row [ref=e327]:
            - cell [ref=e328]:
              - strong [ref=e329]: Dark Mansion
            - cell "361 sqm" [ref=e330]
            - cell "17" [ref=e331]
            - cell "34,090 gp" [ref=e332]
            - cell "Free" [ref=e333]
          - row [ref=e334]:
            - cell [ref=e335]:
              - strong [ref=e336]: Farm Lane, 1st floor (Shop)
            - cell "21 sqm" [ref=e337]
            - cell "0" [ref=e338]
            - cell "1,890 gp" [ref=e339]
            - cell "Free" [ref=e340]
          - row [ref=e341]:
            - cell [ref=e342]:
              - strong [ref=e343]: Farm Lane, 2nd Floor (Shop)
            - cell "21 sqm" [ref=e344]
            - cell "0" [ref=e345]
            - cell "1,890 gp" [ref=e346]
            - cell "Free" [ref=e347]
          - row [ref=e348]:
            - cell [ref=e349]:
              - strong [ref=e350]: Farm Lane, Basement (Shop)
            - cell "21 sqm" [ref=e351]
            - cell "0" [ref=e352]
            - cell "1,890 gp" [ref=e353]
            - cell "Free" [ref=e354]
          - row [ref=e355]:
            - cell [ref=e356]:
              - strong [ref=e357]: Fibula Clanhall
            - cell "162 sqm" [ref=e358]
            - cell "10" [ref=e359]
            - cell "21,960 gp" [ref=e360]
            - cell "Free" [ref=e361]
          - row [ref=e362]:
            - cell [ref=e363]:
              - strong [ref=e364]: Fibula Village 1
            - cell "13 sqm" [ref=e365]
            - cell "1" [ref=e366]
            - cell "1,690 gp" [ref=e367]
            - cell "Free" [ref=e368]
          - row [ref=e369]:
            - cell [ref=e370]:
              - strong [ref=e371]: Fibula Village 2
            - cell "13 sqm" [ref=e372]
            - cell "1" [ref=e373]
            - cell "1,690 gp" [ref=e374]
            - cell "Free" [ref=e375]
          - row [ref=e376]:
            - cell [ref=e377]:
              - strong [ref=e378]: Fibula Village 3
            - cell "54 sqm" [ref=e379]
            - cell "4" [ref=e380]
            - cell "7,320 gp" [ref=e381]
            - cell "Free" [ref=e382]
          - row [ref=e383]:
            - cell [ref=e384]:
              - strong [ref=e385]: Fibula Village 4
            - cell "26 sqm" [ref=e386]
            - cell "2" [ref=e387]
            - cell "3,480 gp" [ref=e388]
            - cell "Free" [ref=e389]
          - row [ref=e390]:
            - cell [ref=e391]:
              - strong [ref=e392]: Fibula Village 5
            - cell "26 sqm" [ref=e393]
            - cell "2" [ref=e394]
            - cell "3,480 gp" [ref=e395]
            - cell "Free" [ref=e396]
          - row [ref=e397]:
            - cell [ref=e398]:
              - strong [ref=e399]: Fibula Village, Bar
            - cell "79 sqm" [ref=e400]
            - cell "2" [ref=e401]
            - cell "10,370 gp" [ref=e402]
            - cell "Free" [ref=e403]
          - row [ref=e404]:
            - cell [ref=e405]:
              - strong [ref=e406]: Fibula Village, Tower Flat
            - cell "77 sqm" [ref=e407]
            - cell "2" [ref=e408]
            - cell "10,110 gp" [ref=e409]
            - cell "Free" [ref=e410]
          - row [ref=e411]:
            - cell [ref=e412]:
              - strong [ref=e413]: Fibula Village, Villa
            - cell "242 sqm" [ref=e414]
            - cell "7" [ref=e415]
            - cell "22,380 gp" [ref=e416]
            - cell "Free" [ref=e417]
          - row [ref=e418]:
            - cell [ref=e419]:
              - strong [ref=e420]: Greenshore Clanhall
            - cell "165 sqm" [ref=e421]
            - cell "10" [ref=e422]
            - cell "20,700 gp" [ref=e423]
            - cell "Free" [ref=e424]
          - row [ref=e425]:
            - cell [ref=e426]:
              - strong [ref=e427]: Greenshore Village 1
            - cell "37 sqm" [ref=e428]
            - cell "3" [ref=e429]
            - cell "4,640 gp" [ref=e430]
            - cell "Free" [ref=e431]
          - row [ref=e432]:
            - cell [ref=e433]:
              - strong [ref=e434]: Greenshore Village 2
            - cell "13 sqm" [ref=e435]
            - cell "1" [ref=e436]
            - cell "1,560 gp" [ref=e437]
            - cell "Free" [ref=e438]
          - row [ref=e439]:
            - cell [ref=e440]:
              - strong [ref=e441]: Greenshore Village 3
            - cell "13 sqm" [ref=e442]
            - cell "1" [ref=e443]
            - cell "1,560 gp" [ref=e444]
            - cell "Free" [ref=e445]
          - row [ref=e446]:
            - cell [ref=e447]:
              - strong [ref=e448]: Greenshore Village 4
            - cell "13 sqm" [ref=e449]
            - cell "1" [ref=e450]
            - cell "1,560 gp" [ref=e451]
            - cell "Free" [ref=e452]
          - row [ref=e453]:
            - cell [ref=e454]:
              - strong [ref=e455]: Greenshore Village 5
            - cell "13 sqm" [ref=e456]
            - cell "1" [ref=e457]
            - cell "1,560 gp" [ref=e458]
            - cell "Free" [ref=e459]
          - row [ref=e460]:
            - cell [ref=e461]:
              - strong [ref=e462]: Greenshore Village 6
            - cell "71 sqm" [ref=e463]
            - cell "2" [ref=e464]
            - cell "8,620 gp" [ref=e465]
            - cell "Free" [ref=e466]
          - row [ref=e467]:
            - cell [ref=e468]:
              - strong [ref=e469]: Greenshore Village 7
            - cell "21 sqm" [ref=e470]
            - cell "1" [ref=e471]
            - cell "2,520 gp" [ref=e472]
            - cell "Free" [ref=e473]
          - row [ref=e474]:
            - cell [ref=e475]:
              - strong [ref=e476]: Greenshore Village, Shop
            - cell "30 sqm" [ref=e477]
            - cell "1" [ref=e478]
            - cell "3,600 gp" [ref=e479]
            - cell "Free" [ref=e480]
          - row [ref=e481]:
            - cell [ref=e482]:
              - strong [ref=e483]: Greenshore Village, Villa
            - cell "169 sqm" [ref=e484]
            - cell "4" [ref=e485]
            - cell "20,580 gp" [ref=e486]
            - cell "Free" [ref=e487]
          - row [ref=e488]:
            - cell [ref=e489]:
              - strong [ref=e490]: Guildhall of the Red Rose
            - cell "405 sqm" [ref=e491]
            - cell "15" [ref=e492]
            - cell "54,050 gp" [ref=e493]
            - cell "Free" [ref=e494]
          - row [ref=e495]:
            - cell [ref=e496]:
              - strong [ref=e497]: Halls of the Adventurers
            - cell "304 sqm" [ref=e498]
            - cell "18" [ref=e499]
            - cell "29,060 gp" [ref=e500]
            - cell "Free" [ref=e501]
          - row [ref=e502]:
            - cell [ref=e503]:
              - strong [ref=e504]: Harbour Place 1 (Shop)
            - cell "22 sqm" [ref=e505]
            - cell "0" [ref=e506]
            - cell "2,200 gp" [ref=e507]
            - cell "Free" [ref=e508]
          - row [ref=e509]:
            - cell [ref=e510]:
              - strong [ref=e511]: Harbour Place 2 (Shop)
            - cell "26 sqm" [ref=e512]
            - cell "1" [ref=e513]
            - cell "2,600 gp" [ref=e514]
            - cell "Free" [ref=e515]
          - row [ref=e516]:
            - cell [ref=e517]:
              - strong [ref=e518]: Harbour Street 4
            - cell "17 sqm" [ref=e519]
            - cell "1" [ref=e520]
            - cell "1,870 gp" [ref=e521]
            - cell "Free" [ref=e522]
          - row [ref=e523]:
            - cell [ref=e524]:
              - strong [ref=e525]: Lower Swamp Lane 1
            - cell "74 sqm" [ref=e526]
            - cell "4" [ref=e527]
            - cell "9,180 gp" [ref=e528]
            - cell "Free" [ref=e529]
          - row [ref=e530]:
            - cell [ref=e531]:
              - strong [ref=e532]: Lower Swamp Lane 3
            - cell "74 sqm" [ref=e533]
            - cell "4" [ref=e534]
            - cell "9,180 gp" [ref=e535]
            - cell "Free" [ref=e536]
          - row [ref=e537]:
            - cell [ref=e538]:
              - strong [ref=e539]: Main Street 9, 1st floor (Shop)
            - cell "32 sqm" [ref=e540]
            - cell "0" [ref=e541]
            - cell "2,880 gp" [ref=e542]
            - cell "Free" [ref=e543]
          - row [ref=e544]:
            - cell [ref=e545]:
              - strong [ref=e546]: Main Street 9a, 2nd floor (Shop)
            - cell "17 sqm" [ref=e547]
            - cell "0" [ref=e548]
            - cell "1,530 gp" [ref=e549]
            - cell "Free" [ref=e550]
          - row [ref=e551]:
            - cell [ref=e552]:
              - strong [ref=e553]: Main Street 9b, 2nd floor (Shop)
            - cell "28 sqm" [ref=e554]
            - cell "0" [ref=e555]
            - cell "2,520 gp" [ref=e556]
            - cell "Free" [ref=e557]
          - row [ref=e558]:
            - cell [ref=e559]:
              - strong [ref=e560]: Mercenary Tower
            - cell "607 sqm" [ref=e561]
            - cell "26" [ref=e562]
            - cell "81,410 gp" [ref=e563]
            - cell "Free" [ref=e564]
          - row [ref=e565]:
            - cell [ref=e566]:
              - strong [ref=e567]: Mill Avenue 1 (Shop)
            - cell "26 sqm" [ref=e568]
            - cell "1" [ref=e569]
            - cell "2,600 gp" [ref=e570]
            - cell "Free" [ref=e571]
          - row [ref=e572]:
            - cell [ref=e573]:
              - strong [ref=e574]: Mill Avenue 2 (Shop)
            - cell "45 sqm" [ref=e575]
            - cell "2" [ref=e576]
            - cell "4,600 gp" [ref=e577]
            - cell "Free" [ref=e578]
          - row [ref=e579]:
            - cell [ref=e580]:
              - strong [ref=e581]: Mill Avenue 3
            - cell "26 sqm" [ref=e582]
            - cell "2" [ref=e583]
            - cell "2,700 gp" [ref=e584]
            - cell "Free" [ref=e585]
          - row [ref=e586]:
            - cell [ref=e587]:
              - strong [ref=e588]: Mill Avenue 4
            - cell "26 sqm" [ref=e589]
            - cell "2" [ref=e590]
            - cell "2,700 gp" [ref=e591]
            - cell "Free" [ref=e592]
          - row [ref=e593]:
            - cell [ref=e594]:
              - strong [ref=e595]: Mill Avenue 5
            - cell "59 sqm" [ref=e596]
            - cell "4" [ref=e597]
            - cell "6,200 gp" [ref=e598]
            - cell "Free" [ref=e599]
          - row [ref=e600]:
            - cell [ref=e601]:
              - strong [ref=e602]: Snake Tower
            - cell "616 sqm" [ref=e603]
            - cell "21" [ref=e604]
            - cell "57,440 gp" [ref=e605]
            - cell "Free" [ref=e606]
          - row [ref=e607]:
            - cell [ref=e608]:
              - strong [ref=e609]: Sorcerer's Avenue 1a
            - cell "21 sqm" [ref=e610]
            - cell "2" [ref=e611]
            - cell "2,410 gp" [ref=e612]
            - cell "Free" [ref=e613]
          - row [ref=e614]:
            - cell [ref=e615]:
              - strong [ref=e616]: Sorcerer's Avenue 1b
            - cell "17 sqm" [ref=e617]
            - cell "2" [ref=e618]
            - cell "1,970 gp" [ref=e619]
            - cell "Free" [ref=e620]
          - row [ref=e621]:
            - cell [ref=e622]:
              - strong [ref=e623]: Sorcerer's Avenue 1c
            - cell "21 sqm" [ref=e624]
            - cell "2" [ref=e625]
            - cell "2,410 gp" [ref=e626]
            - cell "Free" [ref=e627]
          - row [ref=e628]:
            - cell [ref=e629]:
              - strong [ref=e630]: Sorcerer's Avenue 5
            - cell "49 sqm" [ref=e631]
            - cell "1" [ref=e632]
            - cell "5,390 gp" [ref=e633]
            - cell "Free" [ref=e634]
          - row [ref=e635]:
            - cell [ref=e636]:
              - strong [ref=e637]: Sorcerer's Avenue Labs 2a
            - cell "13 sqm" [ref=e638]
            - cell "1" [ref=e639]
            - cell "1,430 gp" [ref=e640]
            - cell "Free" [ref=e641]
          - row [ref=e642]:
            - cell [ref=e643]:
              - strong [ref=e644]: Sorcerer's Avenue Labs 2b
            - cell "13 sqm" [ref=e645]
            - cell "1" [ref=e646]
            - cell "1,430 gp" [ref=e647]
            - cell "Free" [ref=e648]
          - row [ref=e649]:
            - cell [ref=e650]:
              - strong [ref=e651]: Sorcerer's Avenue Labs 2c
            - cell "13 sqm" [ref=e652]
            - cell "1" [ref=e653]
            - cell "1,430 gp" [ref=e654]
            - cell "Free" [ref=e655]
          - row [ref=e656]:
            - cell [ref=e657]:
              - strong [ref=e658]: Sorcerer's Avenue Labs 2d
            - cell "13 sqm" [ref=e659]
            - cell "1" [ref=e660]
            - cell "1,430 gp" [ref=e661]
            - cell "Free" [ref=e662]
          - row [ref=e663]:
            - cell [ref=e664]:
              - strong [ref=e665]: Sorcerer's Avenue Labs 2e
            - cell "13 sqm" [ref=e666]
            - cell "1" [ref=e667]
            - cell "1,430 gp" [ref=e668]
            - cell "Free" [ref=e669]
          - row [ref=e670]:
            - cell [ref=e671]:
              - strong [ref=e672]: Sorcerer's Avenue Labs 2f
            - cell "13 sqm" [ref=e673]
            - cell "1" [ref=e674]
            - cell "1,430 gp" [ref=e675]
            - cell "Free" [ref=e676]
          - row [ref=e677]:
            - cell [ref=e678]:
              - strong [ref=e679]: Southern Thais Guildhall
            - cell "346 sqm" [ref=e680]
            - cell "16" [ref=e681]
            - cell "43,020 gp" [ref=e682]
            - cell "Free" [ref=e683]
          - row [ref=e684]:
            - cell [ref=e685]:
              - strong [ref=e686]: Spiritkeep
            - cell "378 sqm" [ref=e687]
            - cell "23" [ref=e688]
            - cell "36,220 gp" [ref=e689]
            - cell [ref=e690]:
              - link "Sir Bartholomew Longname" [ref=e691] [cursor=pointer]:
                - /url: /characters/Sir%20Bartholomew%20Longname
          - row [ref=e692]:
            - cell [ref=e693]:
              - strong [ref=e694]: Sunset Homes, Flat 01
            - cell "13 sqm" [ref=e695]
            - cell "1" [ref=e696]
            - cell "1,040 gp" [ref=e697]
            - cell "Free" [ref=e698]
          - row [ref=e699]:
            - cell [ref=e700]:
              - strong [ref=e701]: Sunset Homes, Flat 02
            - cell "13 sqm" [ref=e702]
            - cell "1" [ref=e703]
            - cell "1,040 gp" [ref=e704]
            - cell "Free" [ref=e705]
          - row [ref=e706]:
            - cell [ref=e707]:
              - strong [ref=e708]: Sunset Homes, Flat 03
            - cell "13 sqm" [ref=e709]
            - cell "1" [ref=e710]
            - cell "1,040 gp" [ref=e711]
            - cell "Free" [ref=e712]
          - row [ref=e713]:
            - cell [ref=e714]:
              - strong [ref=e715]: Sunset Homes, Flat 11
            - cell "13 sqm" [ref=e716]
            - cell "1" [ref=e717]
            - cell "1,040 gp" [ref=e718]
            - cell "Free" [ref=e719]
          - row [ref=e720]:
            - cell [ref=e721]:
              - strong [ref=e722]: Sunset Homes, Flat 12
            - cell "13 sqm" [ref=e723]
            - cell "1" [ref=e724]
            - cell "1,040 gp" [ref=e725]
            - cell "Free" [ref=e726]
          - row [ref=e727]:
            - cell [ref=e728]:
              - strong [ref=e729]: Sunset Homes, Flat 13
            - cell "19 sqm" [ref=e730]
            - cell "2" [ref=e731]
            - cell "1,620 gp" [ref=e732]
            - cell "Free" [ref=e733]
          - row [ref=e734]:
            - cell [ref=e735]:
              - strong [ref=e736]: Sunset Homes, Flat 14
            - cell "13 sqm" [ref=e737]
            - cell "1" [ref=e738]
            - cell "1,040 gp" [ref=e739]
            - cell "Free" [ref=e740]
          - row [ref=e741]:
            - cell [ref=e742]:
              - strong [ref=e743]: Sunset Homes, Flat 21
            - cell "13 sqm" [ref=e744]
            - cell "1" [ref=e745]
            - cell "1,040 gp" [ref=e746]
            - cell "Free" [ref=e747]
          - row [ref=e748]:
            - cell [ref=e749]:
              - strong [ref=e750]: Sunset Homes, Flat 22
            - cell "13 sqm" [ref=e751]
            - cell "1" [ref=e752]
            - cell "1,040 gp" [ref=e753]
            - cell "Free" [ref=e754]
          - row [ref=e755]:
            - cell [ref=e756]:
              - strong [ref=e757]: Sunset Homes, Flat 23
            - cell "19 sqm" [ref=e758]
            - cell "2" [ref=e759]
            - cell "1,620 gp" [ref=e760]
            - cell "Free" [ref=e761]
          - row [ref=e762]:
            - cell [ref=e763]:
              - strong [ref=e764]: Sunset Homes, Flat 24
            - cell "13 sqm" [ref=e765]
            - cell "1" [ref=e766]
            - cell "1,040 gp" [ref=e767]
            - cell "Free" [ref=e768]
          - row [ref=e769]:
            - cell [ref=e770]:
              - strong [ref=e771]: Thais Clanhall
            - cell "188 sqm" [ref=e772]
            - cell "10" [ref=e773]
            - cell "15,940 gp" [ref=e774]
            - cell "Free" [ref=e775]
          - row [ref=e776]:
            - cell [ref=e777]:
              - strong [ref=e778]: Thais Hostel
            - cell "117 sqm" [ref=e779]
            - cell "24" [ref=e780]
            - cell "11,660 gp" [ref=e781]
            - cell "Free" [ref=e782]
          - row [ref=e783]:
            - cell [ref=e784]:
              - strong [ref=e785]: The City Wall 1a
            - cell "26 sqm" [ref=e786]
            - cell "2" [ref=e787]
            - cell "2,440 gp" [ref=e788]
            - cell "Free" [ref=e789]
          - row [ref=e790]:
            - cell [ref=e791]:
              - strong [ref=e792]: The City Wall 1b
            - cell "26 sqm" [ref=e793]
            - cell "2" [ref=e794]
            - cell "2,440 gp" [ref=e795]
            - cell "Free" [ref=e796]
          - row [ref=e797]:
            - cell [ref=e798]:
              - strong [ref=e799]: The City Wall 3a
            - cell "21 sqm" [ref=e800]
            - cell "2" [ref=e801]
            - cell "1,990 gp" [ref=e802]
            - cell "Free" [ref=e803]
          - row [ref=e804]:
            - cell [ref=e805]:
              - strong [ref=e806]: The City Wall 3b
            - cell "21 sqm" [ref=e807]
            - cell "2" [ref=e808]
            - cell "1,990 gp" [ref=e809]
            - cell "Free" [ref=e810]
          - row [ref=e811]:
            - cell [ref=e812]:
              - strong [ref=e813]: The City Wall 3c
            - cell "21 sqm" [ref=e814]
            - cell "2" [ref=e815]
            - cell "1,990 gp" [ref=e816]
            - cell "Free" [ref=e817]
          - row [ref=e818]:
            - cell [ref=e819]:
              - strong [ref=e820]: The City Wall 3d
            - cell "21 sqm" [ref=e821]
            - cell "2" [ref=e822]
            - cell "1,990 gp" [ref=e823]
            - cell "Free" [ref=e824]
          - row [ref=e825]:
            - cell [ref=e826]:
              - strong [ref=e827]: The City Wall 3e
            - cell "21 sqm" [ref=e828]
            - cell "2" [ref=e829]
            - cell "1,990 gp" [ref=e830]
            - cell "Free" [ref=e831]
          - row [ref=e832]:
            - cell [ref=e833]:
              - strong [ref=e834]: The City Wall 3f
            - cell "21 sqm" [ref=e835]
            - cell "2" [ref=e836]
            - cell "1,990 gp" [ref=e837]
            - cell "Free" [ref=e838]
          - row [ref=e839]:
            - cell [ref=e840]:
              - strong [ref=e841]: The City Wall 5a
            - cell "13 sqm" [ref=e842]
            - cell "1" [ref=e843]
            - cell "1,170 gp" [ref=e844]
            - cell "Free" [ref=e845]
          - row [ref=e846]:
            - cell [ref=e847]:
              - strong [ref=e848]: The City Wall 5b
            - cell "13 sqm" [ref=e849]
            - cell "1" [ref=e850]
            - cell "1,170 gp" [ref=e851]
            - cell "Free" [ref=e852]
          - row [ref=e853]:
            - cell [ref=e854]:
              - strong [ref=e855]: The City Wall 5c
            - cell "13 sqm" [ref=e856]
            - cell "1" [ref=e857]
            - cell "1,170 gp" [ref=e858]
            - cell "Free" [ref=e859]
          - row [ref=e860]:
            - cell [ref=e861]:
              - strong [ref=e862]: The City Wall 5d
            - cell "13 sqm" [ref=e863]
            - cell "1" [ref=e864]
            - cell "1,170 gp" [ref=e865]
            - cell "Free" [ref=e866]
          - row [ref=e867]:
            - cell [ref=e868]:
              - strong [ref=e869]: The City Wall 5e
            - cell "13 sqm" [ref=e870]
            - cell "1" [ref=e871]
            - cell "1,170 gp" [ref=e872]
            - cell "Free" [ref=e873]
          - row [ref=e874]:
            - cell [ref=e875]:
              - strong [ref=e876]: The City Wall 5f
            - cell "13 sqm" [ref=e877]
            - cell "1" [ref=e878]
            - cell "1,170 gp" [ref=e879]
            - cell "Free" [ref=e880]
          - row [ref=e881]:
            - cell [ref=e882]:
              - strong [ref=e883]: The City Wall 7a
            - cell "13 sqm" [ref=e884]
            - cell "1" [ref=e885]
            - cell "1,170 gp" [ref=e886]
            - cell "Free" [ref=e887]
          - row [ref=e888]:
            - cell [ref=e889]:
              - strong [ref=e890]: The City Wall 7b
            - cell "13 sqm" [ref=e891]
            - cell "1" [ref=e892]
            - cell "1,170 gp" [ref=e893]
            - cell "Free" [ref=e894]
          - row [ref=e895]:
            - cell [ref=e896]:
              - strong [ref=e897]: The City Wall 7c
            - cell "17 sqm" [ref=e898]
            - cell "2" [ref=e899]
            - cell "1,630 gp" [ref=e900]
            - cell "Free" [ref=e901]
          - row [ref=e902]:
            - cell [ref=e903]:
              - strong [ref=e904]: The City Wall 7d
            - cell "17 sqm" [ref=e905]
            - cell "2" [ref=e906]
            - cell "1,630 gp" [ref=e907]
            - cell "Free" [ref=e908]
          - row [ref=e909]:
            - cell [ref=e910]:
              - strong [ref=e911]: The City Wall 7e
            - cell "17 sqm" [ref=e912]
            - cell "2" [ref=e913]
            - cell "1,630 gp" [ref=e914]
            - cell "Free" [ref=e915]
          - row [ref=e916]:
            - cell [ref=e917]:
              - strong [ref=e918]: The City Wall 7f
            - cell "17 sqm" [ref=e919]
            - cell "2" [ref=e920]
            - cell "1,630 gp" [ref=e921]
            - cell "Free" [ref=e922]
          - row [ref=e923]:
            - cell [ref=e924]:
              - strong [ref=e925]: The City Wall 7g
            - cell "13 sqm" [ref=e926]
            - cell "1" [ref=e927]
            - cell "1,170 gp" [ref=e928]
            - cell "Free" [ref=e929]
          - row [ref=e930]:
            - cell [ref=e931]:
              - strong [ref=e932]: The City Wall 7h
            - cell "13 sqm" [ref=e933]
            - cell "1" [ref=e934]
            - cell "1,170 gp" [ref=e935]
            - cell "Free" [ref=e936]
          - row [ref=e937]:
            - cell [ref=e938]:
              - strong [ref=e939]: The City Wall 9
            - cell "19 sqm" [ref=e940]
            - cell "2" [ref=e941]
            - cell "1,810 gp" [ref=e942]
            - cell "Free" [ref=e943]
          - row [ref=e944]:
            - cell [ref=e945]:
              - strong [ref=e946]: The Tibianic
            - cell "540 sqm" [ref=e947]
            - cell "22" [ref=e948]
            - cell "66,900 gp" [ref=e949]
            - cell "Free" [ref=e950]
          - row [ref=e951]:
            - cell [ref=e952]:
              - strong [ref=e953]: Upper Swamp Lane 10
            - cell "31 sqm" [ref=e954]
            - cell "3" [ref=e955]
            - cell "3,920 gp" [ref=e956]
            - cell "Free" [ref=e957]
          - row [ref=e958]:
            - cell [ref=e959]:
              - strong [ref=e960]: Upper Swamp Lane 12
            - cell "60 sqm" [ref=e961]
            - cell "3" [ref=e962]
            - cell "7,400 gp" [ref=e963]
            - cell "Free" [ref=e964]
          - row [ref=e965]:
            - cell [ref=e966]:
              - strong [ref=e967]: Upper Swamp Lane 2
            - cell "74 sqm" [ref=e968]
            - cell "4" [ref=e969]
            - cell "9,180 gp" [ref=e970]
            - cell "Free" [ref=e971]
          - row [ref=e972]:
            - cell [ref=e973]:
              - strong [ref=e974]: Upper Swamp Lane 4
            - cell "74 sqm" [ref=e975]
            - cell "4" [ref=e976]
            - cell "9,180 gp" [ref=e977]
            - cell "Free" [ref=e978]
          - row [ref=e979]:
            - cell [ref=e980]:
              - strong [ref=e981]: Upper Swamp Lane 8
            - cell "132 sqm" [ref=e982]
            - cell "3" [ref=e983]
            - cell "16,040 gp" [ref=e984]
            - cell "Free" [ref=e985]
          - row [ref=e986]:
            - cell [ref=e987]:
              - strong [ref=e988]: Warriors Guildhall
            - cell "305 sqm" [ref=e989]
            - cell "11" [ref=e990]
            - cell "28,450 gp" [ref=e991]
            - cell "Free" [ref=e992]
    - paragraph [ref=e993]: "Houses are bought in the game: stand in the house and say !buyhouse."
  - contentinfo [ref=e994]:
    - generic [ref=e995]:
      - generic [ref=e996]: Elderwood · A fan-run server, not affiliated with CipSoft.
      - navigation "Footer" [ref=e997]:
        - link "Rules" [ref=e998] [cursor=pointer]:
          - /url: /rules
        - link "Houses" [ref=e999] [cursor=pointer]:
          - /url: /houses
        - link "Latest deaths" [ref=e1000] [cursor=pointer]:
          - /url: /deaths
        - link "Support" [ref=e1001] [cursor=pointer]:
          - /url: /support
        - link "Privacy" [ref=e1002] [cursor=pointer]:
          - /url: /privacy
      - generic [ref=e1003]:
        - generic [ref=e1004]: Colours
        - combobox "Colours" [ref=e1005]:
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
      |                                                                             ^ Error: /houses fits 393px
  168 | 				});
  169 | 			}
  170 | 		});
  171 | 	}
  172 | }
  173 | 
```