import { saveProject } from "./local-storage.js";

class CreateProject {
  constructor(name) {
    this.name = name;
    this.todos = [];
    this.id = crypto.randomUUID();
    CreateProject.projects.push(this);
  }
  static getProjects() {
    return this.projects;
  }
  static projects = [];
}

export function makeProject(name) {
  const project = new CreateProject(name);
  saveProject(CreateProject.projects);
  return project;
}

export function getProjects() {
  return CreateProject.getProjects();
}

