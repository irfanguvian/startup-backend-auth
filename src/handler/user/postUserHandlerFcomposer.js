function postUserAuthHandlerFcomposer(diHash) {
  const {
    bcrypt,
    env,
    lodash,
    Model,
  } = diHash;

  const {
    User,
  } = Model;

  async function postUserAuthHandler(req, res) {
    try {
      const body = req.body;
      const passwordSalt = await bcrypt.genSaltSync(+env.APP_SALT);
      const passwordHash = await bcrypt.hashSync(body.password, passwordSalt);

      const checkIfEmailExist = await User.findOne({
        where: {
          email: body.email,
        },
      });

      if (!lodash.isEmpty(checkIfEmailExist)) {
        return res.status(400).json({
          status: "failed",
          message: "email is already exist",
        });
      }

      const insertArgs = {
        username: body.username,
        password: passwordHash,
        email: body.email,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
      };

      const getUser = await User.create(insertArgs);

      return res.status(200).json({
        "message": "Success",
        "data": {
          user: getUser.dataValues,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        "message": error.message,
      });
    }
  }
  return postUserAuthHandler;
}

module.exports = postUserAuthHandlerFcomposer;

