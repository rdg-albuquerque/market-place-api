const supabase = require("../../servicos/supabase")

async function deleteImg(nome_imagem) {
    const response = await supabase
        .storage
        .from(process.env.STORAGE_BUCKET)
        .remove([nome_imagem])

    return response
}

module.exports = deleteImg