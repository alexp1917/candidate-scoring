function CandidatesRepository(db, config = {}) {
  this.db = db;
  this.config = config;
  this.tableName = (config.prefix || '') + 'candidate';
}

CandidatesRepository.prototype.save = async function save(candidate) {
  var [ id ] = await this.db(this.tableName).insert(candidate);
  return id;
};

CandidatesRepository.prototype.findOneById = async function(id) {
  return await this.db(this.tableName).where({ id }).first();
};

CandidatesRepository.prototype.findAllByIdIn = async function(ids) {
  return await this.db(this.tableName).whereIn('id', ids);
};

module.exports = CandidatesRepository;
