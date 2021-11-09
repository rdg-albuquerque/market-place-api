const { knex } = require("../../conexao");

async function consultarUsuário(email) {
    return await knex('usuarios').where({ email }).returning('*').debug();
};

module.exports = consultarUsuário;