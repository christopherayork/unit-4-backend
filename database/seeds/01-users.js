
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, email: 'johndoe@gmail.com', password: '$2b$08$P1A.Ru7R3UIiO16AOkQvnOIDAxgYQzxa/r.wzy.tCqpXklY8J2qSq', first_name: 'John', last_name: 'Doe'},
        {id: 2, email: 'random@gmail.com', password: '$2b$08$P1A.Ru7R3UIiO16AOkQvnOIDAxgYQzxa/r.wzy.tCqpXklY8J2qSq', first_name: 'Bill', last_name: 'Johnson'},
        {id: 3, email: 'specific@gmail.com', password: '$2b$08$P1A.Ru7R3UIiO16AOkQvnOIDAxgYQzxa/r.wzy.tCqpXklY8J2qSq', first_name: 'Ryan', last_Name: 'Hill'}
      ]);
    });
};