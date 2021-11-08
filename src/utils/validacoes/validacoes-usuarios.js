const yup = require('yup')
const { pt } = require('yup-locales')

yup.setLocale(pt)


const cadastrarUsuarioSchema = yup.object().shape({
    nome: yup.string().required().min(3),
    email: yup.string().email().required(),
    senha: yup.string().required().min(5),
    nome_loja: yup.string().required()
})

const editarUsuarioSchema = yup.object().shape({
    nome: yup.string().min(3),
    email: yup.string().email(),
    senha: yup.string().min(5),
    nome_loja: yup.string()
})

module.exports = {
    cadastrarUsuarioSchema,
    editarUsuarioSchema
}