require("dotenv").config();
const appServer = require("./server");

process.env.APP_VERSION = require("../package.json").version;

const appPort = (process.env.APP_PORT || 8080);

process.once("uncaughtException", (err) => {
  console.error(err);
});

appServer.listen(appPort, function startApp() {
  console.log(`APP_ENV ${process.env.APP_ENV}`);
  console.log(`v${process.env.APP_VERSION}`);
});

