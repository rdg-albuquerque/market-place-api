const conexao = require('../conexao');
const { knex } = require('../conexao');
const { cadastrarProdutoSchema, editarProdutoSchema } = require('../utils/validacoes/validacoes-produtos');
const verificarProduto = require('../utils/verificar-produto');

const listarProdutos = async (req, res) => {
    const { usuario } = req;

    try {
        const query = await knex('produtos').where({ usuario_id: usuario.id, ...req.query }).orderBy('id').returning('*').debug()

        res.json(query)


    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const obterProduto = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params;

    try {
        const produto = await verificarProduto(usuario.id, id)
        if (!produto) return res.status(404).json('Produto não encontrado');

        return res.status(200).json(produto)
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const cadastrarProduto = async (req, res) => {
    const { usuario } = req;

    try {
        await cadastrarProdutoSchema.validate(req.body)
        const insert = await knex('produtos')
            .insert({ usuario_id: usuario.id, ...req.body })
            .returning(['*'])
            .debug()

        if (!insert.length) return res.status(404).json('Não foi possível cadastrar o produto');

        return res.status(200).json('Produto cadastrado com sucesso')
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const atualizarProduto = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params;
    const { nome, estoque, preco, categoria, descricao, imagem } = req.body;

    if (!nome && !estoque && !preco && !categoria && !descricao && !imagem) {
        return res.status(404).json('Informe ao menos um campo para atualizaçao do produto');
    }

    try {
        await editarProdutoSchema.validate(req.body)
        const produto = await verificarProduto(usuario.id, id)
        if (!produto) return res.status(404).json('Produto não encontrado');

        const att = await knex('produtos').update({ ...req.body }).where({ id, usuario_id: usuario.id }).returning('*').debug()

        if (att.length === 0) {
            return res.status(400).json("O produto não foi atualizado");
        }

        return res.status(200).json('produto foi atualizado com sucesso.');
    } catch (error) {
        if (error.code === '42703') return res.status(400).json('Verifique se passou o nome da coluna corretamente.');
        return res.status(400).json(error.message);
    }
}

const excluirProduto = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params;

    try {
        const produto = await verificarProduto(usuario.id, id)
        if (!produto) return res.status(404).json('Produto não encontrado');

        const produtoExcluido = await knex('produtos').delete().where({ id }).returning('*').debug()
        if (produtoExcluido.length === 0) {
            return res.status(400).json("O produto não foi excluído");
        }

        return res.status(200).json('Produto excluido com sucesso');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    listarProdutos,
    obterProduto,
    cadastrarProduto,
    atualizarProduto,
    excluirProduto
}