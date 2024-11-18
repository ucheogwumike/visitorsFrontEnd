import React, { useState } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const CustomPagination = ({ totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handleClick(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handleClick(currentPage + 1);
    }
  };

  return (
    <Pagination>
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink previous onClick={handlePrevious} />
      </PaginationItem>

      {Array.from({ length: totalPages }, (_, index) => (
        <PaginationItem  active={index + 1 === currentPage} key={index}>
          <PaginationLink style={{"margin":"auto", backgroundColor:"#d63229", color:'white'}} onClick={() => handleClick(index + 1)}>
            {index + 1}
          </PaginationLink>
        </PaginationItem>
      ))}

      <PaginationItem disabled={currentPage === totalPages}>
        <PaginationLink next onClick={handleNext} />
      </PaginationItem>
    </Pagination>
  );
};

export default CustomPagination;
