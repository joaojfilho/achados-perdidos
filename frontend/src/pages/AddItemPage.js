import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import ItemForm from '../components/ItemForm';

function AddItemPage() {
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      await axios.post('http://localhost:5000/api/itens', formData);
      setSuccess(true);
    } catch (err) {
      console.error('Erro ao enviar item:', err);
    }
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Adicionar Novo Item
        </Typography>
        
        {success ? (
          <Typography color="primary">
            Item cadastrado com sucesso!
          </Typography>
        ) : (
          <ItemForm onSubmit={handleSubmit} />
        )}
      </Box>
    </Container>
  );
}

export default AddItemPage;