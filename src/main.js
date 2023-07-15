const config = require("./app/config");
const app = require("./app");
require("./app/database");

app.listen(process.env.APP_PORT, () => {
  console.log(`http://localhost:${process.env.APP_PORT}`);
});
