export { DOMStuff };

const DOMgetter = {
  container: document.querySelector(".content"),
}

const DOMStuff = {
  addProject: function (name) {
    const title = document.createElement("h1");
    title.classList.add("project-title");
    title.textContent = name;
    DOMgetter.container.appendChild(title);
  }
}