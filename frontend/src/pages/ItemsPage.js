import React from 'react';
import { Container, Box } from '@mui/material';
import ItemList from '../components/ItemList';

function ItemsPage() {
  return (
    <Container>
      <Box my={4}>
        <ItemList />
      </Box>
    </Container>
  );
}

export default ItemsPage;