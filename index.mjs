import config from "./common/env.config.mjs";
import express from "express";
import bodyParser from "body-parser";

const app = express();

// const AuthorizationRouter = require("./authorization/routes.config");
// const UsersRouter = require("./users/routes.config");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Expose-Headers", "Content-Length");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Authorization, Content-Type, X-Requested-With, Range"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  } else {
    return next();
  }
});

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send({ data: "Hellow World" });
});

// AuthorizationRouter.routesConfig(app);
// UsersRouter.routesConfig(app);

app.listen(config.port, function () {
  console.log("app listening at port %s", config.port);
});
