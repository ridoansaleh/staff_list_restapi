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
        jwt.verify(authorization[1], JWT_SECRET);
        return next();
      }
    } catch (err) {
      res.status(403).send({ message: "Forbidden Resource", status: "Error" });
    }
  } else {
    res.status(401).send({ message: "Unauthorized user", status: "Error" });
  }
};

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

const editStaff = [
  isJwtValid,
  async (req, res) => {
    const staff = await Staff.findByIdAndUpdate(req.params.id, req.body);
    const result = await staff.save();
    try {
      res.status(201).send({
        message: `Staff with id=${result._id} successfully updated`,
        status: "Success",
      });
    } catch (_) {
      res.status(500).send({ text: "Internal Server Error", status: "Error" });
    }
  },
];

const deleteStaff = [
  isJwtValid,
  async (req, res) => {
    const staff = await Staff.findByIdAndDelete(req.params.id);
    try {
      if (!staff) {
        return res.status(404).send({
          text: `Staff with id=${req.params.id} is not exist`,
          status: "Error",
        });
      }
      res.status(201).send({
        message: `Staff with id=${staff._id} successfully deleted`,
        status: "Success",
      });
    } catch (_) {
      res.status(500).send({ text: "Internal Server Error", status: "Error" });
    }
  },
];

export { getAllStaffs, addStaff, editStaff, deleteStaff };
