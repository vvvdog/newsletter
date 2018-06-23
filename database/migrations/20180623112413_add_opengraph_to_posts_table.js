exports.up = async function(knex, Promise) {
  await knex.schema.table('posts', (t) => {
    t.json('opengraph').nullable();
  });
};

exports.down = async function(knex, Promise) {
  await knex.schema.table('posts', (t) => {
    t.dropColumn('opengraph');
  });
};
