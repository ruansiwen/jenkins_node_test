const jwt = require("jsonwebtoken");
const { PRIVATE_KEY, PUBLIC_KEY } = require("../app/config");

class AuthController {
  async login(ctx, next) {
    try {
      let { id, username: name } = ctx.user;
      let payload = { id: id, name: name };

      // console.log(PRIVATE_KEY);
      const token = jwt.sign(payload, PRIVATE_KEY, {
        expiresIn: 60 * 60 * 24,
        // algorithm: "RSA",
      });
      ctx.body = {
        id,
        name,
        token,
      };
    } catch (error) {
      console.log(error);
      ctx.status = 500;
      ctx.body = "服务器解析错误";
    }
  }

  async success(ctx, next) {
    ctx = "授权成功";
    await next();
  }
}

module.exports = new AuthController();
