import Parse from "parse/dist/parse.min.js";
import { useParseQuery } from "./hooks/useQuery";

export type Budget = Parse.Object<{
  available: number;
}>;

const budgetQuery = new Parse.Query<Budget>("Budget");

function App() {
  console.log(budgetQuery);

  const data = useParseQuery(budgetQuery);

  console.log(data.results[0]?.get("available"));

  return <div className=""></div>;
}

export default App;
