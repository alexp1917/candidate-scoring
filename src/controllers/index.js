/*

  Ideally this would have been broken up into multiple controllers, but i said
  I'd get this back to you in an hour so here we go.

 */

/**
 * HomeController:
 * This controller expects to be mounted at the baseUrl
 * @param {[type]} argument [description]
 */
function HomeController(repos) {
  this.candidatesRepository = repos.candidatesRepository;
  this.testScoresRepository = repos.testScoresRepository;
}

HomeController.prototype.createCandidate = async function (req, res, next) {
  var id = await this.candidatesRepository.save(req.body);
  res.status(201).send({ status: 'success', id });
};

HomeController.prototype.createScore = async function (req, res, next) {
  var id = await this.testScoresRepository.save(req.body);
  res.status(201).send({ status: 'success', id });
};

HomeController.prototype.candidateResult = async function candidateResult(results) {
  var candidateIds = results.map(r => r.candidate_id);
  var candidates = (await this.candidatesRepository.findAllByIdIn(candidateIds))
    .reduce((acc, candidate) => { acc[candidate.id] = candidate; return acc; }, {});
  results.forEach(r => {
    r.candidate = candidates[r.candidate_id];
    delete r.candidate_id;
  });
}

HomeController.prototype.getTopScores = async function (req, res, next) {
  var results = await this.testScoresRepository.maxScoreCandidateIds();
  await this.candidateResult(results);
  res.send(results);
};

HomeController.prototype.getAvgScores = async function (req, res, next) {
  var results = await this.testScoresRepository.avgScoreCandidateIds();
  await this.candidateResult(results);
  res.send(results);
};

module.exports = {
  HomeController,
};
