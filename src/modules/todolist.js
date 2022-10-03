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

  updateTask = (index, isCompleted) => {
    this.list[index - 1].isCompleted = isCompleted;
  }

  updatedTaskDescription = (index, description) => {
    this.list[index - 1].description = description;
  }

  removeTask = (todo) => {
    this.list = this.list.filter((item) => item !== todo);
    this.list.forEach((task, indexOfTask) => {
      task.index = indexOfTask + 1;
    });
  }

  removeCompletedTask = () => {
    this.list = this.list.filter((item) => item.isCompleted !== true);
    this.list.forEach((task, indexOfTask) => {
      task.index = indexOfTask + 1;
    });
  }
}

export default ToDoList;