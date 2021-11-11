const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginSchema = require("../utils/validacoes/validacoes-login");
const consultarUsuário = require("../utils/consultas/consultar-usuario");

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        await loginSchema.validate(req.body);
        const usuarios = await consultarUsuário(email);
        if (usuarios.length === 0) return res.status(400).json("Email e senha não confere");

        const usuario = usuarios[0];

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(400).json("Email e senha não confere");
        }

        const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: "8h" });

        const { senha: _, ...dadosUsuario } = usuario;

        return res.status(200).json({
            usuario: dadosUsuario,
            token,
        });
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = {
    login,
};
