require("dotenv").config();

const { checkBirthdays } = require("./lib/check");

checkBirthdays(process.argv[2]);
