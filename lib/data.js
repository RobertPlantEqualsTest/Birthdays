const dayjs = require("dayjs");

const { getData } = require("./connector/flat");

module.exports = {
  getBirthdays: async (date, source = "flat") => {
    if (source === "flat") {
      const today = dayjs(date);
      const dayOfMonth = today.date();
      const month = today.month();
      const birthdays = await getData("./lib/connector/input");

      return birthdays.filter(({ date_of_birth }) => {
        const birthdayLandsOnLeapYearDay =
          date_of_birth.date() == 29 && date_of_birth.month() == 1;
        const daysMatch =
          (birthdayLandsOnLeapYearDay && 28 == dayOfMonth) ||
          date_of_birth.date() == dayOfMonth;

        return daysMatch && date_of_birth.month() == month;
      });
    }
  },
};
