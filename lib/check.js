const { getBirthdays } = require("./data");
const { inform } = require("./messages");

module.exports = {
  checkBirthdays: async (date) => {
    const birthdays = await getBirthdays(date);

    if (birthdays) {
      let isSingular = birthdays.length == 1;
      console.log(
        `Found ${birthdays.length} birthday${isSingular ? "" : "s"} today`
      );

      return await Promise.all(birthdays.map((birthday) => inform(birthday)));
    } else {
      console.log("Nobody has a birthday today");
    }
  },
};
