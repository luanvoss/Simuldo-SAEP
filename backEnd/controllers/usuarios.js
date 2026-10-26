
const usuariosModel = require("../models/usuarios");
const bcrypt = require("bcrypt");

// GET - Buscar todos os usuários
const buscarTodos = async (req, res) => {
    try {
        const usuarios = await usuariosModel.buscarTodos();

        return res.json(usuarios);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            erro: "Erro ao buscar usuários."
        });
    }
};

// GET - Buscar usuário por ID
const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await usuariosModel.buscarPorId(id);

        if (!usuario) {
            return res.status(404).json({
                erro: "Usuário não encontrado."
            });
        }

        return res.json(usuario);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            erro: "Erro ao buscar usuário."
        });
    }
};

// POST - Criar usuário
const criar = async (req, res) => {
    try {
        const { Nome, Email, Senha } = req.body;

        if (!Nome || !Email || !Senha) {
            return res.status(400).json({
                erro: "Nome, Email e Senha são obrigatórios."
            });
        }

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email);

        if (!emailValido) {
            return res.status(400).json({
                erro: "Informe um e-mail válido."
            });
        }

        if (Senha.length < 8) {
            return res.status(400).json({
                erro: "A senha deve ter pelo menos 8 caracteres."
            });
        }

        const senhaHash = await bcrypt.hash(Senha, 10);

        const usuario = await usuariosModel.criar(
            Nome,
            Email,
            senhaHash
        );

        return res.status(201).json(usuario);
    } catch (error) {
        console.error(error);

        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                erro: "Este e-mail já está cadastrado."
            });
        }

        return res.status(500).json({
            erro: "Erro ao criar usuário."
        });
    }
};

// PUT - Atualizar usuário
const atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const { Nome, Email, Senha } = req.body;

        if (!Nome || !Email || !Senha) {
            return res.status(400).json({
                erro: "Nome, Email e Senha são obrigatórios."
            });
        }

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email);

        if (!emailValido) {
            return res.status(400).json({
                erro: "Informe um e-mail válido."
            });
        }

        if (Senha.length < 8) {
            return res.status(400).json({
                erro: "A senha deve ter pelo menos 8 caracteres."
            });
        }

        const senhaHash = await bcrypt.hash(Senha, 10);

        const linhasAfetadas = await usuariosModel.atualizar(
            id,
            Nome,
            Email,
            senhaHash
        );

        if (linhasAfetadas === 0) {
            return res.status(404).json({
                erro: "Usuário não encontrado ou nenhum dado foi alterado."
            });
        }

        return res.json({
            mensagem: "Usuário atualizado com sucesso."
        });
    } catch (error) {
        console.error(error);

        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                erro: "Este e-mail já está cadastrado por outro usuário."
            });
        }

        return res.status(500).json({
            erro: "Erro ao atualizar usuário."
        });
    }
};

// DELETE - Excluir usuário
const excluir = async (req, res) => {
    try {
        const { id } = req.params;

        const linhasAfetadas = await usuariosModel.excluir(id);

        if (linhasAfetadas === 0) {
            return res.status(404).json({
                erro: "Usuário não encontrado."
            });
        }

        return res.json({
            mensagem: "Usuário excluído com sucesso."
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            erro: "Erro ao excluir usuário."
        });
    }
};

module.exports = {
    buscarTodos,
    buscarPorId,
    criar,
    atualizar,
    excluir
};
