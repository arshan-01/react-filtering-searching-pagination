import { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Image,
  Text,
  useBreakpointValue,
  Flex,
  Input,
} from '@chakra-ui/react';
import axios from 'axios';
import Category from './Category';
import Pagination from './Pagination';
import { css } from '@emotion/react';

const ProductList = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  let limitPage = 15;
  const cardSize = useBreakpointValue({
    base: '100%',
    sm: '50%',
    md: '25%',
    lg: '20%',
  });

  useEffect(() => {
    axios
      .get('https://dummyjson.com/products?limit=100')
      .then(response => {
        console.log(response.data);
        const productsData = response.data.products;
        setAllProducts(productsData);
        const uniqueCategories = [
          'All',
          ...new Set(productsData.map(product => product.category)),
        ];
        setCategories(uniqueCategories);
        console.log(uniqueCategories);
        // Calculate the total number of pages
        const totalPages = Math.ceil(productsData.length / limitPage);
        setTotalPage(totalPages);
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  }, []);

  const searchProduct = event => {
    setSearchQuery(event.target.value);
    setPage(1); // Reset the page number when performing a new search
  };

  const handleCategorySelect = category => {
    setSelectedCategory(category === 'All' ? null : category);
    setPage(1); // Reset the page number when selecting a category
  };

  // Filter products based on search query, selected category, and current page
  const filteredProducts = allProducts
    .filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(product =>
      selectedCategory ? product.category === selectedCategory : true
    );

  // Update totalPage based on the filtered products
  useEffect(() => {
    const totalPages = Math.ceil(filteredProducts.length / limitPage);
    setTotalPage(totalPages);
  }, [filteredProducts, selectedCategory]);

  // Slice the filtered products based on the current page and limitPage
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * limitPage,
    page * limitPage
  );

  return (
    <Box>
      <Flex justify="center" align="center">
        <Input
          placeholder="Search products"
          m="4"
          width="50%"
          value={searchQuery}
          onChange={searchProduct}
        />
      </Flex>
      <Category
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
        allProducts={allProducts}
      />
      <Grid templateColumns={`repeat(5, ${cardSize})`} gap={1}>
        {paginatedProducts.map(product => (
          <Box
            key={product.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={2}
          >
            <Flex justify="center" align="center">
              <Image
                src={product.images[0]}
                alt={product.title}
                objectFit="cover"
                boxSize="200px"
              />
            </Flex>
            <Box p="6">
              <Text fontWeight="semibold" fontSize="md">
                {product.title}
              </Text>
              <Text
                mt="2"
                css={css`
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                  text-overflow: ellipsis;
                `}
              >
                {product.description}
              </Text>
            </Box>
          </Box>
        ))}
      </Grid>
      <Pagination setPage={setPage} page={page} totalPage={totalPage} />
    </Box>
  );
};

export default ProductList;