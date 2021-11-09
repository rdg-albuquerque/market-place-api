const { knex } = require("../../conexao");

async function consultarProduto(usuarioID, produtoID) {
    return await knex('produtos').where({ usuario_id: usuarioID, id: produtoID }).first().returning('*').debug();
};

module.exports = consultarProduto;