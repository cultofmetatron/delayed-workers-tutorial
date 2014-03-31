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
  }))

  formParser.onFile()
  .spread(function(fieldname, stream, filename, encoding, mimetype) {
    
  })


  //res.send('#create')
};

module.exports.update = function(req, res) {
  res.send('#update')
};

module.exports.delete = function(req, res) {
  res.send('#delete')
};
