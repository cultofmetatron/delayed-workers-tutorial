var util = require('util');
var Busboy = require('busboy');
var EventEmitter = require('events').EventEmitter


var FormParser = function(options) {
  EventEmitter.call(this);
  options = options || {};
  this.req = options.req;
  this.res = options.res;
  this.mergeFn = options.mergeFn;
  this.busboy = new Busboy({ headers: req.headers });
  this.fields = {};
  this._fileP = Promise.defer();
  //this.streams = {};
  this.init();
};

util.inherits(FormParser, EventEmitter);

FormParser.prototype.onFile = function() {
  return this._fileP.promise.bind(this);
};

FormParser.prototype.init = function() {
  var self = this;
  this.busboy.on('file', function(fieldname, stream, filename, encoding, mimetype) {
    self._fileP.resolve([fieldname, stream, filename, encoding, mimetype]);
  
    stream.on('end', function() {
      self.fields[fieldName] = {
        type: 'file',
        fieldname: fieldname
        filename: filename,
        encoding: encoding,
        mimetype: mimetype
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
