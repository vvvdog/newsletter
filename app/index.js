const Koa = require('koa');
const cors = require('@koa/cors');
const logger = require('koa-logger');
const router = require('./router');

const app = new Koa();
app
  .use(cors())
  .use(logger())
  .use(router.routes())
  .use(router.allowedMethods());

module.exports = app;
