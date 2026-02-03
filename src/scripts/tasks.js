// Task List Section
// Buttons
const addTaskButton = document.getElementById("addTaskButton");
const editTaskButton = document.getElementById("editTaskButton");
const deleteTaskButton = document.getElementById("deleteTaskButton");

// Progress Bar
const progressLabel = document.getElementById("progressLabel");
const progressFill = document.getElementById("progressFill");

// Task Lists
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let selectedTask = null;

/* ----------- Progress Update Function ----------- */
function statsProgress() {
  const tasks = taskList.querySelectorAll("li");
  const finishedTasks = taskList.querySelectorAll("input:checked").length;

  progressLabel.textContent = `${finishedTasks} of ${tasks.length} done`;
  progressFill.value =
    tasks.length === 0 ? 0 : (finishedTasks / tasks.length) * 100;
}

/* ----------- Add Task Function ----------- */
addTaskButton.addEventListener("click", () => {
  const checkTaskInput = taskInput.value.trim();
  if (!checkTaskInput) return;

  const createList = document.createElement("li");
  createList.classList.add("task-item");

  const createCheckBox = document.createElement("input");
  createCheckBox.type = "checkbox";

  const createSpan = document.createElement("span");
  createSpan.classList.add("task-text");
  createSpan.textContent = checkTaskInput;

  createList.addEventListener("click", () => {
    document
      .querySelectorAll(".task-item")
      .forEach((t) => t.classList.remove("active"));
    createList.classList.add("active");
    selectedTask = createList;
  });

  createCheckBox.addEventListener("change", () => {
    createList.classList.toggle("checked", createCheckBox.checked);
    statsProgress();
  });

  taskList.appendChild(createList);
  createList.appendChild(createCheckBox);
  createList.appendChild(createSpan);

  taskInput.value = "";
  statsProgress();
});

/* ----------- Edit Task Function ----------- */
editTaskButton.addEventListener("click", () => {
  if (!selectedTask) return;

  const editSpan = selectedTask.querySelector(".task-text");
  const newText = prompt("Edit Task:", editSpan.textContent);

  if (newText !== null && newText.trim()) {
    editSpan.textContent = newText.trim();
  }

  selectedTask.classList.remove("active");
});

/* ----------- Delete Task Function ----------- */
deleteTaskButton.addEventListener("click", () => {
  if (!selectedTask) return;

  selectedTask.classList.add("deleting");

  setTimeout(() => {
    selectedTask.remove();
    selectedTask = null;
    statsProgress();
  }, 200);
});
