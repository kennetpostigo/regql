'use strict';

var Block       = require("bs-platform/lib/js/block.js");
var Curry       = require("bs-platform/lib/js/curry.js");
var Transport   = require("./Transport.js");
var Caml_array  = require("bs-platform/lib/js/caml_array.js");
var ReasonReact = require("reason-react/lib/js/src/ReasonReact.js");

function Create(Container) {
  var component = ReasonReact.reducerComponent("Container");
  var make = function (query, $staropt$star, children) {
    var variables = $staropt$star ? $staropt$star[0] : /* None */0;
    var newrecord = component.slice();
    newrecord[/* render */9] = (function (param) {
        var state = param[/* state */2];
        var reduce = param[/* reduce */1];
        var onQuery = function () {
          Curry._2(reduce, (function () {
                  return /* Fired */0;
                }), /* () */0);
          Transport.run(Container[/* uri */2], Container[/* token */3], query, variables, Container[/* decoder */0]).then((function (data) {
                  Curry._2(reduce, (function () {
                          return /* Result */Block.__(0, [data]);
                        }), /* () */0);
                  return Promise.resolve(state);
                }));
          return /* () */0;
        };
        return Curry._2(Caml_array.caml_array_get(children, 0), state, onQuery);
      });
    newrecord[/* initialState */10] = (function () {
        return /* Idle */0;
      });
    newrecord[/* reducer */12] = (function (action, _) {
        if (typeof action === "number") {
          return /* Update */Block.__(0, [/* Loading */1]);
        } else if (action.tag) {
          return /* Update */Block.__(0, [/* Failed */Block.__(1, [action[0]])]);
        } else {
          return /* Update */Block.__(0, [/* Loaded */Block.__(0, [action[0]])]);
        }
      });
    return newrecord;
  };
  return /* module */[
          /* component */component,
          /* make */make
        ];
}

exports.Create = Create;
/* ReasonReact Not a pure module */
