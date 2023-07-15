const koa = require("koa");
const bodyParser = require("koa-bodyparser");

const { userRouter } = require("../router/user.router");
const { authRouter } = require("../router/auth.router");
const { errorHandler } = require("./error-handle");
const { useRoutes } = require("../router");

const app = new koa();

app.use(bodyParser());

/**
 * 如果觉得写一个函数传入app不美观，也可以隐式绑定this
 * useRoutes(app)
 */
app.useRoutes = useRoutes;
app.useRoutes();

app.on("error", errorHandler);

module.exports = app;
