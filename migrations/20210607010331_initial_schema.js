
exports.up = async function up(knex) {
  await knex.schema.createTable('candidate', t => {
    t.increments();
    t.string('name', 300);
    t.string('email_address', 100);
  });

  await knex.schema.createTable('test_score', t => {
    t.increments();
    t.integer('candidate_id').unsigned().notNullable();
    t.tinyint('round_id', 100).notNullable();
    t.tinyint('test_score', 100);
  });

  await knex.schema.alterTable('test_score', t => {
    t.foreign('candidate_id').references('id').inTable('candidate')
      .onDelete('cascade');
  });

};

exports.down = async function down(knex) {

  await knex.schema.alterTable('test_score', t => {
    t.dropForeign('candidate_id');
  });

  await knex.schema.dropTable('candidate');

  await knex.schema.dropTable('test_score');

};
