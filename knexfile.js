require('dotenv').config();

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      user:     'qinzeng',
      password: 'qinzeng',
      database: 'newsletter'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname+"/database/migrations",
      tableName: 'knex_migrations'
    }
  },

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  production: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname+"/database/migrations",
      tableName: 'knex_migrations'
    }
  }

};
