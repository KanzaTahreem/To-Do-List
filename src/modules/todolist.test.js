import Task from './task.js';
import ToDoList from './todolist.js';

describe('TodoLidt', () => {
  describe('Add task function', () => {
    const toDoList = new ToDoList();
    test('should add task if only description is present', () => {
      toDoList.addNewTask(null, 'First Task', false);
      expect(toDoList.list.length).toBe(1);
    });

    test('should return a task if it is added to the list', () => {
      const aNewTask = toDoList.addNewTask(null, 'Second Task', false);
      expect(aNewTask instanceof Task).toBe(true);
      expect(toDoList.list.length).toBe(2);
    });

    test('should assign isCompleted to false and return a new task', () => {
      const aNewTask = toDoList.addNewTask(null, 'Third Task', null);
      expect(aNewTask instanceof Task).toBe(true);
      expect(toDoList.list.length).toBe(3);
    });

    test('should not add task and return null', () => {
      const aNewTask = toDoList.addNewTask(null, null, false);
      expect(aNewTask instanceof Task).toBe(false);
      expect(toDoList.list.length).toBe(3);
    });
  });

  describe('Remove task function', () => {
    const toDoList = new ToDoList();
    let task1;
    let task2;
    let task3;
    beforeAll(() => {
      task1 = toDoList.addNewTask(null, 'First task', false);
      task2 = toDoList.addNewTask(null, 'Second task', false);
      task3 = toDoList.addNewTask(null, 'Third task', false);
    });

    test('should remove a task', () => {
      toDoList.removeTask(task1);
      expect(toDoList.list.length).toBe(2);
      expect(task2.index).toBe(1);
      expect(task3.index).toBe(2);
    });

    test('should remove second task', () => {
      toDoList.removeTask(task3);
      expect(toDoList.list.length).toBe(1);
      expect(task2.index).toBe(1);
    });

    test('length should return 0', () => {
      toDoList.removeTask(task2);
      expect(toDoList.list.length).toBe(0);
    });
  });
});
