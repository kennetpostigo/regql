'use strict';

var $$Map = require("bs-platform/lib/js/map.js");
var Curry = require("bs-platform/lib/js/curry.js");
var $$String = require("bs-platform/lib/js/string.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");
var Caml_builtin_exceptions = require("bs-platform/lib/js/caml_builtin_exceptions.js");

var Cache = $$Map.Make([$$String.compare]);

function addTypename(str) {
  return str.replace((/{/g), "{\n\t__typename");
}

var empty = Cache[/* empty */0];

function clear() {
  return Cache[/* empty */0];
}

var isNewer = Caml_obj.caml_greaterthan;

function add(key, value, cache) {
  var exit = 0;
  var result;
  try {
    result = Curry._2(Cache[/* find */21], key, cache);
    exit = 1;
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      return Curry._3(Cache[/* add */3], key, value, cache);
    } else {
      throw exn;
    }
  }
  if (exit === 1) {
    var match = value[2] === result[2] && Caml_obj.caml_greaterthan(value[0], result[0]);
    if (match) {
      return Curry._3(Cache[/* add */3], key, value, cache);
    } else {
      return cache;
    }
  }
  
}

function isCached(query, variables, cache) {
  var exit = 0;
  var result;
  try {
    result = Curry._2(Cache[/* find */21], query, cache);
    exit = 1;
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      return false;
    } else {
      throw exn;
    }
  }
  if (exit === 1) {
    return variables === result[2];
  }
  
}

function get(query, cache) {
  try {
    return Curry._2(Cache[/* find */21], query, cache);
  }
  catch (exn){
    if (exn === Caml_builtin_exceptions.not_found) {
      return Pervasives.failwith("This is a bug, please report this");
    } else {
      throw exn;
    }
  }
}

function isStale() {
  return /* () */0;
}

exports.Cache = Cache;
exports.addTypename = addTypename;
exports.empty = empty;
exports.clear = clear;
exports.isNewer = isNewer;
exports.add = add;
exports.isCached = isCached;
exports.get = get;
exports.isStale = isStale;
/* Cache Not a pure module */
