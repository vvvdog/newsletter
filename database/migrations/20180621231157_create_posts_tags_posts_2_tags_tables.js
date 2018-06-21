exports.up = async function(knex, Promise) {
  await knex.schema.createTable('posts', (t) => {
    t.increments('id').unsigned().primary();
    t.dateTime('created_at').notNull();
    t.dateTime('updated_at').nullable();
    t.dateTime('deleted_at').nullable();

    t.string('link').notNull();
    t.string('author').notNull();
    t.string('original_id').notNull();
    t.string('sent_at').notNull();
  });

  await knex.schema.createTable('tags', (t) => {
    t.increments('id').unsigned().primary();
    t.dateTime('created_at').notNull();
    t.dateTime('updated_at').nullable();
    t.dateTime('deleted_at').nullable();

    t.string('title').notNull();
  });

  await knex.schema.createTable('post_2_tag', (t) => {
    t.increments('id').unsigned().primary();
    t.dateTime('created_at').notNull();
    t.dateTime('updated_at').nullable();
    t.dateTime('deleted_at').nullable();

    t.integer('post_id').unsigned();
    t.integer('tag_id').unsigned();

    t.foreign('post_id').references('posts.id');
    t.foreign('tag_id').references('tags.id');
  });
};

exports.down = async function(knex, Promise) {
  await knex.schema.dropTable('post_2_tag');
  await knex.schema.dropTable('posts');
  await knex.schema.dropTable('tags');
};
