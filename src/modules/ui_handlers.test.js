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

  let toDoTask;
  const toDoList = new ToDoList();
  test('Add task to UI', () => {
    UIHandler.toDoLi = document.querySelector('.list');
    toDoTask = toDoList.addNewTask(null, 'First Task', false);
    UIHandler.addToDo(toDoTask, toDoList, UIHandler.toDoLi);
    const listItems = document.querySelectorAll('.list > li');
    expect(listItems.length).toBe(1);
    expect(toDoList.list.length).toBe(1);
  });

  test('Remove task from UI', () => {
    const todoListEl = document.querySelector('.list > li');
    UIHandler.deleteBtnListener(toDoTask, toDoList, todoListEl);
    const listItems = document.querySelectorAll('.list > li');
    expect(listItems.length).toBe(0);
    expect(toDoList.list.length).toBe(0);
  });

  test('Edit task function', () => {
    UIHandler.toDoLi = document.querySelector('.list');
    toDoTask = toDoList.addNewTask(null, 'Task to edit', false);
    UIHandler.addToDo(toDoTask, toDoList, UIHandler.toDoLi);
    const taskEl = document.querySelector('.list > li');
    const taskInputEL = taskEl.querySelector('input[type="text"]');
    taskInputEL.value = 'Edited task';
    UIHandler.editToDoListener(toDoTask, toDoList, taskEl, taskInputEL);
    expect(toDoTask.description).toBe('Edited task');
  });

  test('Check completed function', () => {
    const list = document.querySelector('.list');
    list.innerHTML = '';
    toDoList.list = [];
    toDoTask = toDoList.addNewTask(null, 'Completed task', false);
    UIHandler.addToDo(toDoTask, toDoList, list);
    const taskEl = document.querySelector('.list > li');
    const checkbox = taskEl.querySelector('input[type="checkbox"]');
    checkbox.setAttribute('checked', true);
    UIHandler.checkToDoListener(toDoTask, toDoList, taskEl, checkbox);
    expect(toDoTask.isCompleted).toBe(true);
  });

  test('should remove all completed tasks from UI', () => {
    const list = document.querySelector('.list');
    list.innerHTML = '';
    toDoList.list = [];
    const task1 = toDoList.addNewTask(null, 'A task', false);
    const task2 = toDoList.addNewTask(null, 'A task', true);
    UIHandler.addToDo(task1, toDoList, list);
    UIHandler.addToDo(task2, toDoList, list);
    UIHandler.clearAllTasks(toDoList, UIHandler.toDoLi);
    const listArray = document.querySelectorAll('.list > li');
    expect(listArray.length).toBe(1);
    expect(toDoList.list.length).toBe(1);
  });
});
