import { SuggestField } from "../../components";
import { usePeopleSearch } from "./people-service";

import "./Lookup.scss";
import React from "react";

export const PeopleSearch = () => {
  const { searchPeople, foundPeople } = usePeopleSearch();

  // Contains the last AbortController in order to cancel the previous fetch for suggestions
  const previousAbortController = React.useRef<AbortController>();

  const onSearch = (value: string) => {
    // Cancel previous fetch
    previousAbortController?.current && previousAbortController.current.abort();

    const newAbortController = new AbortController();
    previousAbortController.current = newAbortController;

    return searchPeople(value, newAbortController.signal);
  };

  return (
    <div className="people-search">
      <h1>People Lookup</h1>
      <SuggestField threshold={3} onSearch={onSearch} />
      <ul>
        {foundPeople.map((person) => (
          <li key={person.url}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
};
