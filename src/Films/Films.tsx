import { LoadingSpinner } from "../shared/components/LoadingSpinner/LoadingSpinner";
import { useFilms } from "./film-service";

import "./Films.scss";

export const Films = () => {
  const { films, isLoading } = useFilms();

  return (
    <div className="film-overview">
      <h1>Films</h1>
      {isLoading ? (
        <LoadingSpinner height="50px" />
      ) : (
        <ul>
          {films.map((film) => (
            <li key={film.url}>{film.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
