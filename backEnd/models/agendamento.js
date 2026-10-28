
const db = require("../config/database");

const buscarTodos = async () => {
    const [agendamentos] = await db.query(`
        SELECT
            agendamento.*,
            filho.Nome AS Nome_Filho,
            responsaveis.Nome AS Nome_Responsavel
        FROM agendamento
        INNER JOIN filho
            ON agendamento.Id_Filho = filho.Id_Filho
        INNER JOIN responsaveis
            ON filho.Id_Responsavel = responsaveis.Id_Responsavel
    `);

    return agendamentos;
};


const buscarPorId = async (id) => {
    const [agendamentos] = await db.query(`
        SELECT
            agendamento.*,
            filho.Nome AS Nome_Filho,
            responsaveis.Nome AS Nome_Responsavel
        FROM agendamento
        INNER JOIN filho
            ON agendamento.Id_Filho = filho.Id_Filho
        INNER JOIN responsaveis
            ON filho.Id_Responsavel = responsaveis.Id_Responsavel
        WHERE agendamento.Id_Agendamento = ?
    `, [id]);

    return agendamentos[0];
};

const criar = async (Data_Consulta, Motivo, Id_Filho) => {
    const [resultado] = await db.query(`
        INSERT INTO agendamento (Data_Consulta, Motivo, Id_Filho)
        VALUES (?, ?, ?)
    `, [Data_Consulta, Motivo, Id_Filho]);

    return {
        Id_Agendamento: resultado.insertId,
        Data_Consulta,
        Motivo,
        Id_Filho
    };
};


const atualizar = async (id, Data_Consulta, Motivo, Id_Filho) => {
    const [resultado] = await db.query(`
        UPDATE agendamento
        SET Data_Consulta = ?, Motivo = ?, Id_Filho = ?
        WHERE Id_Agendamento = ?
    `, [Data_Consulta, Motivo, Id_Filho, id]);

    return resultado.affectedRows;
};


const excluir = async (id) => {
    const [resultado] = await db.query(`
        DELETE FROM agendamento
        WHERE Id_Agendamento = ?
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
