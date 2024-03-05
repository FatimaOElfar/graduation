import { dbModels as models } from "../Manager.js";
import Cv from "../Structure/Cv.js";
import helpers from "../utils/helpers.js";

export const cvController = {
  postCv: async (req, res) => {
    const { username } = req.body;
    const foundUser = await helpers.getUserByUsername(models, username);
    if (!foundUser) return res.send({ error: "User was not found." });

    const cv = new Cv(models, username, req.body.cv, foundUser);
    await cv.saveCV();

    return res.send({
      success: `CV was created for user '${username}'`,
      cv,
    });
  },

  getCv: async (req, res) => {
    const cv = new Cv(models, req.params.username);
    await cv.load(models);
    cv.user = null;
    return res.send({ cv });
  },
};
