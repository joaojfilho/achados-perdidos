import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Configuração do __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Conexão com MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/achados-perdidos', {
      serverSelectionTimeoutMS: 5000
    });
    console.log('Conectado ao MongoDB');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err);
    process.exit(1);
  }
};
connectDB();

// Modelo do Item
const itemSchema = new mongoose.Schema({
  tipo: String,
  titulo: String,
  descricao: String,
  local: String,
  data: Date,
  contato: String,
  imagem: String,
  status: { type: String, default: 'pendente' }
});

const Item = mongoose.model('Item', itemSchema);

// Rotas API
app.post('/api/itens', async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).send(item);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/api/itens', async (req, res) => {
  try {
    const itens = await Item.find().sort({ data: -1 });
    res.send(itens);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.patch('/api/itens/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { 
      new: true,
      runValidators: true
    });
    res.send(item);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Servir frontend (apenas se o build existir)
const frontendBuildPath = path.join(__dirname, '../frontend/build');
if (fs.existsSync(frontendBuildPath)) {
  app.use(express.static(frontendBuildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  });
}

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});