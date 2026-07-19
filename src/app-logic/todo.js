class CreateTodo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    CreateTodo.todo.push(this);
  }
  static todo = [];
}
const one = new CreateTodo("Gym", "Go to the gym at 8pm", new Date(), "high");

export default CreateTodo.todo;