const form = document.getElementById("add_form");

function addTodo() {
  form.classList.toggle("open-form");
  document.getElementById("add_form").focus();
}

form.addEventListener("keypress", (e) => {
  const date = new Date().toISOString();
  const input = document.getElementById("add_form").value;
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  const dataTodo = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 0,
    date,
    input,
  };
  if (e.key === "Enter") {
    e.preventDefault();
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(dataTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
    addTodos();
    document.getElementById("add_form").value = "";
  }
});

function deleteTodo(id) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const index = todos.findIndex((todo) => todo.id === parseInt(id, 10));
  if (index !== -1) {
    todos.splice(index, 1);
  }
  localStorage.setItem("todos", JSON.stringify(todos));
  addTodos();
}

function done(id) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach((todo) => {
    if (todo.id === parseInt(id, 10)) {
      todo.done = !todo.done;
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
  addTodos();
}
const addTodos = () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const todSort = todos.sort((b, a) => {
    return new Date(a.date) - new Date(b.date);
  });
  // console.log("🚀 ~ addTodos ~ todos:", todSort);
  const list = document.getElementById("todos");
  list.innerHTML = "";
  todSort.forEach((todo, n) => {
    // let classDone = todo.done ? "done" : "";
    // let classDoneTodo = todo.done ? "done-todo" : "";
    list.innerHTML += `
    <li class="${todo.done ? "done-list" : ""}">
      <div class="head">
        <span key="${todo.id}" class="${
      todo.done ? "done" : ""
    }" onclick="done(${todo.id})"></span>
        <b class="${todo.done ? "done-todo" : ""}">${todo.input}</b>
      </div>
      <button id="${todo.id}" onclick="deleteTodo(${
      todo.id
    })" >&#10006;</button>
    </li>`;
  });
};

window.addEventListener("load", addTodos);
