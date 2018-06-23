require('dotenv').config();
const _ = require('lodash');
const r2 = require('r2');
const dayjs = require('dayjs');
const { parseTelegramUpdate, getOpenGraphData } = require('../utils');
const conn = require('../database/connection');

const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getUpdates`;

async function run() {
  // const res = await r2(url).json;
  const res = {"ok":true,"result":[{"update_id":500676844,
"channel_post":{"message_id":21,"author_signature":"Jun","chat":{"id":-1001241558182,"title":"VVV talk","type":"channel"},"date":1529758950,"text":"https://userinterfacing.com/how-to-improve-on-naming-contexts-in-domain-driven-design/?utm_campaign=elixir_radar_144&utm_medium=email&utm_source=RD+Station Phoenix 1.3 \u66f4\u65b0\u4e4b\u540e\uff0c\u63a8\u8350\u4f7f\u7528 context","entities":[{"offset":0,"length":155,"type":"url"}]}},{"update_id":500676845,
"channel_post":{"message_id":22,"author_signature":"Jun","chat":{"id":-1001241558182,"title":"VVV talk","type":"channel"},"date":1529759146,"text":"https://userinterfacing.com/how-to-improve-on-naming-contexts-in-domain-driven-design/?utm_campaign=elixir_radar_144&utm_medium=email&utm_source=RD+Station Phoenix 1.3 \u66f4\u65b0\u4e4b\u540e\uff0c\u63a8\u8350\u4f7f\u7528 Context \u6765\u7ec4\u7ec7\uff0c\u4f46\u662f\u5230\u5e95\u5982\u4f55\u5212\u5206 context \u5e76\u6ca1\u6709\u5f88\u597d\u7684\u65b9\u5f0f\uff0c\u8fd9\u91cc\u4ecb\u7ecd\u4e86\u4e00\u79cd\u5177\u4f53\u7684\u5b9e\u65bd\u65b9\u6cd5","entities":[{"offset":0,"length":155,"type":"url"}]}}]}
  if (!res.ok) return false;

  const { result } = res;
  if (!result || result.length === 0) return false;

  const datas = [];
  for (let i = 0; i < result.length; i++) {
    const m = result[i];
    const data = parseTelegramUpdate(m);

    const opengraph = await getOpenGraphData(data.link);
    if (opengraph) {
      data.opengraph = opengraph;
    }

    data.created_at = dayjs().toISOString();
    datas.push(data);
  }

  try {
    const records = await conn('posts').whereIn('original_id', datas.map(d => d.original_id));
    const notInRecords = _.difference(datas.map(d => d.original_id), records.map(r => parseInt(r.original_id)));
    const notInDatas = notInRecords.map(id => {
      return _.find(datas, { 'original_id': id });
    });

    await conn.transaction(tr => conn.batchInsert('posts', notInDatas, 100).transacting(tr));
  } catch (e) {
    console.log(e);
  }

  conn.destroy();
}

run();
