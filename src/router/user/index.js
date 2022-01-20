const postUserRouterFcomposer = require("./postUserRouterFcomposer");
const postUserAuthRouterFcomposer = require("./postUserAuthRouterFcomposer");

function exampleRouterFcomposer(diHash) {
  const {
    express,
  } = diHash;

  const expressRouter = express.Router();
  expressRouter.use(postUserRouterFcomposer(diHash));
  expressRouter.use(postUserAuthRouterFcomposer(diHash));

  return expressRouter;
}

module.exports = exampleRouterFcomposer;
