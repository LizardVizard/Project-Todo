import Project from "./project";
import Validator from "./validator";

export default class projectManager {
  #projects;
  #counter = 0;

  constructor() {
    this.#projects = new Map();
    this.#counter = 0;
    this.defaultProjectId = null;
  }

  createProject(projTitle) {
    const validatedTitle = Validator.validateProjectTitle(projTitle);

    if (typeof validatedTitle === "string") {
      const project = new Project(++this.#counter, validatedTitle);
      this.#projects.set(this.#counter, project);
      return this.#counter;
    } else {
      return;
    }
  }

  getProjectById(projId) {
    return this.#projects.get(projId);
  }

  getProjects() {
    return this.#projects;
  }

  deleteProject(projectId) {
    // WARNING: remove console log for prod
    return (
      this.#projects.delete(projectId) &&
      console.log(`project with id(${projectId}) was deleted`)
    );
  }

  deleteTaskFromProject(projId, taskId) {
    this.#projects.get(projId).deleteTask(taskId);
  }

  changeDefaultProject(projId) {
    if (this.getProjectById(projId)) {
      this.defaultProjectId = projId;
    } else {
      // WARNING: remove console log for prod
      console.log(
        `no project found with id(${projId}) during change of default project`,
      );
      this.defaultProjectId = null;
    }
  }
}
