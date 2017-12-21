external errToString : Js.Promise.error => string = "%identity";

exception ReGqlError(string);

let run: (string, 'a, 'b, option('c), Js.Json.t => 'd) => Js.Promise.t('d);