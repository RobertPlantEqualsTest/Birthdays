require("dotenv").config();

const { getBirthdays } = require("./lib/data");
const { inform } = require("./lib/messages");
const dayjs = require("dayjs");

const today = dayjs(process.argv[2]);
const dayOfMonth = today.date();
const month = today.month();

(async () => {
  const birthdays = await getBirthdays();
  const birthdayToday = birthdays.filter(
    ({ date_of_birth }) =>
      date_of_birth.date() == dayOfMonth && date_of_birth.month() == month
  );

  if (birthdayToday) {
    let isMultiple = birthdayToday.length > 1;
    console.log(
      `Found ${birthdayToday.length} birthday${isMultiple ? "s" : ""} today`
    );

    await Promise.all(birthdayToday.map((birthday) => inform(birthday)));
  } else {
    console.log("Nobody has a birthday today");
  }
})();
