import React from "react";
import { People } from "./people-model";
import { API_BASE_URL, ApiResponse } from "../shared/api";

/**
 * React hook to fetch films
 *
 * @returns an object containing the loading state and fetched films
 */
export const usePeopleSearch = () => {
  const [foundPeople, setFoundPeople] = React.useState<Array<People>>([]);

  const [isLoading, setIsLoading] = React.useState(false);

  const searchPeople = React.useCallback((searchValue: string) => {
    setIsLoading(true);
    fetch(`${API_BASE_URL}/people/?search=${searchValue}`)
      .then((response) => response.json())
      .then((result: ApiResponse<People>) => {
        setFoundPeople(result.results);
        return result.results;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { foundPeople, isLoading, searchPeople };
};
