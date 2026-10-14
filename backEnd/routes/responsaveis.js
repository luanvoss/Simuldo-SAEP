
import express from "express";
import db from "../config/database.js";

const router = express.Router();;

// GET - Listar responsáveis e pesquisar por nome
router.get("/", async (req, res) => {
    try {
        const { busca } = req.query;

        let sql = "SELECT * FROM responsaveis";
        let valores = [];

        if (busca) {
            sql += " WHERE Nome LIKE ?";
            valores.push(`%${busca}%`);
        }

        const [responsaveis] = await db.query(sql, valores);

        res.status(200).json(responsaveis);
    } catch (erro) {
        res.status(500).json({
            mensagem: "Erro ao buscar responsáveis"
        });
    }
});

// POST - Cadastrar responsável
router.post("/", async (req, res) => {
    try {
        const { Nome, CPF, Telefone } = req.body;

        if (!Nome || !CPF || !Telefone) {
            return res.status(400).json({
                mensagem: "Nome, CPF e telefone são obrigatórios"
            });
        }

        const sql = `
            INSERT INTO responsaveis (Nome, CPF, Telefone)
            VALUES (?, ?, ?)
        `;

        const [resultado] = await db.query(sql, [
            Nome,
            CPF,
            Telefone
        ]);

        res.status(201).json({
            mensagem: "Responsável cadastrado com sucesso",
            Id_Responsavel: resultado.insertId,
            Nome,
            CPF,
            Telefone
        });
    } catch (erro) {
        if (erro.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                mensagem: "Este CPF já está cadastrado"
            });
        }

        res.status(500).json({
            mensagem: "Erro ao cadastrar responsável"
        });
    }
});

// PUT - Atualizar responsável
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { Nome, CPF, Telefone } = req.body;

        if (!Nome || !CPF || !Telefone) {
            return res.status(400).json({
                mensagem: "Nome, CPF e telefone são obrigatórios"
            });
        }

        const sql = `
            UPDATE responsaveis
            SET Nome = ?, CPF = ?, Telefone = ?
            WHERE Id_Responsavel = ?
        `;

        const [resultado] = await db.query(sql, [
            Nome,
            CPF,
            Telefone,
            id
        ]);

        if (resultado.affectedRows === 0) {
            const [responsaveis] = await db.query(
                "SELECT Id_Responsavel FROM responsaveis WHERE Id_Responsavel = ?",
                [id]
            );

            if (responsaveis.length === 0) {
                return res.status(404).json({
                    mensagem: "Responsável não encontrado"
                });
            }
        }

        res.status(200).json({
            mensagem: "Responsável atualizado com sucesso"
        });
    } catch (erro) {
        if (erro.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                mensagem: "Este CPF já está cadastrado"
            });
        }

        res.status(500).json({
            mensagem: "Erro ao atualizar responsável"
        });
    }
});

// DELETE - Excluir responsável
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const [resultado] = await db.query(
            "DELETE FROM responsaveis WHERE Id_Responsavel = ?",
            [id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensagem: "Responsável não encontrado"
            });
        }

        res.status(200).json({
            mensagem: "Responsável excluído com sucesso"
        });
    } catch (erro) {
        if (erro.code === "ER_ROW_IS_REFERENCED_2") {
            return res.status(409).json({
                mensagem: "Não é possível excluir: o responsável possui filhos cadastrados"
            });
        }

        res.status(500).json({
            mensagem: "Erro ao excluir responsável"
        });
    }
});

export default router;
