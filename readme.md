# Regql

[![version](https://img.shields.io/npm/v/regql.svg?style=flat-square)](http://npm.im/regql)
[![downloads](https://img.shields.io/npm/dm/regql.svg?style=flat-square)](http://npm-stat.com/charts.html?package=regql)
[![MIT License](https://img.shields.io/npm/l/regql.svg?style=flat-square)](http://opensource.org/licenses/MIT)

GraphQL Client in Pure [ReasonML](https://reasonml.github.io). Stupid simple,
magic-free client backed by plain-old fetch.

## Install

```bash
# regql peer dependencies
yarn add regql reason-react bs-fetch

# graphql_ppx for some nice compile-time validation
yarn add --dev graphql_ppx
```

## bsconfig

```json
"bs-dependencies": [
  "reason-react",
  "bs-fetch",
  "regql"
],
"ppx-flags": ["graphql_ppx/ppx"],
```

## Usage

#### Instantiate the client and pass it configuration:

```reason
// Client.re
module Client = Regql.Create({
  let uri = "http://localhost:8000/graphql"
  let token = ""; /* leave blank if no token */
});
```

#### Query Example

```reason
/* Create a GraphQL Query by using the graphql_ppx */
module PokemonQuery = [%graphql {|
  query getPokemon($name: String!){
      pokemon(name: $name) {
          name
      }
  }
|}];

module Query = Client.Instance.Query;

let make = (_children) => {
  /* ... */
  render: (_) => {
    let pokemonQuery = PokemonQuery.make(~name="Pikachu", ());
    <Query query=pokemonQuery>
      ...((response, parse) => {
        switch response {
           | Loading => <div> (Utils.ste("Loading")) </div>
           | Failed(error) => <div> (Utils.ste(error)) </div>
           | Loaded(result) => <div> (Utils.ste(parse(result)##user##name)) </div>
        }
      })
    </Query>
  }
}
```

#### Mutation Example

```reason
module PokemonMutation = [%graphql {|
  mutation addPokemon($name: String!) {
      addPokemon(name: $name) {
          name
      }
  }
|}];

module Mutation = Client.Instance.Mutation;

let make = (_children) => {
  /* ... */
  initialState: {
    parse
  },
  reducer: (action, state) =>
    switch (action) {
    | AddParser(parse) => ReasonReact.Update({...state, parse})
  },
  render: ({reduce, state: {parse}}) => {  
    <Mutation>
      ...((
        mutate /* Mutation to call */,
        result /* Result of your mutation */
      ) => {
          let mutationResponse = switch result {
            | NotCalled => <div>  (Utils.ste("Not Called")) </div>
            | Loading => <div> (Utils.ste("Loading")) </div>
            | Loaded(response) => <div> (Utils.ste(parse(result)##addPokemon##name ++ " addded")) </div>
            | Failed(error) => <div> (Utils.ste(error)) </div>
          };
        <div>
          <button onClick=((_mouseEvent) => {
              let pokemonMutation = PokemonMutation.make(~name="Reason", ());
              mutate(pokemonMutation);
              reduce(() => AddParser(pokemonMutation##parse), ());
            })>
            (Utils.ste("Add Pokemon"))
          </button>
          <div> (mutationResponse) </div>
        </div>
      })
    </Mutation>
  }
}
```
