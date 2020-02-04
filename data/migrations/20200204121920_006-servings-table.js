exports.up = function(knex) {
  return knex.schema.createTable('servings', tbl => {
    tbl.increments();

    tbl
      .integer('food_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('food')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.integer('total_servings').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('servings');
};
