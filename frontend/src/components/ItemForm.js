import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Grid } from '@mui/material';

function ItemForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    tipo: 'perdido',
    titulo: '',
    descricao: '',
    local: '',
    data: new Date().toISOString().split('T')[0],
    contato: '',
    imagem: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Tipo</InputLabel>
            <Select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              required
            >
              <MenuItem value="perdido">Perdido</MenuItem>
              <MenuItem value="achado">Achado</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Título"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Local"
            name="local"
            value={formData.local}
            onChange={handleChange}
            required
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Descrição"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            multiline
            rows={4}
            required
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Data"
            name="data"
            type="date"
            value={formData.data}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Contato"
            name="contato"
            value={formData.contato}
            onChange={handleChange}
            required
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="URL da Imagem (opcional)"
            name="imagem"
            value={formData.imagem}
            onChange={handleChange}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default ItemForm;