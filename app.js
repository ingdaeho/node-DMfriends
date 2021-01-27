const express = require("express");
const routes = require("./routes");
const { generalErrorHandler } = require("./errors");
const logger = require("morgan")("dev");

const app = express();

app.use(express.json());
app.use(logger);
app.use(routes);

app.use(generalErrorHandler);

module.exports = app;
