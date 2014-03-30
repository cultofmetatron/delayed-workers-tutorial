Background Workers
========================
###Using creating delayed jobs with node and heroku with RabbitMQ.
######By [Peter de Croos aka cultofmetatron](http://blog.peterdecroos.com)

####Event Queues 101

Scaling a node app properly means understanding its greatest limitation: blocking tasks. Consider the lifecycle of a typical express app.

1. take request object
2. extract necessary values
3. perform transfomation/storage/retrieval of data
4. send out a response

\#3 could include taking a user id, retrieving a resource from the database and/or storing from data into a database record. What about blocking tasks such as converting an image or performing some complex transformation that we don't need to send the result of directly back to the user?  In an ideal world, the amount of time between request and response should be under 500 milliseconds. 

Node itself deals with blocking tasks by having asynchronous functions. 

```

fs = require('fs');
fs.readFile('./README.md', 'utf8, function(err, contents) {
	console.log(contents);
});

```

Under the hood, Node stores an 'event' in a [priority queue](http://en.wikipedia.org/wiki/Priority_queue). 

File i/o access is a potential blocking event so the Event is registered in a queue to be run later. when the current code path meets its end, the event queue goes on to the next task which is has a an associated callback. We're basicly telling node, "After we are done with what we are currently doing, I want you to load the contents of README.md and run the callback function I just gave you with the contents passed into it."


Outside of node itself, we can solve similar blocking issues using a 3rd party event queue. While the database could be used as a queue, its better to use a dedicated priority queue system like rabbitMQ. Such systems are faster and more elastic when your system gets high loads of traffic. 

Like in node, we register an 'event' in rabbit mq and we have a seperate process check if there are any jobs in the queue. it then handles it accoringly and updates the queue when the job is finished allowing the originator process to know that the job has been handled asynchronously.

In our app, we will be handling a simple file upload, The file will be stored to amazonS3, at which point, we'll create resized versions of the file using a background worker.

####Preliminaries

I'm going to assume minimal knowledge of express, databases and priority queues in general. We'll work on a basic file upload application with the ability to upload files and see the files, including the status of when they are uploaded.
 
The app will be set up using express 4.0, and knex for database access. Files storage will be taken care of using amazon S3.
lets create a './config.js' This is where were we will store all our configuration details

####Setting up the Database

Put this in your config.js

```
//config.js
var path = require('path');
module.exports.database = {
  client: 'pg',
  connection: {
    host     : process.env.DB_HOST     || '127.0.0.1',
    user     : process.env.DB_USER     || 'root',
    password : process.env.DB_PASSWORD || '',
    database : process.env.DB_NAME     || 'worker-tutorial-dev' 
  }
};

module.exports.directory = path.join(__dirname, 'migrations');
module.exports.tableName = 'migrations';

```
For database connectivity, we'll be using [Knex](http://knexjs.org/). One of the best query builders available for node. Best part is the api is promise based with [bluebird](https://github.com/petkaantonov/bluebird).

Inside our database folder, we'll create an init.js file.  Inside, we'll set up a knex instance that we can use throughout our app.

```
//database/init.js
var Knex   = require('knex')
var config = require('../config.js');

var knex = Knex.initialize(config.database);

module.exports = knex;
```

Now we create a migration file

> note: if you run in to any issues, first check to see if you have created the database as knex checks the database even when making a migration file.

```
./node_modules/knex/bin/knex migrate:make create_file_schema

```

This will create a migration file in ./migrations. Openning it up, it should look like this

```
exports.up = function(knex, Promise) {
  
};

exports.down = function(knex, Promise) {
  
};
```

exports.up and exports.down are files knex expects to return Promises. This is important. When knex runs through the migration file, it will wait for the promise returned from exports.up to resolve before moving on to the next migration file. Knex functions return Promises by default so the process is pretty easy.

We are storing file data in the database. This will include the path of the original file as well as the locations of the resized versions when they finally exists. Finally, we should also add a boolean value that tells us if the file has been processed.

Once edited, the migration file will look like this.

```
exports.up = function(knex, Promise) {
  return knex.schema.createTable('file', function (table) {
    table.increments('id').primary().unique();
    table.string('name');
    table.string('original_url');
    table.string('large_url');
    table.string('thumb_url');
    table.boolean('processed').defaultTo(false);
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('files');
};
```
Run the migration to move the schema into the database.

```
./node_modules/knex/bin/knex migrate:latest

```


#### express 4.x routes

Express 4.x comes with an amazing new Router object that lets us decouple routes from the app.
In ./server, create a controllers folder with a files folder with an index.js. In this file, create the controller verbs.

```
// server/controllers/files/index.js

module.exports.index  = function(req, res) {
  console.log('getting to #index')
  res.send('#index')
};

module.exports.read   = function(req, res) {
  res.send('#read')
};

module.exports.create = function(req, res) {
  res.send('#create')
};

module.exports.update = function(req, res) {
  res.send('#update')
};

module.exports.delete = function(req, res) {
  res.send('#delete')
};
```

```
// server/routes.js

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

```















