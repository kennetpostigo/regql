module Create:
  (Container: CompTypes.Component) =>
  {
    type state =
      | Idle
      | Loading
      | Loaded(Container.shape)
      | Failed(string);
    type action =
      | Result(Container.shape)
      | Fired
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