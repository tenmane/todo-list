import { DOMStuff } from "../dom/DOMControl.js";

class createProject {
  constructor(name) {
    this.name = name;
  }
  addProject() {
    DOMStuff.addProject(this.name);
  }
}

const defaultProject = new createProject("Default");
const proj2 = new createProject("Yer");
const proj3 = new createProject("Yer");
defaultProject.addProject();
proj2.addProject();
proj3.addProject();