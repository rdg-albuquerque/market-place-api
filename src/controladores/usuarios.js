const { knex } = require("../conexao");
const bcrypt = require("bcrypt");
const consultarUsuario = require("../utils/consultas/consultar-usuario");
const { cadastrarUsuarioSchema, editarUsuarioSchema } = require("../utils/validacoes/validacoes-usuarios");
const transporter = require("../nodemailer");

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        await cadastrarUsuarioSchema.validate(req.body);
        const emailJaCadastrado = await consultarUsuario(email);

        if (emailJaCadastrado.length > 0) return res.status(400).json("O email já existe");

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const insert = await knex("usuarios")
            .insert({ ...req.body, senha: senhaCriptografada })
            .returning(["*"])
            .debug();

        if (!insert.length) return res.status(500).json("Não foi possível cadastrar o usuário");

        transporter.sendMail({
            from: '"Market Place" <nao-responder@marketplace.com>',
            to: "bar@example.com",
            subject: "Boas vindas",
            template: "cadastro",
            context: {
                nome,
            },
        });

        return res.status(200).json("O usuario foi cadastrado com sucesso!");
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const obterPerfil = async (req, res) => {
    return res.status(200).json(req.usuario);
};

const atualizarPerfil = async (req, res) => {
    const { nome, email, senha, nome_loja } = req.body;
    const { id } = req.usuario;

    if (!nome && !email && !senha && !nome_loja) {
        return res.status(400).json("É obrigatório informar ao menos um campo para atualização");
    }

    try {
        await editarUsuarioSchema.validate(req.body);

        if (email) {
            const emailJaCadastrado = await consultarUsuario(email);
            if (emailJaCadastrado.length > 0 && emailJaCadastrado[0].id !== id) {
                return res.status(400).json("Este e-mail já está cadastrado");
            }
        }

        let dadosUpdate = { ...req.body };
        if (senha) {
            const senhaCriptografada = await bcrypt.hash(senha, 10);
            dadosUpdate = { ...dadosUpdate, senha: senhaCriptografada };
        }

        const att = await knex("usuarios").update(dadosUpdate).where({ id }).returning(["*"]).debug();

        if (!att.length) return res.status(500).json("Não foi possível atualizar o usuário");

        return res.status(200).json("Usuário foi atualizado com sucesso.");
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = {
    cadastrarUsuario,
    obterPerfil,
    atualizarPerfil,
};
