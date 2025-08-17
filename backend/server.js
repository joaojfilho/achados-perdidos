// Adicione no início do arquivo:
require('dotenv').config();
import express from 'express';
import { connect, model } from 'mongoose';
import { json } from 'body-parser';
import cors from 'cors';

const app = express();

// Middleware
app.use(json());
app.use(cors());

// Modifique a conexão do MongoDB:
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/achados-perdidos')
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Modelo do Item
const Item = model('Item', {
  tipo: String, // 'achado' ou 'perdido'
  titulo: String,
  descricao: String,
  local: String,
  data: Date,
  contato: String,
  imagem: String,
  status: { type: String, default: 'pendente' } // 'pendente', 'resolvido'
});

// Rotas
// Criar item
app.post('/api/itens', async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).send(item);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Listar todos os itens
app.get('/api/itens', async (req, res) => {
  try {
    const itens = await Item.find().sort({ data: -1 });
    res.send(itens);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Atualizar status do item
app.patch('/api/itens/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(item);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Adicione no final (antes do app.listen):
const path = require('path');
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});