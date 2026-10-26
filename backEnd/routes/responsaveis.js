
const express = require("express");
const router = express.Router();

const responsaveisController = require("../controllers/responsaveis");

// GET - Listar todos os responsáveis
router.get("/", responsaveisController.buscarTodos);

// GET - Buscar responsável por ID
router.get("/:id", responsaveisController.buscarPorId);

// POST - Cadastrar responsável
router.post("/", responsaveisController.criar);

// PUT - Atualizar responsável
router.put("/:id", responsaveisController.atualizar);

// DELETE - Excluir responsável
router.delete("/:id", responsaveisController.excluir);

module.exports = router;
