module Create = (Container: CompTypes.Component) => {
  type state =
    | Loading
    | Loaded(Container.shape)
    | Failed(string);
  type action =
    | Result(Container.shape)
    | Error(string);
  let component = ReasonReact.reducerComponent("Container");
  let make = (~query, ~variables=None, children) => {
    ...component,
    initialState: () => Loading,
    reducer: (action, _state) =>
      switch action {
      | Result(result) => ReasonReact.Update(Loaded(result))
      | Error(error) => ReasonReact.Update(Failed(error))
      },
    didMount: ({state, reduce}) => {
      Transport.run(Container.uri, Container.token, query, variables, Container.decoder)
      |> Js.Promise.then_(
           (data) => {
             reduce(() => Result(data), ());
             Js.Promise.resolve(state)
           }
         )
      |> ignore;
      ReasonReact.NoUpdate
    },
    render: ({state, reduce}) => {
      let onQuery = () =>
        Transport.run(Container.uri, Container.token, query, variables, Container.decoder)
        |> Js.Promise.then_(
             (data) => {
               reduce(() => Result(data), ());
               Js.Promise.resolve(state)
             }
           )
        |> ignore;
      children[0](state, onQuery)
    }
  };
};