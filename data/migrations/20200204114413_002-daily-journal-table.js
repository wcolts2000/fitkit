exports.up = function(knex) {
  return knex.schema.createTable('daily_journal', tbl => {
    tbl.increments();

    tbl
      .integer('userId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl.text('entry', 'longtext').notNullable();
    tbl.float('weight');
    tbl.string('image_url');
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('daily_journal');
};
