require('dotenv').config();
const _ = require('lodash');
const r2 = require('r2');
const dayjs = require('dayjs');
const { parseTelegramUpdate, getOpenGraphData } = require('../utils');
const conn = require('../database/connection');

const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getUpdates`;

async function run() {
  const res = await r2(url).json;
  if (!res.ok) return false;

  const { result } = res;
  if (!result || result.length === 0) return false;

  const datas = [];
  for (let i = 0; i < result.length; i++) {
    const m = result[i];
    const data = parseTelegramUpdate(m);

    if (data) {
      const opengraph = await getOpenGraphData(data.link);
      if (opengraph) data.opengraph = opengraph;
      data.created_at = dayjs().toISOString();
      datas.push(data);
    }
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

module.exports = run;
