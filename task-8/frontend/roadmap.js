(function () {
  "use strict";

  const dataAnalyticsTasks = [
    {
      number: 1,
      title: "Data Cleaning Basics",
      day: 1,
      description:
        "Clean a messy dataset using Google Sheets or Excel. Identify and fix duplicate rows, blank cells, inconsistent formatting, and incorrect data types.",
      diffClass: "difficulty--beginner",
      diffLabel: "Beginner",
    },
    {
      number: 2,
      title: "Formulas & Pivot Tables",
      day: 4,
      description:
        "Use spreadsheet formulas and Pivot Tables to answer questions and extract useful insights from a dataset.",
      diffClass: "difficulty--beginner",
      diffLabel: "Beginner",
    },
    {
      number: 3,
      title: "Data Visualization",
      day: 8,
      description:
        "Create charts and a simple dashboard that communicate useful insights from a dataset.",
      diffClass: "difficulty--mid",
      diffLabel: "Beginner → Intermediate",
    },
    {
      number: 4,
      title: "Introduction to SQL",
      day: 11,
      description:
        "Practice basic SQL queries and use them to answer real-world questions about data.",
      diffClass: "difficulty--mid",
      diffLabel: "Beginner → Intermediate",
    },
    {
      number: 5,
      title: "SQL Joins & Aggregations",
      day: 15,
      description:
        "Use JOIN, GROUP BY and aggregate functions such as COUNT, SUM and AVG to analyze information across multiple tables.",
      diffClass: "difficulty--intermediate",
      diffLabel: "Intermediate",
    },
    {
      number: 6,
      title: "Lookup Functions & Data Wrangling",
      day: 19,
      description:
        "Use VLOOKUP or XLOOKUP to combine related datasets and handle data mismatches.",
      diffClass: "difficulty--intermediate",
      diffLabel: "Intermediate",
    },
    {
      number: 7,
      title: "Mini Analysis Project",
      day: 22,
      description:
        "Complete a small end-to-end analysis involving data cleaning, formulas, Pivot Tables, charts and recommendations.",
      diffClass: "difficulty--intermediate",
      diffLabel: "Intermediate",
    },
    {
      number: 8,
      title: "Capstone Project",
      day: 26,
      description:
        "Complete a larger project combining spreadsheet analysis and SQL using at least two related tables.",
      diffClass: "difficulty--intermediate",
      diffLabel: "Intermediate",
    },
  ];

  const webDevelopmentTasks = [
    {
      number: 1,
      title: "Build the TechBridge Homepage",
      day: 1,
      description:
        "Create the first version of the TechBridge website using HTML and CSS.",
      diffClass: "difficulty--beginner",
      diffLabel: "Beginner",
      status: "completed",
    },
    {
      number: 2,
      title: "Build the TechBridge Programs Experience",
      day: 4,
      description:
        "Create a Programs experience presenting TechBridge's available learning programs.",
      diffClass: "difficulty--beginner",
      diffLabel: "Beginner",
      status: "completed",
    },
    {
      number: 3,
      title: "Build the Internship Tasks Experience",
      day: 8,
      description:
        "Create an interface that presents the TechBridge internship tasks and helps users understand the internship journey.",
      diffClass: "difficulty--mid",
      diffLabel: "Beginner → Intermediate",
      status: "completed",
    },
    {
      number: 4,
      title: "Build an Interactive Internship Roadmap",
      day: 11,
      description:
        "Use JavaScript to allow visitors to switch between the Data Analytics and Web Development internship tracks.",
      diffClass: "difficulty--mid",
      diffLabel: "Beginner → Intermediate",
      status: "current",
    },
    {
      number: 5,
      title: "Build the Intern Registration Experience",
      day: 15,
      description:
        "Create a professional registration and onboarding interface for TechBridge interns.",
      diffClass: "difficulty--intermediate",
      diffLabel: "Intermediate",
      status: "upcoming",
    },
    {
      number: 6,
      title: "Build the Task Submission System",
      day: 19,
      description:
        "Create an interface through which interns can prepare and submit their task work.",
      diffClass: "difficulty--intermediate",
      diffLabel: "Intermediate",
      status: "upcoming",
    },
    {
      number: 7,
      title: "Build the Intern Dashboard",
      day: 22,
      description:
        "Create a dashboard where an intern can view their profile, progress, tasks and submissions.",
      diffClass: "difficulty--intermediate",
      diffLabel: "Intermediate",
      status: "upcoming",
    },
    {
      number: 8,
      title: "Build the Complete TechBridge Internship Platform",
      day: 26,
      description:
        "Combine the different components created during the internship into a complete TechBridge platform.",
      diffClass: "difficulty--intermediate",
      diffLabel: "Intermediate",
      status: "upcoming",
    },
  ];

  const tracks = {
    "data-analytics": {
      label: "Data Analytics",
      tasks: dataAnalyticsTasks,
    },
    "web-development": {
      label: "Web Development",
      tasks: webDevelopmentTasks,
    },
  };

  const statusLabels = {
    completed: "Completed",
    current: "You are here",
    upcoming: "Upcoming",
  };

  let currentTrack = "data-analytics";

  const taskGrid = document.getElementById("taskGrid");
  const currentTrackLabel = document.getElementById("currentTrackLabel");
  const trackButtons = document.querySelectorAll(".track-btn");

  function buildTaskCardHTML(task) {
    const isCurrent = task.status === "current";
    const cardClass = "task-card" + (isCurrent ? " task-card--current" : "");

    let statusBadgeHTML = "";
    if (task.status) {
      statusBadgeHTML =
        '<span class="badge status--' +
        task.status +
        '"><span class="badge-dot"></span>' +
        statusLabels[task.status] +
        "</span>";
    }

    return (
      '<article class="' +
      cardClass +
      '">' +
      '<div class="task-card-top">' +
      '<span class="task-number">Task ' +
      task.number +
      "</span>" +
      '<span class="task-day">Day ' +
      task.day +
      "</span>" +
      "</div>" +
      "<h3>" +
      task.title +
      "</h3>" +
      "<p>" +
      task.description +
      "</p>" +
      '<div class="task-card-foot">' +
      '<span class="badge ' +
      task.diffClass +
      '">' +
      task.diffLabel +
      "</span>" +
      statusBadgeHTML +
      "</div>" +
      "</article>"
    );
  }

  // Renders every task for a given track into the page.
  function renderTasks(trackKey) {
    const track = tracks[trackKey];
    if (!track) return;

    taskGrid.innerHTML = track.tasks.map(buildTaskCardHTML).join("");

    currentTrackLabel.textContent = track.label;

    trackButtons.forEach(function (button) {
      const isActive = button.dataset.track === trackKey;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function selectTrack(trackKey) {
    if (trackKey === currentTrack) return;
    currentTrack = trackKey;
    renderTasks(currentTrack);
  }
  trackButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      selectTrack(button.dataset.track);
    });
  });
  renderTasks(currentTrack);
})();