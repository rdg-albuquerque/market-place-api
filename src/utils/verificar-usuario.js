const { knex } = require("../conexao")

async function verificarUsuario(email) {
    try {
        return await knex('usuarios').where({ email }).returning('*').debug()

    } catch (error) {
        console.log(error.message)
    }
}

module.exports = verificarUsuario