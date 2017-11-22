'use strict';

var Block       = require("bs-platform/lib/js/block.js");
var Curry       = require("bs-platform/lib/js/curry.js");
var Fetch       = require("bs-fetch/lib/js/src/Fetch.js");
var Caml_array  = require("bs-platform/lib/js/caml_array.js");
var Json_decode = require("bs-json/lib/js/src/Json_decode.js");
var ReasonReact = require("reason-react/lib/js/src/ReasonReact.js");

function Create(NetworkConfig) {
  return (function (ContainerConfig) {
      var decoder = function (json) {
        return /* record */[/* data */Json_decode.field("data", ContainerConfig[/* decoder */0], json)];
      };
      var component = ReasonReact.reducerComponent("Gql");
      var make = function (query, $staropt$star, children) {
        var variables = $staropt$star ? $staropt$star[0] : /* None */0;
        var newrecord = component.slice();
        newrecord[/* didMount */4] = (function (param) {
            var reduce = param[/* reduce */1];
            var body;
            if (variables) {
              var match = JSON.stringify({
                    query: query,
                    variables: variables[0]
                  });
              body = match !== undefined ? match : "";
            } else {
              var match$1 = JSON.stringify({
                    query: query
                  });
              body = match$1 !== undefined ? match$1 : "";
            }
            fetch(NetworkConfig[/* uri */0], Fetch.RequestInit[/* make */0](/* Some */[/* Post */2], /* Some */[{
                                Accept: "application/json",
                                "Content-Type": "application/json",
                                Authorization: NetworkConfig[/* token */1]
                              }], /* Some */[body], /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0)(/* () */0)).then((function (prim) {
                        return prim.json();
                      })).then((function (value) {
                      Curry._2(reduce, (function () {
                              return /* Result */Block.__(0, [decoder(value)[/* data */0]]);
                            }), /* () */0);
                      return Promise.resolve(/* () */0);
                    })).catch((function (_value) {
                    console.log(_value);
                    Curry._2(reduce, (function () {
                            return /* Error */Block.__(1, ["an error happened"]);
                          }), /* () */0);
                    return Promise.resolve(/* () */0);
                  }));
            return /* NoUpdate */0;
          });
        newrecord[/* render */9] = (function (param) {
            return Curry._1(Caml_array.caml_array_get(children, 0), param[/* state */2]);
          });
        newrecord[/* initialState */10] = (function () {
            return /* Loading */0;
          });
        newrecord[/* reducer */12] = (function (action, _) {
            if (action.tag) {
              return /* Update */Block.__(0, [/* Failed */Block.__(1, [action[0]])]);
            } else {
              return /* UpdateWithSideEffects */Block.__(3, [
                        /* Loaded */Block.__(0, [action[0]]),
                        (function (self) {
                            console.log(self[/* state */2]);
                            return /* () */0;
                          })
                      ]);
            }
          });
        return newrecord;
      };
      return /* module */[
              /* decoder */decoder,
              /* component */component,
              /* make */make
            ];
    });
}

exports.Create = Create;
/* ReasonReact Not a pure module */
