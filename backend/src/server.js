require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./config/database');
const songRoutes = require('./routes/songRoutes');
const errorHandler = require('./middlewares/errorHandler');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use(authRoutes);
app.use(songRoutes);

async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS songs (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255),
      artist VARCHAR(255),
      source VARCHAR(255),
      link TEXT
    )
  `);
}

initDB();

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});