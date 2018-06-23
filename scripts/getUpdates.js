require('dotenv').config();
const r2 = require('r2');
const { parseTelegramUpdate, getOpenGraphData } = require('../utils');
const conn = require('../database/connection');

const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getUpdates`;

async function run() {
  console.log(url);
  // const res = await r2(url).json;
  const res = {"ok":true,"result":[{"update_id":500676841,
"channel_post":{"message_id":18,"author_signature":"Chunlei Wang","chat":{"id":-1001241558182,"title":"VVV talk","type":"channel"},"date":1529657862,"text":"https://nodeschool.io","entities":[{"offset":0,"length":21,"type":"url"}]}},{"update_id":500676842,
"channel_post":{"message_id":19,"author_signature":"Jun","chat":{"id":-1001241558182,"title":"VVV talk","type":"channel"},"date":1529659551,"text":"https://twitter.com/rileytestut/status/1009927555602964480?s=12","entities":[{"offset":0,"length":63,"type":"url"}]}},{"update_id":500676843,
"channel_post":{"message_id":20,"author_signature":"Chunlei Wang","chat":{"id":-1001241558182,"title":"VVV talk","type":"channel"},"date":1529659834,"text":"NES \u624d\u662f\u6c38\u6052\u7684\u6e38\u620f"}}]}
  if (!res.ok) return false;

  const { result } = res;
  if (!result || result.length === 0) return false;

  for (let i = 0; i < result.length; i++) {
    const m = result[i];
    const data = parseTelegramUpdate(m);

    const opengraph = await getOpenGraphData(data.link);
    if (opengraph) {
      data.opengraph = opengraph;
    }

    console.log(data);
  }
}

run();
