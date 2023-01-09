import Parse from "parse/dist/parse.min.js";
import { useState } from "react";

export interface InitialLoad<T extends Parse.Object<Parse.Attributes>> {
  results: T[];
  count?: number;
}

export interface UseParseQueryOptions<
  T extends Parse.Object<Parse.Attributes>,
> {
  enabled?: boolean;
  enableLiveQuery?: boolean;
  initialLoad?: InitialLoad<T>;
}

export function useParseQuery<
  T extends Parse.Object<Parse.Attributes>,
>(
  query: Parse.Query<T>,
  options: UseParseQueryOptions<T> = {
    enabled: true,
  },
) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [results, setResults] = useState<T[]>([]);
  const [count, setCount] = useState(0);
  const [error, setError] = useState<Error | null>(null);

  const reload = () => {
    if (!options.enabled) {
      return;
    }

    setIsLoading(true);
    setError(null);

    query
      .find()
      .then((results) => {
        setResults(results);
        setCount(results.length);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    isLoading,
    isLive,
    isSyncing,
    results,
    count,
    error,
    reload,
  };
}

// const [isLoading, setIsLoading] = useState(false);
// const [isLive, setIsLive] = useState(false);
// const [isSyncing, setIsSyncing] = useState(false);
// const [results, setResults] = useState([]);
// const [count, setCount] = useState(0);
// const [error, setError] = useState(null);

// const reload = useCallback(() => {
//   // ...
// }, []);

// return {
//   isLoading,
//   isLive,
//   isSyncing,
//   results,
//   count,
//   error,
//   reload,
// };
