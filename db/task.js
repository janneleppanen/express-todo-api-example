const uuid = require("uuid");

let tasks = [
  { id: "098f0376-c03b-43a3-99b5-b2ccfe30b0a9", text: "Buy milk", done: false },
  {
    id: "39bf5c45-5a23-4434-a21e-9036d8cc0793",
    text: "Read a book",
    done: false
  },
  { id: "660d16eb-667d-4ba4-93fd-c28bda474dee", text: "Go gym", done: false }
];

const getAll = () => {
  return tasks;
};

const getById = id => {
  return tasks.find(task => task.id === id);
};

const remove = id => {
  const taskToDelete = tasks.find(task => task.id === id);
  if (!taskToDelete) return false;
  tasks = tasks.filter(task => task.id !== id);
  return taskToDelete;
};

const update = (id, newContent) => {
  tasks = tasks.map(task => {
    if (task.id === id) {
      task.text = newContent.text;
      task.done = newContent.done;
    }
    return task;
  });
  return tasks.find(task => task.id === id);
};

const create = text => {
  const newTask = {
    id: uuid(),
    text: text,
    done: false
  };
  tasks.push(newTask);
  return newTask;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
