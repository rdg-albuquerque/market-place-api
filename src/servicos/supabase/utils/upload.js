const supabase = require("../supabase");

async function upload(path, imagem) {
    const imgBuffer = Buffer.from(imagem, "base64");
    const response = await supabase.storage.from(process.env.STORAGE_BUCKET).upload(path, imgBuffer);

    return response;
}

module.exports = upload;
