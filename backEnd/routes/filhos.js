
const express = require("express");
const router = express.Router();

const filhosController = require("../controllers/filhos");

// GET - Listar todos os filhos
router.get("/", filhosController.buscarTodos);

// GET - Buscar filho por ID
router.get("/:id", filhosController.buscarPorId);

// POST - Cadastrar filho
router.post("/", filhosController.criar);

// PUT - Atualizar filho
router.put("/:id", filhosController.atualizar);

// DELETE - Excluir filho
router.delete("/:id", filhosController.excluir);

module.exports = router;

