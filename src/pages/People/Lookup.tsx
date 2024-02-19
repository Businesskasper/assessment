import { SearchField } from "../../components";
import { usePeopleSearch } from "./people-service";

import "./Lookup.scss";

export const PeopleSearch = () => {
  const { searchPeople, foundPeople } = usePeopleSearch();

  const onSearch = (value: string) => searchPeople(value);

  return (
    <div className="people-search">
      <h1>People Lookup</h1>
      <SearchField threshold={3} onSearch={onSearch} />
      <ul>
        {foundPeople.map((person) => (
          <li key={person.url}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
};
