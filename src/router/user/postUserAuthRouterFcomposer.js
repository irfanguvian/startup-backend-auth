/**
 * @openapi
 * /login:
 *  post:
 *     description: login new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/postUserPayload'
 *     responses:
 *       200:
 *         description: example posted
 *     tags:
 *       - user
 *
 * components:
 *   schemas:
 *     postUserPayload:
 *       type: object
 *       properties:
 *         email:
 *           description: Email of user
 *           type: string
 *         password:
 *           description: Password of user
 *           type: string
 *         client_secret:
 *           description: client secret key
 *           type: string
 *       required:
 *         - username
 *         - password
 *         - client_secret
 */
function postUserAuthRouterFcomposer(diHash) {
  const {
    express,
    handlerFcomposerHash,
  } = diHash;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.postUserAuthHandler;

  const routerPath = "/login";
  // expressRouter.use(routerPath, middlewareHash.standardMiddlewareList);
  expressRouter.post(routerPath, handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = postUserAuthRouterFcomposer;

