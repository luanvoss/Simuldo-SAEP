
const express = require("express");
const router = express.Router();

const filhosController = require("../controllers/filhos");

router.get("/filhos", filhosController.buscarTodos);
router.get("/filhos/:id", filhosController.buscarPorId);
router.post("/filhos", filhosController.criar);
router.put("/filhos/:id", filhosController.atualizar);
router.delete("/filhos/:id", filhosController.excluir);

module.exports = router;

