export type ApiResponse<T> = {
  count: number;
  next?: string;
  previous?: string;
  results: Array<T>;
};

export const API_BASE_URL = "https://swapi.dev/api";
