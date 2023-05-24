import { Button, Flex } from '@chakra-ui/react';
import React from 'react';

function Pagination({ setPage, page, totalPage }) {
  // Handle previous page click
  const handlePrevClick = () => {
    setPage(prevPage => prevPage - 1);
  };

  // Handle next page click
  const handleNextClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  // Handle individual page click
  const handlePageClick = currentPage => {
    return () => setPage(currentPage);
  };

  // Get the array of page numbers to display
  const getPageNumbers = () => {
    const maxButtons = 4;
    const pageNumbers = [];

    let startPage = Math.max(page - Math.floor(maxButtons / 2), 1);
    let endPage = Math.min(startPage + maxButtons - 1, totalPage);

    if (endPage - startPage < maxButtons - 1) {
      startPage = Math.max(endPage - maxButtons + 1, 1);
    }

    if (startPage > 1) {
      pageNumbers.push(
        <Button
          key={1}
          colorScheme="gray"
          variant="outline"
          onClick={handlePageClick(1)}
        >
          1
        </Button>
      );

      if (startPage > 2) {
        pageNumbers.push(
          <Button key="ellipsis1" variant="outline" disabled>
            ...
          </Button>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Button
          key={i}
          colorScheme={page === i ? 'teal' : 'gray'}
          variant={page === i ? 'solid' : 'outline'}
          onClick={handlePageClick(i)}
        >
          {i}
        </Button>
      );
    }

    if (endPage < totalPage) {
      if (endPage < totalPage - 1) {
        pageNumbers.push(
          <Button key="ellipsis2" variant="outline" disabled>
            ...
          </Button>
        );
      }

      pageNumbers.push(
        <Button
          key={totalPage}
          colorScheme="gray"
          variant="outline"
          onClick={handlePageClick(totalPage)}
        >
          {totalPage}
        </Button>
      );
    }

    return pageNumbers;
  };

  return (
    <div>
      {/* Display pagination buttons */}
      <Flex my={5} justify="center" align="center" justItems="center" gap={2}>
        <Button
          // Handle previous page click
          colorScheme="teal"
          variant="outline"
          onClick={handlePrevClick}
          isDisabled={page <= 1}
          disabled={{ color: 'gray.500', cursor: 'not-allowed' }}
        >
          Prev
        </Button>
        {/* Display page numbers */}
        {getPageNumbers()}
        <Button
          // Handle next page click
          colorScheme="teal"
          variant="outline"
          onClick={handleNextClick}
          isDisabled={page >= totalPage}
          disabled={{ color: 'gray.500', cursor: 'not-allowed' }}
        >
          Next
        </Button>
      </Flex>
    </div>
  );
}

export default Pagination;
