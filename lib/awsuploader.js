var Busboy = require('busboy');
var AWS    = require('aws-sdk');
var config = require('../config.js')
AWS.config.update(config.aws);
var Promise = require('bluebird');
var gm      = require('gm');


var FilePipe = function(params) {
  this.$s3 = Promise.promisifyAll(new AWS.S3());
  this.Bucket = params.bucketName || configs.awsBucket.Bucket;
  if (params.sourceStream) { this.sourceStream = sourceStream; }
  this.transforms = [];
  this._finalized = false;
};

FilePipe.prototype.initialize = function() {

};

FilePipe.prototype.pipeTo = function(outputStream) {

  return this;
};

//takes a transform function and applies it to the stream to create a new stream
FilePipe.prototype.addTransform = function(tfn) {
  this.transforms.push(tfn);
  return this;
};

module.exports.FilePipe = FilePipe;









