/* eslint-disable */
import _, { add } from 'lodash';
/* eslint-enable */
import './style.css';
import { addListToLocalStorage, loadListFromLocalStorage } from './modules/localStorage.js';
import { addToDo, toDoLi } from './modules/ui_handlers.js';
import ToDoList from './modules/todolist.js';

const submitBtn = document.querySelector('.submit-btn');
const clearAllBtn = document.querySelector('.clear-btn');
const addToDoInput = document.querySelector('.add-todo');

const toDoList = new ToDoList();
const dataFromLocalStorage = loadListFromLocalStorage();

dataFromLocalStorage.forEach((toDoObject) => {
  const pushedLocalTask = toDoList.addNewTask(
    toDoObject.index, toDoObject.description, toDoObject.isCompleted,
  );
  addToDo(pushedLocalTask, toDoList, toDoLi);
});

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const inputValue = addToDoInput.value;
  const pushedTask = toDoList.addNewTask(null, inputValue, false);
  addToDoInput.value = '';
  addToDo(pushedTask, toDoList, toDoLi);
  addListToLocalStorage(toDoList.list);
});

clearAllBtn.addEventListener('click', (e) => {
  e.preventDefault();
  toDoList.removeCompletedTask();
  toDoLi.innerHTML = '';
  toDoList.list.forEach((task) => {
    addToDo(task, toDoList, toDoLi);
  });
  addListToLocalStorage(toDoList.list);
});