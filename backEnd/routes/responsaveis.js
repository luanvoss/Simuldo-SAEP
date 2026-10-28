
const express = require("express");
const router = express.Router();

const responsaveisController = require("../controllers/responsaveis");

router.get("/responsaveis", responsaveisController.buscarTodos);
router.get("/responsaveis/:id", responsaveisController.buscarPorId);
router.post("/responsaveis", responsaveisController.criar);
router.put("/responsaveis/:id", responsaveisController.atualizar);
router.delete("/responsaveis/:id", responsaveisController.excluir);

module.exports = router;
