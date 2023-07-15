const jwt = require("jsonwebtoken");

const errTypes = require("../constants/error-types");
const userService = require("../service/user.service");
const md5password = require("../utils/password-handle");
const { PUBLIC_KEY } = require("../app/config");

const verifyLogin = async (ctx, next) => {
  // 获取用户名密码
  const { name, password } = ctx.request.body;
  // 判断用户名和密码是否空
  if (!name || !password) {
    const error = new Error(errTypes.NAME_OR_PASSWORD_IS_NOT_EMP);
    return ctx.app.emit("error", error, ctx);
  }
  // 判断用户是否存在
  const result = await userService.getUserByName(name);
  const user = result[0];
  if (!user) {
    const error = new Error(errTypes.USER_DOES_NOT_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }

  // 判断密码和数据库密码是否一致
  // 判断密码是否一致
  if (md5password(password) !== user.password) {
    const error = new Error(errTypes.PASSWORD_IS_INCORRENT);
    return ctx.app.emit("error", error, ctx);
  }

  ctx.user = user;
  await next();
};

const verifyAuth = async (ctx, next) => {
  try {
    console.log("验证授权");
    const authorization = ctx.headers.authorization;
    if (!authorization) {
      const error = new Error(errTypes.UN_AUTHORIZATION);
      return ctx.app.emit("error", error, ctx);
    }
    // const token = authorization.replace("Bearer ", "");

    // let result = jwt.verify(token, PUBLIC_KEY, {
    //   algorithm: "RSA",
    // });
    // console.log(result);
    await next();
  } catch (error) {
    console.log(error);
    const err = new Error(errTypes.UN_AUTHORIZATION);
    return ctx.app.emit("error", err, ctx);
  }
};

module.exports = { verifyLogin, verifyAuth };
