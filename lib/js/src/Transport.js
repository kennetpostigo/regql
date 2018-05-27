'use strict';

var Cache = require("./Cache.js");
var Fetch = require("bs-fetch/lib/js/src/Fetch.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");
var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");

var cache = [Cache.empty];

var RegqlError = Caml_exceptions.create("Transport.RegqlError");

function run(uri, token, query, variables) {
  var match = JSON.stringify({
        query: query,
        variables: variables
      });
  var body = match !== undefined ? match : Pervasives.failwith("\"Regql: when making the request the query/mutation variables we're\n          malformed. Please check the variables Js.t passed in doesn't hold\n          function values or any values not supported in Json\"\n        ");
  return fetch(uri, Fetch.RequestInit[/* make */0](/* Some */[/* Post */2], /* Some */[{
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: token
                          }], /* Some */[body], /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0)(/* () */0)).then((function (prim) {
                    return prim.json();
                  })).then((function (value) {
                  return Promise.resolve(value);
                })).catch((function (err) {
                return Promise.reject([
                            RegqlError,
                            err
                          ]);
              }));
}

exports.cache = cache;
exports.RegqlError = RegqlError;
exports.run = run;
/* Cache Not a pure module */
