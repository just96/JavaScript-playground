"use strict";

// querySelector
const input = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const time = document.querySelector("#current-time");
const btnAdd = document.querySelector("#add-btn");
const btnClear = document.querySelector(".btn.btn-warning");
const alert = document.querySelector(".alert.alert-warning");

let arrTask = [];
let arrDates = [];

// Load localStorage tasks
const savedTasks = localStorage.getItem("tasks");
const savedDates = localStorage.getItem("createdDate");
if (savedTasks && savedDates) {
  arrTask = JSON.parse(savedTasks);
  arrDates = JSON.parse(savedDates);
}

// Save tasks on local Storage
function saveTasksLocal() {
  localStorage.setItem("tasks", JSON.stringify(arrTask));
  localStorage.setItem("createdDate", JSON.stringify(arrDates));
}

// formatTime
function formatTime(date) {
  const hours = `${date.getHours()}`.padStart(2, "0");
  const min = `${date.getMinutes()}`.padStart(2, "0");
  const seconds = `${date.getSeconds()}`.padStart(2, "0");
  return `${hours}:${min}:${seconds}`;
}

// Clock
function updateTime() {
  const now = new Date();
  time.textContent = formatTime(now);
}

// Update TODO list
const updateTodoList = () => {
  todoList.textContent = "";

  // If there are no tasks
  if (arrTask.length === 0) {
    todoList.innerHTML = `<li class="text-muted">No tasks at the moment...</li>`;
    return;
  }
  const timeFormatter = new Intl.DateTimeFormat("pt-PT", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  arrTask.forEach((task, i) => {
    const date = new Date(arrDates[i]);
    const timeStr = timeFormatter.format(date);

    // show tasks
    const li = document.createElement("li");
    li.classList.add("list-group-item", "highlight");
    li.textContent = `Task nº ${i + 1}: ${task} (created at: ${timeStr})`;

    // editButton
    const btnEdit = document.createElement("button");
    btnEdit.innerHTML = `<i class="bi bi-pencil-square"></i>`;
    btnEdit.classList.add("btn", "btn-edit");
    btnEdit.title = "Edit task";
    btnEdit.setAttribute("aria-label", "Edit task");

    // btnEdit event
    btnEdit.addEventListener("click", () => {
      let editInput = prompt("Enter your updated task", task);
      if (editInput === null) editInput = task;
      arrTask.splice(i, 1, editInput);
      saveTasksLocal();
      updateTodoList();
    });

    // deleteButton
    const btnDelete = document.createElement("button");
    btnDelete.innerHTML = `<i class="bi bi-trash"></i>`;
    btnDelete.classList.add("btn", "btn-danger", "ms-2");
    btnDelete.title = "Delete task";
    btnDelete.style.marginLeft = "100px";
    btnDelete.setAttribute("aria-label", "Delete task");

    // btnDelete event
    btnDelete.addEventListener("click", () => {
      if (window.confirm("Do you want to delete this task?")) {
        arrTask.splice(i, 1);
        arrDates.splice(i, 1);
        saveTasksLocal();
        updateTodoList();
      }
    });

    // add btnDelete to li
    li.appendChild(btnEdit);
    li.appendChild(btnDelete);

    // add li to todolist
    todoList.appendChild(li);
  });
};

// Add task
const addTask = () => {
  const task = input.value.trim();
  if (task && !arrTask.includes(task)) {
    // add task
    arrTask.push(task);
    arrDates.push(new Date().toISOString());
    // localStorage
    saveTasksLocal();
    input.value = "";
    input.focus();
    updateTodoList();
  } else if (task === "") {
    // Alert - Write a task!
    showAlert("Write a task!");
  } else {
    showAlert("Task already exists on the list!");
  }
};

// Clear all list
const clearAll = () => {
  arrTask.length = 0;
  arrDates.length = 0;
  saveTasksLocal();
  updateTodoList();
  showAlert("List cleared!");
};

// Alerts
function showAlert(message, duration = 1500) {
  alert.textContent = message;
  alert.classList.remove("hidden");
  setTimeout(() => {
    alert.classList.add("hidden");
    input.focus();
  }, duration);
}

// Event listeners
btnAdd.addEventListener("click", (e) => {
  e.preventDefault();
  addTask();
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addTask();
  }
});

btnClear.addEventListener("click", (e) => {
  e.preventDefault();
  if (arrTask.length === 0) {
    showAlert("There is no TODO List!");
  } else if (window.confirm("Do you want to delete all your TODO List?")) clearAll();
});

// Init
updateTodoList();
updateTime();
setInterval(updateTime, 1000);
