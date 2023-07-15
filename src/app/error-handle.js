const errTypes = require("../constants/error-types");

const errorHandler = (error, ctx) => {
  let status, message;
  switch (error.message) {
    case errTypes.NAME_OR_PASSWORD_IS_NOT_EMP:
      status = 404;
      message = "用户名或者密码不能为空";
      break;
    case errTypes.USER_ALREADY_EXISTS:
      status = 409;
      message = "用户名已经存在";
      break;
    case errTypes.USER_DOES_NOT_EXISTS:
      status = 400;
      message = "用户不存在";
      break;
    case errTypes.PASSWORD_IS_INCORRENT:
      status = 400;
      message = "用户密码错误";
      break;
    case errTypes.UN_AUTHORIZATION:
      status = 400;
      message = "无效的token！";
      break;
    default:
      status = 404;
      message = "NOT FOUND";
      break;
  }
  ctx.status = status;
  ctx.body = message;
};

module.exports = {
  errorHandler,
};
