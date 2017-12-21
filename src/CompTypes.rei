type query =
  | OnMount
  | OnQuery;

module type Component = {
  type shape;
  type variables;
  let decoder: Js.Json.t => shape;
  let runQuery: query;
  let uri: string;
  let token: string;
};

module type Sig = {
  type state;
  type action;
  let component:
    ReasonReact.componentSpec(
      state,
      ReasonReact.stateless,
      ReasonReact.noRetainedProps,
      ReasonReact.noRetainedProps,
      action
    );
  let make:
    (
      ~query: 'a,
      ~variables: option('b)=?,
      array(((state, unit => unit) => ReasonReact.reactElement))
    ) =>
    ReasonReact.componentSpec(
      state,
      state,
      ReasonReact.noRetainedProps,
      ReasonReact.noRetainedProps,
      action
    );
};