'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Transport = require("./Transport.js");
var ReasonReact = require("reason-react/lib/js/src/ReasonReact.js");

function Make(Network) {
  var sendMutation = function (uri, token, query, send) {
    return Transport.run(uri, token, query.query, query.variables).then((function (value) {
                    Curry._1(send, /* Result */Block.__(0, [value]));
                    return Promise.resolve(/* () */0);
                  })).catch((function () {
                  Curry._1(send, /* Error */Block.__(1, ["an error happened"]));
                  return Promise.resolve(/* () */0);
                }));
  };
  var component = ReasonReact.reducerComponent("Regql");
  var make = function (children) {
    var newrecord = component.slice();
    newrecord[/* render */9] = (function (param) {
        var send = param[/* send */4];
        var mutate = function (mutation) {
          return sendMutation(Network[/* uri */0], Network[/* token */1], mutation, send);
        };
        return Curry._2(children, mutate, param[/* state */2]);
      });
    newrecord[/* initialState */10] = (function () {
        return /* NotCalled */0;
      });
    newrecord[/* reducer */12] = (function (action, _) {
        if (action.tag) {
          return /* Update */Block.__(0, [/* Failed */Block.__(1, [action[0]])]);
        } else {
          var typedResult = action[0].data;
          return /* Update */Block.__(0, [/* Loaded */Block.__(0, [typedResult])]);
        }
      });
    return newrecord;
  };
  return /* module */[
          /* sendMutation */sendMutation,
          /* component */component,
          /* make */make
        ];
}

exports.Make = Make;
/* Transport Not a pure module */
