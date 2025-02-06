import { format, formatDistance, formatRelative, subDays } from "date-fns";

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
    const taskCreateButton = this.createTaskCreationElement();
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

    switch (task.priority) {
      case "High":
        taskPrio.classList.add("high-priority");
        break;
      case "Medium":
        taskPrio.classList.add("medium-priority");
        break;

      default:
        break;
    }
    taskElem.append(taskPrio);

    // Task title
    taskElem.innerHTML += `
        <span>${task.title}</span>
      `;

    // Task info div
    const taskInfo = this.createTaskInfoElement(task);
    taskElem.addEventListener("click", () => {
      const state = taskInfo.style.display;
      if (state === "none") {
        taskInfo.style.display = "block";
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

    const list = document.createElement("ul");
    for (const field in task) {
      // FIX: better check for field info is needed
      if (
        field !== "id" &&
        field !== "title" &&
        task[field] !== null &&
        task[field] !== ""
      ) {
        const item = document.createElement("li");
        if (field === "dueDate") {
          item.innerText = format(task[field], "do MMMM yyyy");
        } else {
          item.innerText = task[field];
        }
        list.append(item);
      }
    }
    taskInfo.append(list);

    return taskInfo;
  }

  createTaskCreationElement() {
    const taskCreateButton = document.createElement("div");
    taskCreateButton.classList.add("task-creation");
    taskCreateButton.innerHTML = "Create new task";

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
