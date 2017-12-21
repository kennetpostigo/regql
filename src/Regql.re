type query =
  | OnMount
  | OnQuery;

module type NetworkConfig = {let uri: string;};

module type ContainerConfig = {
  type shape;
  type variables;
  let decoder: Js.Json.t => shape;
  let runQuery: query;
};

module Create = (NetworkConfig: NetworkConfig, ContainerConfig: ContainerConfig) => {
  switch ContainerConfig.runQuery {
  | OnMount => OnMountComp.Create(ContainerConfig)
  | OnQuery => OnQueryComp.Create(ContainerConfig)
  };
};