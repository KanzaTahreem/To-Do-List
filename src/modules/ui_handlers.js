import { addListToLocalStorage } from './localStorage.js';

const toDoLi = document.querySelector('.list');
const parser = new DOMParser();

const deleteBtnListener = (todo, todoList, todoElement) => {
  todoList.removeTask(todo);
  todoElement.remove();
  addListToLocalStorage(todoList.list);
};

const editToDoListener = (todo, todoList, toDoEl, editToDo) => {
  todoList.updatedTaskDescription(todo.index, editToDo.value);
  toDoEl.innerHTML = editToDo.value;
  toDoEl.classList.remove('hidden');
  editToDo.classList.add('hidden');
  addListToLocalStorage(todoList.list);
};

const checkToDoListener = (todo, todoList, todoElement, target) => {
  if (target.checked) {
    todoList.updateTask(todo.index, true);
    todoElement.style.textDecoration = 'line-through';
    todoElement.style.color = '#545862a3';
  } else {
    todoList.updateTask(todo.index, false);
    todoElement.style.textDecoration = 'none';
    todoElement.style.color = 'inherit';
  }
  addListToLocalStorage(todoList.list);
};

const addToDo = (todo, todoList, toDoListEl) => {
  const string = `
    <li class="border-bottom">
      <div class="list-item">
        <input type="checkbox" ${todo.isCompleted ? 'checked' : ''} id=${todo.index}>
        <p class="todo-li"> ${todo.description}</p>
        <input type="text" class="edit-todo hidden" value="${todo.description}">
      </div>
      <i class="fa-regular fa-ellipsis-vertical menu"></i>
      <ul class="task-menu hidden">
          <li>
            <i class="fa-solid fa-pen edit"></i>
          </li>
          <li>
            <i class="fa-solid fa-trash-can delete"></i>
          </li>
          <li>
            <i class="fa-solid fa-xmark close"></i>
          </li>
        </ul>
    </li>
  `;

  const todoElement = parser.parseFromString(string, 'text/html').body.firstChild;

  /* To display menu */
  const menuBtn = todoElement.querySelector('.menu');
  const taskMenu = todoElement.querySelector('.task-menu');
  menuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    taskMenu.classList.remove('hidden');
  });

  /* To close menu */
  const closeBtn = todoElement.querySelector('.close');
  closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    taskMenu.classList.add('hidden');
  });

  /* To delete task */
  const deleteBtn = todoElement.querySelector('.delete');
  deleteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    deleteBtnListener(todo, todoList, todoElement, addListToLocalStorage);
  });

  /* To edit task */
  const toDoEl = todoElement.querySelector('.todo-li');
  const editToDo = todoElement.querySelector('.edit-todo');
  const editBtn = todoElement.querySelector('.edit');
  editBtn.addEventListener('click', (e) => {
    e.preventDefault();
    toDoEl.classList.add('hidden');
    editToDo.classList.remove('hidden');
    taskMenu.classList.add('hidden');
    editToDo.focus();
  });

  editToDo.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      editToDoListener(todo, todoList, toDoEl, editToDo);
    }
  });

  /* To display completed task */
  const todoCompleted = todoElement.querySelector('input[type="checkbox"]');
  if (todo.isCompleted) {
    todoElement.style.textDecoration = 'line-through';
    todoElement.style.color = '#545862a3';
  } else {
    todoElement.style.textDecoration = 'none';
    todoElement.style.color = 'inherit';
  }

  todoCompleted.addEventListener('change', (e) => {
    checkToDoListener(todo, todoList, todoElement, e.target);
  });
  toDoListEl.append(todoElement);
};

const clearAllTasks = (toDoList, toDoLi) => {
  toDoList.removeCompletedTask();
  toDoLi.innerHTML = '';
  toDoList.list.forEach((task) => {
    addToDo(task, toDoList, toDoLi);
  });
  addListToLocalStorage(toDoList.list);
};

export {
  addToDo,
  toDoLi,
  deleteBtnListener,
  editToDoListener,
  checkToDoListener,
  clearAllTasks,
};
