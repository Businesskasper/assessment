import React from "react";

import "./SearchField.scss";
import { LoadingSpinner } from "..";

type Props<T> = {
  threshold: number;
  onSearch: (searchValue: string) => Promise<T>;
};

export const SearchField = <T,>({ threshold, onSearch }: Props<T>) => {
  const [isLoading, setIsLoading] = React.useState(false);

  // Change handler for search input
  // Exits if entered value has not required length
  // Otherwise triggers async handler and manages loading indicator
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target as HTMLInputElement;

    if (value?.length < threshold) return;

    setIsLoading(true);
    onSearch(value).finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <div className="search-field">
      <input maxLength={32} onChange={onChange} />
      {isLoading && <LoadingSpinner />}
    </div>
  );
};
