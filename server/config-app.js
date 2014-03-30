var path = require('path');
var routes = require('./routes.js');
console.log('routes ', routes)
var express = require('express');

module.exports = function(app) {
  app.engine('jade', require('jade').__express);
  app.use(express.static(path.join(__dirname, '..', 'public')));


  //hook in the roots
  app.use('/', routes);

  


  return app;
};
