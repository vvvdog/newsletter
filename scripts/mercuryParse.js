require('dotenv').config();
const r2 = require('r2');

const url = 'https://mercury.postlight.com/parser?url=';

async function run(link) {
  try {
    const res = await r2(`${url}${link}`, {
      headers: {
        'x-api-key': process.env.MERCURY_API_TOKEN
      }
    }).json;
  } catch (e) {
    console.log(e);
    return null;
  }
}

module.exports = run;
