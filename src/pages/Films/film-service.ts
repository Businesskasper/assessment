import React from "react";
import { ApiResponse, API_BASE_URL } from "../../shared/api";
import { Film } from "./film-model";

/**
 * React hook to fetch films
 *
 * @returns an object containing the loading state and fetched films
 */
export const useFilms = () => {
  const [films, setFilms] = React.useState<Array<Film>>([]);

  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    fetch(`${API_BASE_URL}/films`)
      .then((response) => response.json())
      .then((result: ApiResponse<Film>) => {
        setFilms(result.results);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { films, isLoading };
};
