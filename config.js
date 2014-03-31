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

//used by knex migrations
module.exports.directory = path.join(__dirname, 'migrations');
module.exports.tableName = 'migrations';


module.exports.aws = {
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: 'us-west-2'
};

module.exports.awsBucket = {
  Bucket: 'bucket',
  Key: 'key'
};

