import { Button, Flex } from '@chakra-ui/react';
import React from 'react';

function Pagination({ setPage, page, totalPage }) {
  const pageNumbers = [...Array(totalPage)].map((_, index) => index + 1);
  console.log(page);

  const handlePrevClick = () => {
    setPage(prevPage => prevPage - 1);
  };

  const handleNextClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePageClick = currentPage => {
    return () => setPage(currentPage);
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
        {pageNumbers.map(number => (
          <Button
            colorScheme={page === number ? 'teal' : 'gray'}
            variant={page === number ? 'solid' : 'outline'}
            key={number}
            onClick={handlePageClick(number)}
          >
            {number}
          </Button>
        ))}
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
