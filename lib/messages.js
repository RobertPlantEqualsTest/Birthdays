const { email } = require("./messages/email");

module.exports = {
  inform: async (birthday, source = "email") => {
    if (source === "email") {
      return await email(birthday);
    }
  },
};
