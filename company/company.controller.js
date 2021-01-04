import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Company } from "./company.model.js";
import { JWT_SECRET } from "../constant.js";

const checkUsername = async (username) => {
  const data = await Company.find({ admin_username: username });
  const status = data.length > 0;
  try {
    return status;
  } catch (err) {
    console.log(err);
  }
  return false;
};

const insertCompany = async (req, res) => {
  let salt = crypto.randomBytes(16).toString("base64");
  let hash = crypto
    .createHmac("sha512", salt)
    .update(req.body.admin_password)
    .digest("base64");
  req.body.admin_password = salt + "$" + hash;
  const company = new Company(req.body);
  const isFound = await checkUsername(company.admin_username);
  if (isFound) {
    res
      .status(400)
      .send({ text: "Admin username is already exist", status: "Error" });
  } else {
    const result = await company.save();
    try {
      res.status(201).send({ id: result._id, status: "Success" });
    } catch (err) {
      res.status(500).send({ text: "Internal Server Error", status: "Error" });
    }
  }
};

const login = async (req, res) => {
  Company.find({ admin_username: req.body.username })
    .then((user) => {
      if (user.length > 0) {
        let currentPassword = user[0].admin_password.split("$");
        let salt = currentPassword[0];
        let hash = crypto
          .createHmac("sha512", salt)
          .update(req.body.password)
          .digest("base64");
        if (hash === currentPassword[1]) {
          const token = jwt.sign({ ...user[0] }, JWT_SECRET);
          res.status(201).send({ token });
        } else {
          res.status(400).send({ status: "Username or password is invalid" });
        }
      } else {
        res.status(404).send({ status: "Account doesn't exist" });
      }
    })
    .catch((_) => {
      res.status(500).send({ text: "Internal Server Error", status: "Error" });
    });
};

export { insertCompany, login };
