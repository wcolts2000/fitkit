exports.up = function(knex) {
  return knex.schema.createTable('workout_journal', tbl => {
    tbl.increments();

    tbl
      .integer('exerciseId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('exercise')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.float('weight');
    tbl.integer('reps');
    tbl.integer('sets');
    tbl.float('duration');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('workout_journal');
};
