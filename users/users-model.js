const db = require('../database/dbConfig');

function find() {
  return db('users');
}

function findByID(id) {
  return db('users').where({ id });
}

function findByEmail(email) {
  return db('users').where({ email });
}

async function insert(user) {
  if(!user || !user.email || !user.password || !user.first_name) return false;
  let [exists] = await findByEmail(user.email);
  if(exists) return -1;
  else return db('users').insert(user);
}

function update(id, updates) {
  if(!id || !updates) return false;
  return db('users').where({ id }).update(updates);
}

function remove(id) {
  return db('users').where({ id }).del();
}

module.exports = {
  find,
  findByID,
  findByEmail,
  insert,
  update,
  remove
};