const swaggerAutoGen = require("swagger-autogen")();

swaggerAutoGen("./swagger_output.json", ["../../src/rotas.js"]);
