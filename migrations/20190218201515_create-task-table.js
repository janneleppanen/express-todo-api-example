const knex = require("knex");

exports.up = function(knex, Promise) {
  return knex.schema.createTable("task", table => {
    table.increments();
    table.text("description");
    table.boolean("done");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("task");
};
