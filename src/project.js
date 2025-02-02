import Task from "./task.js";

export default class Project {
  #counter = 0;

  constructor(title) {
    this.title = title;
    this.taskList = [];
    this.#counter = 0;
  }

  addTask(taskTitle, taskDesc, taskStatus, taskPriority, taskDueDate) {
    const task = new Task(
      this.#counter++,
      taskTitle,
      taskDesc,
      taskStatus,
      taskPriority,
      taskDueDate,
      // false,
    );

    this.taskList.push(task);
  }

  removeTask(taskId) {
    this.taskList = this.taskList.filter((task) => task.id !== taskId);
  }

  getTaskList() {
    return this.taskList;
  }
  // get taskList() {
  //   return this.taskList;
  // }
}
