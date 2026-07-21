export function saveProject(projects) {
  localStorage.setItem("projects", JSON.stringify(projects));
}
export function loadProjects() {
  let projects = [];
  if (localStorage.projects != null) {
    projects = JSON.parse(localStorage.getItem("projects"));
  }
  return projects;
}