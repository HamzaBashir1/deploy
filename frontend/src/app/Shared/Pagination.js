import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPaginationItems = () => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return pages.map((page) => {
      if (page === currentPage) {
        return (
          <span
            key={page}
            className="inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-600 text-black border border-gray-600"
          >
            {page}
          </span>
        );
      }

      return (
        <button
          key={page}
          className="inline-flex w-11 h-11 items-center justify-center rounded-full border-gray-600 bg-white hover:bg-neutral-100 border text-neutral-600"
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      );
    });
  };

  return (
    <nav className="nc-Pagination inline-flex space-x-1 text-base font-medium">
      {renderPaginationItems()}
    </nav>
  );
};

export default Pagination;
