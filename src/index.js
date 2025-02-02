// import Task from "./task.js";
// import Project from "./project";
import projectManager from "./projectManager";

console.log("Loaded");

const manager = new projectManager();
// manager.createProject("Default")
let id = manager.createProject("Default");
let proj1 = manager.getProjectById(id);
proj1.addTask(
  "Make a todo list app",
  "- plan how to make an app \n- make the app\n- complete",
  null,
  null,
  null,
  null,
);
proj1.addTask("Learn JS", "", null, null, null, null);

id = manager.createProject("TestProject");
let proj2 = manager.getProjectById(id);
proj2.addTask("test", "test1", null, null, null, null);

// const project = new Project("Default");
// project.addTask(
//   "Make a todo list app",
//   "- plan how to make an app \n- make the app\n- complete",
//   null,
//   null,
//   null,
//   null,
// );
// project.addTask("Learn JS", "", null, null, null, null);
// // console.log(project.taskList[0]);
// console.log(project.getTaskList());
// project.removeTask(0);
// console.log(project.getTaskList());
//
// const project1 = new Project("Default");
// project1.addTask("test", "test1", null, null, null, null);
// console.log(project1.getTaskList());

// const task = new Task("Make a Todo project");
// task.test();
