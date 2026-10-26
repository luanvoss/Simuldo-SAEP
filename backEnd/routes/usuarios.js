
const express = require("express");
const router = express.Router();

const usuariosController = require("../controllers/usuarios");

// GET - Listar todos os usuários
router.get("/", usuariosController.buscarTodos);

// GET - Buscar usuário por ID
router.get("/:id", usuariosController.buscarPorId);

// POST - Cadastrar usuário
router.post("/", usuariosController.criar);

// PUT - Atualizar usuário
router.put("/:id", usuariosController.atualizar);

// DELETE - Excluir usuário
router.delete("/:id", usuariosController.excluir);

module.exports = router;
