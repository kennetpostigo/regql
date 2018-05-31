let compress = query =>
  Js.String.replaceByRe([%bs.re "/}/g"], "__typename\n}\n", query)
  |> Js.String.replaceByRe([%bs.re "/\\s+/g"], " ")
  |> Js.String.replaceByRe([%bs.re "/ ,|, /g"], ",")
  |> Js.String.replaceByRe([%bs.re "/ :|: /g"], ":")
  |> Js.String.replaceByRe([%bs.re "/{| { /g"], "{")
  |> Js.String.replaceByRe([%bs.re "/}| } /g"], "}")
  |> Js.String.replaceByRe([%bs.re "/\\(| \\( /g"], "(")
  |> Js.String.replaceByRe([%bs.re "/\\)| \\) /g"], ")")
  |> Js.String.trim;