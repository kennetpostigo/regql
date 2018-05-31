'use strict';


function compress(query) {
  return query.replace((/}/g), "__typename\n}\n").replace((/\s+/g), " ").replace((/ ,|, /g), ",").replace((/ :|: /g), ":").replace((/{| { /g), "{").replace((/}| } /g), "}").replace((/\(| \( /g), "(").replace((/\)| \) /g), ")").trim();
}

exports.compress = compress;
/* No side effect */
