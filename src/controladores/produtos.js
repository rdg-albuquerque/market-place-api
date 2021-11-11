const { knex } = require("../conexao");
const {
    cadastrarProdutoSchema,
    atualizarProdutoSchema,
    atualizarImgProdutoSchema,
} = require("../utils/validacoes/validacoes-produtos");
const consultarProduto = require("../utils/consultas/consultar-produto");
const upload = require("../servicos/supabase/utils/upload");
const deleteImg = require("../servicos/supabase/utils/delete");
const getPublicUrl = require("../servicos/supabase/utils/getPublicUrl");

const listarProdutos = async (req, res) => {
    const { usuario } = req;

    try {
        const produtos = await knex("produtos")
            .where({ usuario_id: usuario.id, ...req.query })
            .orderBy("id")
            .returning("*")
            .debug();

        for (let i = 0; i < produtos.length; i++) {
            if (produtos[i].imagem) {
                const { publicURL, error } = getPublicUrl(produtos[i].imagem);
                if (error) return res.status(400).json(error.message);
                produtos[i] = { ...produtos[i], url: publicURL };
            }
        }

        res.json(produtos);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const obterProduto = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params;

    try {
        let produto = await consultarProduto(usuario.id, id);
        if (!produto) return res.status(404).json("Produto não encontrado");

        if (produto.imagem) {
            const { publicURL, error } = getPublicUrl(produto.imagem);
            if (error) return res.status(400).json(error.message);
            produto = { ...produto, url: publicURL };
        }
        return res.status(200).json(produto);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const cadastrarProduto = async (req, res) => {
    const { usuario } = req;

    try {
        await cadastrarProdutoSchema.validate(req.body);

        const insert = await knex("produtos")
            .insert({
                usuario_id: usuario.id,
                ...req.body,
            })
            .returning(["*"])
            .debug();

        if (!insert.length) return res.status(404).json("Não foi possível cadastrar o produto");

        return res.status(200).json("Produto cadastrado com sucesso");
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const atualizarProduto = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params;
    const { nome, estoque, preco, categoria, descricao } = req.body;

    if (!nome && !estoque && !preco && !categoria && !descricao) {
        return res.status(404).json("Informe ao menos um campo para atualizaçao do produto");
    }

    try {
        await atualizarProdutoSchema.validate(req.body);

        const produto = await consultarProduto(usuario.id, id);
        if (!produto) return res.status(404).json("Produto não encontrado");

        const att = await knex("produtos")
            .update({ ...req.body })
            .where({ id, usuario_id: usuario.id })
            .returning("*")
            .debug();

        if (att.length === 0) {
            return res.status(400).json("O produto não foi atualizado");
        }

        res.status(200).json("produto foi atualizado com sucesso.");
    } catch (error) {
        if (error.code === "42703")
            return res.status(400).json("Verifique se passou o nome da coluna corretamente.");
        return res.status(400).json(error.message);
    }
};

const excluirProduto = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params;

    try {
        const produto = await consultarProduto(usuario.id, id);
        if (!produto) return res.status(404).json("Produto não encontrado");

        if (produto.imagem) {
            const { error } = await deleteImg(produto.imagem);
            if (error) return res.status(400).json(error.message);
        }

        const produtoExcluido = await knex("produtos").delete().where({ id }).returning("*").debug();
        if (produtoExcluido.length === 0) {
            return res.status(400).json("O produto não foi excluído");
        }

        return res.status(200).json("Produto excluido com sucesso");
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const atualizarImgProduto = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params;
    const { nome_imagem, imagem } = req.body;

    try {
        await atualizarImgProdutoSchema.validate(req.body);

        const produto = await consultarProduto(usuario.id, id);
        if (!produto) return res.status(404).json("Produto não encontrado");

        if (produto.imagem) {
            const { error } = await deleteImg(produto.imagem);
            if (error) return res.status(400).json(error.message);
        }

        const { error } = await upload(nome_imagem, imagem);
        if (error) return res.status(400).json(error.message);

        const att = await knex("produtos")
            .update({ imagem: nome_imagem })
            .where({ id, usuario_id: usuario.id })
            .returning("*")
            .debug();

        if (att.length === 0) {
            return res.status(400).json("A imagem do produto não foi atualizada");
        }

        res.status(200).json("A imagem do produto foi atualizada com sucesso.");
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const excluirImgProduto = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params;

    try {
        const produto = await consultarProduto(usuario.id, id);
        if (!produto) return res.status(404).json("Produto não encontrado");

        if (!produto.imagem) return res.status(400).json("Não há imagem para ser excluída");

        const { error } = await deleteImg(produto.imagem);
        if (error) return res.status(400).json(error.message);

        const att = await knex("produtos")
            .update({ imagem: null })
            .where({ id, usuario_id: usuario.id })
            .returning("*")
            .debug();

        if (att.length === 0) {
            return res.status(400).json("A imagem do produto não foi excluída");
        }

        res.status(200).json("A imagem do produto foi excluída com sucesso.");
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = {
    listarProdutos,
    obterProduto,
    cadastrarProduto,
    atualizarProduto,
    excluirProduto,
    atualizarImgProduto,
    excluirImgProduto,
};
