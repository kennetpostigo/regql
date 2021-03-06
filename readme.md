# Regql

[![version](https://img.shields.io/npm/v/regql.svg?style=flat-square)](http://npm.im/regql)
[![downloads](https://img.shields.io/npm/dm/regql.svg?style=flat-square)](http://npm-stat.com/charts.html?package=regql)
[![MIT License](https://img.shields.io/npm/l/regql.svg?style=flat-square)](http://opensource.org/licenses/MIT)

GraphQL Client in Pure [ReasonML](https://reasonml.github.io). Stupid simple,
magic-free client backed by plain-old fetch. Inspired by
[reason-apollo](https://github.com/Gregoirevda/reason-apollo).

## RoadMap

In the near future these are the planned additional features:

* [ ] integration with [graphql_ppx](https://github.com/mhallin/graphql_ppx)
* [ ] Cache queries/requests
* [ ] Optimistic Updates

## Install

```bash
yarn add regql
```

## bsconfig

```json
"bs-dependencies": [
  "reason-react",
  "bs-fetch",
  "bs-json",
  "regql"
]
```

## Usage

#### Instantiate the client and pass it configuration:

```reason
// Gql.re
module Client = Regql.Create({
  let uri = "http://localhost:8000/graphql"
});
```

#### Create a query

```reason
let query = {|
    query getUser {
      name
    }
  |};
```

#### Define the response shape

```reason
type user = {name: string};
type data = {user: user};
```

#### Define Decoder for your response

```reason
let user = (json) =>
  Json.Decode.{
    name: json |> field("name", string),
  };

let data = (json) =>
  Json.Decode.{
    user: json |> field("user", user)
  };
```

#### Define Container configuration

```reason
module Container = {
  type shape = data;
  type variables; /* or some type `type variables = {"one": 1};` if used */
  let decoder = data;
};
```

### Pass Container configuration to Gql.Client

```reason
module FetchUserName = Gql.Client(Container);
```

### Use the FetchUserName Component

```reason
render: (_) =>
<FetchUserName query>
  ((response) => {
    switch response {
       | Loading => <div> (ReasonReact.stringToElement("Loading")) </div>
       | Failed(error) => <div> (ReasonReact.stringToElement(error)) </div>
       | Loaded(result) =><div> (ReasonReact.stringToElement(result.user.name)) </div>
  })
</FetchUserName>
```
