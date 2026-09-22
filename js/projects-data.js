/* ==========================================================================
   PROJECTS DATA STORE - BHAGYA LENMINI DEWASURENDRA
   
   HOW TO ADD A NEW PROJECT (නව Project එකක් එකතු කරන ආකාරය):
   1. පහත ඇති projectsData array එකට අලුත් object එකක් එක් කරන්න.
   2. ඔබගේ project image එක "assets/images/" folder එකට දමා එහි නම "image" field එකට ලබාදෙන්න.
   3. Save කළ පසු වෙබ් අඩවියේ Projects කොටස සහ Modal විස්තර ස්වයංක්‍රීයව Update වේ!
   ========================================================================== */

const projectsData = [
  {
    id: "tangalle-spice-journey",
    title: "Tangalle Spice Journey",
    category: "web", // Option: "mobile" | "web" | "desktop"
    categoryBadge: "Travel & Tourism",
    image: "assets/images/tangalle_spice_journey.png",
    techStack: ["HTML", "CSS", "JavaScript", "Responsive Web Design", "UI/UX"],
    shortDesc: "Tangalle Spice Journey is a modern tourism website designed to promote an authentic Sri Lankan traditional cooking experience in Tangalle. The website allows visitors to discover the cooking experience, explore the gallery, plan their visit, and book a traditional Sri Lankan cooking class through an attractive and responsive interface.",
    keyFeatures: [
      "Authentic Sri Lankan cooking experience showcase",
      "Responsive and modern tourism website design",
      "Cooking class booking interface",
      "Experience and activity information",
      "Image gallery for the cooking experience",
      "Plan Your Visit section",
      "Multilingual language options",
      "Mobile-friendly responsive layout",
      "Modern navigation and call-to-action buttons",
      "Sri Lankan cultural and culinary themed UI"
    ],
    overview: "Tangalle Spice Journey is a modern tourism website designed to promote an authentic Sri Lankan traditional cooking experience in Tangalle. The website allows visitors to discover the cooking experience, explore the gallery, plan their visit, and book a traditional Sri Lankan cooking class through an attractive and responsive interface.",
    detailedFeatures: [
      "Authentic Sri Lankan cooking experience showcase with traditional recipes",
      "Responsive and modern tourism website design tailored for travelers",
      "Cooking class booking and reservation inquiry interface",
      "Experience and culinary activities information with local spice highlights",
      "Rich image gallery showcasing the garden, ingredients, and class sessions",
      "Dedicated Plan Your Visit section with location and transportation tips",
      "Multilingual language options for international visitors",
      "Mobile-friendly responsive layout and modern call-to-action buttons",
      "Sri Lankan cultural and culinary themed UI"
    ],
    github: "https://github.com/bldewasurendra/tangalle-cooking-site",
    demo: "#"
  },
  {
    id: "bookwise",
    title: "BookWise",
    category: "desktop",
    categoryBadge: "Desktop Software",
    image: "assets/images/bookwise.jpg",
    techStack: ["C#", ".NET", "Windows Forms", "SQL Database"],
    shortDesc: "A desktop-based library management system engineered to streamline book cataloging, patron records, borrowing transactions, and automated inventory return auditing.",
    keyFeatures: [
      "Comprehensive book inventory cataloging and patron management",
      "Real-time borrowing transactions, returns, and overdue tracking",
      "ACID compliant database integration and role-based administrator controls"
    ],
    overview: "BookWise is an enterprise-grade desktop management application designed for academic libraries to digitize catalog inventory, circulation tracking, and patron memberships.",
    detailedFeatures: [
      "Book Catalog Operations: Comprehensive ISBN management, genre categorization, and stock tracking.",
      "Patron & Member Directory: Detailed student and faculty profiles with borrowing privileges.",
      "Circulation Desk Workflows: Single-click checkout, return validation, and automatic fine calculations.",
      "Data Integrity & ACID Transactions: Robust database transactions ensuring zero inventory record collisions.",
      "Reporting & Analytics: Visual charts showing peak borrowing cycles, overdue books, and popular categories.",
      "Admin Dashboard: Role-delimited administrative portal with audit logs and system backups."
    ],
    github: "https://github.com/5h3ld0rr/BookWise-Java",
    demo: "#"
  },
  {
    id: "moodcast",
    title: "MoodCast",
    category: "mobile",
    categoryBadge: "Mobile & AI",
    image: "assets/images/moodcast.jpg",
    techStack: ["Flutter", "Firebase", "ML Kit", "Firestore", "YouTube API"],
    shortDesc: "A mood-based music recommendation application that uses facial expressions and mood-related signals to identify a user's emotional state and provide contextually suited music recommendations.",
    keyFeatures: [
      "Facial expression detection with smile & eye-open probability analysis",
      "Firebase Auth with Google Sign-In and Cloud Firestore social feed",
      "Real-time music recommendation engine & modern glassmorphism UI"
    ],
    overview: "MoodCast is an intelligent mobile music companion that identifies facial emotional states in real-time and pairs users with contextually matched music playlists to elevate or soothe their mood.",
    detailedFeatures: [
      "Facial Expression Detection: Real-time visual sentiment tracking powered by Google ML Kit.",
      "Facial Probability Metrics: Accurately parses smile probability and eye-open probability to determine emotional valence.",
      "Adaptive Music Playback: Integrates with YouTube API audio endpoints to deliver dynamically generated playlists.",
      "Social Community: Explore friend moods, share playlists, like, and comment on musical discoveries.",
      "Location-Aware Suggestions: Adapts musical vibes depending on user geographic context and local weather.",
      "Modern Glassmorphism: Engineered with fluid Flutter animations and translucent glass components."
    ],
    github: "https://github.com/5h3ld0rr/Mood-Cast",
    demo: "#"
  },
  {
    id: "sharenest",
    title: "ShareNest",
    category: "mobile",
    categoryBadge: "Mobile App",
    image: "assets/images/sharenest.jpg",
    techStack: ["Flutter", "Dart", "Firebase", "Firestore"],
    shortDesc: "An item-sharing mobile platform designed to allow community members to share, borrow, and manage items efficiently, reducing wasteful consumption and promoting circular economy.",
    keyFeatures: [
      "Item listing, categorization, and location distance calculation",
      "Borrowing requests, deposit workflow, and return management",
      "Damage reporting, user trust profiles, and Firebase backend"
    ],
    overview: "ShareNest empowers local communities to share, borrow, and lend tools, electronics, and household gear safely, reducing redundant consumer consumption and promoting circular economy principles.",
    detailedFeatures: [
      "Peer-to-Peer Cataloging: Real-time item listing with high-resolution imagery and availability status.",
      "Secure Borrowing Flow: Complete request pipeline with dates, deposit confirmation, and lending agreements.",
      "Proximity & Distance Engine: Calculates physical distance to lenders to optimize pickup logistics.",
      "Damage & Inspection Reporting: Timestamped condition logs before and after item handover.",
      "User Trust Score & Profiles: Verified student/user badges, peer reviews, and lending history.",
      "Real-Time Messaging & Alerts: Instant Firestore push notifications for request status and return reminders."
    ],
    github: "https://github.com/bldewasurendra/sharenest_app",
    demo: "#"
  },
  {
    id: "devconnect",
    title: "DevConnect",
    category: "web",
    categoryBadge: "Web Application",
    image: "assets/images/devconnect.jpg",
    techStack: ["PHP", "MySQL", "HTML5", "CSS3", "JavaScript", "Cloudinary"],
    shortDesc: "A web-based developer community and forum platform where developers and engineering students can create, share, and interact with technical posts, code snippets, and architecture discussions.",
    keyFeatures: [
      "Robust authentication and secure user session management",
      "Full CRUD operations for technical posts & Cloudinary image uploads",
      "Normalized MySQL database design and fully responsive web interface"
    ],
    overview: "DevConnect is a dedicated social-technical discussion forum engineered for software developers and engineering students to share code solutions, explore architectural patterns, and collaborate.",
    detailedFeatures: [
      "Session-Based Authentication: Robust PHP user session management with salted password hashing.",
      "Technical Post CRUD: Create, edit, tag, and organize multi-threaded discussions with formatted code blocks.",
      "Cloudinary Media Pipeline: Optimized image uploads and asset delivery for screenshots and diagrams.",
      "Role-Based Access Control: Granular user and moderator privileges to maintain community guidelines.",
      "Relational Schema Design: Normalized MySQL architecture optimized for fast indexing and query retrieval.",
      "Responsive Glass Interface: Seamless developer experience across smartphone, tablet, and widescreen monitors."
    ],
    github: "https://github.com/5h3ld0rr/DevConnect",
    demo: "#"
  }
];

// Provide helper to get project by ID
// Custom/edited projects take priority over built-in ones with the same ID
function getProjectById(id) {
  const customProjects = JSON.parse(localStorage.getItem('custom-projects') || '[]');
  // Check custom list first (includes edited built-in projects saved with same ID)
  const customMatch = customProjects.find(p => p.id === id);
  if (customMatch) return customMatch;
  return projectsData.find(p => p.id === id) || null;
}

// Get all projects combined, filtering out hidden built-in projects
function getAllProjects() {
  const customProjects = JSON.parse(localStorage.getItem('custom-projects') || '[]');
  const hidden = JSON.parse(localStorage.getItem('hidden-projects') || '[]');

  // Track IDs and normalized titles of custom projects to prevent duplicate cards
  const overriddenIds = new Set(customProjects.map(p => p.id));
  const overriddenTitles = new Set(customProjects.map(p => (p.title || '').toLowerCase().trim()));

  // Built-in projects: exclude hidden and overridden ones
  const filteredBuiltIn = projectsData.filter(p => 
    !hidden.includes(p.id) && 
    !overriddenIds.has(p.id) &&
    !overriddenTitles.has((p.title || '').toLowerCase().trim())
  );

  // Custom projects come first (includes both truly new and edited built-ins)
  return [...customProjects, ...filteredBuiltIn];
}
