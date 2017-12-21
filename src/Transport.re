external errToString : Js.Promise.error => string = "%identity";

exception ReGqlError(string);

let run = (uri, token, query, variables, decoder) => {
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
      uri,
      Fetch.RequestInit.make(
        ~method_=Post,
        ~headers=
          Fetch.HeadersInit.make({
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": token
          }),
        ~body,
        ()
      )
    )
    |> then_(Fetch.Response.json)
    |> then_((value) => resolve(decoder(value)))
    |> catch((err) => reject @@ ReGqlError(errToString(err)))
  )
};