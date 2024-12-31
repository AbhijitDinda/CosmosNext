import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const Pagination = ({ paginationData, setPaginatedData, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(paginationData.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      const newData = paginationData.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
      );
      setPaginatedData(newData);
    }
  };

  const renderPageNumbers = () => {
    const numbers = [];

    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        numbers.push(
          <Button
            key={i}
            variant={currentPage === i ? "default" : "outline"}
            onClick={() => handlePageChange(i)}
            className={`mx-1 rounded-md ${
              currentPage === i ? "bg-Primary hover:bg-Primary text-white" : ""
            }`}
          >
            {i}
          </Button>
        );
      }
    } else {
      if (currentPage > 1) {
        numbers.push(
          <Button
            key={1}
            variant={currentPage === 1 ? "default" : "outline"}
            onClick={() => handlePageChange(1)}
            className={`mx-1 rounded-md ${
              currentPage === 1 ? "bg-Primary hover:bg-Primary text-white" : ""
            }`}
          >
            1
          </Button>
        );
      }
      if (currentPage > 2) {
        numbers.push(<span key="start-dots">...</span>);
      }
      numbers.push(
        <Button
          key={currentPage}
          variant="default"
          onClick={() => handlePageChange(currentPage)}
          className="mx-1 rounded-md bg-Primary hover:bg-Primary text-white"
        >
          {currentPage}
        </Button>
      );
      if (currentPage < totalPages - 1) {
        numbers.push(<span key="end-dots">...</span>);
      }
      if (currentPage < totalPages) {
        numbers.push(
          <Button
            key={totalPages}
            variant={currentPage === totalPages ? "default" : "outline"}
            onClick={() => handlePageChange(totalPages)}
            className={`mx-1 rounded-md ${
              currentPage === totalPages
                ? "bg-Primary hover:bg-Primary text-white"
                : ""
            }`}
          >
            {totalPages}
          </Button>
        );
      }
    }
    return numbers;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className="hidden md:block"
      >
        <ChevronsLeft />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ArrowLeft />
      </Button>

      {renderPageNumbers()}

      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ArrowRight />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="hidden md:block"
      >
        <ChevronsRight />
      </Button>
    </div>
  );
};

export default Pagination;
