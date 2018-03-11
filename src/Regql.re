module Make = (Network: Network.T) => {
  module ClientCache = {
    let cache = ref(Cache.empty);
    let update = (nextCache) => {
      Js.log2("Current Cache: ", cache^);
      Js.log2("Next Cache: ", cache^);
      cache := nextCache
    };
  };
  module Mutation = Mutation.Make(Network, ClientCache);
  module Query = Query.Make(Network, ClientCache);
};
