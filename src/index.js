/* eslint-disable */
import _ from 'lodash';
/* eslint-enable */
import './style.css';

const toDoList = document.querySelector('.list');
const parser = new DOMParser();

const toDoArray = [
  {
    index: 0,
    description: 'HTML',
    completed: true,
  },

  {
    index: 1,
    description: 'CSS',
    completed: false,
  },
  {
    index: 2,
    description: 'JavaScript',
    completed: true,
  },
];

const addToDo = (todo) => {
  const string = `
    <li>
      <input type="checkbox" ${todo.completed ? 'checked' : ''} id=${todo.id}>
      ${todo.description}
    </li>
  `;
  const todoElement = parser.parseFromString(string, 'text/html').body.firstChild;
  toDoList.append(todoElement);
};
toDoArray.forEach((toDoListElement) => {
  addToDo(toDoListElement);
});
