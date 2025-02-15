// import Task from "./task.js";
import TaskFactory from "./taskFactory";

export default class Project {
  #counter = 0;

  constructor(id, title) {
    this.id = id;
    this.title = title;
    this.taskList = [];
    this.#counter = 0;
  }

  addTask(taskData) {
    const task = TaskFactory.createTask(++this.#counter, taskData);
    this.taskList.push(task);
  }

  deleteTask(taskId) {
    this.taskList = this.taskList.filter((task) => task.id !== taskId);
  }

  updateTask(taskId, taskData) {
    const task = this.taskList.find((task) => task.id === Number(taskId));
    if (task === undefined) {
      console.log("task wasn't found");
      return undefined;
    }

    return TaskFactory.updateTask(task, taskData);
  }

  getTaskList() {
    return this.taskList;
  }
}
