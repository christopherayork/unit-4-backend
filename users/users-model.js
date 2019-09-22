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

function findTripsById(user_id) {
  return db('trips').where({ user_id });
}

async function assignToken(user_id, token) {
  if(!user_id || !token) return false;
  let [exists] = await db('tokens').where({ user_id });
  if(exists) await db('tokens').where({ user_id }).del();
  return db('tokens').insert({ user_id, token });
}

async function verifyToken(token) {
  let [auth] = await db('tokens').where({ token });
  return !!auth;
}

async function insert(user) {
  if(!user || !user.email || !user.password || !user.first_name) return false;
  let [exists] = await findByEmail(user.email);
  if(exists) return [-1];
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
  findTripsById,
  assignToken,
  verifyToken,
  insert,
  update,
  remove
};