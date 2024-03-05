import Company from "../Structure/company.js";
import { dbModels as models } from "../Manager.js";
import helpers from "../utils/helpers.js";

const companyController = {
  signUpCompany: async (req, res) => {
    const {
      email,
      phoneNumber,
      address,
      TIN,
      yearOfEstablish,
      website,
      companySize,
      companyName,
      password,
    } = req.body;
    const isNotValid = helpers.checkPasswordValidation(password);
    if (isNotValid) return res.send({ error: isNotValid });

    const foundCompany = await models.company.findOne({
      "credentials.companyName": companyName.toLowerCase(),
    });

    if (foundCompany)
      return res.send({
        error: "Company already exists with that companyName.",
      });

    const company = new Company({
      email,
      details: {
        phoneNumber,
        address,
        TIN,
        yearOfEstablish,
        website,
        companySize,
      },
      credentials: { companyName, password },
    });
    await models.company.create(company);
    return res.send({ success: "Company was created", company });
  },
  signInCompany: async (req, res) => {
    const { companyName, password } = req.body;

    const company = await models.company.findOne({
      "credentials.companyName": companyName.toLowerCase(),
    });

    if (!company || company.credentials.password !== password)
      return res.send({ error: "Invalid credentials" });
    return res.send({ success: "Credentials are correct", company });
  },
};

export default companyController;
