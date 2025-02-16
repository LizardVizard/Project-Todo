import ProjectManager from "./projectManager";
import Display from "./display.js";
import { addDays } from "date-fns";
import "./style.css";

console.log("Loaded");

// TODO:
// - Tasks:
//====
// - Projects:
//  - editing name
//====
// - Display:
//====
// - ? SASS
//====
// - Check all  FIX:
//        and   WARNING:
//

const manager = new ProjectManager();

manager.loadProjects();

const displayManager = new Display(manager);
displayManager.initialShow();
