const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Conexão com MongoDB
mongoose.connect('mongodb+srv://achados-perdidos:teste@achados-perdidos.pato6az.mongodb.net/?retryWrites=true&w=majority&appName=achados-perdidos', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Modelo do Item
const Item = mongoose.model('Item', {
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

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});