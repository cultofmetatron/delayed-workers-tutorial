var router = require('express').Router();
var controllers = require('./controllers');
var files = controllers.files;


router.route('/files/:id')
  .get(files.read)
  .put(files.update)
  .delete(files.delete);

router.route('/files')
  .get(files.index)
  .post(files.create)

//redirect root to our base
router.route('/')
  .get(function(req, res) {
    res.redirect('/files');
  });


module.exports = router;







