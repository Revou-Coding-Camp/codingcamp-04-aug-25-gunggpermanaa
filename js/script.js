const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const filter = document.getElementById("filter");
const filterDate = document.getElementById("filter-date");

let tasks = [];

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

filter.addEventListener("change", handleFilterChange);
filterDate.addEventListener("change", renderTasks);

function addTask() {
  const text = taskInput.value.trim();
  const date = dateInput.value;

  if (!text || !date) {
    alert("Please enter task and date!");
    return;
  }

  tasks.push({
    text,
    date,
    completed: false,
  });

  taskInput.value = "";
  dateInput.value = "";
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";
  const filtered = getFilteredTasks();

  filtered.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task-item";
    if (task.completed) li.classList.add("completed");

    const infoDiv = document.createElement("div");
    infoDiv.className = "task-info";

    const textSpan = document.createElement("div");
    textSpan.className = "task-text";
    textSpan.textContent = task.text;

    const dateSpan = document.createElement("div");
    dateSpan.className = "task-date";
    dateSpan.textContent = `Due: ${task.date}`;

    infoDiv.appendChild(textSpan);
    infoDiv.appendChild(dateSpan);

    const btnDiv = document.createElement("div");
    btnDiv.className = "task-buttons";

    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';
    completeBtn.onclick = () => {
      task.completed = !task.completed;
      renderTasks();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      renderTasks();
    };

    btnDiv.appendChild(completeBtn);
    btnDiv.appendChild(deleteBtn);

    li.appendChild(infoDiv);
    li.appendChild(btnDiv);

    taskList.appendChild(li);
  });
}

function handleFilterChange() {
  if (filter.value === "by-date") {
    filterDate.style.display = "block";
  } else {
    filterDate.style.display = "none";
    renderTasks();
  }
}

function getFilteredTasks() {
  const today = new Date().toISOString().slice(0, 10);

  switch (filter.value) {
    case "completed":
      return tasks.filter((t) => t.completed);
    case "pending":
      return tasks.filter((t) => !t.completed);
    case "today":
      return tasks.filter((t) => t.date === today);
    case "by-date":
      return tasks.filter((t) => t.date === filterDate.value);
    default:
      return tasks;
  }
}
