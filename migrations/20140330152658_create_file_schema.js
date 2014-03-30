
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
