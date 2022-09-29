/* eslint-disable */
import _, { add } from 'lodash';
/* eslint-enable */
import './style.css';
import ToDoList from './todolist.js';
import addToDo from './ui_handlers.js';

const submitBtn = document.querySelector('.submit-btn');
const addToDoInput = document.querySelector('.add-todo');

const toDoList = new ToDoList();
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const inputValue = addToDoInput.value;
  const pushedTask = toDoList.addNewTask(inputValue);
  addToDoInput.value = '';
  addToDo(pushedTask);
});
