export const siteContent = {
  name: "Workcraft Consult",
  wordmark: "Workcraft",
  descriptor: "CONSULT",
  email: "hello@workcraftconsult.com",
  phone: "+234 800 000 0000",
  location: "Lagos, Nigeria · Delivering globally online",
  description:
    "Workcraft Consult helps professionals and organisations grow through practical training, business and management consultancy, and digital learning solutions.",
  tagline: "Learn • Build • Excel",
  copyright: "© 2026 Workcraft Consult. All rights reserved.",
  footerServices: "Services",
  footerExplore: "Explore",
  footerContact: "Get in touch",
  disclaimer:
    "PMP, PMI and PMBOK are registered marks of the Project Management Institute, Inc. Workcraft Consult is independent and is not affiliated with, approved by or endorsed by PMI, and is not a PMI Authorized Training Partner. Our training is aligned to the published PMP Examination Content Outline but does not count toward the PMP 35-hour education requirement. Only PMI decides exam eligibility and awards the PMP credential.",
};

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Training", to: "/training" },
  { label: "About", to: "/about" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

export const exploreLinks = [
  ...navLinks.slice(1),
  { label: "Register interest", to: "/register-interest" },
  { label: "Learner portal", to: "/learner-portal" },
];

export const services = [
  {
    image: "/images/left-sci.png",
    alt: "Participants taking part in a professional training session",
    icon: "graduation" as const,
    title: "Professional Training & Development",
    description:
      "Instructor-led programmes that build practical, job-ready skills, from exam preparation to supervised practice.",
    activities: [
      "Facilitated professional learning and development",
      "Structured exam preparation and guided practice",
      "Supervised assignments using practical tools",
      "Learning resources designed for working professionals",
    ],
  },
  {
    image: "/images/middle-sci.png",
    alt: "Colleagues working together around a table",
    icon: "briefcase" as const,
    title: "Business & Management Consultancy",
    description:
      "Practical advisory for organisations that want sharper strategy, stronger processes and projects that deliver.",
    activities: [
      "Business and management process review",
      "Project planning and delivery support",
      "Strategy and operational planning",
      "Practical tools for teams and decision-makers",
    ],
  },
  {
    image: "/images/right-sci.png",
    alt: "A laptop and notes on a desk",
    icon: "monitor" as const,
    title: "Digital Learning & Professional Solutions",
    description:
      "Modern tools, templates and AI-assisted workflows that help people and teams work smarter.",
    activities: [
      "Digital learning experiences and resources",
      "Practical templates for professional workflows",
      "Responsible AI-assisted workflow design",
      "Tools that support collaboration and learning",
    ],
  },
];

export const bootcamp = {
  eyebrow: "Pilot programme · Coming soon",
  title: "Project Management Bootcamp",
  badge: "Pilot programme",
  descriptor: "PMP Career-to-Practice Programme",
  howItWorks: "How it works",
  detailsLink: "View programme details",
  description:
    "Prepare for the exam. Build the capability. Practise delivery. A structured learning experience that combines current PMP exam preparation, practical project delivery, accessible professional tools, AI-assisted workflow design and a supervised project assignment.",
  benefits: [
    "Structured preparation for the current PMP exam content",
    "Real project artefacts: plans, schedules, registers and reports",
    "Confidence with free, industry-relevant project tools",
    "Practical, responsible AI-assisted workflows",
    "A verified project portfolio built through supervised work",
  ],
  details: [
    { label: "Format", value: "Live online cohort" },
    { label: "Duration", value: "8 weeks + onboarding" },
    { label: "Cohort size", value: "15–25 learners" },
    { label: "Curriculum", value: "July 2026 PMP ECO" },
  ],
  steps: [
    {
      title: "Register interest",
      description: "Join the list for free. No account needed.",
    },
    {
      title: "Applications open",
      description: "We email you dates, fees and how to apply.",
    },
    {
      title: "Screening and enrolment",
      description: "A short screening call, then confirm your place.",
    },
    {
      title: "Access the portal",
      description: "Sign in to your learner portal for sessions and resources.",
    },
  ],
  schedule: [
    { title: "Onboarding", description: "Get oriented, meet the cohort and prepare your learning setup." },
    { title: "Week 1 · Initiation", description: "Explore project foundations, context and initiation documents." },
    { title: "Week 2 · Scope and planning", description: "Shape outcomes, scope and a practical project plan." },
    { title: "Week 3 · Scheduling", description: "Build a schedule and understand dependencies and sequencing." },
    { title: "Week 4 · Cost and resources", description: "Work with estimates, resource needs and delivery constraints." },
    { title: "Week 5 · Risk and quality", description: "Create useful registers and plan for quality and uncertainty." },
    { title: "Week 6 · Delivery and communication", description: "Coordinate work, stakeholders and project communication." },
    { title: "Week 7 · Monitoring and control", description: "Track progress, manage change and communicate status." },
    { title: "Week 8 · Review and presentation", description: "Review outcomes and present your supervised project work." },
  ],
  outputs: [
    "Project initiation and planning documents",
    "A project schedule and supporting registers",
    "Progress reports and practical delivery artefacts",
    "A portfolio record of your supervised assignment",
  ],
};

export const expectations = {
  is: {
    title: "What this programme is",
    items: [
      "Mapped to the current July 2026 PMP Examination Content Outline (ECO)",
      "Practical, job-ready project management skills using free tools",
      "A supervised project assignment with feedback on your own contribution",
      "A Workcraft Consult certificate of completion and portfolio record",
    ],
  },
  isNot: {
    title: "What it is not",
    items: [
      "Not approved, endorsed or authorised by PMI. Workcraft Consult is not a PMI Authorized Training Partner",
      "Not a qualifying course for the PMP 35-hour education requirement",
      "Not employment or guaranteed work experience. The project is a supervised project assignment",
      "No guarantee of an exam pass, PMP eligibility or a job",
    ],
  },
};

export const values = [
  {
    icon: "target" as const,
    title: "Practice-first",
    description: "Every programme ends in real, supervised work, not just theory.",
  },
  {
    icon: "users" as const,
    title: "Instructor-led",
    description: "Learn live from experienced practitioners who answer your questions.",
  },
  {
    icon: "sparkles" as const,
    title: "Future-ready",
    description: "Modern tools and responsible AI built into how we teach and consult.",
  },
  {
    icon: "calendar" as const,
    title: "Flexible",
    description: "Schedules designed around working professionals.",
  },
];

export const homeContent = {
  pageTitle: "Home",
  heroEyebrow: "Learn • Build • Excel",
  heroTitle: "Skills that turn into",
  heroHighlight: "real results.",
  heroImageAlt: "Two colleagues collaborating on a project planning wall",
  heroDescription:
    "Workcraft Consult delivers professional training, business and management consultancy, and digital learning solutions for ambitious professionals and organisations.",
  heroPrimary: "Register interest in the bootcamp",
  heroSecondary: "Explore our services",
  servicesEyebrow: "What we do",
  servicesTitle: "Three ways we help people and organisations grow",
  servicesSubtitle: "From individual career growth to organisation-wide transformation.",
  learnMore: "Learn more",
  registerInterest: "Register interest",
  contactCta: "Talk to us",
  expectationsEyebrow: "Clear expectations",
  expectationsTitle: "Honest about what the bootcamp is, and is not",
  whyEyebrow: "Why Workcraft",
  whyTitle: "Built for people who want to do the work, not just pass the test",
  ctaTitle: "Be first in line when applications open",
  ctaDescription:
    "Register your interest in the Project Management Bootcamp. It is free and takes under two minutes.",
};

export const servicePageContent = {
  pageTitle: "Services",
  eyebrow: "What we do",
  title: "Services built around practical progress",
  intro:
    "We help professionals and organisations strengthen capability, improve ways of working and make learning useful in practice.",
  typicalActivities: "How we can help",
  contactLink: "Talk to us",
};

export const trainingPageContent = {
  pageTitle: "Training",
  eyebrow: "Training",
  title: "Project Management Bootcamp",
  intro:
    "A practical, instructor-led learning experience combining PMP exam preparation with supervised project work. Dates and fees are shared when applications open.",
  audienceTitle: "Who it is for",
  audience:
    "Working professionals and aspiring project practitioners who want structured learning, practical project tools and a guided opportunity to practise delivery.",
  formatTitle: "Format and cohort",
  outlineTitle: "A guided learning journey",
  outputsTitle: "What you will produce",
  scheduleNote: "Topic sequence may be refined as the cohort is prepared.",
  expectationsEyebrow: "Clear expectations",
  expectationsTitle: "What this programme is, and is not",
  registerInterest: "Register interest",
};

export const aboutContent = {
  pageTitle: "About",
  eyebrow: "About Workcraft",
  title: "Learn, build and excel through practical work",
  intro:
    "Workcraft Consult helps professionals and organisations grow through practical training, business and management consultancy, and digital learning solutions.",
  missionTitle: "Our mission",
  mission:
    "Make professional learning practical and useful—connecting knowledge with the tools, guidance and supervised practice people need to move forward.",
  valuesTitle: "How we work",
  supportingTitle: "Practical progress, together",
  servicesLink: "Explore our services",
};

export const faqItems = [
  {
    question: "Is registering interest free?",
    answer: "Yes. Registering interest is free and does not require an account.",
  },
  {
    question: "Is the bootcamp PMI approved?",
    answer:
      "No. Workcraft Consult is independent and is not affiliated with, approved by or endorsed by PMI, and is not a PMI Authorized Training Partner.",
  },
  {
    question: "Does it count toward the PMP 35-hour education requirement?",
    answer:
      "No. This programme does not count toward the PMP 35-hour education requirement.",
  },
  {
    question: "Does the bootcamp guarantee an exam pass or a job?",
    answer:
      "No. We cannot guarantee an exam pass, PMP eligibility, employment or work experience.",
  },
  {
    question: "What is the format and duration?",
    answer:
      "The planned format is a live online cohort over eight weeks, plus onboarding. Dates and fees are shared when applications open.",
  },
  {
    question: "How do applications work?",
    answer:
      "Register interest, receive application details when they open, complete a short screening call, and confirm your place if enrolled.",
  },
  {
    question: "What do I need to take part?",
    answer:
      "You will need a laptop, an internet connection and the free tools introduced during the programme.",
  },
  {
    question: "How do I contact Workcraft Consult?",
    answer: `Email ${siteContent.email} or call ${siteContent.phone}.`,
  },
];

export const faqContent = {
  pageTitle: "FAQ",
  eyebrow: "Frequently asked questions",
  title: "Straight answers about the bootcamp",
  intro: "Find out how the programme works, what to expect and how to get in touch.",
};

export const formContent = {
  contactPageTitle: "Contact",
  interestPageTitle: "Register interest",
  portalPageTitle: "Learner portal",
  name: "Name",
  fullName: "Full name",
  email: "Email address",
  phone: "Phone number",
  location: "Location",
  currentRole: "Current role",
  subject: "Subject (optional)",
  message: "Message",
  note: "What would you like us to know? (optional)",
  consent: "I agree to be contacted about the Project Management Bootcamp",
  sendMessage: "Send message",
  submitInterest: "Register interest",
  signIn: "Sign in",
  password: "Password",
  sending: "Sending…",
  required: "This field is required.",
  invalidEmail: "Enter a valid email address.",
  consentRequired: "Please agree to be contacted before submitting.",
  contactSuccess: "Thanks for your message. We’ll be in touch.",
  interestSuccess: "Thanks for registering your interest. We’ll contact you when applications open.",
  loginDefaultError: "We couldn’t sign you in. Please check your details and try again.",
};

export const contactContent = {
  eyebrow: "Contact",
  title: "Talk to our team",
  intro: "Have a question about our services or the bootcamp? Send us a message.",
  detailsTitle: "Get in touch",
  messageSent: "Message sent",
};

export const interestContent = {
  eyebrow: "Register interest",
  title: "Be first to hear when applications open",
  intro: "Free. No account needed. Takes under two minutes.",
};

export const portalContent = {
  eyebrow: "Learner portal",
  title: "Welcome back",
  intro: "The learner portal opens when your cohort starts.",
  loginError: "We couldn’t sign you in. Please check your details and try again.",
};

export const notFoundContent = {
  eyebrow: "404",
  title: "We can’t find that page",
  intro: "The link may be out of date, or the page may have moved.",
  home: "Back to home",
};

export const commonContent = {
  submitError: "We couldn’t submit your request. Please try again.",
  optional: "Optional",
  loading: "Sending…",
  emailInvalid: "Enter a valid email address.",
  homePageTitle: "Home",
  notFoundPageTitle: "404",
  registerInterest: "Register interest",
  talkToUs: "Talk to us",
};
