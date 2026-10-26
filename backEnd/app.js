
const express = require("express");
require("dotenv").config();

const app = express();

// Middleware para receber JSON
app.use(express.json());

// Importar rotas
const responsaveisRoutes = require("./routes/responsaveis");
const filhosRoutes = require("./routes/filhos");
const agendamentosRoutes = require("./routes/agendamentos");
const usuariosRoutes = require("./routes/usuarios");

// Registrar rotas
app.use("/api/responsaveis", responsaveisRoutes);
app.use("/api/filhos", filhosRoutes);
app.use("/api/agendamentos", agendamentosRoutes);
app.use("/api/usuarios", usuariosRoutes);

// Rota inicial para testar a API
app.get("/", (req, res) => {
    res.json({
        mensagem: "API SAEP Pediatria funcionando!"
    });
});

module.exports = app;
