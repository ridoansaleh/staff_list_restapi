import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  company_name: {
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
  number_of_employee: {
    type: Number,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  admin_username: {
    type: String,
    required: true,
    trim: true,
  },
  admin_password: {
    type: String,
    required: true,
    trim: true,
  },
});

const Company = mongoose.model("Company", companySchema);

export { Company };
