import ProjectManager from "./projectManager";
import Display from "./display.js";
import { addDays } from "date-fns";
import "./style.css";
import TaskFactory from "./taskFactory.js";
import projectManager from "./projectManager";

console.log("Loaded");

const elements = {
  projectList: document.getElementById("project-list"),
  taskList: document.getElementById("task-list"),
};

// TODO:
// - Tasks:
//  - edit info
//  - task checkbox, change task status
//====
// - Projects:
//  - editing name
//====
// - Display:
//  - add buttons to change info
//====
// - localStorage:
//  - save projects and lists in local storage
//   - use abstraction to larp using DBs
//  - create a storage class
//  - make a traslator between project manager and storage class
//  - save an array of tasks and save that into project string
//  - classes to create:
//   - StorageManager
//   - StorageDriver
//    - localStorageDriver
//   - Translate project to string(s)
//   logic:
//    - read localStorage
//    - load all existing projects
//      convert string to tasks
//====
// - ? SASS
//====
// - Check all  FIX:
//        and   WARNING:
//

const manager = new ProjectManager();

// FIX: write a proper function for creating default
// project(inside projectManager) if none exist
// this is only for debugging
//
// let id = manager.createProject("Default");

// FIX: this for debugging as well
function addTestData() {
  manager.createTaskForProject(id, {
    title: "Make a todo list app",
    description: "- plan how to make an app \n- make the app\n- complete",
    priority: "high",
    dueDate: addDays(new Date(), 14),
    // status: null,
  });
  manager.createTaskForProject(id, {
    title: "Learn JS",
    description: "",
    priority: "",
    dueDate: null,
    // status: null,
  });
  let proj1 = manager.getProjectById(id);
  /* proj1.addTask({
    title: "Make a todo list app",
    description: "- plan how to make an app \n- make the app\n- complete",
    priority: "high",
    dueDate: addDays(new Date(), 14),
    // status: null,
  });
  proj1.addTask({
    title: "Learn JS",
    description: "",
    priority: "",
    dueDate: null,
    // status: null,
  }); */

  id = manager.createProject("TestProject");
  manager.createTaskForProject(id, {
    title: "test",
    description: "test1",
    priority: "",
    dueDate: null,
    // status: null,
  });
  let proj2 = manager.getProjectById(id);
  /* proj2.addTask({
    title: "test",
    description: "test1",
    priority: "",
    dueDate: null,
    // status: null,
  }); */
  return { proj1, proj2 };
}

manager.loadProjects();
// const { proj1, proj2 } = addTestData();
/* console.log(proj1);
console.log(proj1.getTaskList()[0]);
console.log(JSON.stringify(proj1.getTaskList()[0]));
const json = JSON.stringify(proj1.getTaskList()[0]);
console.log(
  proj1.addTask(
    JSON.parse(json, (key, value) => {
      if (key === "dueDate") {
        return new Date(value);
      }
      return value;
    }),
  ),
  proj1.getTaskList()[2],
); */

/* function fromJSON(data) {
  console.log("JSON", data);
  const project = manager.createProject(data.title);

  if (Array.isArray(data.taskList)) {
    data.taskList.forEach((taskData) => project.addTask(taskData));
  }

  return project;
}
const projJson = JSON.stringify(proj1);
console.log(
  "lol",
  manager.createProjectFromJSON(
    JSON.parse(
      projJson,
      // fromJSON,
      //   , (data) => {
      //   // console.log(data);
      //   return data;
      //   // if (key === "taskList") {
      //   //   return value.map((taskInfo) => {
      //   //     // return TaskFactory.createTask(taskInfo.id, taskInfo);
      //   //   });
      //   // }
      //   // return value;
      // }
    ),
  ),
); */
// console.log(proj2);

const displayManager = new Display(manager, elements);
displayManager.initialShow();
