module Make = (Network: Network.T) => {
  module Mutation = Mutation.Make(Network);
  module Query = Query.Make(Network);
};
