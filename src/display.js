export default class Display {
  constructor(projectManager, elements) {
    this.projectManager = projectManager;
    this.elements = elements;
  }

  createProjectElement(project) {
    const projElem = document.createElement("div");
    projElem.classList.add("project");
    projElem.setAttribute("data-project-id", project.id);

    // HTML for project element
    projElem.innerHTML = `
        <span>Tasks:${project.getTaskList().length}</span>
        <span>${project.title}</span>
      `;

    const projDeleteButton = this.createProjectDeleteButton(project.id);
    projElem.append(projDeleteButton);

    return projElem;
  }

  createProjectDeleteButton(projectId) {
    // Create a button with event listener to delete a project
    const projDeleteButton = document.createElement("button");
    projDeleteButton.addEventListener("click", () => {
      this.projectManager.deleteProject(projectId);
      this.displayProjects();
    });
    return projDeleteButton;
  }

  createNewProjectElement() {
    const newProj = document.createElement("div");
    const input = document.createElement("input");
    const butt = document.createElement("button");

    // TODO: Connect button to a projectManager project creation function
    // using input field text as title and switch to it.

    newProj.append(input);
    newProj.append(butt);

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
    const newProjectElement = this.createNewProjectElement();
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
  }

  createTaskElement(task) {
    const taskElem = document.createElement("div");
    taskElem.classList.add("task");
    taskElem.setAttribute("data-task-id", task.id);

    taskElem.innerHTML = `
        <span>${task.title}</span>
      `;
    return taskElem;
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
