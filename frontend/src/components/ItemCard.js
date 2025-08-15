import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Chip, CardActions } from '@mui/material';

function ItemCard({ item, onStatusChange }) {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      {item.imagem && (
        <CardMedia
          component="img"
          height="140"
          image={item.imagem}
          alt={item.titulo}
        />
      )}
      
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.titulo}
        </Typography>
        
        <Chip 
          label={item.tipo === 'perdido' ? 'Perdido' : 'Achado'} 
          color={item.tipo === 'perdido' ? 'secondary' : 'primary'}
          sx={{ m: 0.5 }}
        />
        
        {/* Restante do componente */}
      </CardContent>
    </Card>
  );
}

export default ItemCard;