import Task from './task.js';

class ToDoList {
  constructor() {
    this.list = [];
  }

  addNewTask = (toDoInput) => {
    const newTask = new Task(this.list.length + 1, toDoInput);
    this.list.push(newTask);
    return newTask;
  }

  addTaskFromLocalStorageToList = (index, description, isCompleted) => {
    const newTask = new Task(index, description, isCompleted);
    this.list.push(newTask);
    return newTask;
  }
}

export default ToDoList;