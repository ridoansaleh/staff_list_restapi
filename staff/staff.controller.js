import jwt from "jsonwebtoken";
import { Staff } from "./staff.model.js";
import { JWT_SECRET } from "../constant.js";

const isJwtValid = async (req, res, next) => {
  if (req.headers["authorization"]) {
    try {
      let authorization = req.headers["authorization"].split(" ");
      if (authorization[0] !== "Bearer") {
        res.status(401).send({ message: "Invalid Token", status: "Error" });
      } else {
        req.jwt = jwt.verify(authorization[1], JWT_SECRET);
        return next();
      }
    } catch (err) {
      res.status(403).send({ message: "Forbidden Resource", status: "Error" });
    }
  } else {
    res.status(401).send({ message: "Unauthorize user", status: "Error" });
  }
};

const addStaff = [
  isJwtValid,
  async (req, res) => {
    const staff = new Staff(req.body);
    const result = await staff.save();
    try {
      res.status(201).send({ id: result._id, status: "Success" });
    } catch (_) {
      res.status(500).send({ text: "Internal Server Error", status: "Error" });
    }
  },
];

const getAllStaffs = [
  isJwtValid,
  async (_, res) => {
    const staffs = await Staff.find({});
    try {
      res.status(201).send(staffs);
    } catch (_) {
      res.status(500).send({ text: "Internal Server Error", status: "Error" });
    }
  },
];

export { addStaff, getAllStaffs };
