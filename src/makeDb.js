var knex = require('knex');

var knexfile = require('../knexfile');

module.exports = function makeDb() {
  var env = process.env.NODE_ENV || 'development';
  var config = knexfile[env];
  return knex(config);
};

module.exports.migrateLatest = async function migrateLatest(db) {
  return await db.migrate.latest();
};
