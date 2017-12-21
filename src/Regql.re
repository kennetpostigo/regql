

module type NetworkConfig = {let uri: string; let token: string;};

module Create = (NetworkConfig: NetworkConfig, ContainerConfig: ) => {

};