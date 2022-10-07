import './style.css';
import { addListToLocalStorage, loadListFromLocalStorage } from './modules/localStorage.js';
import { addToDo, toDoLi, clearAllTasks } from './modules/ui_handlers.js';
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
  clearAllTasks(toDoList, toDoLi);
});