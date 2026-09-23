const internInfo = {
  name: "Diremu",
  track: "Web Development Intern",
  status: "In Progress",
};

const dashboardTasks = [
  {
    number: 1,
    title: "TechBridge Homepage",
    description:
      "The first version of the TechBridge website — hero, about, programs teaser, internship band, community and contact sections.",
    status: "completed",
  },
  {
    number: 2,
    title: "TechBridge Programs Experience",
    description:
      "A dedicated Programs page covering the Data Analytics and Web Development tracks, with skills and a clear differentiation between the two.",
    status: "completed",
  },
  {
    number: 3,
    title: "Internship Tasks Experience",
    description:
      "A page walking through the 8-task, 30-day internship journey with day and difficulty progression.",
    status: "completed",
  },
  {
    number: 4,
    title: "Interactive Internship Roadmap",
    description:
      "Turned the tasks page into a two-track switcher — Data Analytics vs. Web Development — powered by vanilla JavaScript.",
    status: "completed",
  },
  {
    number: 5,
    title: "Challenge Hub",
    description:
      "A browsable set of practical challenges across both tracks, filterable by track and difficulty.",
    status: "completed",
  },
  {
    number: 6,
    title: "Intern Dashboard",
    description:
      "This page — progress tracking, an interactive task tracker, a Challenge Hub connector, and a technology explorer.",
    status: "in-progress",
  },
  {
    number: 7,
    title: "Task Submission System",
    description:
      "An interface for interns to prepare and submit completed task work.",
    status: "not-started",
  },
  {
    number: 8,
    title: "Complete TechBridge Platform",
    description:
      "Combine everything built during the internship into one complete, connected TechBridge platform.",
    status: "not-started",
  },
];

const techTopics = {
  nextjs: {
    label: "Next.js",
    summary:
      "Next.js is a React framework used for building fast, production-ready web applications.",
    detail:
      "It adds routing, server-side rendering, and image/font optimization on top of React, so teams don't have to wire all of that up by hand. It's commonly used for marketing sites, dashboards, and full products that need to load quickly and rank well in search.",
  },
  vue: {
    label: "Vue.js",
    summary:
      "Vue.js is a JavaScript framework for building interactive user interfaces.",
    detail:
      "It's known for being approachable — you can drop it into an existing page or build a full single-page app with it. Developers often reach for Vue when they want React-like component structure with a gentler learning curve.",
  },
  angular: {
    label: "Angular",
    summary:
      "Angular is a full-featured framework for building large, structured web applications.",
    detail:
      "Built and maintained by Google, it comes with routing, forms handling, and state management built in, rather than requiring separate libraries. It's commonly used in enterprise applications where a consistent, opinionated structure across a large team matters.",
  },
  backend: {
    label: "Backend",
    summary:
      "Backend development is the server-side logic that powers what the frontend displays.",
    detail:
      "While the frontend (HTML/CSS/JS) handles what a visitor sees and clicks, the backend handles data storage, business logic, authentication, and talking to databases — then sends the frontend what it needs, usually as JSON over an API.",
    tools: ["Node.js", "Express.js", "Django", "Flask", "Laravel", ".NET"],
  },
};