
const responsaveisModel = require("../models/responsaveis");


const buscarTodos = async (req, res) => {
    try {
        const responsaveis = await responsaveisModel.buscarTodos();

        return res.json(responsaveis);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            erro: "Erro ao buscar responsáveis."
        });
    }
};

const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const responsavel = await responsaveisModel.buscarPorId(id);

        if (!responsavel) {
            return res.status(404).json({
                erro: "Responsável não encontrado."
            });
        }

        return res.json(responsavel);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            erro: "Erro ao buscar responsável."
        });
    }
};


const criar = async (req, res) => {
    try {
        const { Nome, CPF, Telefone } = req.body;

        if (!Nome || !CPF || !Telefone) {
            return res.status(400).json({
                erro: "Nome, CPF e Telefone são obrigatórios."
            });
        }

        const responsavel = await responsaveisModel.criar(
            Nome,
            CPF,
            Telefone
        );

        return res.status(201).json(responsavel);
    } catch (error) {
        console.error(error);

        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                erro: "Já existe um responsável cadastrado com esse CPF."
            });
        }

        return res.status(500).json({
            erro: "Erro ao criar responsável."
        });
    }
};


const atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const { Nome, CPF, Telefone } = req.body;

        if (!Nome || !CPF || !Telefone) {
            return res.status(400).json({
                erro: "Nome, CPF e Telefone são obrigatórios."
            });
        }

        const linhasAfetadas = await responsaveisModel.atualizar(
            id,
            Nome,
            CPF,
            Telefone
        );

        if (linhasAfetadas === 0) {
            return res.status(404).json({
                erro: "Responsável não encontrado ou nenhum dado foi alterado."
            });
        }

        return res.json({
            mensagem: "Responsável atualizado com sucesso."
        });
    } catch (error) {
        console.error(error);

        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                erro: "Já existe outro responsável cadastrado com esse CPF."
            });
        }

        return res.status(500).json({
            erro: "Erro ao atualizar responsável."
        });
    }
};


const excluir = async (req, res) => {
    try {
        const { id } = req.params;

        const linhasAfetadas = await responsaveisModel.excluir(id);

        if (linhasAfetadas === 0) {
            return res.status(404).json({
                erro: "Responsável não encontrado."
            });
        }

        return res.json({
            mensagem: "Responsável excluído com sucesso."
        });
    } catch (error) {
        console.error(error);

        if (error.code === "ER_ROW_IS_REFERENCED_2") {
            return res.status(409).json({
                erro: "Não é possível excluir o responsável porque existem filhos vinculados."
            });
        }

        return res.status(500).json({
            erro: "Erro ao excluir responsável."
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
