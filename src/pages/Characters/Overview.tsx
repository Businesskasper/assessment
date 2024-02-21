import { LoadingSpinner, Paginator } from "../../components";
import { useCharactersPaginated } from "./character-service";

import "./Overview.scss";

export const Overview = () => {
  const { isLoading, getCharacters, count, characters } =
    useCharactersPaginated();
  const totalPages = Math.ceil((count || 0) / 10);

  const onPageChange = (page: number) => {
    getCharacters(page);
  };

  return (
    <div className="character-overview">
      <h1>Character Overview</h1>
      <Paginator onPageChange={onPageChange} totalPages={totalPages} />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ul>
          {characters?.map((character) => (
            <li key={character.url}>{character.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
