const supabase = require("../../servicos/supabase");

async function upload(nome_imagem, imagem) {
    const imgBuffer = Buffer.from(imagem, "base64");
    const response = await supabase.storage.from(process.env.STORAGE_BUCKET).upload(nome_imagem, imgBuffer);

    return response;
}

module.exports = upload;
