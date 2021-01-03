import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import * as StaffController from "./company/company.controller.js";
import { DATABASE_URI, PORT } from "./constant.js";

const app = express();

app.use(bodyParser.json());

mongoose.connect(DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

connection.on("error", () => {
  console.error("MongoDB database connection is failed");
});

app.post("/registration", StaffController.insertCompany);

app.listen(PORT, () => {
  console.log("Your RESTAPI server is listening at port %s", PORT);
});
