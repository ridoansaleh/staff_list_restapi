import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Company } from "./company.model.js";
import { JWT_SECRET } from "../constant.js";

const insertCompany = (req, res) => {
  Company.find({ admin_username: req.body.admin_username })
    .then(async (comp) => {
      if (comp[0]) {
        res
          .status(400)
          .send({ text: "Admin username is already used", status: "Error" });
      } else {
        let salt = crypto.randomBytes(16).toString("base64");
        let hash = crypto
          .createHmac("sha512", salt)
          .update(req.body.admin_password)
          .digest("base64");
        req.body.admin_password = salt + "$" + hash;
        const company = new Company(req.body);
        try {
          const result = await company.save();
          res.status(201).send({ id: result._id, status: "Success" });
        } catch (err) {
          res
            .status(500)
            .send({ text: "Internal Server Error", status: "Error" });
        }
      }
    })
    .catch((_) => {
      res.status(500).send({ text: "Internal Server Error", status: "Error" });
    });
};

const login = async (req, res) => {
  let errors = [];
  errors.push("req.body => " + JSON.stringify(req.body)); // here [1]
  Company.find({ admin_username: req.body.username })
    .then((user) => {
      errors.push(user); // here [2]
      if (user.length > 0) {
        let currentPassword = user[0].admin_password.split("$");
        errors.push("currentPassword => " + currentPassword); // here [3]
        let salt = currentPassword[0];
        let hash = crypto
          .createHmac("sha512", salt)
          .update(req.body.password)
          .digest("base64");
        errors.push("hash => " + hash); // here [4]
        if (hash === currentPassword[1]) {
          const token = jwt.sign({ ...user[0] }, JWT_SECRET, {
            expiresIn: "1h",
          });
          errors.push("token => " + token); // here [5]
          res.status(201).send({ token });
        } else {
          res.status(400).send({ status: "Username or password is invalid" });
        }
      } else {
        res.status(404).send({ status: "Account doesn't exist" });
      }
    })
    .catch((_) => {
      res.status(500).send({
        text: "Internal Server Error",
        status: "Error",
        tracking: errors,
      });
    });
};

export { insertCompany, login };
