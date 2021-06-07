// Update with your config settings.
var path = require('path');

module.exports = {

  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:'
    },
    pool: {
      min: 1,
      max: 1,
    },
    useNullAsDefault: true,
    asyncStackTraces: true,
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(__dirname, 'migrations'),
    }
  },

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    useNullAsDefault: true,
    asyncStackTraces: true,
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(__dirname, 'migrations'),
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      database: 'candidatescoring',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(__dirname, 'migrations'),
    }
  },

  production: {
    client: 'mysql',
    connection: {
      database: 'candidatescoring',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(__dirname, 'migrations'),
    }
  }

};
