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
  // Determine the button size based on the breakpoint
  const buttonSize = useBreakpointValue({ base: 'sm' });

  // Get the count of items in a category
  const getCategoryItemCount = category => {
    if (category === 'All') return allProducts.length;
    const categoryItems = allProducts.filter(
      product => product.category === category
    );
    return categoryItems.length;
  };

  // Handle category selection
  const handleCategorySelect = category => {
    onCategorySelect(category === 'All' ? null : category);
  };

  return (
    <div>
      {/* Display category buttons */}
      <Flex mb={5} justify="center" align="center" justItems="center">
        <Wrap spacing={4} justify="center">
          {categories.map((category, index) => (
            <WrapItem key={index}>
              <Button
                // Set button color scheme based on selected category
                colorScheme={selectedCategory === category ? 'blue' : 'gray'}
                size={buttonSize}
                textTransform="uppercase"
                onClick={() => handleCategorySelect(category)}
              >
                {/* Display category name and item count */}
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
