import { format, formatDistance, formatRelative, subDays } from "date-fns";
import Task from "./task";

const fieldTypes = {
  dueDate: "date",
  status: "checkbox",
  priority: "select",
};

const fields = Object.keys(new Task()).filter(
  (field) => field != "id" && field != "",
);

export default class Display {
  constructor(projectManager, elements) {
    this.projectManager = projectManager;
    this.elements = elements;
  }

  createProjectElement(project) {
    const projContainer = document.createElement("div");
    projContainer.classList.add("project-container");
    const projElem = document.createElement("div");
    projElem.classList.add("project");
    projElem.setAttribute("data-project-id", project.id);

    projElem.addEventListener("click", () => {
      console.log("click", project.id);
      this.displayTasks(project);
      // this.displayProjects();
      // projElem.style.border = "2px solid black";
    });

    // HTML for project element
    projElem.innerHTML = `
        <span>Tasks:${project.getTaskList().length}</span>
        <span>${project.title}</span>
      `;

    const projDeleteButton = this.createProjectDeleteButton(project);
    // projElem.append(projDeleteButton);
    projContainer.append(projElem);
    projContainer.append(projDeleteButton);

    // return projElem;
    return projContainer;
  }

  createProjectDeleteButton(project) {
    // Create a button with event listener to delete a project
    const projDeleteButton = document.createElement("button");
    projDeleteButton.innerHTML = "X";
    projDeleteButton.addEventListener("click", () => {
      if (confirm(`Are you sure you want to delete ${project.title} ?`)) {
        this.projectManager.deleteProject(project.id);
        this.displayProjects();
      }
    });
    return projDeleteButton;
  }

  createProjectCreationElement() {
    const newProj = document.createElement("div");
    newProj.classList.add("project-create");

    const form = document.createElement("form");
    const input = document.createElement("input");
    const butt = document.createElement("button");
    butt.innerHTML = "Create";
    // butt.classList.add("project-create-butt");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = input.value;
      const projectId = this.projectManager.createProject(name);

      if (projectId !== undefined) {
        // WARNING: console log for debugging
        console.log(`project with id(${projectId}) was created`);
        this.displayProjects();
      } else {
        console.log(`project failed to create`);
      }
    });

    form.append(input);
    form.append(butt);

    newProj.append(form);

    return newProj;
  }

  displayProjects() {
    // Get list of projects
    const projects = this.projectManager.getProjects();

    // Reset elements of projects in the sidebar
    this.elements.projectList.innerHTML = "";

    // For each project in projectManager create an element
    // to show in the sidebar
    projects.forEach((project) => {
      const projectElement = this.createProjectElement(project);
      this.elements.projectList.append(projectElement);
    });

    // Make a button for creating new project
    const newProjectElement = this.createProjectCreationElement();
    this.elements.projectList.append(newProjectElement);
  }

  displayTasks(project) {
    // Reset tasks display
    this.elements.taskList.innerHTML = "";

    const tasks = project.getTaskList();
    tasks.forEach((task) => {
      const taskElem = this.createTaskElement(task);
      this.elements.taskList.append(taskElem);
    });
    const taskCreateButton = this.createTaskCreationElement(project);
    this.elements.taskList.append(taskCreateButton);
  }

  createTaskElement(task) {
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");

    const taskElem = document.createElement("div");
    taskElem.classList.add("task");
    taskElem.setAttribute("data-task-id", task.id);

    // Priority indicator
    const taskPrio = document.createElement("div");
    taskPrio.classList.add("task-priority");
    taskPrio.title = `Priority: ${task.priority}`;

    taskPrio.classList.add(`${task.priority}-priority`);
    /* switch (task.priority) {
      case "high":
        taskPrio.classList.add("high-priority");
        break;
      case "medium":
        taskPrio.classList.add("medium-priority");
        break;

      case "low":
        taskPrio.classList.add("low-priority");
        break;
      default:
        break;
    } */
    taskElem.append(taskPrio);
    const title = document.createElement("span");
    title.innerText = task.title;
    taskElem.append(title);

    // Task title
    // taskElem.innerHTML += `
    //     <span>${task.title}</span>
    //   `;
    if (task.status) {
      // title.style.textDecoration = "line-through";
      taskElem.classList.add("task-completed");
    }

    // Task info div
    const taskInfo = this.createTaskInfoElement(task);
    taskElem.addEventListener("click", () => {
      const state = taskInfo.style.display;
      if (state === "none") {
        taskInfo.style.display = "flex";
      } else {
        taskInfo.style.display = "none";
      }
    });

    taskContainer.append(taskElem);
    taskContainer.append(taskInfo);

    return taskContainer;
  }

  createTaskInfoElement(task) {
    const taskInfo = document.createElement("div");
    taskInfo.classList.add("task-info");
    taskInfo.style.display = "none";

    // const list = document.createElement("ul");
    for (const field in task) {
      const taskInfoField = document.createElement("div");
      taskInfoField.classList.add("task-info-field");
      console.log(field, task[field]);
      // FIX: better check for field info is needed
      if (
        field !== "id" &&
        field !== "title" &&
        field !== "priority" &&
        field !== "status" &&
        task[field] !== null &&
        task[field] !== undefined &&
        task[field] !== ""
      ) {
        // const item = document.createElement("li");
        const label = document.createElement("label");
        label.innerText = field;

        const info = document.createElement("div");
        if (field === "dueDate") {
          // taskInfoField.append(label, format(task[field], "do MMMM yyyy"));
          info.innerText = format(task[field], "do MMMM yyyy");
        } else {
          info.innerText = task[field];
        }
        taskInfoField.append(label, info);
        // list.append(item);
        taskInfo.append(taskInfoField);
      }
    }

    return taskInfo;
  }

  createTaskCreationElement(project) {
    const taskCreateButton = document.createElement("div");
    taskCreateButton.classList.add("task-creation");
    taskCreateButton.innerHTML = "Create new task";

    // WARNING: TEST data
    //
    /* const testData = {
      title: "TODO make a form for task data",
      priority: "Medium",
      dueDate: undefined,
      description: undefined,
      status: false,
    }; */
    // const popUp = this.createPopUp();
    // popUpContainer.append(popUp);

    const popUp = document.createElement("div");
    popUp.classList.add("popup");
    this.elements.taskList.append(popUp);

    const form = document.createElement("form");
    form.classList.add("form-container");

    for (const field of fields) {
      const fieldElem = document.createElement("div");
      fieldElem.classList.add("form-field");
      const label = document.createElement("label");
      label.textContent = field;
      label.setAttribute("for", field);

      let input;

      if (field === "priority") {
        input = document.createElement("select");
        // for (const prio in Task.PRIORITIES) {
        Task.PRIORITIES.forEach((priority) => {
          const option = document.createElement("option");
          option.value = priority;
          option.innerText = priority;
          input.append(option);
        });
      } else if (field === "description") {
        input = document.createElement("textarea");
      } else {
        input = document.createElement("input");
        input.setAttribute("type", fieldTypes[field] || "text");
      }
      input.setAttribute("id", field);
      input.setAttribute("name", field);

      if (field === "title") {
        input.setAttribute("required", "");
      }

      fieldElem.append(label, input);

      form.append(fieldElem);
    }
    const errorText = document.createElement("div");
    errorText.classList.add("error-text");

    form.append(errorText);

    const sendFormButt = document.createElement("button");
    sendFormButt.innerText = "Create New Task";

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      errorText.innerText = "";
      errorText.style.display = "none";

      const title = document.getElementById("title");
      const titleTrimmed = title.value.trim();
      if (titleTrimmed) {
        title.value = titleTrimmed;
      } else {
        errorText.innerText += "Title should not be empty";
        // title.focus();
      }

      if (errorText.innerText !== "") {
        errorText.style.display = "block";
        return false;
      }

      //
      // FIX: submit reloads the page, so data gets reset
      const taskData = {};
      for (const field of fields) {
        const inputField = document.getElementById(field);
        console.log(inputField, inputField.value);
        if (inputField) {
          if (inputField.type === "checkbox") {
            taskData[field] = inputField.checked;
          } else {
            taskData[field] = inputField.value;
          }
        }
      }

      project.addTask(taskData);
      // console.log(project.getTaskList());
      this.displayTasks(project);
    });

    form.append(sendFormButt);
    // form.append(field);
    // form.append(field);

    popUp.append(form);
    // console.log(taskData);

    taskCreateButton.addEventListener("click", (e) => {
      e.preventDefault();
      popUp.style.display = "block";
      // this.projectManager.
      // this.showPopUp(popUp);
      // this.projectManager.getProjectById(project.id).addTask(testData);
      // this.displayTasks(project);
    });

    return taskCreateButton;
  }

  // createPopUp() {
  //   // const popUpContainer = document.createElement("div");
  //   // popUpContainer.classList.add("popup-container");
  //   // popUpContainer.append(popUp);
  //
  //   return popUp;
  // }
  //
  // showPopUp(popUp) {
  //   popUp.style.color = "red";
  //   console.log("show");
  // }

  initialShow() {
    // defaultProjectId is initialized as NULL, no preference yet
    const defaultProjectId = this.projectManager.defaultProjectId;
    const preferredProject =
      this.projectManager.getProjectById(defaultProjectId);

    // if no default project found then show the first one in the map
    const defaultProject =
      preferredProject ||
      this.projectManager.getProjects().values().next().value;

    this.displayProjects();
    this.displayTasks(defaultProject);
  }
}
