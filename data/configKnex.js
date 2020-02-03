const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('../knexfile');
const environmentConfig = knexConfig[environment];
const knex = require('knex');
const db = knex(environmentConfig);

module.exports = db;
