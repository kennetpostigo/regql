module Make = (Network: Network.T, MCache: Cache.T) => {
  external castResponse : Js.Json.t => {. "data": Js.Json.t} = "%identity";

  type state =
    | NotCalled
    | Loading
    | Loaded(Js.Json.t)
    | Failed(string);

  type action =
    | Result(Js.Json.t)
    | Error(string);

  let sendMutation = (uri: string, token: string, query, send) => {
    Cache.isCached(query##query, query##variables, MCache.cache^) ?
      {
        let (_ts, value, _vars) = Cache.get(query##query, MCache.cache^);
        send(Result(value));
      } :
      ();
    Transport.run(uri, token, query##query, query##variables)
    |> Js.Promise.then_(value => {
         let ts = Js.Date.make();
         MCache.update(
           Cache.add(
             query##query,
             (Js.Date.getTime(ts), value, query##variables),
             MCache.cache^,
           ),
         );
         send(Result(value));
         Js.Promise.resolve();
       })
    |> Js.Promise.catch(_value => {
         send(Error("an error happened"));
         Js.Promise.resolve();
       });
  };

  let component = ReasonReact.reducerComponent("Regql");
  
  let make = children => {
    ...component,
    initialState: () => NotCalled,
    reducer: (action, _state) =>
      switch (action) {
      | Result(result) =>
        let typedResult = castResponse(result)##data;
        ReasonReact.Update(Loaded(typedResult));
      | Error(error) => ReasonReact.Update(Failed(error))
      },
    render: ({send, state}) => {
      let mutate = mutation =>
        sendMutation(Network.uri, Network.token, mutation, send);
      children(mutate, state);
    },
  };
};