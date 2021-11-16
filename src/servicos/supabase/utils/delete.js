const supabase = require("../supabase");

async function deleteImg(path) {
    const response = await supabase.storage.from(process.env.STORAGE_BUCKET).remove([path]);

    return response;
}

module.exports = deleteImg;
