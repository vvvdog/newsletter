const Router = require('koa-router');

const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.body = 'hello';
  next();
});

module.exports = router;
