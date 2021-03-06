const { knex } = require("../conexao");
const jwt = require("jsonwebtoken");

const verificaLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json("Não autorizado");
    }

    try {
        const token = authorization.replace("Bearer ", "").trim();

        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        const usuarios = await knex("usuarios").where({ id }).debug();
        if (usuarios.length === 0) return res.status(404).json("Usuario não encontrado");

        const { senha, ...usuario } = usuarios[0];
        req.usuario = usuario;

        next();
    } catch (error) {
        return res.status(401).json("Não autorizado");
    }
};

module.exports = verificaLogin;
