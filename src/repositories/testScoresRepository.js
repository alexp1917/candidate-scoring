function TestScoresRepository(db, config = {}) {
  this.db = db;
  this.config = config;
  this.tableName = (config.prefix || '') + 'test_score';
}

TestScoresRepository.prototype.save = async function save(testScore) {
  var [ id ] = await this.db(this.tableName).insert(testScore);
  return id;
};

TestScoresRepository.prototype.maxScoreCandidateIds = async function() {
  return await this.db(this.tableName).select('*')
    .max('test_score as max')
    .groupBy('candidate_id')
    .orderBy('max', 'desc');
};

TestScoresRepository.prototype.avgScoreCandidateIds = async function() {
  return await this.db(this.tableName).select('candidate_id')
    .avg('test_score as avg')
    .groupBy('candidate_id')
    .orderBy('avg', 'desc');
};

module.exports = TestScoresRepository;

// console.log(require('knex')({ 'client': 'mysql'})
//   .select('*').from('test_score').max('test_score')
//   .groupBy('candidate_id').toString())
