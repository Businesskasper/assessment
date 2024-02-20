import React from "react";
import { LoadingSpinner } from "..";

import "./SuggestField.scss";

type Props<T> = {
  threshold: number;
  onSearch: (searchValue: string) => Promise<T>;
};

export const SuggestField = <T,>({ threshold, onSearch }: Props<T>) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const [value, setValue] = React.useState("");
  const debouncedValue = useDebounce(value, 200);

  // Trigger provided onSearch event when debounced value changes
  // Exits if entered value has not required length
  React.useEffect(() => {
    if (debouncedValue?.length < threshold) return;

    setIsLoading(true);
    onSearch(debouncedValue).finally(() => {
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, threshold]);

  // Change handler for search input
  // Updates debounced value
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target as HTMLInputElement;

    setValue(value);
  };

  return (
    <div className="suggest-field">
      <input maxLength={32} onChange={onChange} />
      {isLoading && <LoadingSpinner />}
    </div>
  );
};


function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay ?? 500)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}