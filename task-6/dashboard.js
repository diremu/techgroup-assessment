function handleUserStatus () {
    const name = document.getElementById('internName')
    name.value = internInfo.name
    const track = document.getElementById('internTrackLine')
    track.value = internInfo.track
    const status = document.getElementById('internStatusText')
    status.value = `Internship status: ${internInfo.status}`
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

function renderTasks(list) {
  const grid = document.getElementById("taskTrackerGrid");
  if (list.length === 0) {
    grid.innerHTML = "<p>No tasks match that filter.</p>";
    return;
  }
  grid.innerHTML = list.map(buildTaskCardHTML).join("");
}

let currentFilter = "all";

function getFilteredTasks() {
  if (currentFilter === "all") return dashboardTasks;
  return dashboardTasks.filter((task) => task.status === currentFilter);
}

function updateProgress() {
  const total = dashboardTasks.length;
  const completed = dashboardTasks.filter(
    (task) => task.status === "completed"
  ).length;
  const remaining = total - completed;
  const percent = (completed / total) * 100
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

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    refreshDashboard();
  });
});

document.getElementById("taskTrackerGrid").addEventListener("click", (event) => {
  const viewBtn = event.target.closest(".view-task-btn");
  if (viewBtn) {
    const task = dashboardTasks.find(
      (t) => t.number === Number(viewBtn.dataset.number)
    );
    if (task) openTaskModal(task);
    return;
  }

  const completeBtn = event.target.closest(".mark-complete-btn");
  if (completeBtn) {
    const task = dashboardTasks.find(
      (t) => t.number === Number(completeBtn.dataset.number)
    );
    const nextTask = dashboardTasks.find(
      (t) => t.number === Number(completeBtn.dataset.number) + 1
    );
    if (task) {
      task.status = "completed";
      if (nextTask) nextTask.status = 'in-progress'
      refreshDashboard();
    }
  }
});

handleUserStatus();
refreshDashboard();