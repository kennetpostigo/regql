module Make = (Network: Network.T) => {
  external castResponse : Js.Json.t => {. "data": Js.Json.t} = "%identity";
  type response =
    | Loading
    | Loaded(Js.Json.t)
    | Failed(string);
  type state = {
    response,
    variables: Js.Json.t
  };
  type action =
    | Result(Js.Json.t)
    | Error(string);
  let sendQuery = (uri: string, token: string, query, send) =>
    Transport.run(uri, token, query##query, query##variables)
    |> Js.Promise.then_(
         (value) => {
           send(Result(value));
           Js.Promise.resolve()
         }
       )
    |> Js.Promise.catch(
         (_value) => {
           send(Error("an error happened"));
           Js.Promise.resolve()
         }
       );
  let component = ReasonReact.reducerComponent("Regql");
  let make = (~query, children) => {
    ...component,
    initialState: () => {response: Loading, variables: query##variables},
    reducer: (action, state) =>
      switch action {
      | Result(result) =>
        let typedResult = castResponse(result)##data;
        ReasonReact.Update({...state, response: Loaded(typedResult)})
      | Error(error) => ReasonReact.Update({...state, response: Failed(error)})
      },
    didMount: ({send}) => {
      sendQuery(Network.uri, Network.token, query, send) |> ignore;
      ReasonReact.NoUpdate
    },
    render: ({state}) => children(state.response, query##parse)
  };
};
