import { addListToLocalStorage } from './localStorage.js';

const toDoLi = document.querySelector('.list');
const parser = new DOMParser();

const addToDo = (todo, todoList) => {
  const string = `
    <li class="border-bottom">
      <input type="checkbox" ${todo.isCompleted ? 'checked' : ''} id=${todo.index}>
      ${todo.description}
    </li>
  `;

  const todoElement = parser.parseFromString(string, 'text/html').body.firstChild;
  const todoCompleted = todoElement.querySelector('input[type="checkbox"]');

  if (todo.isCompleted) {
    todoElement.style.textDecoration = 'line-through';
    todoElement.style.color = '#545862a3';
  } else {
    todoElement.style.textDecoration = 'none';
    todoElement.style.color = 'inherit';
  }

  todoCompleted.addEventListener('change', (e) => {
    if (e.target.checked) {
      todoList.updateTask(todo.index, true);
      todoElement.style.textDecoration = 'line-through';
      todoElement.style.color = '#545862a3';
    } else {
      todoList.updateTask(todo.index, false);
      todoElement.style.textDecoration = 'none';
      todoElement.style.color = 'inherit';
    }

    addListToLocalStorage(todoList.list);
  });
  toDoLi.append(todoElement);
};

export default addToDo;