module Cache = Map.Make(String);

let addTypename = (str) =>
  Js.String.replaceByRe([%re "/{/g"], "{\n\t__typename", str);

module type T = {
  let cache: ref(Cache.t((float, Js.Json.t, Js.Json.t)));
  let update: Cache.t((float, Js.Json.t, Js.Json.t)) => unit;
};

let empty: Cache.t((float, Js.Json.t, Js.Json.t)) = Cache.empty;

let clear = () => Cache.empty;

let isNewer = (ts1, ts2) => ts1 > ts2;

let add = (key: Cache.key, value, cache) => {
  let (ts, _newValue, vars) = value;
  switch (Cache.find(key, cache)) {
  | result =>
    let (currTs, _currValue, currVars) = result;
    vars === currVars && isNewer(ts, currTs) ?
      Cache.add(key, value, cache) : cache
  | exception Not_found => Cache.add(key, value, cache)
  }
};

let isCached = (query, variables, cache) =>
  switch (Cache.find(query, cache)) {
  | result =>
    let (_ts, _value, resVariables) = result;
    variables === resVariables
  | exception Not_found => false
  };

let get = (query, cache: Cache.t((float, Js.Json.t, Js.Json.t))) =>
  switch (Cache.find(query, cache)) {
  | result => result
  | exception Not_found => failwith("This is a bug, please report this")
  };

let isStale = () => ();