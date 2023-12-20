// Zustand Imports
import React from "react";
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

const useRouterStore = create<SearchParamsStore>((set) => {
  return {
    search: window.location.search,
    setSearch(search) {
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
    })
  );

  const searchParams = React.useMemo(() => {
    return new URLSearchParams(search);
  }, [search]);

  const setSearchParams = React.useCallback(
    (action: Action) => {
      const newSearch = (() => {
        if (typeof action === "function") {
          return action(new URLSearchParams(window.location.search));
        }

        return action;
      })();

      const url = new URL(window.location.href);
      url.search = newSearch.toString();
      history.replaceState(null, "", url);

      setSearch(url.search);
    },
    [setSearch]
  );

  return [searchParams, setSearchParams] as [
    typeof searchParams,
    typeof setSearchParams
  ];
};

export interface SearchParamsStore {
  search: string;
  setSearch(search: string): void;
}

type Action = URLSearchParams | FunctionAction;
type FunctionAction = (prev: URLSearchParams) => URLSearchParams;
