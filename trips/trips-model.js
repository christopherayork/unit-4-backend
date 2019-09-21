const db = require('../database/dbConfig');

function find() {
  return db('trips');
}

function findByID(id) {
  return db('trips').where({ id });
}

function insert(trip) {
  if(!trip || !trip.user_id || !trip.location || !trip.description) return false;
  else return db('trips').insert(trip);
}

function update(id, updates) {
  return db('trips').where({ id }).update(updates);
}

async function remove(id) {
  await removePhotos(id);
  return db('trips').where({ id }).del();
}

function getPhoto(id) {
  return db('photos').where({ id });
}

function getFirstPhoto(trip_id) {
  return db('photos').where({ trip_id }).first();
}

function getPhotos(trip_id) {
  return db('photos').where({ trip_id });
}

function insertPhoto(trip_id, photo) {
  if(!trip_id || !photo || !photo.url) return false;
  return db('photos').insert({ trip_id, ...photo });
}

function insertPhotos(trip_id, photos) {
  if(!Array.isArray(photos) || !trip_id) return false;
  let success;
  photos.forEach(async (photo) => {
    success = await insertPhoto(trip_id, photo);
    if(!success) return false;
  });
  return success;
}

function updatePhoto(id, photo) {
  if(!photo || !photo.url) return false;
  else return db('photos').where({ id }).update({ id, ...photo });
}

function removePhoto(id) {
  return db('photos').where({ id }).del();
}

function removePhotos(trip_id) {
  return db('trips').where({ trip_id }).del();
}

module.exports = {
  find,
  findByID,
  insert,
  update,
  remove,
  getPhoto,
  getFirstPhoto,
  getPhotos,
  insertPhotos,
  updatePhoto,
  removePhoto,
  removePhotos
};