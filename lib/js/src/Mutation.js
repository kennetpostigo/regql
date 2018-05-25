'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Cache = require("./Cache.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Transport = require("./Transport.js");
var ReasonReact = require("reason-react/lib/js/src/ReasonReact.js");

function Make(Network) {
  return (function (MCache) {
      var sendMutation = function (uri, token, query, send) {
        var match = Cache.isCached(query.query, query.variables, MCache[/* cache */0][0]);
        if (match) {
          var match$1 = Cache.get(query.query, MCache[/* cache */0][0]);
          Curry._1(send, /* Result */Block.__(0, [match$1[1]]));
        }
        return Transport.run(uri, token, query.query, query.variables).then((function (value) {
                        var ts = new Date();
                        Curry._1(MCache[/* update */1], Cache.add(query.query, /* tuple */[
                                  ts.getTime(),
                                  value,
                                  query.variables
                                ], MCache[/* cache */0][0]));
                        Curry._1(send, /* Result */Block.__(0, [value]));
                        return Promise.resolve(/* () */0);
                      })).catch((function () {
                      Curry._1(send, /* Error */Block.__(1, ["an error happened"]));
                      return Promise.resolve(/* () */0);
                    }));
      };
      var component = ReasonReact.reducerComponent("Regql");
      var make = function (children) {
        return /* record */[
                /* debugName */component[/* debugName */0],
                /* reactClassInternal */component[/* reactClassInternal */1],
                /* handedOffState */component[/* handedOffState */2],
                /* willReceiveProps */component[/* willReceiveProps */3],
                /* didMount */component[/* didMount */4],
                /* didUpdate */component[/* didUpdate */5],
                /* willUnmount */component[/* willUnmount */6],
                /* willUpdate */component[/* willUpdate */7],
                /* shouldUpdate */component[/* shouldUpdate */8],
                /* render */(function (param) {
                    var send = param[/* send */3];
                    var mutate = function (mutation) {
                      return sendMutation(Network[/* uri */0], Network[/* token */1], mutation, send);
                    };
                    return Curry._2(children, mutate, param[/* state */1]);
                  }),
                /* initialState */(function () {
                    return /* NotCalled */0;
                  }),
                /* retainedProps */component[/* retainedProps */11],
                /* reducer */(function (action, _) {
                    if (action.tag) {
                      return /* Update */Block.__(0, [/* Failed */Block.__(1, [action[0]])]);
                    } else {
                      var typedResult = action[0].data;
                      return /* Update */Block.__(0, [/* Loaded */Block.__(0, [typedResult])]);
                    }
                  }),
                /* subscriptions */component[/* subscriptions */13],
                /* jsElementWrapped */component[/* jsElementWrapped */14]
              ];
      };
      return /* module */[
              /* sendMutation */sendMutation,
              /* component */component,
              /* make */make
            ];
    });
}

exports.Make = Make;
/* Cache Not a pure module */
