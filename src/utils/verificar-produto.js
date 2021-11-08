const { knex } = require('../conexao');


async function verificarProduto(usuarioID, produtoID) {
    try {
        return await knex('produtos').where({ usuario_id: usuarioID, id: produtoID }).first().returning('*').debug()
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = verificarProduto