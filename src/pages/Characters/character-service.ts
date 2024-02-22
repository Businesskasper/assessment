import React from "react";
import { Character } from "./character-model";
import { API_BASE_URL, ApiListResponse } from "../../shared/api";

/**
 * React hook to query characters
 *
 * @returns an object containing the loading state and fetched films
 */
export const useCharacterLookup = () => {
  const [foundCharacters, setFoundCharacters] = React.useState<
    Array<Character>
  >([]);

  const [isLoading, setIsLoading] = React.useState(false);

  const lookupCharacters = React.useCallback(
    (searchValue: string, abortSignal: AbortSignal) => {
      setIsLoading(true);
      return fetch(`${API_BASE_URL}/people/?search=${searchValue}`, {
        signal: abortSignal,
      })
        .then((response) => response.json())
        .then(({ results }: ApiListResponse<Character>) => {
          setFoundCharacters(results);
          return results;
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    []
  );

  return { foundCharacters, isLoading, lookupCharacters };
};

/**
 * React hook to fetch characters paginated
 */
export const useCharactersPaginated = () => {
  const [characters, setCharacters] = React.useState<Array<Character>>();

  const [count, setCount] = React.useState(0);

  const [isLoading, setIsLoading] = React.useState(false);

  const getCharacters = React.useCallback(
    (page: number): Promise<Character[]> => {
      setIsLoading(true);
      return fetch(`${API_BASE_URL}/people/?page=${page.toString()}`)
        .then((response) => response.json())
        .then(({ results, count }: ApiListResponse<Character>) => {
          setCharacters(results);
          setCount(count);
          return results;
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    []
  );

  return { characters, isLoading, count, getCharacters };
};
