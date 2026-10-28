
const agendamentosModel = require("../models/agendamento");


const buscarTodos = async (req, res) => {
    try {
        const agendamentos = await agendamentosModel.buscarTodos();

        return res.json(agendamentos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            erro: "Erro ao buscar agendamentos."
        });
    }
};


const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const agendamento = await agendamentosModel.buscarPorId(id);

        if (!agendamento) {
            return res.status(404).json({
                erro: "Agendamento não encontrado."
            });
        }

        return res.json(agendamento);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            erro: "Erro ao buscar agendamento."
        });
    }
};


const criar = async (req, res) => {
    try {
        const { Data_Consulta, Motivo, Id_Filho } = req.body;

        if (!Data_Consulta || !Motivo || !Id_Filho) {
            return res.status(400).json({
                erro: "Data_Consulta, Motivo e Id_Filho são obrigatórios."
            });
        }

        const agendamento = await agendamentosModel.criar(
            Data_Consulta,
            Motivo,
            Id_Filho
        );

        return res.status(201).json(agendamento);
    } catch (error) {
        console.error(error);

        if (error.code === "ER_NO_REFERENCED_ROW_2") {
            return res.status(400).json({
                erro: "O filho informado não existe."
            });
        }

        return res.status(500).json({
            erro: "Erro ao criar agendamento."
        });
    }
};


const atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const { Data_Consulta, Motivo, Id_Filho } = req.body;

        if (!Data_Consulta || !Motivo || !Id_Filho) {
            return res.status(400).json({
                erro: "Data_Consulta, Motivo e Id_Filho são obrigatórios."
            });
        }

        const linhasAfetadas = await agendamentosModel.atualizar(
            id,
            Data_Consulta,
            Motivo,
            Id_Filho
        );

        if (linhasAfetadas === 0) {
            return res.status(404).json({
                erro: "Agendamento não encontrado ou nenhum dado foi alterado."
            });
        }

        return res.json({
            mensagem: "Agendamento atualizado com sucesso."
        });
    } catch (error) {
        console.error(error);

        if (error.code === "ER_NO_REFERENCED_ROW_2") {
            return res.status(400).json({
                erro: "O filho informado não existe."
            });
        }

        return res.status(500).json({
            erro: "Erro ao atualizar agendamento."
        });
    }
};


const excluir = async (req, res) => {
    try {
        const { id } = req.params;

        const linhasAfetadas = await agendamentosModel.excluir(id);

        if (linhasAfetadas === 0) {
            return res.status(404).json({
                erro: "Agendamento não encontrado."
            });
        }

        return res.json({
            mensagem: "Agendamento excluído com sucesso."
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            erro: "Erro ao excluir agendamento."
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
