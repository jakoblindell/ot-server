// Loads the client's game assets (Tibia.dat/Tibia.spr) into the virtual file
// system before the client starts. They are not part of the client bundle.
//
// They are kept in the browser's Cache Storage: the HTTP cache skips files
// as big as Tibia.spr (22 MB), which made every visit download it again. A
// return visit only asks the server whether the file changed (ETag) and
// reads it from the cache when it did not.
Module.preRun.push(function () {
  var version = "792";
  var dir = "/data/things/" + version;
  FS.mkdirTree(dir);

  function load(url) {
    var cacheReady = "caches" in window ? caches.open("game-assets").catch(function () { return null; })
                                        : Promise.resolve(null);
    return cacheReady.then(function (cache) {
      return (cache ? cache.match(url) : Promise.resolve(undefined)).then(function (cached) {
        var headers = {};
        var etag = cached && cached.headers.get("ETag");
        if (etag) headers["If-None-Match"] = etag;
        return fetch(url, { headers: headers, cache: "no-store" }).then(function (response) {
          if (response.status === 304 && cached) return cached.arrayBuffer();
          if (!response.ok) throw new Error(url + ": HTTP " + response.status);
          if (cache) cache.put(url, response.clone()).catch(function () {});
          return response.arrayBuffer();
        });
      });
    });
  }

  ["Tibia.dat", "Tibia.spr"].forEach(function (name) {
    var dependency = "things/" + name;
    addRunDependency(dependency);
    load("things/" + version + "/" + name).then(function (data) {
      FS.writeFile(dir + "/" + name, new Uint8Array(data), { canOwn: true });
      removeRunDependency(dependency);
    }, function (error) {
      reportRuntimeError("Could not load " + name, error);
    });
  });
});
