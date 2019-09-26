
exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
      tbl.increments();
      tbl.string('email').notNullable().unique();
      tbl.string('password').notNullable();
      tbl.string('first_name').notNullable();
      tbl.string('last_name');
      tbl.string('profileType');
    })
    .createTable('trips', tbl => {
      tbl.increments();
      tbl.integer('user_id').notNullable().references('id').inTable('users');
      tbl.string('location').notNullable();
      tbl.string('description', 10200).notNullable();
      tbl.string('short_desc');
    })
    .createTable('photos', tbl => {
      tbl.increments();
      tbl.integer('trip_id').notNullable().references('id').inTable('trips');
      tbl.integer('user_id').notNullable().references('id').inTable('users');
      tbl.string('url').notNullable();
      tbl.boolean('default').defaultTo(false);
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('photos')
    .dropTableIfExists('trips')
    .dropTableIfExists('users');
};
