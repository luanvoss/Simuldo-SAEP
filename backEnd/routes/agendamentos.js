
import express from "express";
import db from "../config/database.js";

const router = express.Router();

// GET - Listar agendamentos com dados do filho e do responsável
router.get("/", async (req, res) => {
    try {
        const sql = `
            SELECT
                a.Id_Agendamento AS id,
                a.Data_Consulta AS data_consulta,
                a.Motivo AS motivo,

                f.Id_Filho AS filho_id,
                f.Nome AS filho,
                f.Data_Nascimento AS data_nascimento,

                r.Id_Responsavel AS responsavel_id,
                r.Nome AS responsavel,
                r.Telefone AS telefone

            FROM agendamento AS a

            INNER JOIN filho AS f
                ON a.Id_Filho = f.Id_Filho

            INNER JOIN responsaveis AS r
                ON f.Id_Responsavel = r.Id_Responsavel

            ORDER BY a.Data_Consulta ASC
        `;

        const [agendamentos] = await db.query(sql);

        res.status(200).json(agendamentos);
    } catch (erro) {
        res.status(500).json({
            mensagem: "Erro ao buscar agendamentos"
        });
    }
});

// POST - Cadastrar agendamento
router.post("/", async (req, res) => {
    try {
        const { data_consulta, motivo, filho_id } = req.body;

        if (!data_consulta || !motivo || !filho_id) {
            return res.status(400).json({
                mensagem: "Data da consulta, motivo e filho são obrigatórios"
            });
        }

        // Verificar se o filho existe
        const [filhos] = await db.query(
            "SELECT Id_Filho FROM filho WHERE Id_Filho = ?",
            [filho_id]
        );

        if (filhos.length === 0) {
            return res.status(404).json({
                mensagem: "Filho não encontrado"
            });
        }

        const sql = `
            INSERT INTO agendamento (Data_Consulta, Motivo, Id_Filho)
            VALUES (?, ?, ?)
        `;

        const [resultado] = await db.query(sql, [
            data_consulta,
            motivo,
            filho_id
        ]);

        res.status(201).json({
            mensagem: "Agendamento cadastrado com sucesso",
            id: resultado.insertId,
            data_consulta,
            motivo,
            filho_id
        });
    } catch (erro) {
        res.status(500).json({
            mensagem: "Erro ao cadastrar agendamento"
        });
    }
});

// PUT - Atualizar agendamento
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { data_consulta, motivo, filho_id } = req.body;

        if (!data_consulta || !motivo || !filho_id) {
            return res.status(400).json({
                mensagem: "Data da consulta, motivo e filho são obrigatórios"
            });
        }

        // Verificar se o filho existe
        const [filhos] = await db.query(
            "SELECT Id_Filho FROM filho WHERE Id_Filho = ?",
            [filho_id]
        );

        if (filhos.length === 0) {
            return res.status(404).json({
                mensagem: "Filho não encontrado"
            });
        }

        const sql = `
            UPDATE agendamento
            SET Data_Consulta = ?, Motivo = ?, Id_Filho = ?
            WHERE Id_Agendamento = ?
        `;

        const [resultado] = await db.query(sql, [
            data_consulta,
            motivo,
            filho_id,
            id
        ]);

        if (resultado.affectedRows === 0) {
            const [agendamentos] = await db.query(
                "SELECT Id_Agendamento FROM agendamento WHERE Id_Agendamento = ?",
                [id]
            );

            if (agendamentos.length === 0) {
                return res.status(404).json({
                    mensagem: "Agendamento não encontrado"
                });
            }
        }

        res.status(200).json({
            mensagem: "Agendamento atualizado com sucesso"
        });
    } catch (erro) {
        res.status(500).json({
            mensagem: "Erro ao atualizar agendamento"
        });
    }
});

// DELETE - Excluir agendamento
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const [resultado] = await db.query(
            "DELETE FROM agendamento WHERE Id_Agendamento = ?",
            [id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensagem: "Agendamento não encontrado"
            });
        }

        res.status(200).json({
            mensagem: "Agendamento excluído com sucesso"
        });
    } catch (erro) {
        res.status(500).json({
            mensagem: "Erro ao excluir agendamento"
        });
    }
});

export default router;
