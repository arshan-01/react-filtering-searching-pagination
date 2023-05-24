import {
  Button,
  Flex,
  Wrap,
  WrapItem,
  useBreakpointValue,
} from '@chakra-ui/react';
import React from 'react';

function Category({
  categories,
  selectedCategory,
  onCategorySelect,
  allProducts,
}) {
  const buttonSize = useBreakpointValue({ base: 'sm' });

  const getCategoryItemCount = category => {
    if (category === 'All') return allProducts.length;
    const categoryItems = allProducts.filter(
      product => product.category === category
    );
    return categoryItems.length;
  };

  const handleCategorySelect = category => {
    onCategorySelect(category === 'All' ? null : category);
  };

  return (
    <div>
      <Flex mb={5} justify="center" align="center" justItems="center">
        <Wrap spacing={4} justify="center">
          {categories.map((category, index) => (
            <WrapItem key={index}>
              <Button
                colorScheme={selectedCategory === category ? 'blue' : 'gray'}
                size={buttonSize}
                textTransform="uppercase"
                onClick={() => handleCategorySelect(category)}
              >
                {category} ({getCategoryItemCount(category)})
              </Button>
            </WrapItem>
          ))}
        </Wrap>
      </Flex>
    </div>
  );
}

export default Category;
