// Zustand Imports
import React from "react";
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

// React Imports

export const useRouterStore = create<SearchParamsStore>((set, get) => {
  return {
    search: window.location.search,
    setSearch(action) {
      const search = (() => {
        if (typeof action === "function") {
          return action(get().search);
        }

        return action;
      })();

      return set({ search });
    },
  };
});

export const useSearchParams = () => {
  const { search, setSearch } = useRouterStore(
    useShallow((store) => {
      return {
        search: store.search,
        setSearch: store.setSearch,
      };
    }),
  );

  const searchParams = React.useMemo(() => {
    return new URLSearchParams(search);
  }, [search]);

  const setSearchParams = React.useCallback(
    (action: Action) => {
      setSearch((prevSearch) => {
        if (typeof action === "function") {
          return action(new URLSearchParams(prevSearch)).toString();
        }

        return action.toString();
      });
    },
    [setSearch],
  );

  React.useEffect(() => {
    const animateId = requestAnimationFrame(() => {
      const url = new URL(window.location.href);
      url.search = search;
      history.replaceState(null, "", url);
    });

    return () => {
      cancelAnimationFrame(animateId);
    };
  }, [search]);

  return [searchParams, setSearchParams] as [
    typeof searchParams,
    typeof setSearchParams,
  ];
};

export interface SearchParamsStore {
  search: string;
  setSearch(search: SetSearchAction): void;
}
type SetSearchAction = string | SetSearchFunctionAction;
type SetSearchFunctionAction = (search: string) => string;

type Action = URLSearchParams | FunctionAction;
type FunctionAction = (prev: URLSearchParams) => URLSearchParams;
