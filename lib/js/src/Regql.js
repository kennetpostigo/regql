'use strict';

var Cache = require("./Cache.js");
var Query = require("./Query.js");
var Mutation = require("./Mutation.js");

function prepQuery(query) {
  return query.replace((/}/g), "__typename\n}\n").replace((/\s+/g), " ").replace((/ ,|, /g), ",").replace((/ :|: /g), ":").replace((/{| { /g), "{").replace((/}| } /g), "}").replace((/\(| \( /g), "(").replace((/\)| \) /g), ")").trim();
}

function Make(Network) {
  var cache = [Cache.empty];
  var update = function (nextCache) {
    console.log("Current Cache: ", cache[0]);
    console.log("Next Cache: ", cache[0]);
    cache[0] = nextCache;
    return /* () */0;
  };
  var ClientCache = /* module */[
    /* cache */cache,
    /* update */update
  ];
  var Mutation$1 = Mutation.Make(Network)(ClientCache);
  var Query$1 = Query.Make(Network)(ClientCache);
  return /* module */[
          /* ClientCache */ClientCache,
          /* Mutation */Mutation$1,
          /* Query */Query$1
        ];
}

exports.prepQuery = prepQuery;
exports.Make = Make;
/* Cache Not a pure module */
