// let trips = [
//   {id: 1, user_id: 1, location: 'Dublin, Ireland',
//     description: 'I went to Ireland to have some beer, it was super fun!',
//     short_desc: 'Beer in Ireland'
//   },
//   {id: 2, user_id: 1, location: 'Madrid, Spain',
//     description: 'The beaches near here are great.',
//     short_desc: 'Beaches!'
//   },
//   {id: 3, user_id: 2, location: 'Tokyo, Japan',
//     description: 'Nightlife is great, change in pace.',
//     short_desc: 'A week in Tokyo'
//   },
//   {id: 4, user_id: 3, location: 'Bangkok, Thailand',
//     description: 'Huge city, great food, giant markets.',
//     short_desc: 'Top notch spice.'
//   },
//   {id: 5, user_id: 3, location: 'Brussels, Belgium',
//     description: 'Beautiful city, lots to do. Don\'t dine in if you\re on a budget.',
//     short_desc: 'Get the chocolate.'
//   }
// ];

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('trips').del()
    .then(function () {
      let trips = [
        {user_id: 1, location: 'Dublin, Ireland',
          description: 'I went to Ireland to have some beer, it was super fun!',
          short_desc: 'Beer in Ireland'
        },
        {user_id: 1, location: 'Madrid, Spain',
          description: 'The beaches near here are great.',
          short_desc: 'Beaches!'
        },
        {user_id: 2, location: 'Tokyo, Japan',
          description: 'Nightlife is great, change in pace.',
          short_desc: 'A week in Tokyo'
        },
        {user_id: 3, location: 'Bangkok, Thailand',
          description: 'Huge city, great food, giant markets.',
          short_desc: 'Top notch spice.'
        },
        {user_id: 3, location: 'Brussels, Belgium',
          description: 'Beautiful city, lots to do. Don\'t dine in if you\re on a budget.',
          short_desc: 'Get the chocolate.'
        }
      ];
      // Inserts seed entries
      return Promise.all(trips.map(t => knex('trips').insert(t).returning('id')));
    });
};
