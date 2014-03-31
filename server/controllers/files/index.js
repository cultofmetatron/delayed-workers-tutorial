var awsUploader = require('../../../lib/awsuploader');
var FormParser  = require('../../../lib/formparser');


module.exports.index  = function(req, res) {
  console.log('getting to #index')
  res.render('index', {});
};

module.exports.read   = function(req, res) {
  res.send('#read')
};

module.exports.create = function(req, res) {
  var formParser = (new FormParser({
    req: res,
    res: res,
    mergeFn: function(filename, stream, filename, encoding, mimetype) {
      
    }
  })).done().then(function() {
  
  
  })
  
  
  //res.send('#create')
};

module.exports.update = function(req, res) {
  res.send('#update')
};

module.exports.delete = function(req, res) {
  res.send('#delete')
};
