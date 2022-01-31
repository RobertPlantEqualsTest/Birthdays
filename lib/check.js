const { getBirthdays } = require("./data");
const { inform } = require("./messages");
const dayjs = require("dayjs");

module.exports = {
  checkBirthdays: async (date) => {
    const today = dayjs(date);
    const dayOfMonth = today.date();
    const month = today.month();

    const birthdays = await getBirthdays();
    const birthdayToday = birthdays.filter(({ date_of_birth }) => {
      const birthdayLandsOnLeapYearDay =
        date_of_birth.date() == 29 && date_of_birth.month() == 1;
      const daysMatch =
        (birthdayLandsOnLeapYearDay && 28 == dayOfMonth) ||
        date_of_birth.date() == dayOfMonth;

      return daysMatch && date_of_birth.month() == month;
    });

    if (birthdayToday) {
      let isSingular = birthdayToday.length == 1;
      console.log(
        `Found ${birthdayToday.length} birthday${isSingular ? "" : "s"} today`
      );

      return await Promise.all(
        birthdayToday.map((birthday) => inform(birthday))
      );
    } else {
      console.log("Nobody has a birthday today");
    }
  },
};
