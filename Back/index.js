const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const ticketRoutes = require("./routes/tickets");
const userRoutes = require("./routes/users");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
// Increase JSON body size limit to handle large payloads
app.use(express.json({ limit: "10mb" }));

// Conexão com MongoDB
function connectToDatabase() {
  const mongoUri =
    process.env.MONGO_URI ||
    "mongodb+srv://loidpadre_db_user:R4WhwhIGJuAVBAaJ@cluster0.c6r0muq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  return mongoose
    .connect(mongoUri)
    .then(() => console.log("Conectado ao MongoDB"))
    .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));
}

// Rotas
app.use("/auth", authRoutes);
app.use("/tickets", ticketRoutes);
app.use("/users", userRoutes);

// Primeira rota
app.get("/", (req, res) => {
  res.json({ message: "Bem-vindo à API do Farra!" });
});

// Iniciar servidor
connectToDatabase();
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
