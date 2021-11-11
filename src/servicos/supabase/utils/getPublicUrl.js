const supabase = require("../supabase");

function getPublicUrl(nome_imagem) {
    const response = supabase.storage.from(process.env.STORAGE_BUCKET).getPublicUrl(nome_imagem);

    return response;
}

module.exports = getPublicUrl;
