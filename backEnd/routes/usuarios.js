
const express = require("express");
const router = express.Router();

const usuariosController = require("../controllers/filhos")
router.get("/usuarios", usuariosController.buscarTodos);
router.get("/usuarios/:id", usuariosController.buscarPorId);
router.post("/usuarios", usuariosController.criar);
router.put("/usuarios/:id", usuariosController.atualizar);
router.delete("/usuarios/:id", usuariosController.excluir);

module.exports = router;
