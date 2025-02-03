// import Task from "./task.js";
// import Project from "./project";
import ProjectManager from "./projectManager";
import Display from "./display.js";
import { addDays } from "date-fns";
import "./style.css";

console.log("Loaded");

const manager = new ProjectManager();
let id = manager.createProject("Default");

function addTestData() {
  let proj1 = manager.getProjectById(id);
  proj1.addTask({
    title: "Make a todo list app",
    description: "- plan how to make an app \n- make the app\n- complete",
    priority: "High",
    dueDate: addDays(Date.now(), 14),
    status: null,
  });
  proj1.addTask({
    title: "Learn JS",
    description: "",
    priority: "",
    dueDate: null,
    status: null,
  });

  id = manager.createProject("TestProject");
  let proj2 = manager.getProjectById(id);
  proj2.addTask({
    title: "test",
    description: "test1",
    priority: "",
    dueDate: null,
    status: null,
  });
  return { proj1, proj2 };
}
// proj2.addTask("test", "test1", null, null, null, null);

const { proj1, proj2 } = addTestData();
console.log(proj1);
console.log(proj2);

Display.displayProjects(manager.getProjects());
Display.displayTasks(proj1);

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
