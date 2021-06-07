/**
 * inversion of control module
 */
var config = { baseUrl: '' }; // require('../config');
var makeDb = require('./makeDb');
var repos = require('./repositories');
var app = require('./app');
var ctrl = require('./controllers');

var {
  makeApp,
} = app;

module.exports.db = makeDb();
var db = module.exports.db;

module.exports.candidatesRepository = new repos.CandidatesRepository(db, config);
module.exports.testScoresRepository = new repos.TestScoresRepository(db, config);

module.exports.homeController = new ctrl.HomeController(module.exports);

module.exports.app = makeApp(module.exports, config);

module.exports.refresh = async function refresh() {
  await makeDb.migrateLatest(module.exports.db);
};

module.exports.shutdown = async function shutdown() {
  await module.exports.db.destroy();
};
