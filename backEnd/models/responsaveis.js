
const db = require("../config/database");


const buscarTodos = async () => {
    const [responsaveis] = await db.query(`
        SELECT *
        FROM responsaveis
    `);

    return responsaveis;
};


const buscarPorId = async (id) => {
    const [responsaveis] = await db.query(`
        SELECT *
        FROM responsaveis
        WHERE Id_Responsavel = ?
    `, [id]);

    return responsaveis[0];
};


const criar = async (Nome, CPF, Telefone) => {
    const [resultado] = await db.query(`
        INSERT INTO responsaveis (Nome, CPF, Telefone)
        VALUES (?, ?, ?)
    `, [Nome, CPF, Telefone]);

    return {
        Id_Responsavel: resultado.insertId,
        Nome,
        CPF,
        Telefone
    };
};


const atualizar = async (id, Nome, CPF, Telefone) => {
    const [resultado] = await db.query(`
        UPDATE responsaveis
        SET Nome = ?, CPF = ?, Telefone = ?
        WHERE Id_Responsavel = ?
    `, [Nome, CPF, Telefone, id]);

    return resultado.affectedRows;
};


const excluir = async (id) => {
    const [resultado] = await db.query(`
        DELETE FROM responsaveis
        WHERE Id_Responsavel = ?
    `, [id]);

    return resultado.affectedRows;
};

module.exports = {
    buscarTodos,
    buscarPorId,
    criar,
    atualizar,
    excluir
};
