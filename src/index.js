import "./reset.css";
import "./style.css";
import { loadProjects } from "./app-logic/local-storage.js";
import { CreateProject } from "./app-logic/project.js";
import "./app-logic/todo.js";
import { ProjectDOM } from "./dom/DOMControl.js";


const projects = loadProjects();
CreateProject.projects.push(...projects);
projects.forEach(project => ProjectDOM.listProject(project.name));