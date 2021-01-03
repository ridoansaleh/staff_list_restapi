import { Company } from "./company.model.js";

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

export { insertCompany };
