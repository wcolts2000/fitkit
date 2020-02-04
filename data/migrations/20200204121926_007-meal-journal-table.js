exports.up = function(knex) {
  return knex.schema.createTable('meal_journal', tbl => {
    tbl.increments();

    tbl.string('meal_name').notNullable();
    tbl
      .integer('serving_1_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('servings')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .integer('serving_2_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('servings')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .integer('serving_3_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('servings')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .integer('serving_4_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('servings')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .integer('serving_5_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('servings')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('meal_journal');
};
