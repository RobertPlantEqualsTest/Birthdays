const nodemailer = require("nodemailer");

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;
const transport = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
});

const getName = (record) =>
  `${record.first_name} ${record.last_name} <${record.email}>`;

module.exports = {
  email: async (record) => {
    try {
      const info = await transport.sendMail({
        from: "Sender Name <rob@birthdays.com>",
        to: getName(record),
        subject: "Happy birthday!",
        text: `Happy birthday, dear ${record.first_name}!`,
        html: `<p><b>Happy birthday</b>, dear ${record.first_name}!</p>`,
      });

      console.log(`Message sent to ${getName(record)}`);
    } catch (error) {
      console.error(error);
    }
  },
};
