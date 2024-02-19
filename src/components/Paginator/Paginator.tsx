import React from "react";

import "./Paginator.scss";

type Props = {
  onPageChange: (page: number) => void;
  totalPages: number;
};
export const Paginator = ({ onPageChange, totalPages }: Props) => {
  const [currentPage, setCurrentPage] = React.useState(1);

  // Initially trigger page event
  React.useEffect(() => {
    onPageChange(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // Handle next page click
  const nextPage = () => {
    // Increase current page
    setCurrentPage(currentPage + 1);
  };

  // Handle previous page click
  const previousPage = () => {
    // Increase current page
    setCurrentPage((page) => page - 1);
  };

  return (
    <div className="paginator">
      <button disabled={currentPage === 1} onClick={previousPage}>
        -
      </button>
      <span>
        {currentPage}/{totalPages}
      </span>
      <button disabled={currentPage === totalPages} onClick={nextPage}>
        +
      </button>
    </div>
  );
};
