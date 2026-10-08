import express from "express";
import testeRoutes from "./routes/testeRoutes.js";

const app = express();

// Middleware registrado ANTES das rotas
app.use(express.json());

// Registro da rota DEPOIS do middleware
app.use("/api", testeRoutes);

const PORT = process.env.PORT || 3006;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}\nhttp://localhost:${PORT}`);
});


