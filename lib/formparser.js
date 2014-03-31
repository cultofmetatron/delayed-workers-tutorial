var util = require('util');
var Busboy = require('busboy');
var EventEmitter = require('events').EventEmitter


var FormParser = function(options) {
  EventEmitter.call(this);
  options = options || {};
  this.req = options.req || throw new Error('must supply request object!');
  this.res = options.res || throw new Error('must supply response object!');
  this.mergeFn = options.mergeFn || throw new Error('must have merge function for handling output stream');
  this.busboy = new Busboy({ headers: req.headers });
  this.fields = {};
  //this.streams = {};
  this.init();
};

util.inherits(FormParser, EventEmitter);

FormParser.prototype.init = function() {
  var self = this;
  this.busboy.on('file', function(fieldname, stream, filename, encoding, mimetype) {
    Promise.all([self.mergeFn(fieldname, stream, filename, encoding, mimetype)])
      .then(function(uploadData) {
        self.fields[fieldName] = {
          type: 'file',
          filename: filename,
          encoding: encoding,
          mimetype: mimetype,
          uploadData: uploadData
        };
      });
  });

  this.busboy.on('field', function(fieldname, val, valTruncated, keyTruncated) {
    //console.log('Field [' + fieldname + ']: value: ' + inspect(val));
    self.fields[fieldName] = {
      type: 'field',
      value: val
    };
  });

  this.busboy.on('finish', function() {
    self.emit('finish', self.fields);
  });
  this.req.pipe(this.busboy);
};


module.exports = FormParser;
