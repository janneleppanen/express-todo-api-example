const tasks = require("../tasks");

exports.seed = function(knex, Promise) {
  return knex("task")
    .del()
    .then(function() {
      return knex("task").insert(tasks);
    });
};
