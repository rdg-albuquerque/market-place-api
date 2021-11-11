const yup = require("yup");
const { pt } = require("yup-locales");

yup.setLocale(pt);

const cadastrarProdutoSchema = yup.object().shape({
    nome: yup.string().required().min(3),
    estoque: yup.number().strict().required().min(1),
    preco: yup.number().strict().required(),
    descricao: yup.string().required(),
    categoria: yup.string(),
});

const atualizarProdutoSchema = yup.object().shape({
    nome: yup.string().min(3),
    estoque: yup.number().strict().min(1),
    preco: yup.number().strict().min(0),
    descricao: yup.string(),
    categoria: yup.string(),
});

const atualizarImgProdutoSchema = yup.object().shape({
    imagem: yup.string().required(),
    nome_imagem: yup.string().required(),
});

module.exports = {
    cadastrarProdutoSchema,
    atualizarProdutoSchema,
    atualizarImgProdutoSchema,
};
