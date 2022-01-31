const { getBirthdays } = require("./lib/data");

(async () => {
  console.log({ flatData: await getBirthdays() });
})();
