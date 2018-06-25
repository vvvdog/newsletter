exports.up = async function(knex, Promise) {
  await knex.schema.table('posts', (t) => {
    t.json('mercury').nullable();
  });
};

exports.down = async function(knex, Promise) {
  await knex.schema.table('posts', (t) => {
    t.dropColumn('mercury');
  });
};
