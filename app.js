const express = require("express");
const app = express();
const appConfig = require("./config/main-config.js");
const routeConfig = require("./config/route-config.js");
const cors = require("cors");

if((process.env.NODE_ENV === "development")){
  app.use(cors({origin: `http://localhost:3000`} ));
}
appConfig.init(app, express);
routeConfig.init(app);

module.exports = app;