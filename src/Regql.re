type query = 
| OnMount
| OnQuery;

let create = (uri, token, typ, query) => {
  switch typ {
  | OnMount => OnMountTemplate.make(uri, token, query)
  | OnQuery => OnQueryComponent.make(uri, token, query)
  }
};