let cache = ref(Cache.empty);

external errToString : Js.Promise.error => string = "%identity";

exception RegqlError(string);

let run = (uri: string, token: string, query: string, variables: Js.Json.t) => {
  let body =
    switch (Js.Json.stringifyAny({"query": query, "variables": variables})) {
    | Some(next) => Fetch.BodyInit.make(next)
    | None =>
      failwith(
        "Regql: when making the request the query/mutation variables we're malformed. Please check the variables Js.t passed in doesn't hold function values or any values not supported in Json"
      )
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
    |> then_((value) => resolve(value))
    |> catch((err) => reject @@ RegqlError(errToString(err)))
  )
};
