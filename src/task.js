class Task {
  constructor(index, description, isCompleted = false) {
    this.index = index;
    this.description = description;
    this.isCompleted = isCompleted;
  }
}

export default Task;