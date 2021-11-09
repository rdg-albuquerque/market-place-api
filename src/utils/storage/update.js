const supabase = require("../../servicos/supabase")

async function update(nome_imagem, imagem) {
    const imgBuffer = Buffer.from(imagem, 'base64')
    const response = await supabase
        .storage
        .from(process.env.STORAGE_BUCKET)
        .update(nome_imagem, imgBuffer)

    return response
}

module.exports = update