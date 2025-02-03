export default class Display {
  static elements = {
    // projectList: "project-list",
    projectList: document.getElementById("project-list"),
    taskList: document.getElementById("task-list"),
    // taskList: "task-list",
  };

  static displayProjects(projects) {
    this.elements.projectList.innerHTML = "";

    projects.forEach((project) => {
      const projElem = document.createElement("div");
      projElem.classList.add("project");
      projElem.setAttribute("data-project-id", project.id);

      // FIX: onclick function
      projElem.innerHTML = `
        <span>${project.title}</span>
        <button onclick="manager.removeProject(${project.id})">
      `;

      this.elements.projectList.append(projElem);
    });

    const newProj = document.createElement("div");
    const input = document.createElement("input");
    const butt = document.createElement("button");

    // TODO: Connect button to a projectManager project creation function
    // using input field text as title and switch to it.

    newProj.append(input);
    newProj.append(butt);

    this.elements.projectList.append(newProj);
  }

  static displayTasks(project) {
    this.elements.taskList.innerHTML = "";
    project.getTaskList().forEach((task) => {
      const taskElem = document.createElement("div");
      taskElem.classList.add("task");
      taskElem.setAttribute("data-task-id", task.id);

      taskElem.innerHTML = `
        <span>${task.title}</span>
      `;
      this.elements.taskList.append(taskElem);
    });
  }
}
