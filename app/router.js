const dayjs = require('dayjs');
const Router = require('koa-router');
const conn = require('../database/connection');
const scripts = require('../scripts');
const {
  parseTelegramUpdate,
  getOpenGraphData,
  mercuryParse
} = require('../utils');

const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.body = 'hello';
  next();
});

router.post('/api/_run_fetch', async (ctx, next) => {
  try {
    await scripts.getUpdates();
    ctx.stats = 201; 
    ctx.body = '';
  } catch (e) {
    ctx.throw(500, e);
  } 

  next();
});

router.post('/api/posts', async (ctx, next) => {
  const data = parseTelegramUpdate(ctx.request.body);

  if (data) {
    const opengraph = await getOpenGraphData(data.link);
    if (opengraph) data.opengraph = opengraph;
    data.created_at = dayjs().toISOString();

    data.mercury = await mercuryParse(data.link);

    try {
      const post = await conn('posts').insert(data);
      ctx.body = post;
    } catch (e) {
      ctx.throw(500, 'server error');
    }
  } else {
    ctx.stats = 201;
    ctx.body = '';
  }

  next();
});

router.get('/api/posts', async (ctx, next) => {
  const { page, per_page } = ctx.query;

  try {
    const posts = await conn.select('*')
                          .from('posts')
                          .groupBy('created_at', 'id')
                          .orderBy('created_at', 'desc')
                          .paginate(per_page, page);
    ctx.body = posts;
  } catch (e) {
    ctx.throw(500, 'server error');
  }

  next();
});

module.exports = router;
