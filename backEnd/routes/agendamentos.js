

const express = require("express");
const router = express.Router();

const agendamentosController = require("../controllers/agendamento");


router.get("/agendamentos", agendamentosController.buscarTodos);
router.get("/agendamentos/:id", agendamentosController.buscarPorId);
router.post("/agendamentos", agendamentosController.criar);
router.put("/agendamentos/:id", agendamentosController.atualizar);
router.delete("/agendamentos/:id", agendamentosController.excluir);

module.exports = router;

