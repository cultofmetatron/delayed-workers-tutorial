var router = require('express').Router();
var controllers = require('./controllers');
var files = controllers.files;

router.route('/files')
  .get(files.index)
  .post(files.create)
  
router.route('/files/:id')
  .get(files.read)
  .put(files.update)
  .delete(files.delete);

module.exports = router;







