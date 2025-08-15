import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledLink = styled(Link)(({ theme }) => ({
  color: 'white',
  textDecoration: 'none',
  margin: theme.spacing(0, 1),
}));

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Achados e Perdidos
        </Typography>
        <Button color="inherit">
          <StyledLink to="/">Home</StyledLink>
        </Button>
        <Button color="inherit">
          <StyledLink to="/adicionar">Adicionar Item</StyledLink>
        </Button>
        <Button color="inherit">
          <StyledLink to="/itens">Ver Itens</StyledLink>
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;