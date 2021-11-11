const knex = require("knex")({
    client: process.env.DB_CLIENT,
    connection: {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    },
});

module.exports = {
    knex,
};
