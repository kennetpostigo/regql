'use strict';

var OnMountComp = require("./OnMountComp.js");
var OnQueryComp = require("./OnQueryComp.js");

function Create(Network) {
  return (function (Container) {
      var decoder = Container[/* decoder */0];
      var runQuery = Container[/* runQuery */1];
      var uri = Network[/* uri */0];
      var token = Network[/* token */1];
      var Component = /* module */[
        /* decoder */decoder,
        /* runQuery */runQuery,
        /* uri */uri,
        /* token */token
      ];
      var onMount = OnMountComp.Create(Component);
      var onQuery = OnQueryComp.Create(Component);
      var match = Container[/* runQuery */1];
      +(match !== 0);
      return /* module */[
              /* Component */Component,
              /* onMount */onMount,
              /* onQuery */onQuery
            ];
    });
}

exports.Create = Create;
/* OnMountComp Not a pure module */
