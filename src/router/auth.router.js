const Router = require("koa-router");
const authRouter = new Router();

const authController = require("../controller/auth.controller");
const { verifyLogin, verifyAuth } = require("../middleware/auth.middleware");

authRouter.post("/login", verifyLogin, authController.login);
authRouter.get("/test", verifyAuth, authController.success);

module.exports = authRouter;
