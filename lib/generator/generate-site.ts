import type { Application } from "@/lib/types/application";

export interface GeneratedFile {
  path: string;
  content: string;
}

function slug(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function accent(brandColours?: string | null): string {
  if (!brandColours) return "#4f46e5";
  const hex = brandColours.match(/#[0-9a-fA-F]{3,6}/);
  return hex ? hex[0] : "#4f46e5";
}

function getIndustryCopy(industry: string | null): { tagline: string; heroSub: string } {
  const map: Record<string, { tagline: string; heroSub: string }> = {
    "Karate Club / Martial Arts": {
      tagline: "Train. Grow. Achieve.",
      heroSub: "Join our martial arts community and unlock your potential.",
    },
    "Restaurant / Café": {
      tagline: "Great food. Great people.",
      heroSub: "Fresh ingredients, crafted with care — dine with us today.",
    },
    "Gym / Fitness Studio": {
      tagline: "Stronger every day.",
      heroSub: "Professional coaching and state-of-the-art facilities to reach your goals.",
    },
    "Beauty Salon / Hair": {
      tagline: "Look good. Feel great.",
      heroSub: "Expert beauty treatments tailored to you.",
    },
    "Electrician": {
      tagline: "Reliable. Safe. Local.",
      heroSub: "Fully qualified electricians covering your area — call us today.",
    },
    "Plumber": {
      tagline: "Fast response. Fair prices.",
      heroSub: "Emergency and planned plumbing services you can trust.",
    },
    "Builder / Contractor": {
      tagline: "Built to last.",
      heroSub: "Quality craftsmanship for every project, big or small.",
    },
    "Personal Trainer": {
      tagline: "Your transformation starts here.",
      heroSub: "Personalised training plans to help you hit your goals.",
    },
    "Consultant / Coach": {
      tagline: "Expert guidance. Real results.",
      heroSub: "Strategic advice and coaching to help you grow.",
    },
    "Photographer": {
      tagline: "Moments captured. Stories told.",
      heroSub: "Professional photography for every occasion.",
    },
    "Accountant": {
      tagline: "Numbers done right.",
      heroSub: "Clear, professional financial services for your business.",
    },
  };
  return map[industry ?? ""] ?? {
    tagline: "Professional. Reliable. Local.",
    heroSub: "Quality services delivered with care and expertise.",
  };
}

export function generateSiteFiles(app: Application): GeneratedFile[] {
  const accentColor = accent(app.brand_colours);
  const copy = getIndustryCopy(app.industry);
  const businessSlug = slug(app.business_name);
  const services = (app.features_wanted as string[]) ?? [];
  const goals = (app.goals as string[]) ?? [];

  // Pull uploaded images
  const logoUrl = app.logo_url ?? null;
  const heroImageUrl = app.hero_url ?? null;
  const galleryImageUrls: string[] = app.gallery_urls ?? [];

  // ─── index.html ────────────────────────────────────────────────────────────
  const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${app.business_name}</title>
  <meta name="description" content="${copy.heroSub}" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root { --accent: ${accentColor}; --dark: #111827; --light: #f9fafb; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: var(--dark); line-height: 1.6; }
    a { color: var(--accent); text-decoration: none; }
    /* NAV */
    nav { background: #fff; border-bottom: 1px solid #e5e7eb; padding: 0 1.5rem; display: flex; align-items: center; justify-content: space-between; height: 150px; position: sticky; top: 0; z-index: 100; }
    .nav-logo { font-weight: 800; font-size: 1.1rem; color: var(--dark); display: flex; align-items: center; }
    .nav-links { display: flex; gap: 1.5rem; }
    .nav-links a { font-size: 0.9rem; font-weight: 500; color: #6b7280; }
    .nav-links a:hover { color: var(--accent); }
    .nav-cta { background: var(--accent); color: #fff !important; padding: 0.5rem 1.25rem; border-radius: 999px; font-weight: 600 !important; font-size: 0.875rem !important; }
    /* HERO */
    .hero { ${heroImageUrl ? `background: linear-gradient(rgba(0,0,0,.45),rgba(0,0,0,.45)), url('${heroImageUrl}') center/cover no-repeat; padding: 5rem 1.5rem; text-align: center;` : `background: linear-gradient(135deg, var(--accent)22, var(--accent)08); padding: 5rem 1.5rem; text-align: center;`} }
    .hero h1 { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 900; color: var(--dark); margin-bottom: 1rem; }
    .hero h1 span { color: var(--accent); }
    .hero p { font-size: 1.125rem; color: #6b7280; max-width: 560px; margin: 0 auto 2rem; }
    .btn { display: inline-block; background: var(--accent); color: #fff; padding: 0.85rem 2rem; border-radius: 999px; font-weight: 700; font-size: 1rem; transition: opacity .2s; }
    .btn:hover { opacity: 0.9; }
    .btn-ghost { background: transparent; color: var(--accent); border: 2px solid var(--accent); margin-left: 1rem; }
    /* SECTIONS */
    section { padding: 4rem 1.5rem; }
    .container { max-width: 1100px; margin: 0 auto; }
    .section-title { font-size: 1.75rem; font-weight: 800; margin-bottom: 0.5rem; }
    .section-sub { color: #6b7280; margin-bottom: 2.5rem; }
    /* SERVICES GRID */
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; }
    .card { background: #fff; border: 1px solid #e5e7eb; border-radius: 1rem; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,.06); }
    .card-icon { font-size: 2rem; margin-bottom: 0.75rem; }
    .card h3 { font-weight: 700; margin-bottom: 0.4rem; }
    .card p { color: #6b7280; font-size: 0.9rem; }
    /* ABOUT */
    .about { background: var(--light); }
    .about-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; }
    @media(max-width:700px){ .about-inner { grid-template-columns: 1fr; } .nav-links { display: none; } }
    /* CONTACT */
    .contact { background: #fff; }
    form { display: flex; flex-direction: column; gap: 1rem; max-width: 560px; }
    input, textarea, select { width: 100%; padding: 0.75rem 1rem; border: 1px solid #d1d5db; border-radius: 0.75rem; font-size: 0.95rem; font-family: inherit; }
    input:focus, textarea:focus { outline: 2px solid var(--accent); border-color: transparent; }
    textarea { resize: vertical; min-height: 120px; }
    /* FOOTER */
    footer { background: var(--dark); color: #9ca3af; padding: 2rem 1.5rem; text-align: center; font-size: 0.875rem; }
    footer strong { color: #fff; }
  </style>
</head>
<body>

  <!-- NAV -->
  <nav>
    <div class="nav-logo">${logoUrl ? `<img src="${logoUrl}" alt="${app.business_name} logo" style="height:128px;max-width:360px;object-fit:contain;"/>` : app.business_name}</div>
    <div class="nav-links">
      <a href="#services">Services</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
      <a href="#contact" class="nav-cta">Get in Touch</a>
    </div>
  </nav>

  <!-- HERO -->
  <section class="hero">
    <div class="container">
      <h1 style="${heroImageUrl ? 'color:#fff;' : ''}">${app.business_name}<br/><span style="${heroImageUrl ? 'color:#fff;opacity:0.85;' : ''}">${copy.tagline}</span></h1>
      <p style="${heroImageUrl ? 'color:rgba(255,255,255,0.85);' : ''}">${app.ideal_customers ? `Serving ${app.ideal_customers}` : copy.heroSub}</p>
      <a href="#contact" class="btn">Contact Us Today</a>
      <a href="#services" class="btn btn-ghost">Our Services</a>
    </div>
  </section>

  <!-- SERVICES -->
  <section id="services">
    <div class="container">
      <h2 class="section-title">What We Offer</h2>
      <p class="section-sub">${app.industry ? `Professional ${app.industry.toLowerCase()} services` : "Here's how we can help you"} — tailored to your needs.</p>
      <div class="grid">
        ${services.length > 0
          ? services.map(s => `
        <div class="card">
          <div class="card-icon">✓</div>
          <h3>${s}</h3>
          <p>Available as part of our professional service.</p>
        </div>`).join("")
          : goals.length > 0
          ? goals.map(g => `
        <div class="card">
          <div class="card-icon">🎯</div>
          <h3>${g}</h3>
          <p>We help you achieve this with our tailored approach.</p>
        </div>`).join("")
          : `
        <div class="card"><div class="card-icon">⭐</div><h3>Professional Service</h3><p>Expert service delivered to the highest standard.</p></div>
        <div class="card"><div class="card-icon">🤝</div><h3>Personal Approach</h3><p>Every client is unique — we tailor everything to you.</p></div>
        <div class="card"><div class="card-icon">📍</div><h3>Local & Reliable</h3><p>Based in ${app.location ?? "the UK"}, always ready to help.</p></div>`
        }
      </div>
    </div>
  </section>

  <!-- ABOUT -->
  <section id="about" class="about">
    <div class="container">
      <div class="about-inner">
        <div>
          <h2 class="section-title">About Us</h2>
          <p style="color:#6b7280; margin-bottom:1rem;">${app.ideal_customers ? `We specialise in serving ${app.ideal_customers}.` : `We are a professional ${app.industry ?? "business"} dedicated to delivering excellent results.`}</p>
          <p style="color:#6b7280;">Based in ${app.location ?? "the UK"}, we pride ourselves on quality, reliability, and putting our clients first.</p>
        </div>
        <div style="background:var(--accent)15; border-radius:1.5rem; padding:2rem; text-align:center;">
          <div style="font-size:3rem; margin-bottom:1rem;">🏆</div>
          <div style="font-size:1.5rem; font-weight:800; color:var(--dark);">${app.business_name}</div>
          <div style="color:#6b7280; margin-top:0.5rem;">${app.industry ?? "Professional Services"}</div>
        </div>
      </div>
    </div>
  </section>

  ${galleryImageUrls.length > 0 ? `
  <section style="background:#f9fafb;padding:4rem 1.5rem;">
    <div class="container">
      <h2 class="section-title">Gallery</h2>
      <p class="section-sub">A look at our work.</p>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem;">
        ${galleryImageUrls.map(url => `<img src="${url}" alt="Gallery" style="width:100%;height:200px;object-fit:cover;border-radius:1rem;"/>`).join("")}
      </div>
    </div>
  </section>` : ""}

  <section id="contact" class="contact">
    <div class="container">
      <h2 class="section-title">Get In Touch</h2>
      <p class="section-sub">Ready to get started? Send us a message and we'll be in touch shortly.</p>
      <form>
        <input type="text" placeholder="Your name" required />
        <input type="email" placeholder="Your email" required />
        <input type="tel" placeholder="Your phone number" />
        <textarea placeholder="How can we help you?"></textarea>
        <button type="submit" class="btn" style="border:none;cursor:pointer;">Send Message →</button>
      </form>
    </div>
  </section>

  <!-- FOOTER -->
  <footer>
    <strong>${app.business_name}</strong><br/>
    ${app.location ? `Based in ${app.location} · ` : ""}
    <a href="mailto:${app.email}" style="color:#9ca3af;">${app.email}</a>
    ${app.phone ? ` · ${app.phone}` : ""}
    <br/><br/>© ${new Date().getFullYear()} ${app.business_name}. All rights reserved.
  </footer>

</body>
</html>`;

  return [
    { path: "index.html", content: indexHtml },
    {
      path: "vercel.json",
      content: JSON.stringify({ cleanUrls: true, trailingSlash: false }, null, 2),
    },
  ];
}
