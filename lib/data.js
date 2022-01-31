const { getData } = require("./connector/flat");

module.exports = {
  getBirthdays: async (source = "flat") => {
    if (source === "flat") {
      return await getData("./lib/connector/input");
    }
  },
};
