exports.up = async function(knex, Promise) {
  await knex.schema.table('posts', (t) => {
    t.string('refer').nullable();
  });
};

exports.down = async function(knex, Promise) {
  await knex.schema.table('posts', (t) => {
    t.dropColumn('refer');
  });
};
