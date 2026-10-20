// Loads the client's game assets (Tibia.dat/Tibia.spr) into the virtual file
// system before the client starts. They are not part of the client bundle.
Module.preRun.push(function () {
  var version = "792";
  var dir = "/data/things/" + version;
  FS.mkdirTree(dir);
  ["Tibia.dat", "Tibia.spr"].forEach(function (name) {
    FS.createPreloadedFile(dir, name, "things/" + version + "/" + name, true, false);
  });
});
