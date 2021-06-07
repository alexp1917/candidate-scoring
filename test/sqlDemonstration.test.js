var t = require('tap');
var knex = require('knex');

t.test('runs', async t => {
  var db = knex(require('../knexfile').test);

  await db.migrate.latest();

  var candidateIds = await Promise.all(['alice', 'bob', 'carol'].map(async name => {
    var [ candidateId ] = await db('candidate').insert({ name });
    return candidateId;
  }));

  var candidateScores = await Promise.all(candidateIds.map(async candidateId => {
    var scores = await Promise.all([5, 7, 8].map(async score => {

      score += Math.floor(Math.random() * 3);

      var [ scoreId ] = await db('test_score').insert({
        candidate_id: candidateId,
        test_score: score,
      });

      return scoreId;
    }));

    return { candidateId, scores };
  }));

  // console.log(candidateScores);

  var actualScores = await Promise.all(candidateScores.map(async candidateScore => {
    var { candidateId: id, scores: scoreIds } = candidateScore;
    var candidate = await db('candidate').where({ id }).first();
    var scores = await db('test_score').whereIn('id', scoreIds);
    return {
      candidate,
      scores,
    };
  }));

  // console.log(actualScores);

  var averageScores = await db.raw('select *, max(test_score) from test_score group by candidate_id');
  console.log(averageScores);

  await db.destroy();

  t.end();
});