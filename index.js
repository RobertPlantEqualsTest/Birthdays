require("dotenv").config();

const { getBirthdays } = require("./lib/data");
const { inform } = require("./lib/messages");
const dayjs = require("dayjs");

const today = dayjs(process.argv[2]);
const dayOfMonth = today.date();
const month = today.month();

(async () => {
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

    await Promise.all(birthdayToday.map((birthday) => inform(birthday)));
  } else {
    console.log("Nobody has a birthday today");
  }
})();
