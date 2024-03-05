export default {
  getUserByUsername: async (models, username) => {
    return await models.user.findOne({
      "credentials.username": username.toLowerCase(),
    });
  },
  checkPasswordValidation: (password) => {
    if (password.length <= 6) {
      return "Password should be greater than 6 characters";
    }
    return null;
  },
};
