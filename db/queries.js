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
  },
  create({ description }) {
    return knex("task").insert({ description, done: false });
  },
  update(id, newTask) {
    return knex("task")
      .where("id", id)
      .update({
        ...newTask
      });
  }
};
