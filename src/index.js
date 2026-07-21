import "./reset.css";
import "./style.css";
import { loadProjects } from "./app-logic/local-storage.js";
import { getProjects, makeProject } from "./app-logic/project.js";
import "./app-logic/todo.js";
import { ProjectDOM } from "./dom/DOMControl.js";


const projects = loadProjects();
getProjects().push(...projects);
projects.forEach(project => ProjectDOM.listProject(project.name));
ProjectDOM.displayProject(projects[0]);
