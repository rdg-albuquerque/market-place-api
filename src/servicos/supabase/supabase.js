const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.STORAGE_URL, process.env.STORAGE_KEY);

module.exports = supabase;
