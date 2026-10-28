
const db = require("../config/database");


const buscarTodos = async () => {
    const [usuarios] = await db.query(`
        SELECT Id_Usuario, Nome, Email
        FROM usuarios
    `);

    return usuarios;
};


const buscarPorId = async (id) => {
    const [usuarios] = await db.query(`
        SELECT Id_Usuario, Nome, Email
        FROM usuarios
        WHERE Id_Usuario = ?
    `, [id]);

    return usuarios[0];
};


const criar = async (Nome, Email, Senha) => {
    const [resultado] = await db.query(`
        INSERT INTO usuarios (Nome, Email, Senha)
        VALUES (?, ?, ?)
    `, [Nome, Email, Senha]);

    return {
        Id_Usuario: resultado.insertId,
        Nome,
        Email
    };
};


const atualizar = async (id, Nome, Email, Senha) => {
    const [resultado] = await db.query(`
        UPDATE usuarios
        SET Nome = ?, Email = ?, Senha = ?
        WHERE Id_Usuario = ?
    `, [Nome, Email, Senha, id]);

    return resultado.affectedRows;
};


const excluir = async (id) => {
    const [resultado] = await db.query(`
        DELETE FROM usuarios
        WHERE Id_Usuario = ?
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
