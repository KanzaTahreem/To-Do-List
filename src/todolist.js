import Task from './task.js';

class ToDoList {
  constructor() {
    this.list = [];
  }

  addNewTask = (index = null, description = null, isCompleted = null) => {
    if (description) {
      const newTaskIndex = index || this.list.length + 1;
      const newTaskIsCompleted = isCompleted || false;
      const newTask = new Task(newTaskIndex, description, newTaskIsCompleted);
      this.list.push(newTask);
      return newTask;
    }
    return null;
  }
}

export default ToDoList;