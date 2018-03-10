'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Cache = require("./Cache.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Transport = require("./Transport.js");
var ReasonReact = require("reason-react/lib/js/src/ReasonReact.js");

function Make(Network) {
  return (function (QCache) {
      var sendQuery = function (uri, token, query, send) {
        var match = Cache.isCached(query.query, query.variables, QCache[/* cache */0][0]);
        if (match !== 0) {
          var match$1 = Cache.get(query.query, QCache[/* cache */0][0]);
          Curry._1(send, /* Result */Block.__(0, [match$1[1]]));
        }
        return Transport.run(uri, token, query.query, query.variables).then((function (value) {
                        var ts = new Date();
                        Curry._1(QCache[/* update */1], Cache.add(query.query, /* tuple */[
                                  ts.getTime(),
                                  value,
                                  query.variables
                                ], QCache[/* cache */0][0]));
                        Curry._1(send, /* Result */Block.__(0, [value]));
                        return Promise.resolve(/* () */0);
                      })).catch((function () {
                      Curry._1(send, /* Error */Block.__(1, ["an error happened"]));
                      return Promise.resolve(/* () */0);
                    }));
      };
      var component = ReasonReact.reducerComponent("Regql");
      var make = function (query, children) {
        var newrecord = component.slice();
        newrecord[/* didMount */4] = (function (param) {
            sendQuery(Network[/* uri */0], Network[/* token */1], query, param[/* send */4]);
            return /* NoUpdate */0;
          });
        newrecord[/* render */9] = (function (param) {
            return Curry._2(children, param[/* state */2][/* response */0], query.parse);
          });
        newrecord[/* initialState */10] = (function () {
            return /* record */[
                    /* response : Loading */0,
                    /* variables */query.variables
                  ];
          });
        newrecord[/* reducer */12] = (function (action, state) {
            if (action.tag) {
              return /* Update */Block.__(0, [/* record */[
                          /* response : Failed */Block.__(1, [action[0]]),
                          /* variables */state[/* variables */1]
                        ]]);
            } else {
              var typedResult = action[0].data;
              return /* Update */Block.__(0, [/* record */[
                          /* response : Loaded */Block.__(0, [typedResult]),
                          /* variables */state[/* variables */1]
                        ]]);
            }
          });
        return newrecord;
      };
      return /* module */[
              /* sendQuery */sendQuery,
              /* component */component,
              /* make */make
            ];
    });
}

exports.Make = Make;
/* Cache Not a pure module */
