const TokenConst = require("../../const/token");

function postUserAuthHandlerFcomposer(diHash) {
  const {
    bcrypt,
    jwt,
    lodash,
    Model,
    keyProduct,
  } = diHash;

  const {
    User,
    Token,
  } = Model;

  async function postUserAuthHandler(req, res) {
    try {
      const body = req.body;

      const checkClientSecret = await Token
      .findOne({
        where: {
          name: TokenConst.CLIENT_SECRET,
          token: body.client_secret,
        },
      });

      if (lodash.isEmpty(checkClientSecret)) {
        return res.status(401).json({
          message: "invalid token credentials",
        });
      }

      const getUser = await User.findOne({
        where: {
          email: body.email,
        },
      });

      if (lodash.isEmpty(getUser)) {
        return res.status(401).send({
          message: "Invalid Data Login",
        });
      }

      const user = getUser.dataValues;

      const passwordCheck = await bcrypt.compareSync(body.password, user.password);

      if (!passwordCheck) {
        return res.status(401).send({
          message: "Invalid Data Login",
        });
      }

      user.password = undefined;

      const accessToken = jwt.sign(user, keyProduct.private, {
        algorithm: "RS256",
        expiresIn: "15m",
      });
      const refreshToken = jwt.sign(user, keyProduct.private, {
        algorithm: "RS256",
        expiresIn: "1y",
      });

      return res.status(200).send({
        accessToken,
        refreshToken,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  }
  return postUserAuthHandler;
}

module.exports = postUserAuthHandlerFcomposer;
