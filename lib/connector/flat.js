const fs = require("fs");
const util = require("util");
const dayjs = require("dayjs");

const readFile = (fileName) => util.promisify(fs.readFile)(fileName, "utf8");

module.exports = {
  readFile,
  getData: async (location) => {
    const data = await readFile(location);

    const lines = data.split("\n").filter(String);
    const headers = lines[0].split(", ");
    const rows = lines
      .filter((_, index) => index > 0)
      .map((line) => line.split(", "));

    return rows.map((row) =>
      row.reduce((accumulator, value, index) => {
        accumulator[headers[index]] = value;

        if (headers[index].includes("date")) {
          accumulator[headers[index]] = dayjs(accumulator[headers[index]]);
        }

        return accumulator;
      }, {})
    );
  },
};
