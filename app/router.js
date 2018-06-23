const Router = require('koa-router');
const conn = require('../database/connection');

const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.body = 'hello';
  next();
});

router.get('/api/posts', async (ctx, next) => {
  const { page, per_page } = ctx.query;

  try {
    const posts = await conn.select().table('posts').paginate(per_page, page);
    ctx.body = posts;
  } catch (e) {
    ctx.throw(500, 'server error');
  }

  next();
})

module.exports = router;
