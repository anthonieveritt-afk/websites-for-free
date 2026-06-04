export interface Faq {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  // Getting Started
  {
    id: "gs-1",
    category: "Getting Started",
    question: "Is it really free?",
    answer:
      "Yes — 100% free to start. We build your website at absolutely no cost to you. You get a full 10-day free trial to test it out. If you love it, you simply continue with our affordable monthly hosting plan. If not, walk away and pay nothing. No credit card required to begin.",
  },
  {
    id: "gs-2",
    category: "Getting Started",
    question: "How quickly will my website be built?",
    answer:
      "We typically build and deliver your website within 3–5 working days of receiving your application. Complex sites with many pages may take slightly longer, but we'll always keep you updated on progress.",
  },
  {
    id: "gs-3",
    category: "Getting Started",
    question: "What information do you need from me?",
    answer:
      "Just the basics — your business name, what you do, who your customers are, and any specific pages or features you'd like. Our application form guides you through everything. You don't need to prepare anything in advance.",
  },
  {
    id: "gs-4",
    category: "Getting Started",
    question: "Do I need any technical knowledge?",
    answer:
      "Not at all. We handle everything — design, development, hosting, and setup. If you can fill in a form and tell us about your business, that's all we need. Zero technical knowledge required.",
  },
  // Free Trial
  {
    id: "ft-1",
    category: "The Free Trial",
    question: "What exactly is included in the 10-day free trial?",
    answer:
      "Everything. Your full website goes live and is accessible to the public. You can share the link with customers, test all the features, and see how it performs. It's not a demo or a preview — it's your real, live website.",
  },
  {
    id: "ft-2",
    category: "The Free Trial",
    question: "What happens after 10 days?",
    answer:
      "We'll be in touch before your trial ends. You simply choose a plan and we continue hosting your site. If you decide not to continue, just let us know and we'll take your site offline — no questions asked, no charges made.",
  },
  {
    id: "ft-3",
    category: "The Free Trial",
    question: "Do I need to give card details to start?",
    answer:
      "No. You only provide payment details if you decide to continue after your 10-day free trial. You can start your application right now with nothing but your email address.",
  },
  {
    id: "ft-4",
    category: "The Free Trial",
    question: "Can I extend my trial?",
    answer:
      "In some cases, yes. If you need more time to make a decision, just get in touch and we'll see what we can do. We'd rather you take the time to feel confident than rush into a decision.",
  },
  // Pricing
  {
    id: "pr-1",
    category: "Pricing & Payments",
    question: "How much does it cost after the trial?",
    answer:
      "Our Starter plan is just £29/month. This includes everything — hosting, security, updates, and email support. We also offer Growth (£49/month) and Pro (£79/month) plans with more features. All plans include your free trial.",
  },
  {
    id: "pr-2",
    category: "Pricing & Payments",
    question: "Are there any hidden fees?",
    answer:
      "None whatsoever. The monthly price you see is exactly what you pay. No setup fees, no design charges, no surprise invoices. What you see is what you get.",
  },
  {
    id: "pr-3",
    category: "Pricing & Payments",
    question: "Can I cancel at any time?",
    answer:
      "Yes, absolutely. There are no long-term contracts or lock-in periods. You can cancel with a single email and your subscription ends at the close of your current billing period. We don't make it difficult to leave.",
  },
  {
    id: "pr-4",
    category: "Pricing & Payments",
    question: "What is included in the monthly fee?",
    answer:
      "Your monthly fee covers: website hosting on fast, secure servers; SSL security certificate; regular backups; software updates; and email support. Depending on your plan, it may also include a free domain, Google Analytics, and more.",
  },
  // Your Website
  {
    id: "yw-1",
    category: "Your Website",
    question: "How many pages will I get?",
    answer:
      "Our Starter plan includes up to 5 pages (e.g. Home, About, Services, Gallery, Contact). Our Growth plan includes up to 10 pages, and our Pro plan includes unlimited pages. Most small business websites are well-served by 5 pages.",
  },
  {
    id: "yw-2",
    category: "Your Website",
    question: "Can I make changes after the site is live?",
    answer:
      "Yes. You can request changes by emailing our support team. Minor text and image updates are included in all plans. For more substantial changes, we'll discuss options with you. Pro plan customers get monthly updates included.",
  },
  {
    id: "yw-3",
    category: "Your Website",
    question: "Will my website work on mobile?",
    answer:
      "100%. Every website we build is fully mobile-responsive and tested across devices — smartphone, tablet, and desktop. Over 60% of web traffic is now on mobile, so this is non-negotiable for us.",
  },
  {
    id: "yw-4",
    category: "Your Website",
    question: "Do you include SEO?",
    answer:
      "Yes. All our websites are built with SEO best practices from day one — proper page titles, meta descriptions, fast loading speeds, mobile optimisation, and clean code. Growth and Pro plans include advanced SEO setup.",
  },
  {
    id: "yw-5",
    category: "Your Website",
    question: "Will I own my domain name?",
    answer:
      "If you bring your own domain, it remains yours — always. If we register a domain for you (included in Growth and Pro plans), we register it in your name and you retain full ownership.",
  },
  {
    id: "yw-6",
    category: "Your Website",
    question: "Can I use my existing domain?",
    answer:
      "Absolutely. If you already have a domain name, we can connect it to your new website free of charge. Just include the details in your application and we'll handle the technical side.",
  },
  // Support
  {
    id: "sp-1",
    category: "Support",
    question: "What happens if I need help after launch?",
    answer:
      "We're here for you. All plans include email support. Growth plan customers get priority support, and Pro plan customers can reach us by phone. We typically respond to all enquiries within 1 business day.",
  },
  {
    id: "sp-2",
    category: "Support",
    question: "Do you offer phone support?",
    answer:
      "Phone support is available on our Pro plan (£79/month). All other plans include fast, friendly email support. We're a small, dedicated team — you'll always speak to a real person.",
  },
  {
    id: "sp-3",
    category: "Support",
    question: "How do I request changes?",
    answer:
      "Simply send us an email describing what you'd like changed. For Pro plan customers, you can also call us directly. We aim to complete minor updates within 2–3 business days.",
  },
];
