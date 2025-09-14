const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com MongoDB (substitua pela sua string de conexão)
function connectToDatabase() {
  return mongoose
    .connect("mongodb://localhost:27017/farra-db")
    .then(() => console.log("Conectado ao MongoDB"))
    .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));
}

// Primeira rota
app.get("/", (req, res) => {
  res.json({ message: "Bem-vindo à API do Farra!" });
});

// Iniciar servidor
connectToDatabase();
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
