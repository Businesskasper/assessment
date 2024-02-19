import React from "react";
import { usePeoplePaginated } from "./people-service";
import { LoadingSpinner } from "../../components";

import "./Overview.scss";

export const Overview = () => {
  const { isLoading, getPeople, count, people } = usePeoplePaginated();

  const maxPages = Math.ceil(count / 10);

  const [currentPage, setCurrentPage] = React.useState(1);
  // Initially get first page
  React.useEffect(() => {
    getPeople(currentPage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch next entries
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    getPeople(currentPage);
  };

  // Fetch previous entries
  const previousPage = () => {
    setCurrentPage(currentPage - 1);
    getPeople(currentPage);
  };

  return (
    <div className="people-overview">
      <h1>People Overview</h1>
      <div className="paginator">
        <button disabled={currentPage === 1} onClick={previousPage}>
          -
        </button>
        <span>
          {currentPage}/{count}
        </span>
        <button disabled={currentPage === maxPages} onClick={nextPage}>
          +
        </button>
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ul>
          {people?.map((p) => (
            <li key={p.url}>{p.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
