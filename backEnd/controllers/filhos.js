
const filhosModel = require("../models/filhos");


const buscarTodos = async (req, res) => {
    try {
        const filhos = await filhosModel.buscarTodos();

        return res.json(filhos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            erro: "Erro ao buscar filhos."
        });
    }
};


const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const filho = await filhosModel.buscarPorId(id);

        if (!filho) {
            return res.status(404).json({
                erro: "Filho não encontrado."
            });
        }

        return res.json(filho);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            erro: "Erro ao buscar filho."
        });
    }
};


const criar = async (req, res) => {
    try {
        const { Nome, Data_Nascimento, Id_Responsavel } = req.body;

        if (!Nome || !Data_Nascimento || !Id_Responsavel) {
            return res.status(400).json({
                erro: "Nome, Data_Nascimento e Id_Responsavel são obrigatórios."
            });
        }

        const filho = await filhosModel.criar(
            Nome,
            Data_Nascimento,
            Id_Responsavel
        );

        return res.status(201).json(filho);
    } catch (error) {
        console.error(error);

        if (error.code === "ER_NO_REFERENCED_ROW_2") {
            return res.status(400).json({
                erro: "O responsável informado não existe."
            });
        }

        return res.status(500).json({
            erro: "Erro ao criar filho."
        });
    }
};


const atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const { Nome, Data_Nascimento, Id_Responsavel } = req.body;

        if (!Nome || !Data_Nascimento || !Id_Responsavel) {
            return res.status(400).json({
                erro: "Nome, Data_Nascimento e Id_Responsavel são obrigatórios."
            });
        }

        const linhasAfetadas = await filhosModel.atualizar(
            id,
            Nome,
            Data_Nascimento,
            Id_Responsavel
        );

        if (linhasAfetadas === 0) {
            return res.status(404).json({
                erro: "Filho não encontrado ou nenhum dado foi alterado."
            });
        }

        return res.json({
            mensagem: "Filho atualizado com sucesso."
        });
    } catch (error) {
        console.error(error);

        if (error.code === "ER_NO_REFERENCED_ROW_2") {
            return res.status(400).json({
                erro: "O responsável informado não existe."
            });
        }

        return res.status(500).json({
            erro: "Erro ao atualizar filho."
        });
    }
};


const excluir = async (req, res) => {
    try {
        const { id } = req.params;

        const linhasAfetadas = await filhosModel.excluir(id);

        if (linhasAfetadas === 0) {
            return res.status(404).json({
                erro: "Filho não encontrado."
            });
        }

        return res.json({
            mensagem: "Filho excluído com sucesso."
        });
    } catch (error) {
        console.error(error);

        if (error.code === "ER_ROW_IS_REFERENCED_2") {
            return res.status(409).json({
                erro: "Não é possível excluir o filho porque existem agendamentos vinculados."
            });
        }

        return res.status(500).json({
            erro: "Erro ao excluir filho."
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
