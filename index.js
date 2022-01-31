const { getBirthdays } = require("./lib/data");
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
    // await Promise.all(birthdayToday.map(inform));
  } else {
    console.log("Nobody has a birthday today");
  }
})();
