require("dotenv").config();
const express = require("express");
const rotas = require("./rotas");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../dev/swagger/swagger_output.json");

const app = express();

app.use(express.json({ limit: "5mb" }));
app.use(cors());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(rotas);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
