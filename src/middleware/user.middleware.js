const errTypes = require("../constants/error-types");
const userService = require("../service/user.service");
const md5password = require("../utils/password-handle");

const verifyUser = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  // 用户名，密码不能为空
  if (!name || !password) {
    const error = new Error(errTypes.NAME_OR_PASSWORD_IS_NOT_EMP);
    return ctx.app.emit("error", error, ctx);
  }
  // 且不能被注册过
  const result = await userService.getUserByName(name);
  if (result.length) {
    const error = new Error(errTypes.USER_ALREADY_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }

  await next();
};

const handlePassword = async (ctx, next) => {
  let { password } = ctx.request.body;
  ctx.request.body.password = md5password(password);
  await next();
};

module.exports = { verifyUser, handlePassword };
