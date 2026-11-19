# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: layout.spec.ts >> 360px, god >> /admin/files?file=data%2FXML%2Fcommands.xml
- Location: tests/layout.spec.ts:159:5

# Error details

```
Error: /admin/files?file=data%2FXML%2Fcommands.xml fits 360px

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 21

- Array []
+ Array [
+   "scrolls sideways: <nav.side> \"OVERVIEW DashboardSERVER ConsoleServer f\" is 1502px in 360px",
+   "off screen: <div.group> \"SERVER ConsoleServer filesMonstersLibrar\" spans 105..765px",
+   "off screen: <a> \"Monsters\" spans 282..365px",
+   "off screen: <a> \"Library\" spans 367..433px",
+   "off screen: <a> \"Pending changes\" spans 435..569px",
+   "off screen: <a> \"Config & rates\" spans 571..686px",
+   "off screen: <a> \"Backups\" spans 688..765px",
+   "off screen: <div.group> \"PLAYERS Players & accountsReports1Client\" spans 769..1204px",
+   "off screen: <a> \"Players & accounts\" spans 769..917px",
+   "off screen: <a> \"Reports1\" spans 919..1013px",
+   "off screen: <span.count.mono> \"1\" spans 982..1003px",
+   "off screen: <a> \"Client reports1\" spans 1015..1148px",
+   "off screen: <span.count.mono> \"1\" spans 1117..1138px",
+   "off screen: <a> \"Bans\" spans 1150..1204px",
+   "off screen: <div.group> \"CONTENT News posts\" spans 1208..1306px",
+   "off screen: <a> \"News posts\" spans 1208..1306px",
+   "off screen: <div.group> \"SYSTEM Audit logStaff & roles\" spans 1310..1494px",
+   "off screen: <a> \"Audit log\" spans 1310..1389px",
+   "off screen: <a> \"Staff & roles\" spans 1391..1494px",
+ ]
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e5]:
    - link "Elderwood ADMIN" [ref=e6] [cursor=pointer]:
      - /url: /admin
      - generic [ref=e7]: Elderwood
      - generic [ref=e8]: ADMIN
    - search [ref=e9]:
      - generic [ref=e10]: Search players and accounts
      - searchbox "Search players and accounts" [ref=e11]
    - generic [ref=e12]:
      - link "View site ↗" [ref=e13] [cursor=pointer]:
        - /url: /
      - generic [ref=e14]:
        - generic [ref=e15]: GD
        - text: layoutgod
        - generic [ref=e16]: · God
  - generic [ref=e17]:
    - navigation "Admin" [ref=e18]:
      - link "Dashboard" [ref=e20] [cursor=pointer]:
        - /url: /admin
      - generic [ref=e21]:
        - link "Console" [ref=e22] [cursor=pointer]:
          - /url: /admin/log
        - link "Server files" [ref=e23] [cursor=pointer]:
          - /url: /admin/files
        - link "Monsters" [ref=e24] [cursor=pointer]:
          - /url: /admin/monsters
        - link "Library" [ref=e25] [cursor=pointer]:
          - /url: /admin/library
        - link "Pending changes" [ref=e26] [cursor=pointer]:
          - /url: /admin/changes
        - link "Config & rates" [ref=e27] [cursor=pointer]:
          - /url: /admin/config
        - link "Backups" [ref=e28] [cursor=pointer]:
          - /url: /admin/backups
      - generic [ref=e29]:
        - link "Players & accounts" [ref=e30] [cursor=pointer]:
          - /url: /admin/players
        - link "Reports 1" [ref=e31] [cursor=pointer]:
          - /url: /admin/reports
          - text: Reports
          - generic [ref=e32]: "1"
        - link "Client reports 1" [ref=e33] [cursor=pointer]:
          - /url: /admin/client-reports
          - text: Client reports
          - generic [ref=e34]: "1"
        - link "Bans" [ref=e35] [cursor=pointer]:
          - /url: /admin/bans
      - link "News posts" [ref=e37] [cursor=pointer]:
        - /url: /admin/news
      - generic [ref=e38]:
        - link "Audit log" [ref=e39] [cursor=pointer]:
          - /url: /admin/audit
        - link "Staff & roles" [ref=e40] [cursor=pointer]:
          - /url: /admin/staff
    - main [ref=e41]:
      - generic [ref=e42]:
        - generic [ref=e43]:
          - heading "Server files" [level=1] [ref=e44]
          - paragraph [ref=e45]:
            - text: Edits are versioned and go live at the next server save. Files the server can reload can go live at once. See
            - link "Pending changes" [ref=e46] [cursor=pointer]:
              - /url: /admin/changes
            - text: .
        - generic [ref=e47]:
          - generic [ref=e48]:
            - text: New file
            - textbox "New file" [ref=e49]:
              - /placeholder: data/talkactions/scripts/hello.lua
          - button "Create" [ref=e50] [cursor=pointer]
      - generic [ref=e51]:
        - generic [ref=e52]:
          - searchbox "Filter files" [ref=e54]
          - list [ref=e55]:
            - listitem [ref=e56]:
              - link ".gitignore" [ref=e57] [cursor=pointer]:
                - /url: "?file=.gitignore"
            - listitem [ref=e58]:
              - link "config.lua" [ref=e59] [cursor=pointer]:
                - /url: "?file=config.lua"
            - listitem [ref=e60]:
              - link "data/XML/commands.xml" [ref=e61] [cursor=pointer]:
                - /url: "?file=data%2FXML%2Fcommands.xml"
            - listitem [ref=e62]:
              - link "data/XML/groups.xml" [ref=e63] [cursor=pointer]:
                - /url: "?file=data%2FXML%2Fgroups.xml"
            - listitem [ref=e64]:
              - link "data/XML/outfits.xml" [ref=e65] [cursor=pointer]:
                - /url: "?file=data%2FXML%2Foutfits.xml"
            - listitem [ref=e66]:
              - link "data/XML/quests.xml" [ref=e67] [cursor=pointer]:
                - /url: "?file=data%2FXML%2Fquests.xml"
            - listitem [ref=e68]:
              - link "data/XML/stages.xml" [ref=e69] [cursor=pointer]:
                - /url: "?file=data%2FXML%2Fstages.xml"
            - listitem [ref=e70]:
              - link "data/XML/vocations.xml" [ref=e71] [cursor=pointer]:
                - /url: "?file=data%2FXML%2Fvocations.xml"
            - listitem [ref=e72]:
              - link "data/actions/actions.xml" [ref=e73] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Factions.xml"
            - listitem [ref=e74]:
              - link "data/actions/lib/actions.lua" [ref=e75] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Flib%2Factions.lua"
            - listitem [ref=e76]:
              - link "data/actions/scripts/liberty_bay/cult_hymn.lua" [ref=e77] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fliberty_bay%2Fcult_hymn.lua"
            - listitem [ref=e78]:
              - link "data/actions/scripts/liberty_bay/cult_piano_teleport.lua" [ref=e79] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fliberty_bay%2Fcult_piano_teleport.lua"
            - listitem [ref=e80]:
              - link "data/actions/scripts/meriana_quest/pirate_map.lua" [ref=e81] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmeriana_quest%2Fpirate_map.lua"
            - listitem [ref=e82]:
              - link "data/actions/scripts/meriana_quest/tortoise_egg.lua" [ref=e83] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmeriana_quest%2Ftortoise_egg.lua"
            - listitem [ref=e84]:
              - link "data/actions/scripts/misc/baking.lua" [ref=e85] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fbaking.lua"
            - listitem [ref=e86]:
              - link "data/actions/scripts/misc/birdcage.lua" [ref=e87] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fbirdcage.lua"
            - listitem [ref=e88]:
              - link "data/actions/scripts/misc/blueberry_bush.lua" [ref=e89] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fblueberry_bush.lua"
            - listitem [ref=e90]:
              - link "data/actions/scripts/misc/botanist_container.lua" [ref=e91] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fbotanist_container.lua"
            - listitem [ref=e92]:
              - link "data/actions/scripts/misc/butterfly_conservation_kit.lua" [ref=e93] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fbutterfly_conservation_kit.lua"
            - listitem [ref=e94]:
              - link "data/actions/scripts/misc/catch_fish.lua" [ref=e95] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fcatch_fish.lua"
            - listitem [ref=e96]:
              - link "data/actions/scripts/misc/ceirons_waterskin.lua" [ref=e97] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fceirons_waterskin.lua"
            - listitem [ref=e98]:
              - link "data/actions/scripts/misc/ceremonial_ankh.lua" [ref=e99] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fceremonial_ankh.lua"
            - listitem [ref=e100]:
              - link "data/actions/scripts/misc/changegold.lua" [ref=e101] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fchangegold.lua"
            - listitem [ref=e102]:
              - link "data/actions/scripts/misc/chests.lua" [ref=e103] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fchests.lua"
            - listitem [ref=e104]:
              - link "data/actions/scripts/misc/christmas_bundle.lua" [ref=e105] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fchristmas_bundle.lua"
            - listitem [ref=e106]:
              - link "data/actions/scripts/misc/christmas_card.lua" [ref=e107] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fchristmas_card.lua"
            - listitem [ref=e108]:
              - link "data/actions/scripts/misc/closed_trap.lua" [ref=e109] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fclosed_trap.lua"
            - listitem [ref=e110]:
              - link "data/actions/scripts/misc/concentrated_demonic_blood.lua" [ref=e111] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fconcentrated_demonic_blood.lua"
            - listitem [ref=e112]:
              - link "data/actions/scripts/misc/cornucopia.lua" [ref=e113] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fcornucopia.lua"
            - listitem [ref=e114]:
              - link "data/actions/scripts/misc/crowbar.lua" [ref=e115] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fcrowbar.lua"
            - listitem [ref=e116]:
              - link "data/actions/scripts/misc/dice.lua" [ref=e117] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fdice.lua"
            - listitem [ref=e118]:
              - link "data/actions/scripts/misc/distilling_rum.lua" [ref=e119] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fdistilling_rum.lua"
            - listitem [ref=e120]:
              - link "data/actions/scripts/misc/djinn_quest_pass.lua" [ref=e121] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fdjinn_quest_pass.lua"
            - listitem [ref=e122]:
              - link "data/actions/scripts/misc/dolls.lua" [ref=e123] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fdolls.lua"
            - listitem [ref=e124]:
              - link "data/actions/scripts/misc/doors.lua" [ref=e125] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fdoors.lua"
            - listitem [ref=e126]:
              - link "data/actions/scripts/misc/ectoplasm_container.lua" [ref=e127] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fectoplasm_container.lua"
            - listitem [ref=e128]:
              - link "data/actions/scripts/misc/fire_bug.lua" [ref=e129] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Ffire_bug.lua"
            - listitem [ref=e130]:
              - link "data/actions/scripts/misc/fireworks_rocket.lua" [ref=e131] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Ffireworks_rocket.lua"
            - listitem [ref=e132]:
              - link "data/actions/scripts/misc/fishing_rod.lua" [ref=e133] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Ffishing_rod.lua"
            - listitem [ref=e134]:
              - link "data/actions/scripts/misc/fluids.lua" [ref=e135] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Ffluids.lua"
            - listitem [ref=e136]:
              - link "data/actions/scripts/misc/food.lua" [ref=e137] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Ffood.lua"
            - listitem [ref=e138]:
              - link "data/actions/scripts/misc/furniture_parcels.lua" [ref=e139] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Ffurniture_parcels.lua"
            - listitem [ref=e140]:
              - link "data/actions/scripts/misc/helmet_of_the_ancients.lua" [ref=e141] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fhelmet_of_the_ancients.lua"
            - listitem [ref=e142]:
              - link "data/actions/scripts/misc/ice_pick.lua" [ref=e143] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fice_pick.lua"
            - listitem [ref=e144]:
              - link "data/actions/scripts/misc/instruments.lua" [ref=e145] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Finstruments.lua"
            - listitem [ref=e146]:
              - link "data/actions/scripts/misc/juice_squeezer.lua" [ref=e147] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fjuice_squeezer.lua"
            - listitem [ref=e148]:
              - link "data/actions/scripts/misc/key.lua" [ref=e149] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fkey.lua"
            - listitem [ref=e150]:
              - link "data/actions/scripts/misc/knife.lua" [ref=e151] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fknife.lua"
            - listitem [ref=e152]:
              - link "data/actions/scripts/misc/letter_bag.lua" [ref=e153] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fletter_bag.lua"
            - listitem [ref=e154]:
              - link "data/actions/scripts/misc/lottery_ticket.lua" [ref=e155] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Flottery_ticket.lua"
            - listitem [ref=e156]:
              - link "data/actions/scripts/misc/machete.lua" [ref=e157] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fmachete.lua"
            - listitem [ref=e158]:
              - link "data/actions/scripts/misc/open_trap.lua" [ref=e159] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fopen_trap.lua"
            - listitem [ref=e160]:
              - link "data/actions/scripts/misc/party_cake.lua" [ref=e161] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fparty_cake.lua"
            - listitem [ref=e162]:
              - link "data/actions/scripts/misc/party_hat.lua" [ref=e163] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fparty_hat.lua"
            - listitem [ref=e164]:
              - link "data/actions/scripts/misc/pick.lua" [ref=e165] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fpick.lua"
            - listitem [ref=e166]:
              - link "data/actions/scripts/misc/postman_quest_pass.lua" [ref=e167] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fpostman_quest_pass.lua"
            - listitem [ref=e168]:
              - link "data/actions/scripts/misc/present.lua" [ref=e169] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fpresent.lua"
            - listitem [ref=e170]:
              - link "data/actions/scripts/misc/pumpkin_head.lua" [ref=e171] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fpumpkin_head.lua"
            - listitem [ref=e172]:
              - link "data/actions/scripts/misc/rake.lua" [ref=e173] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Frake.lua"
            - listitem [ref=e174]:
              - link "data/actions/scripts/misc/rookgard_skip.lua" [ref=e175] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Frookgard_skip.lua"
            - listitem [ref=e176]:
              - link "data/actions/scripts/misc/rope.lua" [ref=e177] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Frope.lua"
            - listitem [ref=e178]:
              - link "data/actions/scripts/misc/sabrehaven_talon.lua" [ref=e179] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fsabrehaven_talon.lua"
            - listitem [ref=e180]:
              - link "data/actions/scripts/misc/scythe.lua" [ref=e181] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fscythe.lua"
            - listitem [ref=e182]:
              - link "data/actions/scripts/misc/sheet_of_tracing_paper.lua" [ref=e183] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fsheet_of_tracing_paper.lua"
            - listitem [ref=e184]:
              - link "data/actions/scripts/misc/shop_points_scroll.lua" [ref=e185] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fshop_points_scroll.lua"
            - listitem [ref=e186]:
              - link "data/actions/scripts/misc/shovel.lua" [ref=e187] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fshovel.lua"
            - listitem [ref=e188]:
              - link "data/actions/scripts/misc/skill_trainer.lua" [ref=e189] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fskill_trainer.lua"
            - listitem [ref=e190]:
              - link "data/actions/scripts/misc/skinning_dusting.lua" [ref=e191] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fskinning_dusting.lua"
            - listitem [ref=e192]:
              - link "data/actions/scripts/misc/skull_candle.lua" [ref=e193] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fskull_candle.lua"
            - listitem [ref=e194]:
              - link "data/actions/scripts/misc/snake_destroyer.lua" [ref=e195] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fsnake_destroyer.lua"
            - listitem [ref=e196]:
              - link "data/actions/scripts/misc/snowheap.lua" [ref=e197] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fsnowheap.lua"
            - listitem [ref=e198]:
              - link "data/actions/scripts/misc/special_rights.lua" [ref=e199] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fspecial_rights.lua"
            - listitem [ref=e200]:
              - link "data/actions/scripts/misc/spectral_stone.lua" [ref=e201] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fspectral_stone.lua"
            - listitem [ref=e202]:
              - link "data/actions/scripts/misc/spellbook.lua" [ref=e203] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fspellbook.lua"
            - listitem [ref=e204]:
              - link "data/actions/scripts/misc/strange_lever.lua" [ref=e205] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fstrange_lever.lua"
            - listitem [ref=e206]:
              - link "data/actions/scripts/misc/surprise_box.lua" [ref=e207] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fsurprise_box.lua"
            - listitem [ref=e208]:
              - link "data/actions/scripts/misc/teleporters.lua" [ref=e209] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fteleporters.lua"
            - listitem [ref=e210]:
              - link "data/actions/scripts/misc/time.lua" [ref=e211] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Ftime.lua"
            - listitem [ref=e212]:
              - link "data/actions/scripts/misc/used_lamp.lua" [ref=e213] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fused_lamp.lua"
            - listitem [ref=e214]:
              - link "data/actions/scripts/misc/water_pipe.lua" [ref=e215] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fwater_pipe.lua"
            - listitem [ref=e216]:
              - link "data/actions/scripts/misc/weapons.lua" [ref=e217] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fmisc%2Fweapons.lua"
            - listitem [ref=e218]:
              - link "data/actions/scripts/nostalrius/1.lua" [ref=e219] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F1.lua"
            - listitem [ref=e220]:
              - link "data/actions/scripts/nostalrius/10.lua" [ref=e221] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F10.lua"
            - listitem [ref=e222]:
              - link "data/actions/scripts/nostalrius/11.lua" [ref=e223] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F11.lua"
            - listitem [ref=e224]:
              - link "data/actions/scripts/nostalrius/12.lua" [ref=e225] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F12.lua"
            - listitem [ref=e226]:
              - link "data/actions/scripts/nostalrius/13.lua" [ref=e227] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F13.lua"
            - listitem [ref=e228]:
              - link "data/actions/scripts/nostalrius/14.lua" [ref=e229] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F14.lua"
            - listitem [ref=e230]:
              - link "data/actions/scripts/nostalrius/15.lua" [ref=e231] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F15.lua"
            - listitem [ref=e232]:
              - link "data/actions/scripts/nostalrius/16.lua" [ref=e233] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F16.lua"
            - listitem [ref=e234]:
              - link "data/actions/scripts/nostalrius/17.lua" [ref=e235] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F17.lua"
            - listitem [ref=e236]:
              - link "data/actions/scripts/nostalrius/18.lua" [ref=e237] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F18.lua"
            - listitem [ref=e238]:
              - link "data/actions/scripts/nostalrius/19.lua" [ref=e239] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F19.lua"
            - listitem [ref=e240]:
              - link "data/actions/scripts/nostalrius/2.lua" [ref=e241] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F2.lua"
            - listitem [ref=e242]:
              - link "data/actions/scripts/nostalrius/20.lua" [ref=e243] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F20.lua"
            - listitem [ref=e244]:
              - link "data/actions/scripts/nostalrius/21.lua" [ref=e245] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F21.lua"
            - listitem [ref=e246]:
              - link "data/actions/scripts/nostalrius/22.lua" [ref=e247] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F22.lua"
            - listitem [ref=e248]:
              - link "data/actions/scripts/nostalrius/23.lua" [ref=e249] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F23.lua"
            - listitem [ref=e250]:
              - link "data/actions/scripts/nostalrius/24.lua" [ref=e251] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F24.lua"
            - listitem [ref=e252]:
              - link "data/actions/scripts/nostalrius/25.lua" [ref=e253] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F25.lua"
            - listitem [ref=e254]:
              - link "data/actions/scripts/nostalrius/26.lua" [ref=e255] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F26.lua"
            - listitem [ref=e256]:
              - link "data/actions/scripts/nostalrius/27.lua" [ref=e257] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F27.lua"
            - listitem [ref=e258]:
              - link "data/actions/scripts/nostalrius/28.lua" [ref=e259] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F28.lua"
            - listitem [ref=e260]:
              - link "data/actions/scripts/nostalrius/29.lua" [ref=e261] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F29.lua"
            - listitem [ref=e262]:
              - link "data/actions/scripts/nostalrius/3.lua" [ref=e263] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F3.lua"
            - listitem [ref=e264]:
              - link "data/actions/scripts/nostalrius/30.lua" [ref=e265] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F30.lua"
            - listitem [ref=e266]:
              - link "data/actions/scripts/nostalrius/31.lua" [ref=e267] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F31.lua"
            - listitem [ref=e268]:
              - link "data/actions/scripts/nostalrius/32.lua" [ref=e269] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F32.lua"
            - listitem [ref=e270]:
              - link "data/actions/scripts/nostalrius/33.lua" [ref=e271] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F33.lua"
            - listitem [ref=e272]:
              - link "data/actions/scripts/nostalrius/34.lua" [ref=e273] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F34.lua"
            - listitem [ref=e274]:
              - link "data/actions/scripts/nostalrius/35.lua" [ref=e275] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F35.lua"
            - listitem [ref=e276]:
              - link "data/actions/scripts/nostalrius/36.lua" [ref=e277] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F36.lua"
            - listitem [ref=e278]:
              - link "data/actions/scripts/nostalrius/37.lua" [ref=e279] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F37.lua"
            - listitem [ref=e280]:
              - link "data/actions/scripts/nostalrius/38.lua" [ref=e281] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F38.lua"
            - listitem [ref=e282]:
              - link "data/actions/scripts/nostalrius/39.lua" [ref=e283] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F39.lua"
            - listitem [ref=e284]:
              - link "data/actions/scripts/nostalrius/4.lua" [ref=e285] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F4.lua"
            - listitem [ref=e286]:
              - link "data/actions/scripts/nostalrius/40.lua" [ref=e287] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F40.lua"
            - listitem [ref=e288]:
              - link "data/actions/scripts/nostalrius/41.lua" [ref=e289] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F41.lua"
            - listitem [ref=e290]:
              - link "data/actions/scripts/nostalrius/42.lua" [ref=e291] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F42.lua"
            - listitem [ref=e292]:
              - link "data/actions/scripts/nostalrius/43.lua" [ref=e293] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F43.lua"
            - listitem [ref=e294]:
              - link "data/actions/scripts/nostalrius/44.lua" [ref=e295] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F44.lua"
            - listitem [ref=e296]:
              - link "data/actions/scripts/nostalrius/45.lua" [ref=e297] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F45.lua"
            - listitem [ref=e298]:
              - link "data/actions/scripts/nostalrius/46.lua" [ref=e299] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F46.lua"
            - listitem [ref=e300]:
              - link "data/actions/scripts/nostalrius/47.lua" [ref=e301] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F47.lua"
            - listitem [ref=e302]:
              - link "data/actions/scripts/nostalrius/48.lua" [ref=e303] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F48.lua"
            - listitem [ref=e304]:
              - link "data/actions/scripts/nostalrius/49.lua" [ref=e305] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F49.lua"
            - listitem [ref=e306]:
              - link "data/actions/scripts/nostalrius/5.lua" [ref=e307] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F5.lua"
            - listitem [ref=e308]:
              - link "data/actions/scripts/nostalrius/50.lua" [ref=e309] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F50.lua"
            - listitem [ref=e310]:
              - link "data/actions/scripts/nostalrius/51.lua" [ref=e311] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F51.lua"
            - listitem [ref=e312]:
              - link "data/actions/scripts/nostalrius/52.lua" [ref=e313] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F52.lua"
            - listitem [ref=e314]:
              - link "data/actions/scripts/nostalrius/53.lua" [ref=e315] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F53.lua"
            - listitem [ref=e316]:
              - link "data/actions/scripts/nostalrius/54.lua" [ref=e317] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F54.lua"
            - listitem [ref=e318]:
              - link "data/actions/scripts/nostalrius/55.lua" [ref=e319] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F55.lua"
            - listitem [ref=e320]:
              - link "data/actions/scripts/nostalrius/56.lua" [ref=e321] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F56.lua"
            - listitem [ref=e322]:
              - link "data/actions/scripts/nostalrius/57.lua" [ref=e323] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F57.lua"
            - listitem [ref=e324]:
              - link "data/actions/scripts/nostalrius/58.lua" [ref=e325] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F58.lua"
            - listitem [ref=e326]:
              - link "data/actions/scripts/nostalrius/59.lua" [ref=e327] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F59.lua"
            - listitem [ref=e328]:
              - link "data/actions/scripts/nostalrius/6.lua" [ref=e329] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F6.lua"
            - listitem [ref=e330]:
              - link "data/actions/scripts/nostalrius/60.lua" [ref=e331] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F60.lua"
            - listitem [ref=e332]:
              - link "data/actions/scripts/nostalrius/61.lua" [ref=e333] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F61.lua"
            - listitem [ref=e334]:
              - link "data/actions/scripts/nostalrius/62.lua" [ref=e335] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F62.lua"
            - listitem [ref=e336]:
              - link "data/actions/scripts/nostalrius/63.lua" [ref=e337] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F63.lua"
            - listitem [ref=e338]:
              - link "data/actions/scripts/nostalrius/64.lua" [ref=e339] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F64.lua"
            - listitem [ref=e340]:
              - link "data/actions/scripts/nostalrius/65.lua" [ref=e341] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F65.lua"
            - listitem [ref=e342]:
              - link "data/actions/scripts/nostalrius/66.lua" [ref=e343] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F66.lua"
            - listitem [ref=e344]:
              - link "data/actions/scripts/nostalrius/67.lua" [ref=e345] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F67.lua"
            - listitem [ref=e346]:
              - link "data/actions/scripts/nostalrius/68.lua" [ref=e347] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F68.lua"
            - listitem [ref=e348]:
              - link "data/actions/scripts/nostalrius/69.lua" [ref=e349] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F69.lua"
            - listitem [ref=e350]:
              - link "data/actions/scripts/nostalrius/7.lua" [ref=e351] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F7.lua"
            - listitem [ref=e352]:
              - link "data/actions/scripts/nostalrius/70.lua" [ref=e353] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F70.lua"
            - listitem [ref=e354]:
              - link "data/actions/scripts/nostalrius/71.lua" [ref=e355] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F71.lua"
            - listitem [ref=e356]:
              - link "data/actions/scripts/nostalrius/72.lua" [ref=e357] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F72.lua"
            - listitem [ref=e358]:
              - link "data/actions/scripts/nostalrius/73.lua" [ref=e359] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F73.lua"
            - listitem [ref=e360]:
              - link "data/actions/scripts/nostalrius/74.lua" [ref=e361] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F74.lua"
            - listitem [ref=e362]:
              - link "data/actions/scripts/nostalrius/75.lua" [ref=e363] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F75.lua"
            - listitem [ref=e364]:
              - link "data/actions/scripts/nostalrius/76.lua" [ref=e365] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F76.lua"
            - listitem [ref=e366]:
              - link "data/actions/scripts/nostalrius/77.lua" [ref=e367] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F77.lua"
            - listitem [ref=e368]:
              - link "data/actions/scripts/nostalrius/78.lua" [ref=e369] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F78.lua"
            - listitem [ref=e370]:
              - link "data/actions/scripts/nostalrius/79.lua" [ref=e371] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F79.lua"
            - listitem [ref=e372]:
              - link "data/actions/scripts/nostalrius/8.lua" [ref=e373] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F8.lua"
            - listitem [ref=e374]:
              - link "data/actions/scripts/nostalrius/80.lua" [ref=e375] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F80.lua"
            - listitem [ref=e376]:
              - link "data/actions/scripts/nostalrius/81.lua" [ref=e377] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F81.lua"
            - listitem [ref=e378]:
              - link "data/actions/scripts/nostalrius/82.lua" [ref=e379] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F82.lua"
            - listitem [ref=e380]:
              - link "data/actions/scripts/nostalrius/83.lua" [ref=e381] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F83.lua"
            - listitem [ref=e382]:
              - link "data/actions/scripts/nostalrius/9.lua" [ref=e383] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F9.lua"
            - listitem [ref=e384]:
              - link "data/actions/scripts/nostalrius/_.lua" [ref=e385] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fnostalrius%2F_.lua"
            - listitem [ref=e386]:
              - link "data/actions/scripts/pits_of_inferno/bazirMazeLever.lua" [ref=e387] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fpits_of_inferno%2FbazirMazeLever.lua"
            - listitem [ref=e388]:
              - link "data/actions/scripts/pits_of_inferno/bazirMirror.lua" [ref=e389] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fpits_of_inferno%2FbazirMirror.lua"
            - listitem [ref=e390]:
              - link "data/actions/scripts/pits_of_inferno/bazirWrongLevers.lua" [ref=e391] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fpits_of_inferno%2FbazirWrongLevers.lua"
            - listitem [ref=e392]:
              - link "data/actions/scripts/pits_of_inferno/fireThroneLever.lua" [ref=e393] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fpits_of_inferno%2FfireThroneLever.lua"
            - listitem [ref=e394]:
              - link "data/actions/scripts/pits_of_inferno/hall_of_the_four_ways.lua" [ref=e395] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fpits_of_inferno%2Fhall_of_the_four_ways.lua"
            - listitem [ref=e396]:
              - link "data/actions/scripts/pits_of_inferno/ladderLevers.lua" [ref=e397] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fpits_of_inferno%2FladderLevers.lua"
            - listitem [ref=e398]:
              - link "data/actions/scripts/pits_of_inferno/levers.lua" [ref=e399] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fpits_of_inferno%2Flevers.lua"
            - listitem [ref=e400]:
              - link "data/actions/scripts/pits_of_inferno/mazeStone.lua" [ref=e401] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fpits_of_inferno%2FmazeStone.lua"
            - listitem [ref=e402]:
              - link "data/actions/scripts/pits_of_inferno/oil.lua" [ref=e403] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fpits_of_inferno%2Foil.lua"
            - listitem [ref=e404]:
              - link "data/actions/scripts/pits_of_inferno/stoneLever.lua" [ref=e405] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fpits_of_inferno%2FstoneLever.lua"
            - listitem [ref=e406]:
              - link "data/actions/scripts/pits_of_inferno/trapLever.lua" [ref=e407] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fpits_of_inferno%2FtrapLever.lua"
            - listitem [ref=e408]:
              - link "data/actions/scripts/serpentine_tower/behemoth_lever.lua" [ref=e409] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fserpentine_tower%2Fbehemoth_lever.lua"
            - listitem [ref=e410]:
              - link "data/actions/scripts/serpentine_tower/release_behemoth.lua" [ref=e411] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fserpentine_tower%2Frelease_behemoth.lua"
            - listitem [ref=e412]:
              - link "data/actions/scripts/serpentine_tower/release_fire_elemental.lua" [ref=e413] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fserpentine_tower%2Frelease_fire_elemental.lua"
            - listitem [ref=e414]:
              - link "data/actions/scripts/serpentine_tower/release_vampire.lua" [ref=e415] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fserpentine_tower%2Frelease_vampire.lua"
            - listitem [ref=e416]:
              - link "data/actions/scripts/serpentine_tower/vampire_lever.lua" [ref=e417] [cursor=pointer]:
                - /url: "?file=data%2Factions%2Fscripts%2Fserpentine_tower%2Fvampire_lever.lua"
            - listitem [ref=e418]:
              - link "data/chatchannels/chatchannels.xml" [ref=e419] [cursor=pointer]:
                - /url: "?file=data%2Fchatchannels%2Fchatchannels.xml"
            - listitem [ref=e420]:
              - link "data/chatchannels/scripts/englishchat.lua" [ref=e421] [cursor=pointer]:
                - /url: "?file=data%2Fchatchannels%2Fscripts%2Fenglishchat.lua"
            - listitem [ref=e422]:
              - link "data/chatchannels/scripts/gamemaster.lua" [ref=e423] [cursor=pointer]:
                - /url: "?file=data%2Fchatchannels%2Fscripts%2Fgamemaster.lua"
            - listitem [ref=e424]:
              - link "data/chatchannels/scripts/help.lua" [ref=e425] [cursor=pointer]:
                - /url: "?file=data%2Fchatchannels%2Fscripts%2Fhelp.lua"
            - listitem [ref=e426]:
              - link "data/chatchannels/scripts/ruleviolations.lua" [ref=e427] [cursor=pointer]:
                - /url: "?file=data%2Fchatchannels%2Fscripts%2Fruleviolations.lua"
            - listitem [ref=e428]:
              - link "data/chatchannels/scripts/trade.lua" [ref=e429] [cursor=pointer]:
                - /url: "?file=data%2Fchatchannels%2Fscripts%2Ftrade.lua"
            - listitem [ref=e430]:
              - link "data/chatchannels/scripts/tutor.lua" [ref=e431] [cursor=pointer]:
                - /url: "?file=data%2Fchatchannels%2Fscripts%2Ftutor.lua"
            - listitem [ref=e432]:
              - link "data/chatchannels/scripts/worldchat.lua" [ref=e433] [cursor=pointer]:
                - /url: "?file=data%2Fchatchannels%2Fscripts%2Fworldchat.lua"
            - listitem [ref=e434]:
              - link "data/creaturescripts/creaturescripts.xml" [ref=e435] [cursor=pointer]:
                - /url: "?file=data%2Fcreaturescripts%2Fcreaturescripts.xml"
            - listitem [ref=e436]:
              - link "data/creaturescripts/lib/creaturescripts.lua" [ref=e437] [cursor=pointer]:
                - /url: "?file=data%2Fcreaturescripts%2Flib%2Fcreaturescripts.lua"
            - listitem [ref=e438]:
              - link "data/creaturescripts/scripts/achievements.lua" [ref=e439] [cursor=pointer]:
                - /url: "?file=data%2Fcreaturescripts%2Fscripts%2Fachievements.lua"
            - listitem [ref=e440]:
              - link "data/creaturescripts/scripts/daily_hunts.lua" [ref=e441] [cursor=pointer]:
                - /url: "?file=data%2Fcreaturescripts%2Fscripts%2Fdaily_hunts.lua"
            - listitem [ref=e442]:
              - link "data/creaturescripts/scripts/daily_hunts_login.lua" [ref=e443] [cursor=pointer]:
                - /url: "?file=data%2Fcreaturescripts%2Fscripts%2Fdaily_hunts_login.lua"
            - listitem [ref=e444]:
              - link "data/creaturescripts/scripts/daily_hunts_opcode.lua" [ref=e445] [cursor=pointer]:
                - /url: "?file=data%2Fcreaturescripts%2Fscripts%2Fdaily_hunts_opcode.lua"
            - listitem [ref=e446]:
              - link "data/creaturescripts/scripts/firstitems.lua" [ref=e447] [cursor=pointer]:
                - /url: "?file=data%2Fcreaturescripts%2Fscripts%2Ffirstitems.lua"
            - listitem [ref=e448]:
              - link "data/creaturescripts/scripts/killing_in_the_name_of.lua" [ref=e449] [cursor=pointer]:
                - /url: "?file=data%2Fcreaturescripts%2Fscripts%2Fkilling_in_the_name_of.lua"
            - listitem [ref=e450]:
              - link "data/creaturescripts/scripts/login.lua" [ref=e451] [cursor=pointer]:
                - /url: "?file=data%2Fcreaturescripts%2Fscripts%2Flogin.lua"
            - listitem [ref=e452]:
              - link "data/creaturescripts/scripts/logout.lua" [ref=e453] [cursor=pointer]:
                - /url: "?file=data%2Fcreaturescripts%2Fscripts%2Flogout.lua"
            - listitem [ref=e454]:
              - link "data/creaturescripts/scripts/moments.lua" [ref=e455] [cursor=pointer]:
                - /url: "?file=data%2Fcreaturescripts%2Fscripts%2Fmoments.lua"
            - listitem [ref=e456]:
              - link "data/creaturescripts/scripts/offlinetraining.lua" [ref=e457] [cursor=pointer]:
                - /url: "?file=data%2Fcreaturescripts%2Fscripts%2Fofflinetraining.lua"
            - listitem [ref=e458]:
              - link "data/creaturescripts/scripts/playerdeath.lua" [ref=e459] [cursor=pointer]:
                - /url: "?file=data%2Fcreaturescripts%2Fscripts%2Fplayerdeath.lua"
            - listitem [ref=e460]:
              - link "data/creaturescripts/scripts/regeneratestamina.lua" [ref=e461] [cursor=pointer]:
                - /url: "?file=data%2Fcreaturescripts%2Fscripts%2Fregeneratestamina.lua"
            - listitem [ref=e462]:
              - link "data/creaturescripts/scripts/syncoutfit.lua" [ref=e463] [cursor=pointer]:
                - /url: "?file=data%2Fcreaturescripts%2Fscripts%2Fsyncoutfit.lua"
            - listitem [ref=e464]:
              - link "data/events/events.xml" [ref=e465] [cursor=pointer]:
                - /url: "?file=data%2Fevents%2Fevents.xml"
            - listitem [ref=e466]:
              - link "data/events/scripts/creature.lua" [ref=e467] [cursor=pointer]:
                - /url: "?file=data%2Fevents%2Fscripts%2Fcreature.lua"
            - listitem [ref=e468]:
              - link "data/events/scripts/party.lua" [ref=e469] [cursor=pointer]:
                - /url: "?file=data%2Fevents%2Fscripts%2Fparty.lua"
            - listitem [ref=e470]:
              - link "data/events/scripts/player.lua" [ref=e471] [cursor=pointer]:
                - /url: "?file=data%2Fevents%2Fscripts%2Fplayer.lua"
            - listitem [ref=e472]:
              - link "data/global.lua" [ref=e473] [cursor=pointer]:
                - /url: "?file=data%2Fglobal.lua"
            - listitem [ref=e474]:
              - link "data/globalevents/globalevents.xml" [ref=e475] [cursor=pointer]:
                - /url: "?file=data%2Fglobalevents%2Fglobalevents.xml"
            - listitem [ref=e476]:
              - link "data/globalevents/lib/globalevents.lua" [ref=e477] [cursor=pointer]:
                - /url: "?file=data%2Fglobalevents%2Flib%2Fglobalevents.lua"
            - listitem [ref=e478]:
              - link "data/globalevents/scripts/admin_commands.lua" [ref=e479] [cursor=pointer]:
                - /url: "?file=data%2Fglobalevents%2Fscripts%2Fadmin_commands.lua"
            - listitem [ref=e480]:
              - link "data/globalevents/scripts/powergamers.lua" [ref=e481] [cursor=pointer]:
                - /url: "?file=data%2Fglobalevents%2Fscripts%2Fpowergamers.lua"
            - listitem [ref=e482]:
              - link "data/globalevents/scripts/record.lua" [ref=e483] [cursor=pointer]:
                - /url: "?file=data%2Fglobalevents%2Fscripts%2Frecord.lua"
            - listitem [ref=e484]:
              - link "data/globalevents/scripts/rookgaard_book.lua" [ref=e485] [cursor=pointer]:
                - /url: "?file=data%2Fglobalevents%2Fscripts%2Frookgaard_book.lua"
            - listitem [ref=e486]:
              - link "data/globalevents/scripts/serversave.lua" [ref=e487] [cursor=pointer]:
                - /url: "?file=data%2Fglobalevents%2Fscripts%2Fserversave.lua"
            - listitem [ref=e488]:
              - link "data/globalevents/scripts/startup.lua" [ref=e489] [cursor=pointer]:
                - /url: "?file=data%2Fglobalevents%2Fscripts%2Fstartup.lua"
            - listitem [ref=e490]:
              - link "data/items780/items.srv" [ref=e491] [cursor=pointer]:
                - /url: "?file=data%2Fitems780%2Fitems.srv"
            - listitem [ref=e492]:
              - link "data/items792/items.srv" [ref=e493] [cursor=pointer]:
                - /url: "?file=data%2Fitems792%2Fitems.srv"
            - listitem [ref=e494]:
              - link "data/lib/achievements/achievements.lua" [ref=e495] [cursor=pointer]:
                - /url: "?file=data%2Flib%2Fachievements%2Fachievements.lua"
            - listitem [ref=e496]:
              - link "data/lib/achievements/achievements_config.lua" [ref=e497] [cursor=pointer]:
                - /url: "?file=data%2Flib%2Fachievements%2Fachievements_config.lua"
            - listitem [ref=e498]:
              - link "data/lib/character/character.lua" [ref=e499] [cursor=pointer]:
                - /url: "?file=data%2Flib%2Fcharacter%2Fcharacter.lua"
            - listitem [ref=e500]:
              - link "data/lib/compat/compat.lua" [ref=e501] [cursor=pointer]:
                - /url: "?file=data%2Flib%2Fcompat%2Fcompat.lua"
            - listitem [ref=e502]:
              - link "data/lib/core/commands.lua" [ref=e503] [cursor=pointer]:
                - /url: "?file=data%2Flib%2Fcore%2Fcommands.lua"
            - listitem [ref=e504]:
              - link "data/lib/core/constants.lua" [ref=e505] [cursor=pointer]:
                - /url: "?file=data%2Flib%2Fcore%2Fconstants.lua"
            - listitem [ref=e506]:
              - link "data/lib/core/container.lua" [ref=e507] [cursor=pointer]:
                - /url: "?file=data%2Flib%2Fcore%2Fcontainer.lua"
            - listitem [ref=e508]:
              - link "data/lib/core/core.lua" [ref=e509] [cursor=pointer]:
                - /url: "?file=data%2Flib%2Fcore%2Fcore.lua"
            - listitem [ref=e510]:
              - link "data/lib/core/creature.lua" [ref=e511] [cursor=pointer]:
                - /url: "?file=data%2Flib%2Fcore%2Fcreature.lua"
            - listitem [ref=e512]:
              - link "data/lib/core/game.lua" [ref=e513] [cursor=pointer]:
                - /url: "?file=data%2Flib%2Fcore%2Fgame.lua"
            - listitem [ref=e514]:
              - link "data/lib/core/guildwars.lua" [ref=e515] [cursor=pointer]:
                - /url: "?file=data%2Flib%2Fcore%2Fguildwars.lua"
            - listitem [ref=e516]:
              - link "data/lib/core/item.lua" [ref=e517] [cursor=pointer]:
                - /url: "?file=data%2Flib%2Fcore%2Fitem.lua"
            - listitem [ref=e518]:
              - link "data/lib/core/itemtype.lua" [ref=e519] [cursor=pointer]:
                - /url: "?file=data%2Flib%2Fcore%2Fitemtype.lua"
            - listitem [ref=e520]:
              - link "data/lib/core/json.lua" [ref=e521] [cursor=pointer]:
                - /url: "?file=data%2Flib%2Fcore%2Fjson.lua"
            - listitem [ref=e522]:
              - link "data/lib/core/monster.lua" [ref=e523] [cursor=pointer]:
                - /url: "?file=data%2Flib%2Fcore%2Fmonster.lua"
            - listitem [ref=e524]:
              - link "data/lib/core/npcscripts.lua" [ref=e525] [cursor=pointer]:
                - /url: "?file=data%2Flib%2Fcore%2Fnpcscripts.lua"
            - listitem [ref=e526]:
              - link "data/lib/core/player.lua" [ref=e527] [cursor=pointer]:
                - /url: "?file=data%2Flib%2Fcore%2Fplayer.lua"
            - listitem [ref=e528]:
              - link "data/lib/core/position.lua" [ref=e529] [cursor=pointer]:
                - /url: "?file=data%2Flib%2Fcore%2Fposition.lua"
            - listitem [ref=e530]:
              - link "data/lib/core/teleport.lua" [ref=e531] [cursor=pointer]:
                - /url: "?file=data%2Flib%2Fcore%2Fteleport.lua"
            - listitem [ref=e532]:
              - link "data/lib/core/tile.lua" [ref=e533] [cursor=pointer]:
                - /url: "?file=data%2Flib%2Fcore%2Ftile.lua"
            - listitem [ref=e534]:
              - link "data/lib/core/vocation.lua" [ref=e535] [cursor=pointer]:
                - /url: "?file=data%2Flib%2Fcore%2Fvocation.lua"
            - listitem [ref=e536]:
              - link "data/lib/journal/journal.lua" [ref=e537] [cursor=pointer]:
                - /url: "?file=data%2Flib%2Fjournal%2Fjournal.lua"
            - listitem [ref=e538]:
              - link "data/lib/lib.lua" [ref=e539] [cursor=pointer]:
                - /url: "?file=data%2Flib%2Flib.lua"
            - listitem [ref=e540]:
              - link "data/lib/moments/moments.lua" [ref=e541] [cursor=pointer]:
                - /url: "?file=data%2Flib%2Fmoments%2Fmoments.lua"
            - listitem [ref=e542]:
              - link "data/lib/reports/client_reports.lua" [ref=e543] [cursor=pointer]:
                - /url: "?file=data%2Flib%2Freports%2Fclient_reports.lua"
            - listitem [ref=e544]:
              - link "data/lib/tasks/daily_hunts.lua" [ref=e545] [cursor=pointer]:
                - /url: "?file=data%2Flib%2Ftasks%2Fdaily_hunts.lua"
            - listitem [ref=e546]:
              - link "data/lib/tasks/daily_hunts_config.lua" [ref=e547] [cursor=pointer]:
                - /url: "?file=data%2Flib%2Ftasks%2Fdaily_hunts_config.lua"
            - listitem [ref=e548]:
              - link "data/lib/tasks/hunting_tasks.lua" [ref=e549] [cursor=pointer]:
                - /url: "?file=data%2Flib%2Ftasks%2Fhunting_tasks.lua"
            - listitem [ref=e550]:
              - link "data/lib/tasks/hunting_tasks_config.lua" [ref=e551] [cursor=pointer]:
                - /url: "?file=data%2Flib%2Ftasks%2Fhunting_tasks_config.lua"
            - listitem [ref=e552]:
              - link "data/monster/781/acolyte of the cult.xml" [ref=e553] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Facolyte%20of%20the%20cult.xml"
            - listitem [ref=e554]:
              - link "data/monster/781/adept of the cult.xml" [ref=e555] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Fadept%20of%20the%20cult.xml"
            - listitem [ref=e556]:
              - link "data/monster/781/azure frog.xml" [ref=e557] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Fazure%20frog.xml"
            - listitem [ref=e558]:
              - link "data/monster/781/blood crab.xml" [ref=e559] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Fblood%20crab.xml"
            - listitem [ref=e560]:
              - link "data/monster/781/brutus bloodbeard.xml" [ref=e561] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Fbrutus%20bloodbeard.xml"
            - listitem [ref=e562]:
              - link "data/monster/781/carrion worm.xml" [ref=e563] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Fcarrion%20worm.xml"
            - listitem [ref=e564]:
              - link "data/monster/781/coral frog.xml" [ref=e565] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Fcoral%20frog.xml"
            - listitem [ref=e566]:
              - link "data/monster/781/crimson frog.xml" [ref=e567] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Fcrimson%20frog.xml"
            - listitem [ref=e568]:
              - link "data/monster/781/deadeye devious.xml" [ref=e569] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Fdeadeye%20devious.xml"
            - listitem [ref=e570]:
              - link "data/monster/781/enlightened of the cult.xml" [ref=e571] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Fenlightened%20of%20the%20cult.xml"
            - listitem [ref=e572]:
              - link "data/monster/781/green frog.xml" [ref=e573] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Fgreen%20frog.xml"
            - listitem [ref=e574]:
              - link "data/monster/781/island troll.xml" [ref=e575] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Fisland%20troll.xml"
            - listitem [ref=e576]:
              - link "data/monster/781/lavahole.xml" [ref=e577] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Flavahole.xml"
            - listitem [ref=e578]:
              - link "data/monster/781/lethal lissy.xml" [ref=e579] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Flethal%20lissy.xml"
            - listitem [ref=e580]:
              - link "data/monster/781/magic pillar.xml" [ref=e581] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Fmagic%20pillar.xml"
            - listitem [ref=e582]:
              - link "data/monster/781/mammoth.xml" [ref=e583] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Fmammoth.xml"
            - listitem [ref=e584]:
              - link "data/monster/781/massive water elemental.xml" [ref=e585] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Fmassive%20water%20elemental.xml"
            - listitem [ref=e586]:
              - link "data/monster/781/morgaroth.xml" [ref=e587] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Fmorgaroth.xml"
            - listitem [ref=e588]:
              - link "data/monster/781/novice of the cult.xml" [ref=e589] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Fnovice%20of%20the%20cult.xml"
            - listitem [ref=e590]:
              - link "data/monster/781/orchid frog.xml" [ref=e591] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Forchid%20frog.xml"
            - listitem [ref=e592]:
              - link "data/monster/781/pirate buccaneer.xml" [ref=e593] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Fpirate%20buccaneer.xml"
            - listitem [ref=e594]:
              - link "data/monster/781/pirate corsair.xml" [ref=e595] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Fpirate%20corsair.xml"
            - listitem [ref=e596]:
              - link "data/monster/781/pirate cutthroat.xml" [ref=e597] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Fpirate%20cutthroat.xml"
            - listitem [ref=e598]:
              - link "data/monster/781/pirate ghost.xml" [ref=e599] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Fpirate%20ghost.xml"
            - listitem [ref=e600]:
              - link "data/monster/781/pirate marauder.xml" [ref=e601] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Fpirate%20marauder.xml"
            - listitem [ref=e602]:
              - link "data/monster/781/pirate skeleton.xml" [ref=e603] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Fpirate%20skeleton.xml"
            - listitem [ref=e604]:
              - link "data/monster/781/quara constrictor scout.xml" [ref=e605] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Fquara%20constrictor%20scout.xml"
            - listitem [ref=e606]:
              - link "data/monster/781/quara constrictor.xml" [ref=e607] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Fquara%20constrictor.xml"
            - listitem [ref=e608]:
              - link "data/monster/781/quara hydromancer scout.xml" [ref=e609] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Fquara%20hydromancer%20scout.xml"
            - listitem [ref=e610]:
              - link "data/monster/781/quara hydromancer.xml" [ref=e611] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Fquara%20hydromancer.xml"
            - listitem [ref=e612]:
              - link "data/monster/781/quara mantassin scout.xml" [ref=e613] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Fquara%20mantassin%20scout.xml"
            - listitem [ref=e614]:
              - link "data/monster/781/quara mantassin.xml" [ref=e615] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Fquara%20mantassin.xml"
            - listitem [ref=e616]:
              - link "data/monster/781/quara pincher scout.xml" [ref=e617] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Fquara%20pincher%20scout.xml"
            - listitem [ref=e618]:
              - link "data/monster/781/quara pincher.xml" [ref=e619] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Fquara%20pincher.xml"
            - listitem [ref=e620]:
              - link "data/monster/781/quara predator scout.xml" [ref=e621] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Fquara%20predator%20scout.xml"
            - listitem [ref=e622]:
              - link "data/monster/781/quara predator.xml" [ref=e623] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Fquara%20predator.xml"
            - listitem [ref=e624]:
              - link "data/monster/781/ron the ripper.xml" [ref=e625] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Fron%20the%20ripper.xml"
            - listitem [ref=e626]:
              - link "data/monster/781/seagull.xml" [ref=e627] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Fseagull.xml"
            - listitem [ref=e628]:
              - link "data/monster/781/thornback tortoise.xml" [ref=e629] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Fthornback%20tortoise.xml"
            - listitem [ref=e630]:
              - link "data/monster/781/thul.xml" [ref=e631] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Fthul.xml"
            - listitem [ref=e632]:
              - link "data/monster/781/tiquandas revenge.xml" [ref=e633] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Ftiquandas%20revenge.xml"
            - listitem [ref=e634]:
              - link "data/monster/781/toad.xml" [ref=e635] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Ftoad.xml"
            - listitem [ref=e636]:
              - link "data/monster/781/tortoise.xml" [ref=e637] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F781%2Ftortoise.xml"
            - listitem [ref=e638]:
              - link "data/monster/790/apprentice sheng.xml" [ref=e639] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F790%2Fapprentice%20sheng.xml"
            - listitem [ref=e640]:
              - link "data/monster/790/betrayed wraith.xml" [ref=e641] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F790%2Fbetrayed%20wraith.xml"
            - listitem [ref=e642]:
              - link "data/monster/790/blightwalker.xml" [ref=e643] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F790%2Fblightwalker.xml"
            - listitem [ref=e644]:
              - link "data/monster/790/countess sorrow.xml" [ref=e645] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F790%2Fcountess%20sorrow.xml"
            - listitem [ref=e646]:
              - link "data/monster/790/dark torturer.xml" [ref=e647] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F790%2Fdark%20torturer.xml"
            - listitem [ref=e648]:
              - link "data/monster/790/defiler.xml" [ref=e649] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F790%2Fdefiler.xml"
            - listitem [ref=e650]:
              - link "data/monster/790/demon (goblin).xml" [ref=e651] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F790%2Fdemon%20(goblin).xml"
            - listitem [ref=e652]:
              - link "data/monster/790/destroyer.xml" [ref=e653] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F790%2Fdestroyer.xml"
            - listitem [ref=e654]:
              - link "data/monster/790/diabolic imp.xml" [ref=e655] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F790%2Fdiabolic%20imp.xml"
            - listitem [ref=e656]:
              - link "data/monster/790/dracola.xml" [ref=e657] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F790%2Fdracola.xml"
            - listitem [ref=e658]:
              - link "data/monster/790/fury.xml" [ref=e659] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F790%2Ffury.xml"
            - listitem [ref=e660]:
              - link "data/monster/790/grynch clan goblin.xml" [ref=e661] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F790%2Fgrynch%20clan%20goblin.xml"
            - listitem [ref=e662]:
              - link "data/monster/790/hand of cursed fate.xml" [ref=e663] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F790%2Fhand%20of%20cursed%20fate.xml"
            - listitem [ref=e664]:
              - link "data/monster/790/hellfire fighter.xml" [ref=e665] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F790%2Fhellfire%20fighter.xml"
            - listitem [ref=e666]:
              - link "data/monster/790/hellhound.xml" [ref=e667] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F790%2Fhellhound.xml"
            - listitem [ref=e668]:
              - link "data/monster/790/juggernaut.xml" [ref=e669] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F790%2Fjuggernaut.xml"
            - listitem [ref=e670]:
              - link "data/monster/790/lost soul.xml" [ref=e671] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F790%2Flost%20soul.xml"
            - listitem [ref=e672]:
              - link "data/monster/790/massacre.xml" [ref=e673] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F790%2Fmassacre.xml"
            - listitem [ref=e674]:
              - link "data/monster/790/mr. punish.xml" [ref=e675] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F790%2Fmr.%20punish.xml"
            - listitem [ref=e676]:
              - link "data/monster/790/munster.xml" [ref=e677] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F790%2Fmunster.xml"
            - listitem [ref=e678]:
              - link "data/monster/790/nightmare.xml" [ref=e679] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F790%2Fnightmare.xml"
            - listitem [ref=e680]:
              - link "data/monster/790/nomad.xml" [ref=e681] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F790%2Fnomad.xml"
            - listitem [ref=e682]:
              - link "data/monster/790/phantasm summon.xml" [ref=e683] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F790%2Fphantasm%20summon.xml"
            - listitem [ref=e684]:
              - link "data/monster/790/phantasm.xml" [ref=e685] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F790%2Fphantasm.xml"
            - listitem [ref=e686]:
              - link "data/monster/790/plaguesmith.xml" [ref=e687] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F790%2Fplaguesmith.xml"
            - listitem [ref=e688]:
              - link "data/monster/790/son of verminor.xml" [ref=e689] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F790%2Fson%20of%20verminor.xml"
            - listitem [ref=e690]:
              - link "data/monster/790/spectre.xml" [ref=e691] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F790%2Fspectre.xml"
            - listitem [ref=e692]:
              - link "data/monster/790/the handmaiden.xml" [ref=e693] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F790%2Fthe%20handmaiden.xml"
            - listitem [ref=e694]:
              - link "data/monster/790/the imperor.xml" [ref=e695] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F790%2Fthe%20imperor.xml"
            - listitem [ref=e696]:
              - link "data/monster/790/the plasmother.xml" [ref=e697] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F790%2Fthe%20plasmother.xml"
            - listitem [ref=e698]:
              - link "data/monster/790/undead dragon.xml" [ref=e699] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F790%2Fundead%20dragon.xml"
            - listitem [ref=e700]:
              - link "data/monster/790/wyvern.xml" [ref=e701] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2F790%2Fwyvern.xml"
            - listitem [ref=e702]:
              - link "data/monster/Training Monk.xml" [ref=e703] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2FTraining%20Monk.xml"
            - listitem [ref=e704]:
              - link "data/monster/amazon.xml" [ref=e705] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Famazon.xml"
            - listitem [ref=e706]:
              - link "data/monster/ancientscarab.xml" [ref=e707] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fancientscarab.xml"
            - listitem [ref=e708]:
              - link "data/monster/apocalypse.xml" [ref=e709] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fapocalypse.xml"
            - listitem [ref=e710]:
              - link "data/monster/assassin.xml" [ref=e711] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fassassin.xml"
            - listitem [ref=e712]:
              - link "data/monster/badger.xml" [ref=e713] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fbadger.xml"
            - listitem [ref=e714]:
              - link "data/monster/bandit.xml" [ref=e715] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fbandit.xml"
            - listitem [ref=e716]:
              - link "data/monster/banshee.xml" [ref=e717] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fbanshee.xml"
            - listitem [ref=e718]:
              - link "data/monster/bat.xml" [ref=e719] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fbat.xml"
            - listitem [ref=e720]:
              - link "data/monster/bazir.xml" [ref=e721] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fbazir.xml"
            - listitem [ref=e722]:
              - link "data/monster/bear.xml" [ref=e723] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fbear.xml"
            - listitem [ref=e724]:
              - link "data/monster/behemoth.xml" [ref=e725] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fbehemoth.xml"
            - listitem [ref=e726]:
              - link "data/monster/beholder.xml" [ref=e727] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fbeholder.xml"
            - listitem [ref=e728]:
              - link "data/monster/blackknight.xml" [ref=e729] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fblackknight.xml"
            - listitem [ref=e730]:
              - link "data/monster/blacksheep.xml" [ref=e731] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fblacksheep.xml"
            - listitem [ref=e732]:
              - link "data/monster/bluedjinn.xml" [ref=e733] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fbluedjinn.xml"
            - listitem [ref=e734]:
              - link "data/monster/bonebeast.xml" [ref=e735] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fbonebeast.xml"
            - listitem [ref=e736]:
              - link "data/monster/bug.xml" [ref=e737] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fbug.xml"
            - listitem [ref=e738]:
              - link "data/monster/butterflyblue.xml" [ref=e739] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fbutterflyblue.xml"
            - listitem [ref=e740]:
              - link "data/monster/butterflypurple.xml" [ref=e741] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fbutterflypurple.xml"
            - listitem [ref=e742]:
              - link "data/monster/butterflyred.xml" [ref=e743] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fbutterflyred.xml"
            - listitem [ref=e744]:
              - link "data/monster/butterflyyellow.xml" [ref=e745] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fbutterflyyellow.xml"
            - listitem [ref=e746]:
              - link "data/monster/carniphila.xml" [ref=e747] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fcarniphila.xml"
            - listitem [ref=e748]:
              - link "data/monster/caverat.xml" [ref=e749] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fcaverat.xml"
            - listitem [ref=e750]:
              - link "data/monster/centipede.xml" [ref=e751] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fcentipede.xml"
            - listitem [ref=e752]:
              - link "data/monster/chicken.xml" [ref=e753] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fchicken.xml"
            - listitem [ref=e754]:
              - link "data/monster/cobra.xml" [ref=e755] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fcobra.xml"
            - listitem [ref=e756]:
              - link "data/monster/crab.xml" [ref=e757] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fcrab.xml"
            - listitem [ref=e758]:
              - link "data/monster/crocodile.xml" [ref=e759] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fcrocodile.xml"
            - listitem [ref=e760]:
              - link "data/monster/cryptshambler.xml" [ref=e761] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fcryptshambler.xml"
            - listitem [ref=e762]:
              - link "data/monster/cyclops.xml" [ref=e763] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fcyclops.xml"
            - listitem [ref=e764]:
              - link "data/monster/darkmonk.xml" [ref=e765] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fdarkmonk.xml"
            - listitem [ref=e766]:
              - link "data/monster/deathslicer.xml" [ref=e767] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fdeathslicer.xml"
            - listitem [ref=e768]:
              - link "data/monster/deer.xml" [ref=e769] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fdeer.xml"
            - listitem [ref=e770]:
              - link "data/monster/demodras.xml" [ref=e771] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fdemodras.xml"
            - listitem [ref=e772]:
              - link "data/monster/demon.xml" [ref=e773] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fdemon.xml"
            - listitem [ref=e774]:
              - link "data/monster/demonskeleton.xml" [ref=e775] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fdemonskeleton.xml"
            - listitem [ref=e776]:
              - link "data/monster/dharalion.xml" [ref=e777] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fdharalion.xml"
            - listitem [ref=e778]:
              - link "data/monster/dog.xml" [ref=e779] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fdog.xml"
            - listitem [ref=e780]:
              - link "data/monster/dragon.xml" [ref=e781] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fdragon.xml"
            - listitem [ref=e782]:
              - link "data/monster/dragonlord.xml" [ref=e783] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fdragonlord.xml"
            - listitem [ref=e784]:
              - link "data/monster/dwarf.xml" [ref=e785] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fdwarf.xml"
            - listitem [ref=e786]:
              - link "data/monster/dwarfgeomancer.xml" [ref=e787] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fdwarfgeomancer.xml"
            - listitem [ref=e788]:
              - link "data/monster/dwarfguard.xml" [ref=e789] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fdwarfguard.xml"
            - listitem [ref=e790]:
              - link "data/monster/dwarfsoldier.xml" [ref=e791] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fdwarfsoldier.xml"
            - listitem [ref=e792]:
              - link "data/monster/dworcfleshhunter.xml" [ref=e793] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fdworcfleshhunter.xml"
            - listitem [ref=e794]:
              - link "data/monster/dworcvenomsniper.xml" [ref=e795] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fdworcvenomsniper.xml"
            - listitem [ref=e796]:
              - link "data/monster/dworcvoodoomaster.xml" [ref=e797] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fdworcvoodoomaster.xml"
            - listitem [ref=e798]:
              - link "data/monster/efreet.xml" [ref=e799] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fefreet.xml"
            - listitem [ref=e800]:
              - link "data/monster/elderbeholder.xml" [ref=e801] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Felderbeholder.xml"
            - listitem [ref=e802]:
              - link "data/monster/elephant.xml" [ref=e803] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Felephant.xml"
            - listitem [ref=e804]:
              - link "data/monster/elf.xml" [ref=e805] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Felf.xml"
            - listitem [ref=e806]:
              - link "data/monster/elfarcanist.xml" [ref=e807] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Felfarcanist.xml"
            - listitem [ref=e808]:
              - link "data/monster/elfscout.xml" [ref=e809] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Felfscout.xml"
            - listitem [ref=e810]:
              - link "data/monster/evileye.xml" [ref=e811] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fevileye.xml"
            - listitem [ref=e812]:
              - link "data/monster/fernfang.xml" [ref=e813] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Ffernfang.xml"
            - listitem [ref=e814]:
              - link "data/monster/ferumbras.xml" [ref=e815] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fferumbras.xml"
            - listitem [ref=e816]:
              - link "data/monster/firedevil.xml" [ref=e817] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Ffiredevil.xml"
            - listitem [ref=e818]:
              - link "data/monster/fireelemental.xml" [ref=e819] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Ffireelemental.xml"
            - listitem [ref=e820]:
              - link "data/monster/flamethrower.xml" [ref=e821] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fflamethrower.xml"
            - listitem [ref=e822]:
              - link "data/monster/flamingo.xml" [ref=e823] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fflamingo.xml"
            - listitem [ref=e824]:
              - link "data/monster/frosttroll.xml" [ref=e825] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Ffrosttroll.xml"
            - listitem [ref=e826]:
              - link "data/monster/gamemaster.xml" [ref=e827] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fgamemaster.xml"
            - listitem [ref=e828]:
              - link "data/monster/gargoyle.xml" [ref=e829] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fgargoyle.xml"
            - listitem [ref=e830]:
              - link "data/monster/gazer.xml" [ref=e831] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fgazer.xml"
            - listitem [ref=e832]:
              - link "data/monster/ghost.xml" [ref=e833] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fghost.xml"
            - listitem [ref=e834]:
              - link "data/monster/ghoul.xml" [ref=e835] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fghoul.xml"
            - listitem [ref=e836]:
              - link "data/monster/giantspider.xml" [ref=e837] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fgiantspider.xml"
            - listitem [ref=e838]:
              - link "data/monster/goblin.xml" [ref=e839] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fgoblin.xml"
            - listitem [ref=e840]:
              - link "data/monster/greendjinn.xml" [ref=e841] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fgreendjinn.xml"
            - listitem [ref=e842]:
              - link "data/monster/grorlam.xml" [ref=e843] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fgrorlam.xml"
            - listitem [ref=e844]:
              - link "data/monster/halloweenhare.xml" [ref=e845] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fhalloweenhare.xml"
            - listitem [ref=e846]:
              - link "data/monster/hero.xml" [ref=e847] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fhero.xml"
            - listitem [ref=e848]:
              - link "data/monster/hornedfox.xml" [ref=e849] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fhornedfox.xml"
            - listitem [ref=e850]:
              - link "data/monster/hunter.xml" [ref=e851] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fhunter.xml"
            - listitem [ref=e852]:
              - link "data/monster/hyaena.xml" [ref=e853] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fhyaena.xml"
            - listitem [ref=e854]:
              - link "data/monster/hydra.xml" [ref=e855] [cursor=pointer]:
                - /url: "?file=data%2Fmonster%2Fhydra.xml"
          - paragraph [ref=e856]: Showing 400; filter to find more.
        - generic [ref=e857]:
          - generic [ref=e859]:
            - heading "data/XML/commands.xml" [level=2] [ref=e860]
            - generic [ref=e861]: XML · Latin-1 · LF
          - generic [ref=e862]:
            - generic [ref=e863]:
              - generic [aria-hidden] [ref=e864]:
                - generic [ref=e865]: "1"
                - generic [ref=e866]: "2"
                - generic [ref=e867]: "3"
                - generic [ref=e868]: "4"
                - generic [ref=e869]: "5"
                - generic [ref=e870]: "6"
              - textbox "File content" [ref=e871]: <?xml version="1.0" encoding="UTF-8"?> <commands> <command cmd="/reload" group="2" acctype="5" log="yes" /> <command cmd="/raid" group="2" acctype="4" log="yes" /> <command cmd="!sellhouse" group="1" acctype="1" log="no" /> </commands>
            - generic [ref=e872]:
              - generic [ref=e873]:
                - text: What changed (for the history)
                - textbox "What changed (for the history)" [ref=e874]
              - generic [ref=e875]: Goes live at the next server save (needs a restart).
              - button "Save" [disabled] [ref=e876]
        - generic [ref=e877]:
          - heading "History" [level=2] [ref=e879]
          - list [ref=e880]:
            - listitem [ref=e881]:
              - generic [ref=e882]: Server image 2026-11-19T16:41Z
              - generic [ref=e883]: Elderwood server · 19 Nov, 16:41 · 4640821
              - generic [ref=e884]:
                - link "View diff" [ref=e885] [cursor=pointer]:
                  - /url: "?file=data%2FXML%2Fcommands.xml&diff=4640821"
                - button "Restore" [ref=e887] [cursor=pointer]
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
      |                                                                             ^ Error: /admin/files?file=data%2FXML%2Fcommands.xml fits 360px
  168 | 				});
  169 | 			}
  170 | 		});
  171 | 	}
  172 | }
  173 | 
```