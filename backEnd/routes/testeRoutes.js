import express from "express";
import db from "../config/database.js";

const router = express.Router();

router.get("/teste", async (req, res) => {
  try {
    const [resultado] = await db.query(
      "SELECT 'Banco Conectado!' AS mensagem"
    );

    res.status(200).json(resultado);
  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      erro: "Falha na conexão com o banco de dados",
    });
  }
});

export default router;
