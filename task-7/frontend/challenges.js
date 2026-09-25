const trackLabels = {
  "web-development": "Web Development",
  "data-analysis": "Data Analysis",
};

const difficultyClass = {
  beginner: "difficulty--beginner",
  "beginner → intermediate": "difficulty--mid",
  intermediate: "difficulty--intermediate",
};

const challenges = [
  {
    id: "da-sales-dashboard",
    name: "Sales Performance Dashboard",
    track: "data-analysis",
    difficulty: "beginner",
    description:
      "Analyze a small monthly sales dataset and turn it into a clear, visual dashboard.",
    outcome:
      "A simple dashboard that shows total sales, top products, and month-over-month trends.",
    objective:
      "Clean a raw sales dataset, then build charts that highlight the most important trends.",
    skills: ["Data cleaning", "Spreadsheet formulas", "Basic charting"],
    tools: ["Google Sheets or Excel", "Chart tools built into your spreadsheet app"],
    estimatedTime: "3–4 hours",
    expectedResult:
      "A one-page dashboard someone could glance at to understand how sales performed that month.",
  },
  {
    id: "da-expense-tracker",
    name: "Expense Tracker Analysis",
    track: "data-analysis",
    difficulty: "beginner",
    description:
      "Work through a messy list of personal or business expenses and organize it into something useful.",
    outcome:
      "A cleaned expense sheet with spending broken down by category and by month.",
    objective:
      "Remove duplicates and inconsistent entries, then categorize expenses to answer 'where is the money going?'",
    skills: ["Data cleaning", "Pivot tables", "Basic categorization logic"],
    tools: ["Google Sheets or Excel"],
    estimatedTime: "2–3 hours",
    expectedResult:
      "A pivot table (or simple chart) showing spending by category, ready to hand to someone else.",
  },
  {
    id: "da-churn-analysis",
    name: "Customer Churn Analysis",
    track: "data-analysis",
    difficulty: "beginner → intermediate",
    description:
      "Look at a customer dataset and figure out which customers are likely to stop using a product.",
    outcome:
      "A short write-up identifying churn patterns, backed by numbers and at least one chart.",
    objective:
      "Use SQL or spreadsheet formulas to segment customers and spot the traits shared by those who churned.",
    skills: ["SQL queries", "Data segmentation", "Basic visualization"],
    tools: ["SQL (SQLite or similar)", "Spreadsheet software for charts"],
    estimatedTime: "4–5 hours",
    expectedResult:
      "A short report: who's churning, what they have in common, and one recommendation to reduce it.",
  },
  {
    id: "da-employee-insights",
    name: "Employee Productivity Insights",
    track: "data-analysis",
    difficulty: "intermediate",
    description:
      "Combine data from two related tables (e.g. employees and their logged tasks) to surface productivity trends.",
    outcome:
      "A combined analysis that joins multiple data sources into one clear set of findings.",
    objective:
      "Practice joining and aggregating data across tables to answer a real business question.",
    skills: ["SQL joins", "Aggregate functions (COUNT, SUM, AVG)", "Reporting"],
    tools: ["SQL (SQLite or similar)", "Spreadsheet or BI tool for the final summary"],
    estimatedTime: "5–6 hours",
    expectedResult:
      "A findings summary with supporting numbers, similar to something you'd hand to a manager.",
  },

  // ---------------- WEB DEVELOPMENT ----------------
  {
    id: "wd-portfolio-site",
    name: "Personal Portfolio Website",
    track: "web-development",
    difficulty: "beginner",
    description:
      "Design and build a simple one-page portfolio site to showcase projects and skills.",
    outcome:
      "A live, responsive portfolio page with an about section, project list, and contact info.",
    objective:
      "Practice structuring a clean single-page site with HTML and CSS from scratch.",
    skills: ["HTML structure", "CSS layout", "Responsive design basics"],
    tools: ["HTML", "CSS"],
    estimatedTime: "3–4 hours",
    expectedResult:
      "A portfolio page that looks good on both desktop and mobile.",
  },
  {
    id: "wd-restaurant-landing",
    name: "Restaurant Landing Page",
    track: "web-development",
    difficulty: "beginner",
    description:
      "Build a landing page for a fictional restaurant, including a menu preview and a way to contact or book.",
    outcome:
      "A visually appealing landing page with a hero section, menu highlights, and a call to action.",
    objective:
      "Practice visual hierarchy and layout for a business-style landing page.",
    skills: ["HTML", "CSS Flexbox/Grid", "Basic responsive design"],
    tools: ["HTML", "CSS"],
    estimatedTime: "3–4 hours",
    expectedResult:
      "A landing page that clearly communicates what the restaurant offers and how to take the next step.",
  },
  {
    id: "wd-product-showcase",
    name: "Product Showcase Page with Filtering",
    track: "web-development",
    difficulty: "beginner → intermediate",
    description:
      "Build a product grid (e.g. a small shop or catalog) where visitors can filter items by category.",
    outcome:
      "A working product page where clicking a category filters the visible items instantly.",
    objective:
      "Practice using JavaScript to filter DOM elements based on user interaction.",
    skills: ["HTML", "CSS Grid", "JavaScript DOM manipulation", "Event listeners"],
    tools: ["HTML", "CSS", "JavaScript"],
    estimatedTime: "4–5 hours",
    expectedResult:
      "A product grid where filters actually narrow down what's shown, with no page reload.",
  },
  {
    id: "wd-interactive-quiz",
    name: "Interactive Quiz Application",
    track: "web-development",
    difficulty: "intermediate",
    description:
      "Build a small multi-question quiz app that tracks the user's score and shows results at the end.",
    outcome:
      "A working quiz: pick an answer, move to the next question, see a final score.",
    objective:
      "Practice managing state in JavaScript across multiple user interactions.",
    skills: [
      "JavaScript logic",
      "State management (plain JS)",
      "DOM manipulation",
      "Event handling",
    ],
    tools: ["HTML", "CSS", "JavaScript"],
    estimatedTime: "5–6 hours",
    expectedResult:
      "A quiz that runs start to finish without bugs and shows a final score screen.",
  },
];

function getChallenges() {
  let course = document.getElementById("challenge-course")
  let diff = document.getElementById('track-diff')
  let results = []
  console.log(course.value)
  if (course.value === 'data-analysis') {
    results = challenges.filter((val) => val.track === 'data-analysis')
    console.log(results)
  } else if (course.value === 'web-development') {
    results = challenges.filter((val) => val.track === 'web-development')
  } else {
    results = [...challenges]
  }

  if (diff.value == 'beginner') {
    return results.filter((element) => element.difficulty === 'beginner')
  } else if (diff.value == 'beginner → intermediate') {
    return results.filter((element) => element.difficulty === 'beginner → intermediate')
  } else if (diff.value == 'intermediate') {
    return results.filter((element)=> element.difficulty === 'intermediate')
  } else {
    return results
  }
}

function renderChallenges(list) {
  const grid = document.getElementById("challengeGrid");

  if (list.length === 0) {
    grid.innerHTML = "<p>No challenges match that filter.</p>";
    return;
  }

  grid.innerHTML = list
    .map(
      (challenge) => `
      <article class="task-card">
        <div class="task-card-top">
          <span class="badge">${trackLabels[challenge.track]}</span>
          <span class="badge ${difficultyClass[challenge.difficulty]}">
            ${challenge.difficulty}
          </span>
        </div>
        <h3>${challenge.name}</h3>
        <p>${challenge.description}</p>
        <p class="program-meta">
          <strong>Expected outcome:</strong> ${challenge.outcome}
        </p>
        <div class="task-card-foot">
          <button class="btn btn-ghost view-challenge-btn" data-id="${challenge.id}">
            View Challenge
          </button>
        </div>
      </article>
    `
    )
    .join("");
}

function returnList () {
  let results = getChallenges()
  return renderChallenges(results)
}

let trackSelect = document.getElementById("challenge-course")
trackSelect.addEventListener('change', returnList)
let diffSelect = document.getElementById("track-diff")
diffSelect.addEventListener('change', returnList)
returnList()