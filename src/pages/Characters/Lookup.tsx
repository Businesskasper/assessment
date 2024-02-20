import React from "react";
import { SuggestField } from "../../components";
import { useCharacterLookup } from "./character-service";

import "./Lookup.scss";

export const CharacterLookup = () => {
  const { lookupCharacters, foundCharacters } = useCharacterLookup();

  // Contains the last AbortController in order to cancel the previous fetch for suggestions
  const previousAbortController = React.useRef<AbortController>();

  const onSearch = (value: string) => {
    // Cancel previous fetch
    previousAbortController?.current && previousAbortController.current.abort();

    const newAbortController = new AbortController();
    previousAbortController.current = newAbortController;

    return lookupCharacters(value, newAbortController.signal);
  };

  return (
    <div className="character-search">
      <h1>Character Lookup</h1>
      <SuggestField threshold={3} onSearch={onSearch} />
      <ul>
        {foundCharacters.map((character) => (
          <li key={character.url}>{character.name}</li>
        ))}
      </ul>
    </div>
  );
};
