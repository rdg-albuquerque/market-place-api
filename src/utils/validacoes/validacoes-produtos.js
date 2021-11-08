const yup = require('yup')
const { pt } = require('yup-locales')

yup.setLocale(pt)


const cadastrarProdutoSchema = yup.object().shape({
    nome: yup.string().required().min(3),
    estoque: yup.number().strict().required().min(1),
    preco: yup.number().strict().required(),
    descricao: yup.string().required()
})

const editarProdutoSchema = yup.object().shape({
    nome: yup.string().min(3),
    estoque: yup.number().strict().min(1),
    preco: yup.number().strict().min(0),
    descricao: yup.string(),
    categoria: yup.string(),
    imagem: yup.string()
})

module.exports = {
    cadastrarProdutoSchema,
    editarProdutoSchema
}