type query =
  | OnMount
  | OnQuery;

module type Container = {
  type shape;
  type variables;
  let decoder: Js.Json.t => shape;
  let runQuery: query;
};