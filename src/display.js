import { format, differenceInDays, isDate } from "date-fns";
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
      // console.log("click", project.id);
      this.displayTasks(project);
    });

    const defaultProject = this.projectManager.defaultProjectId;
    //     let defaultProjectId
    //     if (defaultProject === null) {
    // // defaultProjectId
    //     }
    // HTML for project element
    const isDefaultProjectSpan = document.createElement("div");
    isDefaultProjectSpan.classList.add("default-project");
    isDefaultProjectSpan.innerText = project.id === defaultProject ? "*" : " ";
    isDefaultProjectSpan.addEventListener("click", () => {
      this.projectManager.changeDefaultProject(project.id);
      this.displayProjects();
      // this
    });

    const projectTitle = document.createElement("div");
    projectTitle.innerText = `${project.title}`;
    projElem.append(isDefaultProjectSpan, projectTitle);
    // projElem.innerHTML = `
    //     <span>Tasks:${project.id === defaultProject}</span>
    //     <span>${project.title}</span>
    //   `;

    const projDeleteButton = this.createProjectDeleteButton(project);
    projContainer.append(projElem);
    projContainer.append(projDeleteButton);

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

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = input.value;
      const projectId = this.projectManager.createProject(name);

      if (projectId !== undefined) {
        // WARNING: console log for debugging
        console.log(`project with id(${projectId}) was created`);
        this.displayProjects(projectId);
      } else {
        console.log(`project failed to create`);
      }
    });

    form.append(input, butt);

    newProj.append(form);

    return newProj;
  }

  displayProjects() {
    // Get list of projects
    const projects = this.projectManager.getProjects();

    // Reset projects list display
    this.elements.projectList.innerHTML = "";

    // For each project in projectManager create an element
    // to show it in the sidebar
    projects.forEach((project) => {
      const projectElement = this.createProjectElement(project);
      this.elements.projectList.append(projectElement);
    });

    // Make a button for creating new project
    const newProjectElement = this.createProjectCreationElement();
    this.elements.projectList.append(newProjectElement);
  }

  displayTasks(project) {
    this.elements.taskList.innerHTML = "";

    const tasks = project.getTaskList();
    tasks.forEach((task) => {
      const taskElem = this.createTaskElement(task, project);
      this.elements.taskList.append(taskElem);
    });
    const taskCreateButton = this.createTaskCreationElement(project);
    this.elements.taskList.append(taskCreateButton);
  }

  createTaskElement(task, project) {
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");

    const taskElem = document.createElement("div");
    taskElem.classList.add("task");
    taskElem.setAttribute("data-task-id", task.id);

    // console.log(isDate(task.dueDate));
    // console.log(task.dueData instanceof Date);
    console.log(task.dueDate);
    console.log(new Date(task.dueDate));

    // console.log(differenceInDays(task.dueDate, new Date()));
    if (task.dueDate !== null) {
      // console.log("is date");
      const difference = differenceInDays(new Date(task.dueDate), new Date());
      // console.log(difference);
      switch (true) {
        case difference < 0:
          taskElem.classList.add("already-due");
          break;

        case difference <= 7:
          taskElem.classList.add("soon-due");
          break;
      }
    }

    // Priority indicator
    const taskPrio = document.createElement("div");
    taskPrio.classList.add("task-priority");
    taskPrio.title = `Priority: ${task.priority}`;

    const checkmark = document.createElement("span");
    checkmark.innerText = "✔";
    checkmark.classList.add("checkmark");

    if (task.status) {
      checkmark.style.display = "block";
      taskElem.classList.remove("already-due");
      taskElem.classList.remove("soon-due");
    } else {
      checkmark.style.display = "none";
    }

    taskPrio.append(checkmark);

    taskPrio.classList.add(`${task.priority}-priority`);
    taskPrio.addEventListener("click", () => {
      task.changeStatus();
      this.projectManager.saveProject(project);
      this.displayTasks(project);
    });
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
    const title = document.createElement("span");
    title.innerText = task.title;

    const deleteTaskButton = document.createElement("button");
    deleteTaskButton.innerText = "Delete task";
    deleteTaskButton.addEventListener("click", (e) => {
      e.stopPropagation();
      if (confirm(`Are you sure you want to delete task ${task.title}?`)) {
        this.projectManager.deleteTaskFromProject(project.id, task.id);
        this.projectManager.saveProject(project);
        this.displayTasks(project);
      }
    });

    taskElem.append(taskPrio);
    taskElem.append(title);
    taskElem.append(deleteTaskButton);
    if (task.status) {
      taskElem.classList.add("task-completed");
    }

    // Task info div
    const taskInfo = this.createTaskInfoElement(task, project);
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

    for (const field in task) {
      const taskInfoField = document.createElement("div");
      taskInfoField.classList.add("task-info-field");
      //
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
        const label = document.createElement("label");
        label.innerText = field;

        const info = document.createElement("div");
        if (field === "dueDate") {
          info.innerText = format(task[field], "do MMMM yyyy");
        } else {
          info.innerText = task[field];
        }
        taskInfoField.append(label, info);
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

    const popUp = document.createElement("div");
    popUp.classList.add("popup");
    this.elements.taskList.append(popUp);

    function closePopUp() {
      popUp.style.display = "none";
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closePopUp();
      }
    });

    const closeButton = document.createElement("button");
    closeButton.innerText = "×";

    closeButton.addEventListener("click", () => {
      closePopUp();
    });

    popUp.append(closeButton);

    const form = document.createElement("form");
    form.classList.add("form-container");

    for (const field of fields) {
      const fieldElem = document.createElement("div");
      fieldElem.classList.add("form-field");
      const label = document.createElement("label");
      label.textContent = field;
      label.setAttribute("for", field);

      let input;

      switch (field) {
        case "priority":
          input = document.createElement("select");
          Task.PRIORITIES.forEach((priority) => {
            const option = document.createElement("option");
            option.value = priority;
            option.innerText = priority;
            input.append(option);
          });
          break;
        case "description":
          input = document.createElement("textarea");

          break;

        default:
          input = document.createElement("input");
          input.setAttribute("type", fieldTypes[field] || "text");
          break;
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
      }

      if (errorText.innerText !== "") {
        errorText.style.display = "block";
        return false;
      }

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

      this.projectManager.createTaskForProject(project.id, taskData);
      this.displayTasks(project);
    });

    form.append(sendFormButt);

    popUp.append(form);

    taskCreateButton.addEventListener("click", (e) => {
      e.preventDefault();
      popUp.style.display = "block";
    });

    return taskCreateButton;
  }

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
