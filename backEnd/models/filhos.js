
const db = require("../config/database");

// GET - Buscar todos os filhos
const buscarTodos = async () => {
    const [filhos] = await db.query(`
        SELECT
            filho.*,
            responsaveis.Nome AS Nome_Responsavel
        FROM filho
        INNER JOIN responsaveis
            ON filho.Id_Responsavel = responsaveis.Id_Responsavel
    `);

    return filhos;
};

// GET - Buscar filho por ID
const buscarPorId = async (id) => {
    const [filhos] = await db.query(`
        SELECT
            filho.*,
            responsaveis.Nome AS Nome_Responsavel
        FROM filho
        INNER JOIN responsaveis
            ON filho.Id_Responsavel = responsaveis.Id_Responsavel
        WHERE filho.Id_Filho = ?
    `, [id]);

    return filhos[0];
};

// POST - Criar filho
const criar = async (Nome, Data_Nascimento, Id_Responsavel) => {
    const [resultado] = await db.query(`
        INSERT INTO filho (Nome, Data_Nascimento, Id_Responsavel)
        VALUES (?, ?, ?)
    `, [Nome, Data_Nascimento, Id_Responsavel]);

    return {
        Id_Filho: resultado.insertId,
        Nome,
        Data_Nascimento,
        Id_Responsavel
    };
};

// PUT - Atualizar filho
const atualizar = async (id, Nome, Data_Nascimento, Id_Responsavel) => {
    const [resultado] = await db.query(`
        UPDATE filho
        SET Nome = ?, Data_Nascimento = ?, Id_Responsavel = ?
        WHERE Id_Filho = ?
    `, [Nome, Data_Nascimento, Id_Responsavel, id]);

    return resultado.affectedRows;
};

// DELETE - Excluir filho
const excluir = async (id) => {
    const [resultado] = await db.query(`
        DELETE FROM filho
        WHERE Id_Filho = ?
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
