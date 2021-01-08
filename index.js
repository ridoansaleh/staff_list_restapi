import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import * as CompanyController from "./company/company.controller.js";
import * as StaffController from "./staff/staff.controller.js";
import { DATABASE_URI, PORT } from "./constant.js";

const app = express();

app.use((req, res, next) => {
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

mongoose.connect(DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

connection.on("error", () => {
  console.error("MongoDB database connection is failed");
});

app.post("/registration", CompanyController.insertCompany);
app.post("/login", CompanyController.login);
app.get("/all_staffs", StaffController.getAllStaffs);
app.post("/staff", StaffController.addStaff);
app.put("/staff/:id", StaffController.editStaff);
app.delete("/staff/:id", StaffController.deleteStaff);

app.listen(PORT, () => {
  console.log("Your RESTAPI server is listening at port %s", PORT);
});
