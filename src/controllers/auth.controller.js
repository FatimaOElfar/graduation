import { dbModels as models } from "../Manager.js";
import helpers from "../utils/helpers.js";

export const authController = {
  resetPassword: async (req, res) => {
    const { username, old_password, new_password } = req.body;

    const user = await models.user.findOne({
      "credentials.username": username.toLowerCase(),
    });
    const company = await models.company.findOne({
      "credentials.companyname": companyname.toLowerCase(),
    });

    if (!user && !company)
      return res.send({
        error: "No user or company found with the given username",
      });

    const entity = user || company;

    if (entity.credentials.password !== old_password)
      return res.send({ error: "Invalid old password" });

    if (new_password === old_password)
      return res.send({
        error: "The new password must be different from the old one",
      });

    const isNotValid = helpers.checkPasswordValidation(new_password);
    if (isNotValid) return res.send({ error: isNotValid });

    const updatedEntity = await entity.updateOne({
      "credentials.password": new_password,
    });
    return res.send({
      success: "Password has been updated successfully",
      updatedEntity,
    });
  },
};
