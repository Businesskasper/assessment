import { SuggestField } from "../../components";
import { useCharacterLookup } from "./character-service";

import "./Lookup.scss";

export const CharacterLookup = () => {
  const { lookupCharacters: searchCharacters, foundCharacters } = useCharacterLookup();

  const onSearch = (value: string) => searchCharacters(value);

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
