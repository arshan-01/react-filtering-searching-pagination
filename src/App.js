import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import ProductList from './components/ProductList';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ProductList />
    </ChakraProvider>
  );
}

export default App;
