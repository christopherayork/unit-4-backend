const knex = require('knex');
const config = require('../knexfile');
const branch = process.env.NODE_ENV || 'development';
const db = knex(config[branch]);
module.exports = db;