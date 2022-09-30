/* eslint-disable */
import _, { add } from 'lodash';
/* eslint-enable */
import './style.css';
import { addListToLocalStorage, loadListFromLocalStorage } from './localStorage.js';

import ToDoList from './todolist.js';
import addToDo from './ui_handlers.js';

const submitBtn = document.querySelector('.submit-btn');
const addToDoInput = document.querySelector('.add-todo');

const toDoList = new ToDoList();
const dataFromLocalStorage = loadListFromLocalStorage();

dataFromLocalStorage.forEach((toDoObject) => {
  const pushedLocalTask = toDoList.addTaskFromLocalStorageToList(
    toDoObject.index, toDoObject.description, toDoObject.isCompleted,
  );
  addToDo(pushedLocalTask);
});

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const inputValue = addToDoInput.value;
  const pushedTask = toDoList.addNewTask(inputValue);
  addToDoInput.value = '';
  addToDo(pushedTask);
  addListToLocalStorage(toDoList.list);
});
