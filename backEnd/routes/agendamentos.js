

const express = require("express");
const router = express.Router();

const agendamentosController = require("../controllers/agendamentos");

// GET - Listar todos os agendamentos
router.get("/", agendamentosController.buscarTodos);

// GET - Buscar agendamento por ID
router.get("/:id", agendamentosController.buscarPorId);

// POST - Criar agendamento
router.post("/", agendamentosController.criar);

// PUT - Atualizar agendamento
router.put("/:id", agendamentosController.atualizar);

// DELETE - Excluir agendamento
router.delete("/:id", agendamentosController.excluir);

module.exports = router;

