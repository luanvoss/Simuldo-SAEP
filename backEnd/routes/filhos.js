
import express from "express";
import db from "../config/database.js";

const router = express.Router();

// GET - Listar filhos com o nome do responsável
router.get("/", async (req, res) => {
    try {
        const sql = `
            SELECT
                filho.Id_Filho AS id,
                filho.Nome AS nome,
                filho.Data_Nascimento AS data_nascimento,
                filho.Id_Responsavel AS responsavel_id,
                responsaveis.Nome AS responsavel
            FROM filho
            INNER JOIN responsaveis
                ON filho.Id_Responsavel = responsaveis.Id_Responsavel
            ORDER BY filho.Nome ASC
        `;

        const [filhos] = await db.query(sql);

        res.status(200).json(filhos);
    } catch (erro) {
        res.status(500).json({
            mensagem: "Erro ao buscar filhos"
        });
    }
});

// POST - Cadastrar filho
router.post("/", async (req, res) => {
    try {
        const { nome, data_nascimento, responsavel_id } = req.body;

        if (!nome || !data_nascimento || !responsavel_id) {
            return res.status(400).json({
                mensagem: "Nome, data de nascimento e responsável são obrigatórios"
            });
        }

        // Verificar se o responsável existe
        const [responsaveis] = await db.query(
            "SELECT Id_Responsavel FROM responsaveis WHERE Id_Responsavel = ?",
            [responsavel_id]
        );

        if (responsaveis.length === 0) {
            return res.status(404).json({
                mensagem: "Responsável não encontrado"
            });
        }

        const sql = `
            INSERT INTO filho (Nome, Data_Nascimento, Id_Responsavel)
            VALUES (?, ?, ?)
        `;

        const [resultado] = await db.query(sql, [
            nome,
            data_nascimento,
            responsavel_id
        ]);

        res.status(201).json({
            mensagem: "Filho cadastrado com sucesso",
            id: resultado.insertId,
            nome,
            data_nascimento,
            responsavel_id
        });
    } catch (erro) {
        res.status(500).json({
            mensagem: "Erro ao cadastrar filho"
        });
    }
});

// PUT - Atualizar filho
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, data_nascimento, responsavel_id } = req.body;

        if (!nome || !data_nascimento || !responsavel_id) {
            return res.status(400).json({
                mensagem: "Nome, data de nascimento e responsável são obrigatórios"
            });
        }

        // Verificar se o responsável existe
        const [responsaveis] = await db.query(
            "SELECT Id_Responsavel FROM responsaveis WHERE Id_Responsavel = ?",
            [responsavel_id]
        );

        if (responsaveis.length === 0) {
            return res.status(404).json({
                mensagem: "Responsável não encontrado"
            });
        }

        const sql = `
            UPDATE filho
            SET Nome = ?, Data_Nascimento = ?, Id_Responsavel = ?
            WHERE Id_Filho = ?
        `;

        const [resultado] = await db.query(sql, [
            nome,
            data_nascimento,
            responsavel_id,
            id
        ]);

        if (resultado.affectedRows === 0) {
            const [filhos] = await db.query(
                "SELECT Id_Filho FROM filho WHERE Id_Filho = ?",
                [id]
            );

            if (filhos.length === 0) {
                return res.status(404).json({
                    mensagem: "Filho não encontrado"
                });
            }
        }

        res.status(200).json({
            mensagem: "Filho atualizado com sucesso"
        });
    } catch (erro) {
        res.status(500).json({
            mensagem: "Erro ao atualizar filho"
        });
    }
});

// DELETE - Excluir filho
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const [resultado] = await db.query(
            "DELETE FROM filho WHERE Id_Filho = ?",
            [id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensagem: "Filho não encontrado"
            });
        }

        res.status(200).json({
            mensagem: "Filho excluído com sucesso"
        });
    } catch (erro) {
        if (erro.code === "ER_ROW_IS_REFERENCED_2") {
            return res.status(409).json({
                mensagem: "Não é possível excluir: o filho possui agendamentos cadastrados"
            });
        }

        res.status(500).json({
            mensagem: "Erro ao excluir filho"
        });
    }
});

export default router;
