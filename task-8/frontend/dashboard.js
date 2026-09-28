function handleUserStatus() {
  document.getElementById("internName").textContent = internInfo.name;
  document.getElementById("internTrackLine").textContent = internInfo.track;
  document.getElementById("internStatusText").textContent =
    `Internship Status: ${internInfo.status}`;
}

const statusClass = {
  completed: "status--completed",
  "in-progress": "status--current",
  "not-started": "status--upcoming",
};

const statusLabel = {
  completed: "Completed",
  "in-progress": "In Progress",
  "not-started": "Not Started",
};

const API_BASE = "https://techgroup-backend-real.onrender.com/api/tasks";

let dashboardTasks = [];
let currentFilter = "all";

function buildTaskCardHTML(task) {
  const isCompleted = task.status === "completed";

  return `
    <article class="task-card">
      <div class="task-card-top">
        <span class="task-number">Task ${task.number}</span>
        <span class="badge ${statusClass[task.status]}">
          <span class="badge-dot"></span>${statusLabel[task.status]}
        </span>
      </div>
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <div class="task-card-foot">
        <button class="btn btn-ghost view-task-btn" data-number="${task.number}">
          View Task
        </button>
        ${
          !isCompleted
            ? `<button class="btn btn-primary mark-complete-btn" data-number="${task.number}">
                 Mark as Completed
               </button>`
            : ""
        }
      </div>
    </article>
  `;
}

function getFilteredTasks() {
  if (currentFilter === "all") return dashboardTasks;
  return dashboardTasks.filter((task) => task.status === currentFilter);
}

function renderTasks(list) {
  const grid = document.getElementById("taskTrackerGrid");
  if (list.length === 0) {
    grid.innerHTML = "<p>No tasks match that filter.</p>";
    return;
  }
  grid.innerHTML = list.map(buildTaskCardHTML).join("");
}

function updateProgress() {
  const total = dashboardTasks.length;
  const completed = dashboardTasks.filter((t) => t.status === "completed").length;
  const remaining = total - completed;
  const percent = total === 0 ? 0 : (completed / total) * 100;

  document.getElementById("completedCount").textContent = completed;
  document.getElementById("remainingCount").textContent = remaining;
  document.getElementById("progressPercent").textContent = `${percent}%`;
  document.getElementById("progressBarFill").style.width = `${percent}%`;
  document.getElementById("progressBar").setAttribute("aria-valuenow", percent);
}

function refreshDashboard() {
  renderTasks(getFilteredTasks());
  updateProgress();
}

function openTaskModal(task) {
  const modal = document.getElementById("taskModal");
  document.getElementById("modalTaskNumber").textContent = `Task ${task.number}`;
  document.getElementById("modalTaskTitle").textContent = task.title;
  document.getElementById("modalTaskDescription").textContent = task.description;

  const statusEl = document.getElementById("modalTaskStatus");
  statusEl.textContent = statusLabel[task.status];
  statusEl.className = `badge ${statusClass[task.status]}`;

  modal.hidden = false;
}

function closeTaskModal() {
  document.getElementById("taskModal").hidden = true;
}

document.getElementById("taskModal").addEventListener("click", (event) => {
  if (event.target.closest("[data-modal-close]")) closeTaskModal();
});

document.addEventListener("keydown", (event) => {
  const modal = document.getElementById("taskModal");
  if (event.key === "Escape" && !modal.hidden) closeTaskModal();
});

async function loadTasks() {
  document.getElementById("taskTrackerGrid").innerHTML = "<p>Loading tasks...</p>";

  const slowLoadTimer = setTimeout(() => {
    document.getElementById("taskTrackerGrid").innerHTML =
      "<p>Still loading — the server may be waking up from sleep, this can take up to a minute.</p>";
  }, 5000);

  try {
    const response = await fetch(API_BASE);
    clearTimeout(slowLoadTimer);
    if (!response.ok) throw new Error(`Server responded with ${response.status}`);

    dashboardTasks = await response.json();
    refreshDashboard();
  } catch (error) {
    clearTimeout(slowLoadTimer);
    console.error(error);
    document.getElementById("taskTrackerGrid").innerHTML =
      "<p>Unable to load tasks. Please check your connection or try again.</p>";
  }
}

async function updateTaskStatus(number, status) {
  const response = await fetch(`${API_BASE}/${number}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error(`Server responded with ${response.status}`);
  return response.json();
}

function applyTaskUpdate(updatedTask) {
  const index = dashboardTasks.findIndex((t) => t.number === updatedTask.number);
  if (index !== -1) dashboardTasks[index] = updatedTask;
}

async function handleViewTask(number) {
  try {
    const response = await fetch(`${API_BASE}/${number}`);
    if (!response.ok) throw new Error(`Server responded with ${response.status}`);
    openTaskModal(await response.json());
  } catch (error) {
    console.error(error);
    alert("Unable to load task details. Please try again.");
  }
}

async function handleMarkComplete(number) {
  try {
    applyTaskUpdate(await updateTaskStatus(number, "completed"));
    const nextTask = dashboardTasks.find((t) => t.number === number + 1);
    if (nextTask && nextTask.status === "not-started") {
      applyTaskUpdate(await updateTaskStatus(nextTask.number, "in-progress"));
    }

    refreshDashboard();
  } catch (error) {
    console.error(error);
    alert("Unable to update task. Please try again.");
  }
}

document.getElementById("taskTrackerGrid").addEventListener("click", (event) => {
  const viewBtn = event.target.closest(".view-task-btn");
  if (viewBtn) return handleViewTask(Number(viewBtn.dataset.number));

  const completeBtn = event.target.closest(".mark-complete-btn");
  if (completeBtn) handleMarkComplete(Number(completeBtn.dataset.number));
});

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    refreshDashboard();
  });
});

function buildTechPanelHTML(topic) {
  const toolsHTML = topic.tools
    ? `<ul class="tech-tools">${topic.tools.map((tool) => `<li>${tool}</li>`).join("")}</ul>`
    : "";

  return `
    <h3>${topic.label}</h3>
    <p>${topic.summary}</p>
    <p>${topic.detail}</p>
    ${toolsHTML}
  `;
}

function renderTechPanel(techKey) {
  const topic = techTopics[techKey];
  if (!topic) return;

  document.getElementById("techPanel").innerHTML = buildTechPanelHTML(topic);

  document.querySelectorAll(".tech-btn").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.tech === techKey);
  });
}

document.getElementById("techButtons").addEventListener("click", (event) => {
  const btn = event.target.closest(".tech-btn");
  if (btn) renderTechPanel(btn.dataset.tech);
});

renderTechPanel("nextjs");
handleUserStatus();
loadTasks();