import './style.css';
import { addListToLocalStorage, loadListFromLocalStorage } from './modules/localStorage.js';
import { addToDo, toDoLi } from './modules/ui_handlers.js';
import ToDoList from './modules/todolist.js';

const submitBtn = document.querySelector('.submit-btn');
const clearAllBtn = document.querySelector('.clear-btn');
const addToDoInput = document.querySelector('.add-todo');

const toDoList = new ToDoList();
const dataFromLocalStorage = loadListFromLocalStorage();

const loadDataFromLocalStorage = (toDoObject) => {
  const pushedLocalTask = toDoList.addNewTask(
    toDoObject.index, toDoObject.description, toDoObject.isCompleted,
  );
  addToDo(pushedLocalTask, toDoList, toDoLi);
};

dataFromLocalStorage.forEach((toDoObject) => {
  loadDataFromLocalStorage(toDoObject);
});

const addTodoListener = () => {
  const inputValue = addToDoInput.value;
  const pushedTask = toDoList.addNewTask(null, inputValue, false);
  addToDoInput.value = '';
  addToDo(pushedTask, toDoList, toDoLi);
  addListToLocalStorage(toDoList.list);
};

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addTodoListener(e);
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

export default addTodoListener;