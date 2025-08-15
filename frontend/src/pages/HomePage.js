import React from 'react';
import { Typography, Container, Box } from '@mui/material';

function HomePage() {
  return (
    <Container>
      <Box my={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          Bem-vindo ao Sistema de Achados e Perdidos
        </Typography>
        <Typography variant="body1">
          Aqui você pode registrar itens perdidos ou achados e ajudar a reunir pessoas com seus pertences.
        </Typography>
      </Box>
    </Container>
  );
}

export default HomePage;