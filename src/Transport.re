external errToString : Js.Promise.error => string = "%identity";

exception ReGqlError(string);

let run = (uri, token, gql) =>
  Js.Promise.(
    Fetch.fetchWithInit(
      uri,
      Fetch.RequestInit.make(
        ~method_=Post,
        ~headers=
          Fetch.HeadersInit.make({
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": token
          }),
        ~body=
          Js.Dict.fromList([("query", Js.Json.string(gql##query)), ("variables", gql##variables)])
          |> Js.Json.object_
          |> Js.Json.stringify
          |> Fetch.BodyInit.make,
        ()
      )
    )
    |> then_(Fetch.Response.json)
    |> then_(
         (value) =>
           switch (Js.Json.decodeObject(value)) {
           | Some(data) =>
             let res = Js.Dict.unsafeGet(data, "data") |> gql##parse;
             resolve(res)
           | None => reject @@ ReGqlError("Response is not an object")
           }
       )
    |> catch((err) => reject @@ ReGqlError(errToString(err)))
  );