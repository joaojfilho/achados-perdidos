import React, { useEffect, useState } from 'react';
import { Typography, Grid, Tabs, Tab, Box } from '@mui/material';
import axios from 'axios';
import ItemCard from './ItemCard';

function ItemList() {
  const [itens, setItens] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchItens = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/itens');
        setItens(res.data);
      } catch (err) {
        console.error('Erro ao buscar itens:', err);
      }
    };
    
    fetchItens();
  }, []);

  const handleStatusChange = async (id, novoStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/itens/${id}`, { status: novoStatus });
      setItens(itens.map(item => 
        item._id === id ? { ...item, status: novoStatus } : item
      ));
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
    }
  };

  const filteredItens = tabValue === 0 
    ? itens 
    : tabValue === 1 
      ? itens.filter(item => item.tipo === 'perdido') 
      : itens.filter(item => item.tipo === 'achado');

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Itens {tabValue === 1 ? 'Perdidos' : tabValue === 2 ? 'Achados' : ''}
      </Typography>
      
      <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
        <Tab label="Todos" />
        <Tab label="Perdidos" />
        <Tab label="Achados" />
      </Tabs>
      
      <Box mt={3}>
        <Grid container spacing={3}>
          {filteredItens.map(item => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <ItemCard item={item} onStatusChange={handleStatusChange} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default ItemList;