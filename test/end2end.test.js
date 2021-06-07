var { expect } = require('chai');
var request = require('supertest');
var t = require('tap');

var ioc = require('../src/ioc');

t.test('end2end', outerT => {
  outerT.before(async () => ioc.refresh());

  t.test('hello world', async t => {
    var app = ioc.app;
    request(app).get('/')
      .expect('<h1>It Works!</h1>')
      .expect(200)
      .end(() => t.end());
  });

  t.test('save candidate', async t => {
    var app = ioc.app;
    var res = await request(app).post('/candidate').send({ name: 'test candidate1' });
    expect(res.status).to.equal(201);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('status', 'success');

    var candidate = await ioc.candidatesRepository.findOneById(res.body.id);
    console.log(candidate);

    var candidates = [ candidate.id ];
    var res = await request(app).post('/candidate').send({ name: 'test candidate2' });
    candidates.push(res.body.id);
    var res = await request(app).post('/candidate').send({ name: 'test candidate3' });
    candidates.push(res.body.id);


    await request(app).post('/score').send({
      candidate_id: candidates[0],
      round_id: 1,
      test_score: 10,
    });

    await request(app).post('/score').send({
      candidate_id: candidates[0],
      round_id: 2,
      test_score: 2,
    });

    await request(app).post('/score').send({
      candidate_id: candidates[1],
      round_id: 1,
      test_score: 9,
    });

    await request(app).post('/score').send({
      candidate_id: candidates[2],
      round_id: 1,
      test_score: 3,
    });

    await request(app).post('/score').send({
      candidate_id: candidates[2],
      round_id: 1,
      test_score: 8,
    });

    var { body: top } = await request(app).get('/score/top');
    var { body: average } = await request(app).get('/score/average');

    console.log(top);
    console.log(average);

    await ioc.shutdown();
    t.end();
  });

  outerT.end();
});
