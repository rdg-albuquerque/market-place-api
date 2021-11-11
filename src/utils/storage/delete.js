const supabase = require("../../servicos/supabase");

async function deleteImg(nome_imagem) {
    const response = await supabase.storage.from(process.env.STORAGE_BUCKET).remove([nome_imagem]);
    const att = await knex("produtos")
        .update({ imagem: nome_imagem })
        .where({ id, usuario_id: usuario.id })
        .returning("*");
    return response;
}

module.exports = deleteImg;
