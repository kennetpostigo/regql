module type NetworkConfig = {let uri: string;};

module type ContainerConfig = {type shape; type variables; let decoder: Js.Json.t => shape;};

external errToString : Js.Promise.error => string = "%identity";

module Create = (NetworkConfig: NetworkConfig, ContainerConfig: ContainerConfig) => {
  type data = {data: ContainerConfig.shape};
  let decoder = (json) : data =>
    Json.Decode.{data: json |> field("data", ContainerConfig.decoder)};
  type state =
    | Loading
    | Loaded(ContainerConfig.shape)
    | Failed(string);
  type action =
    | Result(ContainerConfig.shape)
    | Error(string);
  let component = ReasonReact.reducerComponent("Gql");
  let make = (~query, ~variables=None, children) => {
    ...component,
    initialState: () => Loading,
    reducer: (action, _state) =>
      switch action {
      | Result(result) => ReasonReact.Update(Loaded(result))
      | Error(error) => ReasonReact.Update(Failed(error))
      },
    didMount: ({reduce}) => {
      let body =
        switch variables {
        | Some(variables) =>
          switch (Js.Json.stringifyAny({"query": query, "variables": variables})) {
          | Some(next) => Fetch.BodyInit.make(next)
          | None =>
            failwith(
              "Regql: when making the request the query/mutation variables we're malformed. Please check the variables Js.t passed in doesn't hold function values or any values not supported in Json"
            )
          }
        | None =>
          switch (Js.Json.stringifyAny({"query": query})) {
          | Some(next) => Fetch.BodyInit.make(next)
          | None =>
            failwith(
              "Regql: when making the request the query/mutation variables we're malformed. Please check the variables Js.t passed in doesn't hold function values or any values not supported in Json"
            )
          }
        };
      Js.Promise.(
        Fetch.fetchWithInit(
          NetworkConfig.uri,
          Fetch.RequestInit.make(
            ~method_=Post,
            ~headers=
              Fetch.HeadersInit.make({
                "Accept": "application/json",
                "Content-Type": "application/json"
              }),
            ~body,
            ()
          )
        )
        |> then_(Fetch.Response.json)
        |> then_(
             (value) => {
               reduce(() => Result(decoder(value).data), ());
               resolve()
             }
           )
        |> catch(
             (err) => {
               reduce(() => Error("Regql " ++ errToString(err)), ());
               resolve()
             }
           )
        |> ignore
      );
      ReasonReact.NoUpdate
    },
    render: ({state}) => children[0](state)
  };
};
