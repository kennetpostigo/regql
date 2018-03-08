'use strict';

var Query = require("./Query.js");
var Mutation = require("./Mutation.js");

function Make(Network) {
  var Mutation$1 = Mutation.Make(Network);
  var Query$1 = Query.Make(Network);
  return /* module */[
          /* Mutation */Mutation$1,
          /* Query */Query$1
        ];
}

exports.Make = Make;
/* Query Not a pure module */
