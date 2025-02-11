import Project from "./project";
import Validator from "./validator";

export default class projectManager {
  #projects;
  #counter = 0;

  constructor() {
    this.#projects = new Map();
    this.#counter = 0;
    const defaultProjectIdFromStorage = JSON.parse(
      localStorage.getItem("default-project"),
    );
    this.defaultProjectId = defaultProjectIdFromStorage || 1;
  }

  createProject(projTitle) {
    const validatedTitle = Validator.validateProjectTitle(projTitle);

    if (typeof validatedTitle === "string") {
      const project = new Project(++this.#counter, validatedTitle);
      this.#projects.set(this.#counter, project);
      this.saveProject(project);
      return this.#counter;
    } else {
      console.log("Project title failed validation");
      return;
    }
  }

  createProjectFromJSON(data) {
    const projectId = this.createProject(data.title);

    if (Array.isArray(data.taskList)) {
      data.taskList.forEach((taskData) =>
        this.createTaskForProject(projectId, taskData),
      );
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
    const projectIdListJSON = localStorage.getItem("project_ids");

    let projectIdList = new Set(Array.from(JSON.parse(projectIdListJSON)));
    if (projectIdList.delete(projectId)) {
      const projectIdArray = Array.from(projectIdList);
      localStorage.setItem(`project_ids`, JSON.stringify(projectIdArray));
      localStorage.removeItem(`project-${projectId}`);

      return (
        this.#projects.delete(projectId) &&
        console.log(`project with id(${projectId}) was deleted`)
      );
    } else {
      console.log(`Project with id(${projectId}) not found in project list`);
    }
  }

  createTaskForProject(projId, taskData) {
    const project = this.#projects.get(projId);

    if (project) {
      project.addTask(taskData);
      this.saveProject(project);
    }
  }

  deleteTaskFromProject(projId, taskId) {
    this.#projects.get(projId).deleteTask(taskId);
  }

  changeDefaultProject(projId) {
    if (this.getProjectById(projId)) {
      this.defaultProjectId = projId;
      localStorage.setItem("default-project", projId);
    } else {
      // WARNING: remove console log for prod
      console.log(
        `no project found with id(${projId}) during change of default project`,
      );
      this.defaultProjectId = null;
      localStorage.setItem("default-project", "null");
    }
  }

  saveProject(proj) {
    const projectIdListJSON = localStorage.getItem("project_ids");
    // console.log(projectIdListJSON);
    let projectIdList;
    if (projectIdListJSON === null) {
      projectIdList = new Set();
    } else {
      projectIdList = new Set(Array.from(JSON.parse(projectIdListJSON)));
    }
    // console.log(projectIdList);
    projectIdList.add(proj.id);
    const projectIdArray = Array.from(projectIdList);

    // console.log(projectIdList);
    localStorage.setItem(`project_ids`, JSON.stringify(projectIdArray));
    localStorage.setItem(`project-${proj.id}`, JSON.stringify(proj));
  }

  loadProjects() {
    const projectIdListJSON = localStorage.getItem("project_ids");
    const projectIdList = JSON.parse(projectIdListJSON);
    console.log(projectIdList);

    projectIdList.forEach((projId) => {
      const projJSON = localStorage.getItem(`project-${projId}`);
      const projData = JSON.parse(projJSON);

      this.createProjectFromJSON(projData);
    });
  }
}
