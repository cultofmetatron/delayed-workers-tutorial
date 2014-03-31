var Busboy = require('busboy');
var AWS    = require('aws-sdk');
var config = require('../config.js')
AWS.config.update(config.aws);
