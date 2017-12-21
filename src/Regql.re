module type Network = {let uri: string;};

module Create = (Network: Network, Container: CompTypes.Container) => {
  switch Container.runQuery {
  | OnMount => OnMountComp.Create(ContainerConfig)
  | OnQuery => OnQueryComp.Create(ContainerConfig)
  };
};