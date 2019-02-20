const knex = require("./knex");

module.exports = {
  getAll() {
    return knex("task");
  },
  delete(id) {
    return knex("task")
      .where("id", id)
      .delete();
  },
  find(id) {
    return knex("task")
      .where("id", id)
      .first();
  }
};
