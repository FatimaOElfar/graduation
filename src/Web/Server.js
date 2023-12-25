import express from "express";
import bodyParser from "body-parser";
import User from "../Structure/User.js";
import Cv from "../Structure/Cv.js";

const getUserByUsername = async (models, username) => {
  return await models.user.findOne({
    "credentials.username": username.toLowerCase(),
  });
};

const checkPasswordValidation = (password) => {
  if (password.length <= 6) {
    return "Password should be greater than 6 characters";
  }
  return null;
};

const startServer = (models) => {
  const app = express();
  const port = process.env.PORT || 3000;
  const API_VERSION = "v" + process.env.API_VERSION;
  const API_URL = `/api/${API_VERSION}`;

  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  // SIGN UP HANDLER
  app.post(`${API_URL}/signup`, async (req, res) => {
    const {
      email,
      firstName,
      lastName,
      phoneNumber,
      address,
      state,
      city,
      gender,
      birthDate,
      username,
      password,
    } = req.body;
    const isNotValid = checkPasswordValidation(password);
    if (isNotValid) return res.send({ error: isNotValid });

    const foundUser = await getUserByUsername(models, username);
    if (foundUser)
      return res.send({ error: "User already exists with that username." });

    const user = new User({
      email,
      details: {
        firstName,
        lastName,
        phoneNumber,
        address,
        state,
        city,
        gender,
        birthDate,
      },
      credentials: { username, password },
    });
    await user.save(models.user);
    return res.send({ success: "User was created", user });
  });

  // CV HANDLER
  app.get(`${API_URL}/cv/:username`, async (req, res) => {
    const cv = new Cv(models, req.params.username);
    await cv.load(models);
    cv.user = null;
    return res.send({ cv });
  });
  // SIGN IN HANDLER
  app.post(`${API_URL}/signin`, async (req, res) => {
    const { username, password } = req.body;
    const user = await getUserByUsername(models, username);
    if (!user || user.credentials.password != password)
      return res.send({ error: "Invalid credentials" });
    return res.send({ success: "Credentials is correct", user });
  });

  // RESET PASSWORD HANDLER
  app.post(`${API_URL}/resetpassword`, async (req, res) => {
    const { username, old_password, new_password } = req.body;

    const user = await getUserByUsername(models, username);
    if (!user || user.credentials.password != old_password)
      return res.send({ error: "Invalid credentials" });

    if (new_password == old_password)
      return res.send({ error: "These passwords are the same" });

    const isNotValid = checkPasswordValidation(new_password);
    if (isNotValid) return res.send({ error: isNotValid });

    await models.user.updateOne(
      { "credentials.username": username },
      { "credentials.password": new_password }
    );

    return res.send({ success: "Old password has been changed", user });
  });

  app.listen(port, () => {
    console.log("Server is running on port " + port);
  });
  return app;
};

export default startServer;
