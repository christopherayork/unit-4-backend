const knex = require('knex');
const config = require('../knexfile');
const branch = process.env.DB_ENV || 'development';
const db = knex(config[branch]);
module.exports = db;