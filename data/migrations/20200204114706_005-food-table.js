exports.up = function(knex) {
  return knex.schema.createTable('food', tbl => {
    tbl.increments();

    tbl
      .string('name')
      .notNullable()
      .unique();
    tbl.integer('serving_size').notNullable();
    tbl.float('calories');
    tbl.float('fat');
    tbl.float('fiber');
    tbl.float('protein');
    tbl.float('carbohydrates');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('food');
};
