import Parse from "parse/dist/parse.min.js";
import { useEffect } from "react";
import { useParseQuery } from "./hooks/useQuery";

export type Budget = Parse.Object<{
  available: number;
}>;

const budgetQuery = new Parse.Query<Budget>("Budget");

function App() {
  console.log(budgetQuery);

  const data = useParseQuery(budgetQuery);

  console.log(data.results[0]?.get("available"));

  useEffect(() => {
    data.reload();
  }, []);

  // const {
  //   isLive, // Indicates that Parse Live Query is connected
  //   isLoading, // Indicates that the initial load is being processed
  //   isSyncing, // Indicates that the library is getting the latest data from Parse Server
  //   results, // Stores the current results in an array of Parse Objects
  //   count, // Stores the current results count
  //   error, // Stores any error
  //   reload, // Function that can be used to reload the data
  // } = useParseQuery(
  //   budgetQuery, // The Parse Query to be used
  //   {
  //     enabled: true, // Enables the parse query (default: true)
  //     enableLocalDatastore: true, // Enables cache in local datastore (default: true)
  //     enableLiveQuery: true, // Enables live query for real-time update (default: true)
  //   },
  // );

  // console.log({
  //   isLive,
  //   isLoading,
  //   isSyncing,
  //   results,
  //   count,
  //   error,
  //   reload,
  // });

  return <div className=""></div>;
}

export default App;
