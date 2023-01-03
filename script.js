const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-add-button");
const todoContainer = document.querySelector(".container-todo");
const list = document.querySelector(".list");
const filter = document.querySelector(".filter");
const option = document.querySelector("option");

document.addEventListener("DOMContentLoaded", getLocalData);
todoButton.addEventListener("click", addTodo);
todoContainer.addEventListener("click", deleteCheck);
filter.addEventListener("click", handleFilter);

function handleFilter(e) {
  const todos = list.childNodes;
  console.log(todos);
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("line")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("line")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}

function deleteCheck(e) {
  const item = e.target;
  //   console.log(item.classList);
  if (item.classList.value === "trash") {
    const todo = item.parentElement;
    const parent = todo.parentElement;
    parent.classList.add("fall");
    removeItem(todo);
    parent.addEventListener("transitionend", function () {
      parent.remove();
    });
    console.log(parent);
    // parent.remove();
  }
  if (item.classList.value === "check") {
    const checked = item.parentElement;
    const checkedParent = checked.parentElement;
    checkedParent.classList.toggle("line");
    console.log(checkedParent);
  }
}

function addTodo(event) {
  // preventing default
  event.preventDefault();
  console.log("test");
  //creating a todo container div
  const newTodo = document.createElement("div");
  newTodo.classList.add("todo");
  list.appendChild(newTodo);
  // create a text for todo
  const todoText = document.createElement("li");
  todoText.innerText = `${todoInput.value}`;
  saveLocalStorage(todoInput.value);
  todoInput.value = "";
  newTodo.appendChild(todoText);
  // adding action icons check and trash
  const icons = document.createElement("div");
  icons.classList.add("icons");
  newTodo.appendChild(icons);
  // adding icon check
  const check = document.createElement("button");
  check.innerHTML = '<i class="fa-solid fa-check"></i>';
  check.classList.add("check");
  icons.appendChild(check);
  // adding icon trash
  const trash = document.createElement("button");
  trash.innerHTML = '<i class="fa-solid fa-trash"></i>';
  trash.classList.add("trash");
  icons.appendChild(trash);
}

function saveLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalData() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    console.log("test");
    //creating a todo container div
    const newTodo = document.createElement("div");
    newTodo.classList.add("todo");
    list.appendChild(newTodo);
    // create a text for todo
    const todoText = document.createElement("li");
    todoText.innerText = todo;
    newTodo.appendChild(todoText);
    // adding action icons check and trash
    const icons = document.createElement("div");
    icons.classList.add("icons");
    newTodo.appendChild(icons);
    // adding icon check
    const check = document.createElement("button");
    check.innerHTML = '<i class="fa-solid fa-check"></i>';
    check.classList.add("check");
    icons.appendChild(check);
    // adding icon trash
    const trash = document.createElement("button");
    trash.innerHTML = '<i class="fa-solid fa-trash"></i>';
    trash.classList.add("trash");
    icons.appendChild(trash);
  });
}

function removeItem(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.parentElement.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
