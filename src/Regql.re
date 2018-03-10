module Make = (Network: Network.T) => {
  module ClientCache = {
    let cache = ref(Cache.empty);
    let update = (nextCache) => cache := nextCache;
  };
  module Mutation = Mutation.Make(Network, ClientCache);
  module Query = Query.Make(Network, ClientCache);
};
