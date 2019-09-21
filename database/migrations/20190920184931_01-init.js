
exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
      tbl.increments();
      tbl.string('email').notNullable().unique();
      tbl.string('password').notNullable();
      tbl.string('first_name').notNullable();
      tbl.string('last_name');
      tbl.string('location');
    })
    .createTable('trips', tbl => {
      tbl.increments();
      tbl.integer('user_id').notNullable().references('id').inTable('users');
      tbl.string('location').notNullable();
      tbl.string('description').notNullable();
      tbl.string('short_desc');
    })
    .createTable('photos', tbl => {
      tbl.increments();
      tbl.integer('trip_id').notNullable().references('id').inTable('trips');
      tbl.string('url').notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('photos')
    .dropTableIfExists('trips')
    .dropTableIfExists('users');
};
