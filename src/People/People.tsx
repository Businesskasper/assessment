import { LoadingSpinner } from "../shared/components/LoadingSpinner/LoadingSpinner";
import "./People.scss";
import { usePeopleSearch } from "./people-service";

export const People = () => {
  const { isLoading, searchPeople, foundPeople } = usePeopleSearch();

  const onSearchKeyUp: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { value } = event.target as HTMLInputElement;

    if (value?.length < 3) return;

    searchPeople(value);
  };

  return (
    <div className="people-overview">
      <h1>People</h1>
      <div className="search-bar">
        <input onKeyUp={onSearchKeyUp} />
        {isLoading && <LoadingSpinner />}
      </div>
      <ul>
        {foundPeople.map((person) => (
          <li key={person.url}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
};
