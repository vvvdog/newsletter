require('dotenv').config();
const r2 = require('r2');

const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getMe`;

async function run() {
  console.log(url);
  const res = await r2.get(url, {
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-US,en;q=0.9,ja;q=0.8,zh-CN;q=0.7,zh;q=0.6',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Host': 'api.telegram.org',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36'
    }
  }).json;
  console.log(res);
}

run();
