'use strict';

var Curry           = require("bs-platform/lib/js/curry.js");
var Fetch           = require("bs-fetch/lib/js/src/Fetch.js");
var Js_dict         = require("bs-platform/lib/js/js_dict.js");
var Js_json         = require("bs-platform/lib/js/js_json.js");
var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");

var ReGqlError = Caml_exceptions.create("Transport.ReGqlError");

function run(uri, token, gql) {
  return fetch(uri, Fetch.RequestInit[/* make */0](/* Some */[/* Post */2], /* Some */[{
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: token
                          }], /* Some */[JSON.stringify(Js_dict.fromList(/* :: */[
                                    /* tuple */[
                                      "query",
                                      gql.query
                                    ],
                                    /* :: */[
                                      /* tuple */[
                                        "variables",
                                        gql.variables
                                      ],
                                      /* [] */0
                                    ]
                                  ]))], /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0)(/* () */0)).then((function (prim) {
                    return prim.json();
                  })).then((function (value) {
                  var match = Js_json.decodeObject(value);
                  if (match) {
                    return Promise.resolve(Curry._1(gql.parse, match[0]["data"]));
                  } else {
                    return Promise.reject([
                                ReGqlError,
                                "Response is not an object"
                              ]);
                  }
                })).catch((function (err) {
                return Promise.reject([
                            ReGqlError,
                            err
                          ]);
              }));
}

exports.ReGqlError = ReGqlError;
exports.run        = run;
/* Js_dict Not a pure module */
