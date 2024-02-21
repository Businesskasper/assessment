import { SuggestField } from "../../components";
import { useCharacterLookup } from "./character-service";

import "./Lookup.scss";

export const CharacterLookup = () => {
  const { lookupCharacters, foundCharacters } = useCharacterLookup();

  return (
    <div className="character-search">
      <h1>Character Lookup</h1>
      <SuggestField threshold={3} onSearch={lookupCharacters} />
      <ul>
        {foundCharacters.map((character) => (
          <li key={character.url}>{character.name}</li>
        ))}
      </ul>
    </div>
  );
};
