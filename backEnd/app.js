
const express = require("express");
require("dotenv").config();

const app = express();


app.use(express.json());


const responsaveisRoutes = require("./routes/responsaveis");
const filhosRoutes = require("./routes/filhos");
const agendamentosRoutes = require("./routes/agendamentos");
const usuariosRoutes = require("./routes/usuarios");


app.use("responsaveis", responsaveisRoutes);
app.use("filhos", filhosRoutes);
app.use("agendamentos", agendamentosRoutes);
app.use("usuarios", usuariosRoutes);


module.exports = app;
