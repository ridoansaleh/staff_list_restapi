import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  religion: {
    type: String,
    required: true,
  },
  marital_status: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  start_date: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  employee_status: {
    type: String,
    required: true,
  },
});

const Staff = mongoose.model("Staff", staffSchema);

export { Staff };
