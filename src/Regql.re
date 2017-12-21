type query =
  | OnMount
  | OnQuery;

module type Network = {let uri: string;};

module type Container = {
  type shape;
  type variables;
  let decoder: Js.Json.t => shape;
  let runQuery: query;
};

module Create = (Network: Network, Container: Container) => {
  switch Container.runQuery {
  | OnMount => OnMountComp.Create(ContainerConfig)
  | OnQuery => OnQueryComp.Create(ContainerConfig)
  };
};