import { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Image,
  Text,
  useBreakpointValue,
  Flex,
  Input,
  Skeleton,
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
  const [loading, setLoading] = useState(true); // Track loading state
  const limitPage = 15;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true); // Set loading to true when fetching new data
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
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
        setLoading(false); // Set loading to false in case of error
      });
  };

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
      // if a category is selected, the filter will only include products that belong to that category. If no category is selected (or "All" is selected), it will include all products.
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

  useEffect(() => {
    fetchData(); // Fetch new data when the page changes or category is selected
  }, [page, selectedCategory]);

  const cardSize = useBreakpointValue({
    base: '100%',
    sm: '33.33%',
    md: '20%',
    lg: '17%',
  });

  return (
    <Box>
      {/* Search input */}
      <Flex justify="center" align="center">
        <Input
          placeholder="Search products"
          m="4"
          width="50%"
          value={searchQuery}
          onChange={searchProduct}
        />
      </Flex>
      {/* Category selection */}
      <Category
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
        allProducts={allProducts}
      />
      {/* Product grid */}
      <Grid
        templateColumns={`repeat(auto-fit, minmax(${cardSize}, 1fr))`}
        gap={1}
      >
        {loading // Display skeleton loading effect while loading
          ? Array.from({ length: limitPage }).map((_, index) => (
              <Box
                key={index}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={2}
              >
                <Skeleton height="200px" />
                <Box p="6">
                  <Skeleton height="20px" mb="2" />
                  <Skeleton height="16px" />
                </Box>
              </Box>
            ))
          : paginatedProducts.map(product => (
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
      {/* Pagination */}
      <Pagination setPage={setPage} page={page} totalPage={totalPage} />
    </Box>
  );
};

export default ProductList;
