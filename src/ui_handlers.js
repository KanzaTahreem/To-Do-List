const toDoList = document.querySelector('.list');
const parser = new DOMParser();

const addToDo = (todo) => {
  const string = `
    <li>
      <input type="checkbox" ${todo.completed ? 'checked' : ''} id=${todo.index}>
      ${todo.description}
    </li>
  `;
  const todoElement = parser.parseFromString(string, 'text/html').body.firstChild;
  toDoList.append(todoElement);
};

export default addToDo;