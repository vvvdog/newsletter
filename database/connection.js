require('dotenv').config();

const conn = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  }
});

// Add Pagination
const KnexQueryBuilder = require('knex/lib/query/builder');
KnexQueryBuilder.prototype.paginate = function (per_page, current_page) {
  var pagination = {};
  var per_page = per_page || 10;
  var page = current_page || 1;
  if (page < 1) page = 1;
  var offset = (page - 1) * per_page;
  return Promise.all([
    this.clone().count('* as count').first(),
    this.offset(offset).limit(per_page)
  ])
  .then(([total, rows]) => {
    var count = total.count;
    var rows = rows;
    pagination.total = parseInt(count);
    pagination.per_page = per_page;
    pagination.offset = offset;
    pagination.to = offset + rows.length;
    pagination.last_page = Math.ceil(count / per_page);
    pagination.current_page = page;
    pagination.from = offset;
    pagination.data = rows;
    return pagination;
  });
};
conn.queryBuilder = function () {
	return new KnexQueryBuilder(conn.client);
};

module.exports = conn;
