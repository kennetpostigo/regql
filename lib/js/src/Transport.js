'use strict';

var Curry           = require("bs-platform/lib/js/curry.js");
var Fetch           = require("bs-fetch/lib/js/src/Fetch.js");
var Pervasives      = require("bs-platform/lib/js/pervasives.js");
var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");

var ReGqlError = Caml_exceptions.create("Transport.ReGqlError");

function run(uri, token, query, variables, decoder) {
  var body;
  if (variables) {
    var match = JSON.stringify({
          query: query,
          variables: variables[0]
        });
    body = match !== undefined ? match : Pervasives.failwith("Regql: when making the request the query/mutation variables we're malformed. Please check the variables Js.t passed in doesn't hold function values or any values not supported in Json");
  } else {
    var match$1 = JSON.stringify({
          query: query
        });
    body = match$1 !== undefined ? match$1 : Pervasives.failwith("Regql: when making the request the query/mutation variables we're malformed. Please check the variables Js.t passed in doesn't hold function values or any values not supported in Json");
  }
  return fetch(uri, Fetch.RequestInit[/* make */0](/* Some */[/* Post */2], /* Some */[{
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: token
                          }], /* Some */[body], /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0)(/* () */0)).then((function (prim) {
                    return prim.json();
                  })).then((function (value) {
                  return Promise.resolve(Curry._1(decoder, value));
                })).catch((function (err) {
                return Promise.reject([
                            ReGqlError,
                            err
                          ]);
              }));
}

exports.ReGqlError = ReGqlError;
exports.run        = run;
/* No side effect */
