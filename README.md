# Birthdays

## Installation

    npm ci

## Config

    cp .env.example .env

## Running

    node index.js

## Testing another date

    node index.js 1999/10/08

## Running automated tests:

    npm test

## Questions

### the way you retrieve the friends data (for instance, try switching to a SQLite Db)

As a simple way to switch the data sources would be to write another source
inside `./lib/data.js` You could then drive this off a passed in parameter if
you wanted to do multiple types of storage backends or an environment variable
if you wanted to do it per run.

### the way you send the note : (for instance, imagine you want to send SMS instead of emails)

Similar to the email example above, provide another source type to use as the
backend. The storage would also have to be updated with a phone number for a
record to allow sending an SMS.

### What kind of tests would you write ? Would you use Mocks ?

I have written a few very high level functional tests that check the whole
process at once. I mocked the nodemailer library entirely and returned a mocked
function for the sendMail function which I spied on to check that searching for
specific dates will attempt to mail the correct people.

## Additional Features

### Friends born on February, 29th should have their Birthday greeted on February, 28th

I have accounted for this, they will get the one message on the 28th, there is a
user in the input file with a birthday on a leap year and 2 tests that account
for this.
