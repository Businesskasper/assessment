import React from "react";
import { LoadingSpinner } from "../../components";
import { usePeopleSearch } from "./people-service";

import "./People.scss";

export const People = () => {
  const { isLoading, searchPeople, foundPeople } = usePeopleSearch();

  // Contains the last AbortController in order to cancel the previous fetch for suggestions
  const previousAbortController = React.useRef<AbortController>();

  const onSearchKeyUp: React.KeyboardEventHandler<HTMLInputElement> = (
    event,
  ) => {
    // Cancel previous fetch
    previousAbortController?.current && previousAbortController.current.abort();

    const { value } = event.target as HTMLInputElement;

    if (value?.length < 3) return;

    // New abort controller for new fetch
    const newAbortController = new AbortController();
    previousAbortController.current = newAbortController;

    searchPeople(value, newAbortController.signal);
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
