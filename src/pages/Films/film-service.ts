import React from "react";
import { Film } from "./film-model";
import { API_BASE_URL, ApiResponse } from "../../shared/api";

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
