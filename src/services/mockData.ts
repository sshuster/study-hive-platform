
// Mock data for the tutoring platform

// Subject areas
export const subjects = [
  { id: 1, name: "Mathematics", icon: "📐" },
  { id: 2, name: "Physics", icon: "🔭" },
  { id: 3, name: "Chemistry", icon: "🧪" },
  { id: 4, name: "Biology", icon: "🧬" },
  { id: 5, name: "Computer Science", icon: "💻" },
  { id: 6, name: "Literature", icon: "📚" },
  { id: 7, name: "History", icon: "🏛️" },
  { id: 8, name: "Geography", icon: "🌍" },
  { id: 9, name: "Languages", icon: "🗣️" },
  { id: 10, name: "Economics", icon: "📊" }
];

// Questions for each user
export const userQuestions = {
  // Regular user (muser) questions
  1: [
    { 
      id: 1, 
      title: "Help with calculus integration problem", 
      subject: "Mathematics", 
      content: "I'm struggling with the following integral: ∫(x²+3x+2)dx. Can someone walk me through the steps?", 
      status: "answered", 
      date: "2025-03-01", 
      replies: 2 
    },
    { 
      id: 2, 
      title: "Newton's Third Law explanation needed", 
      subject: "Physics", 
      content: "I don't understand how Newton's Third Law applies in a car crash scenario. Can someone explain?", 
      status: "pending", 
      date: "2025-03-15", 
      replies: 0 
    },
    { 
      id: 3, 
      title: "Help with Shakespeare's Macbeth analysis", 
      subject: "Literature", 
      content: "I need to write an essay about the theme of ambition in Macbeth. Any guidance would be helpful.", 
      status: "in-progress", 
      date: "2025-04-02", 
      replies: 1 
    },
    { 
      id: 4, 
      title: "Python recursion help needed", 
      subject: "Computer Science", 
      content: "I'm trying to write a recursive function to calculate Fibonacci numbers but my code keeps crashing.", 
      status: "answered", 
      date: "2025-04-05", 
      replies: 3 
    }
  ],
  // No questions for admin user
  2: []
};

// Performance data points for charts
export const performanceData = {
  1: {
    subjects: ["Math", "Physics", "Literature", "CS", "Chemistry"],
    grades: [85, 72, 90, 95, 68],
    improvement: [5, 8, 2, 10, 15],
    weeklyActivity: [
      { week: "Week 1", questions: 2, answers: 0 },
      { week: "Week 2", questions: 1, answers: 0 },
      { week: "Week 3", questions: 3, answers: 0 },
      { week: "Week 4", questions: 2, answers: 0 }
    ]
  },
  2: {
    // Admin doesn't need performance data
    subjects: [],
    grades: [],
    improvement: [],
    weeklyActivity: []
  }
};

// User list (for admin view)
export const allUsers = [
  { id: 1, username: "muser", email: "muser@example.com", role: "user", questions: 4, joined: "2025-02-15" },
  { id: 2, username: "mvc", email: "mvc@example.com", role: "admin", questions: 0, joined: "2025-01-01" },
  { id: 3, username: "student1", email: "student1@example.com", role: "user", questions: 7, joined: "2025-02-20" },
  { id: 4, username: "student2", email: "student2@example.com", role: "user", questions: 2, joined: "2025-03-10" },
  { id: 5, username: "student3", email: "student3@example.com", role: "user", questions: 5, joined: "2025-03-15" }
];

// Pricing plans
export const pricingPlans = [
  {
    id: 1,
    name: "Basic",
    price: 9.99,
    features: [
      "5 questions per month",
      "48-hour response time",
      "Text-based answers only",
      "Access to question library"
    ],
    recommended: false
  },
  {
    id: 2,
    name: "Premium",
    price: 24.99,
    features: [
      "20 questions per month",
      "24-hour response time",
      "Text and video answers",
      "1-on-1 tutoring session (30 min)",
      "Priority support"
    ],
    recommended: true
  },
  {
    id: 3,
    name: "Ultimate",
    price: 49.99,
    features: [
      "Unlimited questions",
      "12-hour response time",
      "Text, video, and interactive answers",
      "3 tutoring sessions (1 hour each)",
      "24/7 priority support",
      "Exam prep materials"
    ],
    recommended: false
  }
];
