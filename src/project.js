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

  /* addTask(taskTitle, taskDesc, taskPriority, taskDueDate, taskStatus) {
    const task = new Task(
      this.#counter++,
      taskTitle,
      taskDesc,
      taskPriority,
      taskDueDate,
      taskStatus,
      // false,
    );

    this.taskList.push(task);
  } */

  addTask(taskData) {
    const task = TaskFactory.createTask(++this.#counter, taskData);
    this.taskList.push(task);
  }

  deleteTask(taskId) {
    this.taskList = this.taskList.filter((task) => task.id !== taskId);
  }

  updateTask(taskId, taskData) {
    const task = this.taskList.filter((task) => task.id !== taskId);
    if (task === undefined) {
      console.log("task wasn't found");
      return undefined;
    }

    // TODO: Validation, not really, but would be nice

    // task.title = taskTitle;
    // task.description = taskDesc;
    // task.priority = taskPriority;
    // task.dueDate = taskDueDate;
    // task.title = taskStatus;

    task = TaskFactory.updateTask(task, taskData);
  }

  getTaskList() {
    return this.taskList;
  }
  fromJSON(data) {
    // console.log("JSON", data);
    const project = new Project(-1, data.title);

    if (Array.isArray(data.taskList)) {
      data.taskList.forEach((taskData) => project.addTask(taskData));
    }

    return project;
  }
  // get taskList() {
  //   return this.taskList;
  // }
}
