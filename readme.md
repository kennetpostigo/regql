# Regql

[![version](https://img.shields.io/npm/v/regql.svg?style=flat-square)](http://npm.im/regql)
[![MIT License](https://img.shields.io/npm/l/regql.svg?style=flat-square)](http://opensource.org/licenses/MIT)

GraphQL Client in Pure [ReasonML](https://reasonml.github.io). Stupid simple,
magic-free client backed by plain-old fetch. Inspired by
[reason-apollo](https://github.com/Gregoirevda/reason-apollo).

## Install

```bash
yarn install regql
```

## bsconfig

```json
"bs-dependencies": [
  "bs-json",
  "regql",
  "reason-react"
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
