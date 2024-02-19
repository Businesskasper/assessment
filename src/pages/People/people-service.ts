import React from "react";
import { People } from "./people-model";
import { API_BASE_URL, ApiResponse } from "../../shared/api";

/**
 * React hook to fetch films
 *
 * @returns an object containing the loading state and fetched films
 */
export const usePeopleSearch = () => {
  const [foundPeople, setFoundPeople] = React.useState<Array<People>>([]);

  const [isLoading, setIsLoading] = React.useState(false);

  const searchPeople = React.useCallback(
    (searchValue: string, abortSignal: AbortSignal) => {
      setIsLoading(true);
      fetch(`${API_BASE_URL}/people/?search=${searchValue}`, {
        signal: abortSignal,
      })
        .then((response) => response.json())
        .then((result: ApiResponse<People>) => {
          setFoundPeople(result.results);
          return result.results;
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [],
  );

  return { foundPeople, isLoading, searchPeople };
};


export const usePeoplePaginated = () => {
  const [people, setPeople] = React.useState<Array<People>>();

  const [count, setCount] = React.useState(0);

  const [isLoading, setIsLoading] = React.useState(false);

  const getPeople = React.useCallback((page: number): Promise<People[]> => {
    setIsLoading(true);
    return fetch(`${API_BASE_URL}/people/?page=${page.toString()}`)
      .then((response) => response.json())
      .then((result: ApiResponse<People>) => {
        setPeople(result.results);
        setCount(result.count)
        return result.results;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { people, isLoading, count, getPeople };

}