exports.up = function(knex) {
  return knex.schema.createTable('exercise', tbl => {
    tbl.increments();

    tbl
      .string('name', 255)
      .notNullable()
      .unique();
    tbl.string('region', 255);
    tbl.boolean('is_cardio');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('exercise');
};
