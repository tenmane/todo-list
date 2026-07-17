export { DOMStuff };

const DOMgetter = {
  container: document.querySelector(".content"),
  projectContainer: document.querySelector(".projects-holder"),
}

const DOMStuff = {
  addProject: function (name) {
    const title = document.createElement("h1");
    title.classList.add("project-title");
    title.textContent = name;

    DOMgetter.container.appendChild(title);

    this.listProject(name);
  },
  listProject: function (name) {
    DOMgetter.projectContainer.classList.add("projects-holder");

    const project = document.createElement("li");
    project.classList.add("listed-project");
    project.textContent = name;
    DOMgetter.projectContainer.append(project);
  },
  toggleVisibility: function (container) {
    container.classList.toggle("active");
  }
}

const projectsContainer = document.querySelector(".projects-btn-container");
projectsContainer.addEventListener("click", function () {
  DOMStuff.toggleVisibility(DOMgetter.projectContainer);
});