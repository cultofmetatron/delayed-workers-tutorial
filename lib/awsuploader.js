var Busboy = require('busboy');
var AWS    = require('aws-sdk');
var config = require('../config.js')
AWS.config.update(config.aws);
var Promise = require('bluebird');

var File = function(sourceStream) {
  this.$s3 = Promise.promisifyAll(new AWS.S3());


};

File.prototype.pipeTo = function(outputStream) {


};










