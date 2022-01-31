const sendMail = jest.fn();
jest.mock("nodemailer");
const nodemailer = require("nodemailer");
nodemailer.createTransport.mockReturnValue({ sendMail });

const { checkBirthdays } = require("../../lib/check");

describe("Check birthdays", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should mail person who has a birthday", async () => {
    await checkBirthdays("1999/02/28");

    expect(sendMail).toHaveBeenCalledWith(
      expect.objectContaining({ to: "Jane Doe <jane.doe@foobar.com>" })
    );
  });

  it("should not mail a person with a leap year birthday", async () => {
    await checkBirthdays("1999/02/29");

    expect(sendMail).not.toHaveBeenCalledWith(
      expect.objectContaining({ to: "Jane Doe <jane.doe@foobar.com>" })
    );
  });

  it("should mail a person with a normal birthday", async () => {
    await checkBirthdays("2000/10/08");

    expect(sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "John Doe <john.doe@foobar.com>",
        text: "Happy birthday, dear John!",
        html: "<p><b>Happy birthday</b>, dear John!</p>",
      })
    );
  });

  it("should mail two people if they are both found", async () => {
    await checkBirthdays("2000/09/11");

    expect(sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "Mary Ann <mary.ann@foobar.com>",
      })
    );
    expect(sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "Mary The Second Ann <mary2.ann@foobar.com>",
      })
    );
  });
});
