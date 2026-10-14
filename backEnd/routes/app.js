
import express from "express";

import responsaveis from "./responsaveis.js";
import filhos from "./filhos.js";
import agendamentos from "./agendamentos.js";

const app = express();

// Permite receber dados em JSON
app.use(express.json());

// Rotas da API
app.use("/responsaveis", responsaveis);
app.use("/filhos", filhos);
app.use("/agendamentos", agendamentos);

// Rota inicial para verificar se a API está funcionando
app.get("/", (req, res) => {
    res.status(200).json({
        mensagem: "API da Clínica Pediátrica funcionando!"
    });
});

export default app;

