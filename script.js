const authScreen = document.getElementById("auth-screen");
const dashboardScreen = document.getElementById("dashboard-screen");
const loginTab = document.getElementById("login-tab");
const signupTab = document.getElementById("signup-tab");
const authForm = document.getElementById("auth-form");
const authSubmit = document.getElementById("auth-submit");
const googleLogin = document.getElementById("google-login");
const logoutBtn = document.getElementById("logout-btn");
const navItems = document.querySelectorAll(".nav-item");
const mainTitle = document.getElementById("main-title");
const searchInput = document.getElementById("search-input");
const filterSelect = document.getElementById("filter-select");
const coursesGrid = document.getElementById("courses-grid");
const myCoursesGrid = document.getElementById("my-courses-grid");
const homeSection = document.getElementById("home-section");
const myCoursesSection = document.getElementById("my-courses-section");
const progressSection = document.getElementById("progress-section");
const profileSection = document.getElementById("profile-section");
const progressOverview = document.getElementById("progress-overview");
const profileForm = document.getElementById("profile-form");
const profileEmailInput = document.getElementById("profile-email");

// Simple course data
const courses = [
  {
    id: 1,
    title: "Python Programming",
    level: "beginner",
    duration: "40 hrs",
    progress: 65,
    fee: "₹3,999",
    colorClass: "thumb-blue",
    initial: "Py",
  },
  {
    id: 2,
    title: "Java Basics",
    level: "beginner",
    duration: "32 hrs",
    progress: 40,
    fee: "₹3,499",
    colorClass: "thumb-orange",
    initial: "J",
  },
  {
    id: 3,
    title: "Web Development",
    level: "intermediate",
    duration: "50 hrs",
    progress: 55,
    fee: "₹5,999",
    colorClass: "thumb-green",
    initial: "W",
  },
  {
    id: 4,
    title: "Data Structures",
    level: "intermediate",
    duration: "45 hrs",
    progress: 30,
    fee: "₹4,999",
    colorClass: "thumb-purple",
    initial: "DS",
  },
  {
    id: 5,
    title: "English Communication",
    level: "beginner",
    duration: "25 hrs",
    progress: 80,
    fee: "₹2,499",
    colorClass: "thumb-pink",
    initial: "En",
  },
  {
    id: 6,
    title: "Aptitude & Logical Reasoning",
    level: "beginner",
    duration: "30 hrs",
    progress: 20,
    fee: "₹2,999",
    colorClass: "thumb-blue",
    initial: "Ap",
  },
  {
    id: 7,
    title: "C++ for DSA",
    level: "advanced",
    duration: "55 hrs",
    progress: 10,
    fee: "₹6,499",
    colorClass: "thumb-green",
    initial: "C++",
  },
  {
    id: 8,
    title: "Frontend Projects Lab",
    level: "intermediate",
    duration: "36 hrs",
    progress: 50,
    fee: "₹4,299",
    colorClass: "thumb-orange",
    initial: "UI",
  },
  {
    id: 9,
    title: "Machine Learning Starter",
    level: "advanced",
    duration: "60 hrs",
    progress: 5,
    fee: "₹7,999",
    colorClass: "thumb-purple",
    initial: "ML",
  },
  {
    id: 10,
    title: "Interview Preparation Booster",
    level: "advanced",
    duration: "28 hrs",
    progress: 35,
    fee: "₹3,799",
    colorClass: "thumb-pink",
    initial: "IP",
  },
];

// Simple fake login: just switch screens
function goToDashboard() {
  authScreen.style.display = "none";
  dashboardScreen.style.display = "flex";
  renderCourses();
  renderMyCourses();
  renderProgressOverview();
  showSection("home");
}

loginTab?.addEventListener("click", () => {
  loginTab.classList.add("active");
  signupTab.classList.remove("active");
  authSubmit.textContent = "Login";
});

signupTab?.addEventListener("click", () => {
  signupTab.classList.add("active");
  loginTab.classList.remove("active");
  authSubmit.textContent = "Create Account";
});

authForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  goToDashboard();
});

googleLogin?.addEventListener("click", () => {
  goToDashboard();
});

logoutBtn?.addEventListener("click", () => {
  dashboardScreen.style.display = "none";
  authScreen.style.display = "flex";
});

navItems.forEach((btn) => {
  btn.addEventListener("click", () => {
    navItems.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const section = btn.getAttribute("data-section");
    showSection(section);
    switch (section) {
      case "home":
        mainTitle.textContent = "Welcome back 👋";
        break;
      case "my-courses":
        mainTitle.textContent = "My Courses";
        break;
      case "progress":
        mainTitle.textContent = "Your Progress Overview";
        break;
      case "profile":
        mainTitle.textContent = "Profile & Settings";
        break;
      default:
        mainTitle.textContent = "StudyHub";
    }
  });
});

function showSection(section) {
  const map = {
    home: homeSection,
    "my-courses": myCoursesSection,
    progress: progressSection,
    profile: profileSection,
  };

  Object.values(map).forEach((el) => el && el.classList.add("hidden"));
  const active = map[section] || homeSection;
  active?.classList.remove("hidden");
}

function createCourseCard(course) {
  const card = document.createElement("article");
  card.className = "course-card";

  card.innerHTML = `
    <div class="course-top">
      <div class="thumbnail ${course.colorClass}">
        ${course.initial}
      </div>
      <div class="course-info">
        <h4 class="course-title">${course.title}</h4>
        <div class="course-meta">
          <span class="badge">${capitalize(course.level)}</span>
          <span>• ${course.duration}</span>
          <span class="fee">${course.fee}</span>
        </div>
      </div>
    </div>
    <div class="course-progress">
      <div class="progress-label-row">
        <span>${course.progress}% completed</span>
        <span>${
          course.progress >= 70
            ? "Almost there!"
            : course.progress === 0
            ? "Just getting started"
            : "Keep going"
        }</span>
      </div>
      <div class="progress-bar">
        <div
          class="progress-fill"
          style="width: ${course.progress}%"
        ></div>
      </div>
    </div>
    <div class="course-footer">
      <button class="start-btn" type="button">
        <span>Start Learning</span>
        <span>→</span>
      </button>
      <span class="small-note">Certificate on completion</span>
    </div>
  `;

  const startBtn = card.querySelector(".start-btn");
  startBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    alert(`Starting "${course.title}"\nFee: ${course.fee}`);
  });

  return card;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function renderCourses() {
  if (!coursesGrid) return;

  const query = searchInput?.value?.toLowerCase() || "";
  const levelFilter = filterSelect?.value || "all";

  coursesGrid.innerHTML = "";

  const filtered = courses.filter((course) => {
    const matchesQuery = course.title.toLowerCase().includes(query);
    const matchesLevel = levelFilter === "all" || course.level === levelFilter;
    return matchesQuery && matchesLevel;
  });

  filtered.forEach((course) => {
    coursesGrid.appendChild(createCourseCard(course));
  });
}

function renderMyCourses() {
  if (!myCoursesGrid) return;
  myCoursesGrid.innerHTML = "";

  const started = courses.filter((c) => c.progress > 0);
  started.forEach((course) => {
    myCoursesGrid.appendChild(createCourseCard(course));
  });
}

function renderProgressOverview() {
  if (!progressOverview) return;

  const total = courses.length;
  const active = courses.filter((c) => c.progress > 0).length;
  const completed = courses.filter((c) => c.progress >= 90).length;
  const avg =
    courses.reduce((sum, c) => sum + c.progress, 0) / courses.length || 0;

  progressOverview.innerHTML = `
    <div class="stat-card">
      <p class="stat-label">Total courses</p>
      <p class="stat-value">${total}</p>
    </div>
    <div class="stat-card">
      <p class="stat-label">Active courses</p>
      <p class="stat-value">${active}</p>
    </div>
    <div class="stat-card">
      <p class="stat-label">Completed</p>
      <p class="stat-value">${completed}</p>
    </div>
    <div class="stat-card">
      <p class="stat-label">Average progress</p>
      <p class="stat-value">${Math.round(avg)}%</p>
    </div>
  `;
}

searchInput?.addEventListener("input", () => {
  renderCourses();
});

filterSelect?.addEventListener("change", () => {
  renderCourses();
});

profileForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Profile saved (demo only).");
});

// Pre-fill stats
document.getElementById("total-courses").textContent = courses.length;

const active = courses.filter((c) => c.progress > 0).length;
document.getElementById("active-courses").textContent = active;

const avg =
  courses.reduce((sum, c) => sum + c.progress, 0) / courses.length || 0;
document.getElementById("avg-progress").textContent = `${Math.round(avg)}%`;

// Prefill profile email with login email if available
authForm?.addEventListener("submit", () => {
  if (profileEmailInput) {
    profileEmailInput.value = document.getElementById("email").value || "";
  }
});

