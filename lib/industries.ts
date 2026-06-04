export interface Industry {
  slug: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  headline: string;
  subheadline: string;
  whyNeed: string[];
  included: string[];
  features: { title: string; description: string }[];
  testimonialId: string;
  metaTitle: string;
  metaDescription: string;
  faqItems: { question: string; answer: string }[];
}

export const industries: Industry[] = [
  {
    slug: "electricians",
    name: "Electricians",
    icon: "⚡",
    color: "#f59e0b",
    bgColor: "#fef3c7",
    headline: "Free Website For Electricians",
    subheadline:
      "Get more local jobs with a professional electrician website — built free, live in days.",
    metaTitle: "Free Website For Electricians | YourWebsiteNow",
    metaDescription:
      "We build professional websites for electricians completely free. Try it for 10 days, then just £29/month. Get more local leads today.",
    whyNeed: [
      "97% of consumers search online before hiring a tradesperson",
      "A professional website builds instant trust with new customers",
      "Show your qualifications, certifications and insurance details",
      "Capture enquiries 24/7 even when you're on-site",
      "Stand out from competitors still relying on word-of-mouth alone",
    ],
    included: [
      "Services page (domestic, commercial, emergency callouts)",
      "Certifications & qualifications display",
      "Gallery of completed work",
      "Contact form & click-to-call button",
      "Service area map",
      "Customer reviews section",
    ],
    features: [
      {
        title: "Emergency Callout Banner",
        description:
          "A prominent banner at the top of every page showing your emergency contact number — so customers can reach you instantly when it matters most.",
      },
      {
        title: "Certification Badges",
        description:
          "Showcase your NICEIC, NAPIT or ECA registration with professional badge displays that immediately build customer confidence.",
      },
      {
        title: "Service Area Pages",
        description:
          "Dedicated pages for each town or postcode you serve, helping you rank in local Google searches across your whole service area.",
      },
    ],
    testimonialId: "1",
    faqItems: [
      {
        question: "Can my website show my Gas Safe / NICEIC registration?",
        answer:
          "Absolutely. We'll display your qualifications and certifications prominently to help build customer trust.",
      },
      {
        question: "Can customers book callouts online?",
        answer:
          "Yes. We can include an enquiry form, WhatsApp link, or booking widget so customers can reach you around the clock.",
      },
      {
        question: "Will my website help me rank on Google?",
        answer:
          "Yes. We build every site with local SEO in mind — targeting searches like 'electrician near me' and 'emergency electrician [your town]'.",
      },
    ],
  },
  {
    slug: "plumbers",
    name: "Plumbers",
    icon: "🔧",
    color: "#3b82f6",
    bgColor: "#dbeafe",
    headline: "Free Website For Plumbers",
    subheadline:
      "Win more local plumbing jobs with a website that works as hard as you do — built free.",
    metaTitle: "Free Website For Plumbers | YourWebsiteNow",
    metaDescription:
      "Professional websites for plumbers, built free. 10-day free trial, then just £29/month. No setup fee. Cancel anytime.",
    whyNeed: [
      "Most people Google a plumber before calling anyone",
      "Emergency plumbing searches spike on evenings and weekends",
      "A professional website converts searchers into paying customers",
      "Showcase your Gas Safe registration and build instant trust",
      "Capture leads while you're on-site with no interruptions",
    ],
    included: [
      "Services page (boilers, leaks, bathrooms, emergencies)",
      "Gas Safe registration display",
      "Emergency 24/7 contact section",
      "Photo gallery of work completed",
      "Customer testimonials",
      "Quote request form",
    ],
    features: [
      {
        title: "24/7 Emergency Contact",
        description:
          "A click-to-call emergency number displayed on every page, designed to convert urgent visitors into immediate bookings.",
      },
      {
        title: "Gas Safe Badge Display",
        description:
          "Your Gas Safe registration displayed prominently to assure customers they're hiring a certified, trustworthy professional.",
      },
      {
        title: "Local Area Targeting",
        description:
          "SEO-optimised pages for every town and postcode you cover, so you appear when locals search for a plumber near them.",
      },
    ],
    testimonialId: "4",
    faqItems: [
      {
        question: "Can I show my Gas Safe registration on my website?",
        answer:
          "Yes, we'll feature it prominently — it's one of the most important trust signals for plumbing customers.",
      },
      {
        question: "Can customers request emergency quotes online?",
        answer:
          "Yes. We can include an emergency contact form or a direct WhatsApp link for out-of-hours enquiries.",
      },
      {
        question: "How do I get found on Google locally?",
        answer:
          "We build your site with local SEO best practices and can create location-specific pages for all the areas you serve.",
      },
    ],
  },
  {
    slug: "karate-clubs",
    name: "Karate Clubs",
    icon: "🥋",
    color: "#ef4444",
    bgColor: "#fee2e2",
    headline: "Free Website For Karate Clubs",
    subheadline:
      "Grow your club membership with a professional website — built free, no technical knowledge needed.",
    metaTitle: "Free Website For Karate Clubs | YourWebsiteNow",
    metaDescription:
      "We build professional websites for karate clubs free of charge. Get more members, share your timetable, and look professional online.",
    whyNeed: [
      "Parents Google karate clubs before choosing one for their child",
      "A professional website builds trust before the first session",
      "Share your class timetable, grading calendar, and club news",
      "Attract new members with your achievements and instructor credentials",
      "Make it easy for interested families to get in touch",
    ],
    included: [
      "Class timetable and schedule",
      "Instructor profiles and credentials",
      "About the club / history",
      "Photo and video gallery",
      "Grading information",
      "Contact and trial class enquiry form",
    ],
    features: [
      {
        title: "Online Timetable",
        description:
          "A clear, easy-to-read class schedule showing all sessions, age groups, and locations — so parents can find the right class instantly.",
      },
      {
        title: "Trial Class Booking",
        description:
          "A simple enquiry form specifically for trial class bookings — the most important conversion for any martial arts club.",
      },
      {
        title: "Grading & Events Calendar",
        description:
          "Keep members informed about upcoming gradings, competitions, and club events with a dedicated events section.",
      },
    ],
    testimonialId: "5",
    faqItems: [
      {
        question: "Can I list all my class times on the website?",
        answer:
          "Yes. We'll create a clear, easy-to-read timetable showing all your sessions, locations, and age groups.",
      },
      {
        question: "Can parents sign up for a trial class online?",
        answer:
          "Absolutely. We can include a trial class enquiry form so new families can express interest any time of day.",
      },
      {
        question: "Can I show videos of my classes?",
        answer:
          "Yes. We can embed YouTube or Vimeo videos, or create a photo gallery to showcase your club in action.",
      },
    ],
  },
  {
    slug: "personal-trainers",
    name: "Personal Trainers",
    icon: "💪",
    color: "#8b5cf6",
    bgColor: "#ede9fe",
    headline: "Free Website For Personal Trainers",
    subheadline:
      "Fill your client roster with a professional PT website — built free, ready in days.",
    metaTitle: "Free Website For Personal Trainers | YourWebsiteNow",
    metaDescription:
      "Professional websites for personal trainers, built free. Showcase your services, attract new clients, and grow your PT business.",
    whyNeed: [
      "Potential clients want to see your credentials before committing",
      "A professional website sets you apart from trainers on social media alone",
      "Showcase your transformation results and client testimonials",
      "Let clients book consultations online at any time",
      "Build your personal brand and command premium rates",
    ],
    included: [
      "Services and training packages",
      "Before/after transformation gallery",
      "Trainer bio and qualifications",
      "Client testimonials",
      "Online consultation booking",
      "Nutrition and programme information",
    ],
    features: [
      {
        title: "Transformation Gallery",
        description:
          "Showcase client results with a professional before/after gallery — your most powerful sales tool.",
      },
      {
        title: "Package Pricing Display",
        description:
          "Clear, attractive pricing cards for all your training packages, making it easy for clients to choose and commit.",
      },
      {
        title: "Consultation Booking Form",
        description:
          "A simple enquiry form for free consultations — the first step to converting visitors into paying clients.",
      },
    ],
    testimonialId: "3",
    faqItems: [
      {
        question: "Can I show my client transformation results?",
        answer:
          "Yes — with client permission, we can create a stunning results gallery to showcase your work.",
      },
      {
        question: "Can clients book sessions through my website?",
        answer:
          "Yes. We can include an enquiry form or booking widget to capture new client interest 24/7.",
      },
      {
        question: "Can I list my training packages and prices?",
        answer:
          "Absolutely. We'll design attractive pricing cards for all your packages, making it easy for clients to understand what's on offer.",
      },
    ],
  },
  {
    slug: "restaurants",
    name: "Restaurants",
    icon: "🍽️",
    color: "#f97316",
    bgColor: "#ffedd5",
    headline: "Free Website For Restaurants",
    subheadline:
      "Drive more reservations and takeaway orders with a stunning restaurant website — built free.",
    metaTitle: "Free Website For Restaurants | YourWebsiteNow",
    metaDescription:
      "Beautiful restaurant websites built free of charge. Showcase your menu, take online reservations, and attract more diners.",
    whyNeed: [
      "Diners check websites and menus before deciding where to eat",
      "A beautiful website reflects the quality of your food",
      "Enable online reservations to reduce phone interruptions",
      "Showcase your menu, specials, and atmosphere with stunning photos",
      "Rank in local Google searches for restaurants in your area",
    ],
    included: [
      "Menu pages (starters, mains, desserts, drinks)",
      "Table reservation form",
      "Photo gallery of food and ambience",
      "Opening hours and location",
      "Chef's story / about section",
      "Special events and seasonal menus",
    ],
    features: [
      {
        title: "Online Menu",
        description:
          "A beautiful, easy-to-navigate menu that showcases your dishes with descriptions — updated whenever you need.",
      },
      {
        title: "Table Reservation System",
        description:
          "A simple reservation form so guests can book a table at any time, reducing phone calls during service.",
      },
      {
        title: "Food Photography Showcase",
        description:
          "A stunning gallery to showcase your dishes and atmosphere, turning casual browsers into eager diners.",
      },
    ],
    testimonialId: "6",
    faqItems: [
      {
        question: "Can I show my full menu on the website?",
        answer:
          "Yes. We'll create a beautifully designed menu page with all your courses, descriptions, and prices.",
      },
      {
        question: "Can customers make reservations online?",
        answer:
          "Yes. We'll include a reservation form or link to your preferred booking system.",
      },
      {
        question: "Can I update the menu myself?",
        answer:
          "Minor updates can be requested via email at any time. We'll handle the changes for you quickly.",
      },
    ],
  },
  {
    slug: "beauty",
    name: "Beauty & Hair Salons",
    icon: "💅",
    color: "#ec4899",
    bgColor: "#fce7f3",
    headline: "Free Website For Beauty & Hair Salons",
    subheadline:
      "Fill your appointment book with a beautiful salon website — built free, ready in days.",
    metaTitle: "Free Website For Beauty Salons | YourWebsiteNow",
    metaDescription:
      "Stunning websites for beauty salons and hair stylists, built free. Take online bookings and showcase your work.",
    whyNeed: [
      "Clients search for salons online and judge by first impressions",
      "A stunning website reflects your style and standards",
      "Allow clients to book appointments online at any time",
      "Showcase your portfolio and treatments with gorgeous imagery",
      "Build a loyal client base with a professional online presence",
    ],
    included: [
      "Treatment menu with descriptions and prices",
      "Online appointment booking",
      "Portfolio gallery",
      "Meet the team section",
      "Pricing cards",
      "Client reviews display",
    ],
    features: [
      {
        title: "Treatment Menu",
        description:
          "An elegant, easy-to-browse treatment menu with descriptions and prices for all your services.",
      },
      {
        title: "Portfolio Gallery",
        description:
          "A stunning visual gallery of your work — the most powerful way to attract new clients.",
      },
      {
        title: "Online Booking Link",
        description:
          "A direct booking link or embedded form so clients can book appointments 24/7 without calling.",
      },
    ],
    testimonialId: "2",
    faqItems: [
      {
        question: "Can I list all my treatments and prices?",
        answer:
          "Yes. We'll create a beautiful treatment menu with all your services, descriptions, and pricing.",
      },
      {
        question: "Can clients book appointments online?",
        answer:
          "Yes. We can link to your booking system or include an enquiry form to capture new bookings.",
      },
      {
        question: "Can I show my portfolio of work?",
        answer:
          "Absolutely — a portfolio gallery is one of the most effective ways to convert website visitors into clients.",
      },
    ],
  },
  {
    slug: "consultants",
    name: "Consultants",
    icon: "📊",
    color: "#0ea5e9",
    bgColor: "#e0f2fe",
    headline: "Free Website For Consultants",
    subheadline:
      "Establish your authority and attract high-value clients with a professional consulting website.",
    metaTitle: "Free Website For Consultants | YourWebsiteNow",
    metaDescription:
      "Professional websites for consultants and coaches, built free. Establish authority, attract clients, and grow your practice.",
    whyNeed: [
      "Prospective clients research consultants thoroughly before engaging",
      "A professional website establishes credibility and authority",
      "Showcase your methodology, case studies, and results",
      "Make it easy for ideal clients to get in touch",
      "Position yourself above competitors without an online presence",
    ],
    included: [
      "About / expertise page",
      "Services and methodology",
      "Case studies or client results",
      "Testimonials",
      "Blog or insights section",
      "Discovery call booking form",
    ],
    features: [
      {
        title: "Authority Content Section",
        description:
          "A dedicated section to showcase your credentials, publications, speaking engagements, and media appearances.",
      },
      {
        title: "Case Study Display",
        description:
          "Professional case study pages that demonstrate your results and methodology to prospective clients.",
      },
      {
        title: "Discovery Call Form",
        description:
          "A streamlined form for booking initial discovery calls — the first step in your client acquisition process.",
      },
    ],
    testimonialId: "3",
    faqItems: [
      {
        question: "Can I include a blog for thought leadership content?",
        answer:
          "Yes. Our Growth and Pro plans include a fully functional blog to help establish your expertise.",
      },
      {
        question: "Can clients book discovery calls through the website?",
        answer:
          "Yes. We can include a booking form or link to your scheduling tool (like Calendly).",
      },
      {
        question: "Can I showcase case studies and results?",
        answer:
          "Absolutely. We'll create dedicated case study pages that demonstrate your expertise and track record.",
      },
    ],
  },
  {
    slug: "gyms",
    name: "Gyms & Fitness Studios",
    icon: "🏋️",
    color: "#10b981",
    bgColor: "#d1fae5",
    headline: "Free Website For Gyms & Fitness Studios",
    subheadline:
      "Grow your membership with a powerful gym website — built free, ready to attract new members.",
    metaTitle: "Free Website For Gyms | YourWebsiteNow",
    metaDescription:
      "Professional websites for gyms and fitness studios, built free. Showcase classes, attract members, and grow your fitness business.",
    whyNeed: [
      "People research gyms online before visiting in person",
      "A professional website showcases your facilities and classes",
      "Allow potential members to sign up for a trial online",
      "Display your class timetable and membership options clearly",
      "Stand out from larger gym chains with a professional presence",
    ],
    included: [
      "Class timetable",
      "Membership pricing and packages",
      "Facilities and equipment showcase",
      "Instructor profiles",
      "Free trial/tour booking",
      "Member testimonials",
    ],
    features: [
      {
        title: "Live Class Timetable",
        description:
          "A clear, filterable class timetable so members can easily find and plan the sessions they want to attend.",
      },
      {
        title: "Membership Pricing Cards",
        description:
          "Attractive pricing cards for all membership tiers, making it simple for prospects to choose and commit.",
      },
      {
        title: "Free Trial Signup",
        description:
          "A dedicated free trial page with a simple form — the most effective way to convert website visitors into members.",
      },
    ],
    testimonialId: "3",
    faqItems: [
      {
        question: "Can I show my full class timetable?",
        answer:
          "Yes. We'll create a clear weekly timetable showing all classes, times, and instructors.",
      },
      {
        question: "Can new members sign up for a free trial online?",
        answer:
          "Yes. We'll include a free trial signup form to capture new member interest 24/7.",
      },
      {
        question: "Can I list all my membership options?",
        answer:
          "Absolutely. We'll design clear pricing cards for all your membership tiers and packages.",
      },
    ],
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
