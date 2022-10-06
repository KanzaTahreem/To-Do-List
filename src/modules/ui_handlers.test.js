/**
 * @jest-environment jsdom
 */
import * as UIHandler from './ui_handlers.js';
import ToDoList from './todolist.js';

describe('DOM', () => {
  document.body.innerHTML = `
  <section class="wrapper">
    <header class="border-bottom">
      <h1>todos</h1>
    </header>

    <form class="border-bottom">
      <input type="text" class="add-todo" placeholder="Add your list..." />
      <button type="submit" class="submit-btn">
        <i class="fa-solid fa-turn-down-left"></i>
      </button>
    </form>

    <div class="todo-list">
      <ul class="list"></ul>
    </div>

    <button type="button" class="clear-btn">Clear all completed</button>
</section>`;

  test('Add task to UI', () => {
    const toDoList = new ToDoList();
    UIHandler.toDoLi = document.querySelector('.list');
    const toDoTask = toDoList.addNewTask(null, 'First Task', false);
    UIHandler.addToDo(toDoTask, toDoList, UIHandler.toDoLi);
    const listItems = document.querySelectorAll('.list > li');
    expect(listItems.length).toBe(1);
    expect(toDoList.list.length).toBe(1);
  });
});