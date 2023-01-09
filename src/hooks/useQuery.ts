import Parse from "parse/dist/parse.min.js";
import { useEffect, useState } from "react";
import { useMountedState } from "react-use";

export interface UseParseQueryOptions {
  enabled?: boolean;
  enableLiveQuery?: boolean;
  fetchOnInit?: boolean;
}

export function useParseQuery<
  T extends Parse.Object<Parse.Attributes>,
>(
  query: Parse.Query<T>,
  options: UseParseQueryOptions = {
    enabled: true,
  },
) {
  const isMounted = useMountedState();

  // Parse related state
  const [isLoading, setIsLoading] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [results, setResults] = useState<T[]>([]);
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);

  const reload = () => {
    if (!options.enabled) {
      return;
    }

    setIsLoading(true);

    query
      .find()
      .then((results) => {
        setResults(results);
        setCount(results.length);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  };

  async function subscribeToQuery(): Promise<() => void> {
    const subscription = await query.subscribe();

    subscription.on("open", () => {
      setIsLive(true);
    });

    subscription.on("close", () => {
      setIsLive(false);
    });

    subscription.on("create", (object) => {
      setResults((results) => [...results, object as T]);
      setCount((count) => count + 1);
    });

    subscription.on("update", (object) => {
      setResults((results) => {
        const index = results.findIndex((result) => {
          return result.id === object.id;
        });

        if (index === -1) {
          return results;
        }

        return [
          ...results.slice(0, index),
          object as T,
          ...results.slice(index + 1),
        ];
      });
    });

    subscription.on("delete", (object) => {
      setResults((results) => {
        const index = results.findIndex((result) => {
          return result.id === object.id;
        });

        if (index === -1) {
          return results;
        }

        return [...results.slice(0, index), ...results.slice(index + 1)];
      });
      setCount((count) => count - 1);
    });

    return subscription.unsubscribe;
  }

  useEffect(() => {
    let unSub: (() => void) | undefined;
    if (options.fetchOnInit) {
      reload();
    }
    if (options.enableLiveQuery) {
      subscribeToQuery()
        .then((unsubscribe) => {
          if (!isMounted) {
            // Check if unmounted - unsubscribe;
            unsubscribe();
          } else {
            // Or pass unsubscribe to effect unmount fn
            unSub = unsubscribe;
          }
        });
    }
    return () => {
      unSub?.();
    };
  }, [options.enableLiveQuery]);

  return {
    isLoading,
    isLive,
    results,
    count,
    error,
    reload,
  };
}
