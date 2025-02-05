import ProjectManager from "./projectManager";
import Display from "./display.js";
import { addDays } from "date-fns";
import "./style.css";

console.log("Loaded");

const elements = {
  projectList: document.getElementById("project-list"),
  taskList: document.getElementById("task-list"),
};

// TODO:
// - Tasks:
//  - creating
//  - edit info
//  - task checkbox, change task status
//   - when checked strike through text of a task
//====
// - Projects:
//  - editing name
//====
// - Display:
//  - add buttons to change info
//  - make things more readable
//====
// - localStorage:
//  - save projects and lists in local storage
//   - use abstraction to larp using DBs
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
let id = manager.createProject("Default");

// FIX: this for debugging as well
function addTestData() {
  let proj1 = manager.getProjectById(id);
  proj1.addTask({
    title: "Make a todo list app",
    description: "- plan how to make an app \n- make the app\n- complete",
    priority: "High",
    dueDate: addDays(new Date(), 14),
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

const { proj1, proj2 } = addTestData();
console.log(proj1);
console.log(proj2);

const displayManager = new Display(manager, elements);
displayManager.initialShow();
