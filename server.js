require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const app = express();

app.set('trust proxy', 1);

app.use(cors());
app.use(express.json());

// Rate limiter
const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 60,
    message: { error: 'Muitas requests, tenta mais tarde' }
});

app.use('/api', apiLimiter);

// Rota base
app.get('/', (req, res) => {
    return res.status(200).send('API a funcionar 🚀');
});

// Rotas
const apiRoutes = require('./app/routes/api');
app.use('/api', apiRoutes);

// Conexão Mongo
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('MONGO_URI não definida no .env');
    process.exit(1);
}

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB conectado ✅'))
    .catch(err => {
        console.error('Erro ao conectar ao MongoDB ❌:', err);
        process.exit(1);
    });

// Porta
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor a correr na porta ${PORT}`);
});