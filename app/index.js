const Koa = require('koa');
const cors = require('@koa/cors');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const router = require('./router');


const app = new Koa();
app
  .use(cors())
  .use(logger())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.on('error', (err, ctx) => {
  console.log(err);
});

module.exports = app;
