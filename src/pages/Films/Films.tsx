import React from "react";
import { LoadingSpinner } from "../../components";
import { Film } from "./film-model";
import { useFilms } from "./film-service";
import { Character } from "../Characters/character-model";

import "./Films.scss";

export const Films = () => {
  const { films, isLoading } = useFilms();

  return (
    <div className="film-overview">
      <h1>Films</h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="film-list">
          {films.map((film) => (
            <FilmDetails key={film.url} film={film} />
          ))}
        </div>
      )}
    </div>
  );
};

type FilmDetailsProps = {
  film: Film;
};
const FilmDetails = ({ film }: FilmDetailsProps) => {
  const [charactersExpanded, setCharactersExpanded] = React.useState(false);

  const toggleCharactersExpanded = () => {
    setCharactersExpanded((exp) => !exp);
  };

  return (
    <div className="film-details">
      <div className="toggle-container">
        <div className="toggle" onClick={toggleCharactersExpanded}>
          {charactersExpanded ? "-" : "+"}
        </div>
        <div>{film.title}</div>
      </div>
      {charactersExpanded && (
        <div className="characters">
          <h4>Characters</h4>
          <div className="character-list">
            {film.characters.map((characterUrl) => (
              <CharacterDetails key={characterUrl} url={characterUrl} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

type CharacterDetailsProps = {
  url: string;
};
const CharacterDetails = ({ url }: CharacterDetailsProps) => {
  const { isLoading, resource: character } = useSingleResource<Character>(url);

  return (
    <div className={`character-details ${isLoading ? "loading" : ""}`}>
      <h5>{character?.name || "..."}</h5>
      <div className="key-value-pair">
        <div className="label">Height</div>
        <div className="value">{character?.height || "..."}</div>
      </div>
      <div className="key-value-pair">
        <div className="label">Mass</div>
        <div className="value">{character?.mass || "..."}</div>
      </div>
    </div>
  );
};

const useSingleResource = <T,>(url: string) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const [resource, setResource] = React.useState<T>();

  const abortController = React.useRef(new AbortController());
  React.useEffect(() => {
    getResource();

    return () => {
      abortController.current?.abort("Component unmounted");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const getResource = () => {
    setIsLoading(true);
    return fetch(url, {
      signal: abortController.current.signal,
      cache: "force-cache",
    })
      .then((response) => response.json())
      .then((result: T) => {
        setResource(result);
        return result;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { isLoading, resource };
};
