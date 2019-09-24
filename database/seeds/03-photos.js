
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('photos').del()
    .then(function () {
      // Inserts seed entries
      return knex('photos').insert([
        {id: 1, trip_id: 1, user_id: 1, url: 'https://i.imgur.com/vlN7peS.jpg', default: true},
        {id: 2, trip_id: 1, user_id: 1, url: 'https://i.imgur.com/HFWG6h0.jpg'},
        {id: 3, trip_id: 2, user_id: 1, url: 'https://i.imgur.com/dn5ag9A.jpg', default: true},
        {id: 4, trip_id: 2, user_id: 1, url: 'https://i.imgur.com/TUhP1zL.jpg'},
        {id: 5, trip_id: 3, user_id: 2, url: 'https://i.imgur.com/GEntGTm.jpg', default: true},
        {id: 6, trip_id: 3, user_id: 2, url: 'https://i.imgur.com/693wKjY.jpg'},
        {id: 7, trip_id: 4, user_id: 3, url: 'https://i.imgur.com/H4UM0Bc.jpg', default: true},
        {id: 8, trip_id: 4, user_id: 3, url: 'https://i.imgur.com/GHEAOmQ.jpg'},
        {id: 9, trip_id: 5, user_id: 3, url: 'https://i.imgur.com/L4T83y3.jpg', default: true},
        {id: 10, trip_id: 5, user_id: 3, url: 'https://i.imgur.com/0AAs6Sj.jpg'}
      ]);
    });
};
