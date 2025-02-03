import Project from "./project";

export default class projectManager {
  #projects;
  #counter = 0;

  constructor() {
    this.#projects = new Map();
    this.#counter = 0;
  }

  createProject(projTitle) {
    const project = new Project(++this.#counter, projTitle);
    this.#projects.set(this.#counter, project);
    return this.#counter;
  }

  getProjectById(projId) {
    return this.#projects.get(projId);
  }

  getProjects() {
    return this.#projects;
  }

  removeProject(projectId) {
    this.projects = this.projects.filter((project) => project.id !== projectId);
  }

  removeTaskFromProject(projId, taskId) {
    this.#projects.get(projId).deleteTask(taskId);
  }
}
