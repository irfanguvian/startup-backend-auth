// import goes here
const userRouteFcomposer = require("./user");

/**
 * @openapi
 * components:
 *   securitySchemes:
 *      appAuthScheme:
 *        type: apiKey
 *        in: header
 *        name: x-api-key
 *      userAuthScheme:
 *        type: http
 *        scheme: bearer
 */

function routerFcomposer(diHash) {
  const {
    express,
  } = diHash;

  const expressRouter = express.Router();

  // example
  const userRoute = userRouteFcomposer(diHash);
  expressRouter.use(userRoute);

  return expressRouter;
}

module.exports = routerFcomposer;
