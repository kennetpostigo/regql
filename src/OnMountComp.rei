module Create:
  (Container: CompTypes.Component) =>
  {
    type state =
      | Loading
      | Loaded(Container.shape)
      | Failed(string);
    type action =
      | Result(Container.shape)
      | Error(string);
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