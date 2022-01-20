// external dependencies
const bcrypt = require("bcrypt");
const cors = require("cors");
const express = require("express");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const lodash = require("lodash");
const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");
const SwaggerUiExpress = require("swagger-ui-express");
const { version } = require("../package.json");

// internal dependencies
const routerFcomposer = require("./router");
const handlerFcomposerHash = require("./handler");
const Model = require("./models");
require("./config/sequlieze");

// app registration
const env = {
  APP_ENV: process.env.APP_ENV,
  APP_VERSION: process.env.APP_VERSION,
  APP_SALT: process.env.APP_SALT,
  CERT_DIR: process.env.CERT_DIR,
};

// keys
const getPrivateKey = fs.readFileSync(`${env.CERT_DIR}/privateKey.pem`, "utf-8");
const app = express();

const keyProduct = {
  private: getPrivateKey,
  public: "null",
};

const diHash = {
  bcrypt,
  env,
  express,
  jwt,
  keyProduct,
  lodash,
  handlerFcomposerHash,
  Model,
  path,
};
const router = routerFcomposer(diHash);
app.use(express.static(path.join(__dirname, "/public")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/v1", router);
// Error handler registration
// --------------------------
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    message: err.message,
  });
});

// swager regis
const swaggerJsdocOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "str-backend",
      version,
      // version: env.APP_VERSION,
    },
    servers: [
      { url: "/v1" },
    ],
  },
  apis: [
    // "./app/lib/*.js",
    "./src/router/*.js",
    "./src/router/**/*.js",
  ],
};

const swaggerUiExpressOption = {
  swaggerOptions: {
    operationsSorter: "alpha",
    tagsSorter: "alpha",
  },
};

const swaggerSpec = swaggerJSDoc(swaggerJsdocOptions);

app.use("/docs", SwaggerUiExpress.serve, SwaggerUiExpress.setup(swaggerSpec, swaggerUiExpressOption));
app.get("/docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerJsdocOptions);
});

module.exports = app;
