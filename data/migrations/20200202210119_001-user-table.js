exports.up = function(knex) {
  return knex.schema.createTable('users', users => {
    users.increments();

    users.string('username', 255).notNullable();

    users
      .string('email', 255)
      .unique()
      .notNullable();

    users.string('password', 255).notNullable();
    users.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
