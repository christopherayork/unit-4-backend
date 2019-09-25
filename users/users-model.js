const db = require('../database/dbConfig');

function find() {
  return db('users');
}

function findByID(id) {
  return db('users').where({ id });
}

function findByEmail(email) {
  return db('users').where({ email }).first();
}

function findTripsById(user_id) {
  return db('trips').where({ user_id });
}

async function insert(user) {
  if(!user || !user.email || !user.password || !user.first_name) return false;
  let [exists] = await findByEmail(user.email);
  if(exists) return [-1];
  else return db('users').insert(user).returning('id');
}

function update(id, updates) {
  if(!id || !updates) return false;
  return db('users').where({ id }).update(updates);
}

async function remove(id) {
  await db('tokens').where({ user_id: id }).del();
  return db('users').where({ id }).del();
}

module.exports = {
  find,
  findByID,
  findByEmail,
  findTripsById,
  insert,
  update,
  remove
};