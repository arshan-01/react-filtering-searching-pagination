import { Button, Flex } from '@chakra-ui/react';
import React from 'react';

function Pagination({ setPage, page, totalPage }) {
  const handlePrevClick = () => {
    setPage(prevPage => prevPage - 1);
  };

  const handleNextClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePageClick = currentPage => {
    return () => setPage(currentPage);
  };

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
      <Flex my={5} justify="center" align="center" justItems="center" gap={2}>
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={handlePrevClick}
          isDisabled={page <= 1}
          disabled={{ color: 'gray.500', cursor: 'not-allowed' }}
        >
          Prev
        </Button>
        {getPageNumbers()}
        <Button
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
