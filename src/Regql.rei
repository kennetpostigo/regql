module type Network = {let uri: string; let token: string;};

module type Container = {
  type shape;
  type variables;
  let decoder: Js.Json.t => shape;
  let runQuery: CompTypes.query;
};

module Create:
  (Network: Network, Container: Container) =>
  {
    module Component: {
      type shape = Container.shape;
      type variables = Container.variables;
      let decoder: Js.Json.t => Container.shape;
      let runQuery: CompTypes.query;
      let uri: string;
      let token: string;
    };
  };
