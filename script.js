let todo = JSON.parse(localStorage.getItem("todo")) || [];

const todoInput = document.getElementById("todoInput");
const taskForm = document.getElementById("taskForm");
const taskPriority = document.getElementById("taskPriority");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const deleteButton = document.getElementById("deleteButton");

document.addEventListener("DOMContentLoaded", () => {
  taskForm.addEventListener("submit", addTask);
  deleteButton.addEventListener("click", deleteAllTasks);
  displayTasks();
});


function addTask(event) {
  event.preventDefault();
  const title = todoInput.value.trim();
  const priority = taskPriority.value;
  const status = document.querySelector('input[name="status"]:checked').value;

  if (title && priority && status) {
    todo.push({ title, priority, status });
    saveToLocalStorage();
    taskForm.reset();
    displayTasks();
  }
}


function displayTasks() {
    todoList.innerHTML = "";
  
    todo.forEach((item, index) => {
      const li = document.createElement("li");
      li.className = `todo-container ${item.priority}`;
      
      li.innerHTML = `
        <span class="task-text flex-grow-1 ${item.status === "completed" ? "disabled" : ""}">
          ${index + 1}. ${item.title} (${item.priority}, ${item.status})
        </span>
        <div class="d-flex gap-2">
          <button class="btn btn-sm btn-success complete-btn">
            ${item.status === "completed" ? "Undo" : "Complete"}
          </button>
          <button class="btn btn-sm btn-danger remove-btn">Remove</button>
        </div>
      `;
  
    
      li.querySelector(".complete-btn").addEventListener("click", () => toggleComplete(index));
  
    
      li.querySelector(".remove-btn").addEventListener("click", () => removeTask(index));
  
    
      li.querySelector(".task-text").addEventListener("click", () => editTask(index));
  
      todoList.appendChild(li);
    });
  
    todoCount.textContent = todo.length;
  }
  

function toggleComplete(index) {
  todo[index].status = todo[index].status === "completed" ? "pending" : "completed";
  saveToLocalStorage();
  displayTasks();
}


function removeTask(index) {
  todo.splice(index, 1);
  saveToLocalStorage();
  displayTasks();
}


function editTask(index) {
  const li = todoList.children[index];
  const textSpan = li.querySelector(".task-text");
  const input = document.createElement("input");
  input.type = "text";
  input.value = todo[index].title;
  input.classList.add("form-control");
  textSpan.replaceWith(input);
  input.focus();

  input.addEventListener("blur", () => {
    const newText = input.value.trim();
    if (newText) {
      todo[index].title = newText;
      saveToLocalStorage();
    }
    displayTasks();
  });
}


function deleteAllTasks() {
  todo = [];
  saveToLocalStorage();
  displayTasks();
}

function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}

