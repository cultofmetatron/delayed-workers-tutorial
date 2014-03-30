var Knex   = require('knex')
var config = require('../config.js');

var knex = Knex.initialize(config.database);

module.exports = knex;
