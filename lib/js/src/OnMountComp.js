'use strict';

var Block       = require("bs-platform/lib/js/block.js");
var Curry       = require("bs-platform/lib/js/curry.js");
var Transport   = require("./Transport.js");
var Caml_array  = require("bs-platform/lib/js/caml_array.js");
var ReasonReact = require("reason-react/lib/js/src/ReasonReact.js");

function Create() {
  var component = ReasonReact.reducerComponent("Container");
  var make = function (uri, token, query, children) {
    var newrecord = component.slice();
    newrecord[/* didMount */4] = (function (param) {
        var state = param[/* state */2];
        var reduce = param[/* reduce */1];
        Transport.run(uri, token, query).then((function (data) {
                Curry._2(reduce, (function () {
                        return /* Result */Block.__(0, [data]);
                      }), /* () */0);
                return Promise.resolve(state);
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
/* Transport Not a pure module */