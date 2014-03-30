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
