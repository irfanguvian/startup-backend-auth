/**
 * @openapi
 * /signup:
 *  post:
 *     description: example Post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/postUserAuthPayload'
 *     responses:
 *       200:
 *         description: example posted
 *     tags:
 *       - user
 *
 * components:
 *   schemas:
 *     postUserAuthPayload:
 *       type: object
 *       properties:
 *         username:
 *           description: username of user
 *           type: string
 *         email:
 *           description: Email of user
 *           type: string
 *         password:
 *           description: password of user
 *           type: string
 *       required:
 *         - username
 *         - email
 *         - password
 */
function postUserAuthRouterFcomposer(diHash) {
  const {
    express,
    handlerFcomposerHash,
  } = diHash;
  const expressRouter = express.Router();
  const handlerFcomposer = handlerFcomposerHash.postUserHandler;

  const routerPath = "/signup";
  // expressRouter.use(routerPath, middlewareHash.standardMiddlewareList);
  expressRouter.post(routerPath, handlerFcomposer(diHash));

  return expressRouter;
}

module.exports = postUserAuthRouterFcomposer;

