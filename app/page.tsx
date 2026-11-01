"use client";

import { FormEvent, useMemo, useState } from "react";

const services = [
  {
    name: "Plumbing",
    description: "Pipe repair, leak detection, drainage & sanitary fixtures",
    detail: "Master certified with zero-leak guarantee",
    price: "500",
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=760&auto=format&fit=crop&q=80",
    icon: "⌁",
    fresh: true,
  },
  {
    name: "Electricity Service",
    description: "Wiring inspection, circuit breakers, lighting & appliance fix",
    detail: "Licensed electrical engineer",
    price: "550",
    image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=760&auto=format&fit=crop&q=80",
    icon: "ϟ",
    fresh: true,
  },
  {
    name: "Building Work",
    description: "Masonry, wall plastering, tiling & structural maintenance",
    detail: "Structural & masonry specialist",
    price: "800",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=760&auto=format&fit=crop&q=80",
    icon: "▦",
    fresh: true,
  },
  {
    name: "Cleaning Service",
    description: "Deep residential, move-in sanitization & recurring maid care",
    detail: "Hospital-grade sanitization",
    price: "450",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=760&auto=format&fit=crop&q=80",
    icon: "✦",
    fresh: false,
  },
  {
    name: "Care Taking",
    description: "Elderly assistance, patient companion & gentle home care",
    detail: "Certified nursing assistants",
    price: "600",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=760&auto=format&fit=crop&q=80",
    icon: "♡",
    fresh: true,
  },
  {
    name: "Carpenter Service",
    description: "Custom furniture repair, door fitting & bespoke woodwork",
    detail: "Bespoke woodwork & furniture repair",
    price: "550",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=760&auto=format&fit=crop&q=80",
    icon: "⌂",
    fresh: false,
  },
  {
    name: "Cook & Chef",
    description: "Private home meal preparation, culinary catering & dinner party",
    detail: "Private gourmet chef",
    price: "650",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=760&auto=format&fit=crop&q=80",
    icon: "♨",
    fresh: true,
  },
  {
    name: "Other Services",
    description: "General handyman tasks, locksmith, painting & repairs",
    detail: "General handyman & repairs",
    price: "400",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=760&auto=format&fit=crop&q=80",
    icon: "✚",
    fresh: false,
  },
  {
    name: "Solar & Inverter Service",
    description: "Solar panel cleaning, inverter diagnostics, battery maintenance & rooftop inspection in Sri Lanka",
    detail: "Certified Solar PV Engineers",
    price: "3,500",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=760&auto=format&fit=crop&q=80",
    icon: "☼",
    fresh: true,
  },
];

const serviceKeywords: Record<string, string> = {
  Plumbing: "plumbing pipe leak drainage sanitary",
  "Electricity Service": "electric electricity short circuit wiring circuit breaker light appliance a/c ac repair air conditioning",
  "Building Work": "building masonry wall plaster tiling structural",
  "Cleaning Service": "cleaning clean deep house housekeeping maid sanitization",
  "Care Taking": "care taking caregiving elderly patient",
  "Carpenter Service": "carpenter carpentry furniture woodwork",
  "Cook & Chef": "cook chef meal catering",
  "Other Services": "other handyman locksmith painting repair",
  "Solar & Inverter Service": "solar inverter battery rooftop",
};

const benefits = [
  {
    icon: "✓",
    title: "100% Police & NIC Verified",
    text: "Every technician undergoes strict background verification, criminal record check, and National Identity Card (NIC) authentication before setting foot in your home.",
  },
  {
    icon: "₨",
    title: "Zero Hidden Charges in LKR",
    text: "Know exactly what you pay in Sri Lankan Rupees before work begins. No unexpected surcharges, fuel additions, or on-site rate spikes.",
  },
  {
    icon: "↻",
    title: "7-Day Free Warranty",
    text: "If an issue recurs within 7 days of repair, our technician will return and fix it completely free of charge.",
  },
  {
    icon: "◷",
    title: "30-Minute Emergency Response",
    text: "Our rapid dispatch system routes the nearest active specialist in Colombo, Kandy, Galle, or Negombo.",
  },
  {
    icon: "♡",
    title: "Courteous & Respectful Pros",
    text: "Our service partners are trained in professionalism, clean work habits, boot covers, and complete post-service cleanup.",
  },
  {
    icon: "☏",
    title: "24/7 Islandwide Helpdesk",
    text: "Our bilingual Colombo support team is always available via phone, live chat, or WhatsApp in English, Sinhala, and Tamil.",
  },
];

const reviews = [
  {
    name: "Dr. Priyantha Jayasuriya",
    place: "Colombo 07 (Cinnamon Gardens)",
    service: "A/C Inverter Chemical Cleaning",
    date: "3 days ago",
    text: "Outstanding service. The technician Dinesh arrived in 25 minutes with full chemical pressure equipment. Fixed our master bedroom A/C cooling issue without any mess. The 7-day guarantee gives huge confidence.",
  },
  {
    name: "Shalini Mendis",
    place: "Mount Lavinia",
    service: "Plumbing & Leak Detection",
    date: "1 week ago",
    text: "Had an emergency burst pipe under our kitchen sink on Sunday evening. Booked on Sewa and had a verified plumber at our doorstep in 30 minutes. Fixed it cleanly for Rs. 2,500. Highly recommended!",
  },
  {
    name: "Tharindu Wickramaratne",
    place: "Kandy (Peradeniya Rd)",
    service: "Main Breaker & Short Circuit Repair",
    date: "2 weeks ago",
    text: "Very polite, certified electrician with proper safety testing gear. Identified a burnt neutral line and restored power safely. Transparent rates in LKR without any hassle.",
  },
];

const faqs = [
  {
    question: "How fast can a technician arrive at my home in Sri Lanka?",
    answer:
      "For emergency bookings like burst water pipes, power outages, or water pump failures, our dispatch system assigns the closest technician in your area, typically arriving within 30 to 45 minutes across Colombo, Gampaha, Kandy, Galle, and Negombo.",
  },
  {
    question: "How are Sewa service technicians verified?",
    answer:
      "Every service professional completes identity and background verification, including National Identity Card checks, before joining the Sewa network.",
  },
  {
    question: "What is the 7-Day Free Warranty?",
    answer:
      "If an issue with the completed repair recurs within seven days, contact our support team and we will arrange a return visit to resolve it.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "You can pay your technician in Sri Lankan Rupees by cash or card after reviewing the estimate and completed work.",
  },
  {
    question: "How can I register as a service technician / partner?",
    answer:
      "Complete the partner application on this page with your contact details, service specialties, and operating area. Our team will contact you about verification.",
  },
  {
    question: "Is Sewa available outside of Colombo?",
    answer:
      "Sewa serves Colombo, Kandy, Galle, Negombo, Gampaha and other major Sri Lankan cities. Contact our helpdesk to check availability in your area.",
  },
];

function Logo({ small = false }: { small?: boolean }) {
  return (
    <a className={`brand${small ? " brand-small" : ""}`} href="#top" aria-label="Sewa home">
      <span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M14.7 6.3a5 5 0 0 0-6.4 6.4l-5.2 5.2a2 2 0 0 0 2.8 2.8l5.2-5.2a5 5 0 0 0 6.4-6.4l-3 3-3-3 3.2-2.8Z" /></svg></span>
      <span className="brand-name">Sewa<span>.lk</span></span>
      {!small && <span className="pro-tag">PRO</span>}
      {small && <span className="brand-caption">Sri Lanka's trusted home services</span>}
    </a>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const filteredServices = useMemo(() => {
    const filter = activeFilter.trim().toLowerCase();
    if (!filter) return services;
    const categoryMatches: Record<string, string[]> = {
      "plumbing & carpentry": ["Plumbing", "Carpenter Service"],
      electrical: ["Electricity Service"],
      "a/c & appliance": ["Electricity Service"],
      "cleaning & care": ["Cleaning Service", "Care Taking"],
    };
    if (categoryMatches[filter]) {
      return services.filter((service) => categoryMatches[filter].includes(service.name));
    }
    const terms = filter.split(/\s+/);
    return services.filter((service) =>
      terms.every((term) =>
        `${service.name} ${service.description} ${serviceKeywords[service.name]}`.toLowerCase().includes(term),
      ),
    );
  }, [activeFilter]);

  function findService(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setActiveFilter(query);
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  }

  function choosePopular(value: string) {
    setQuery(value);
    setActiveFilter(value);
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main id="top">
      <div className="topline">
        <div className="topline-inner">
          <div className="location-group">
            <span className="live-pill"><i /> Live in Sri Lanka</span>
            <span>Colombo • Kandy • Galle • Negombo • Gampaha</span>
          </div>
          <div className="topline-contact">
            <a href="tel:+94112345678">☏ &nbsp;Hotline: +94 11 234 5678</a>
            <span className="top-divider">|</span>
            <span>◷ &nbsp;30-Min Emergency Response</span>
          </div>
        </div>
      </div>

      <header className="site-header">
        <div className="nav-inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#services">Services</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#why-us">Why Sewa</a>
            <a href="#reviews">Reviews</a>
            <a href="#about">About Us</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="nav-actions">
            <a className="button button-pale nav-join" href="#partner">↗ &nbsp;Join as Technician</a>
            <a className="button button-green nav-download" href="#download-app">▣ &nbsp;Download App</a>
          </div>
          <a className="mobile-menu" href="#services" aria-label="Browse services">☰</a>
        </div>
      </header>

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="eyebrow"><i /> Sri Lanka's #1 On-Demand Home & Emergency Services</span>
            <h1>Fix Anything at Home<br />with <em>professional quality</em></h1>
            <p className="hero-description">
              Book verified plumbers, electricians, A/C technicians, and carpenters across Colombo, Kandy,
              Galle, and major cities. Transparent estimates in <strong>LKR (Rs.)</strong> with a <strong>100% 7-day workmanship warranty.</strong>
            </p>
            <form className="search-box" onSubmit={findService}>
              <span className="search-icon" aria-hidden="true">⌕</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="What service do you need? (e.g. A/C Wash, Plumbing...)"
                aria-label="Search for a home service"
              />
              <button className="button button-green search-button" type="submit">Find Pro <span>→</span></button>
            </form>
            <div className="popular">
              <span>Popular:</span>
              {["A/C Repair", "Pipe Leak", "Short Circuit", "Carpenter", "Deep Cleaning"].map((item) => (
                <button key={item} type="button" onClick={() => choosePopular(item)}>{item}</button>
              ))}
            </div>
            <div className="hero-metrics">
              <div><span className="metric-icon">✓</span><p><strong>100% Verified</strong><small>NIC & Police Checked</small></p></div>
              <div><span className="metric-icon">◷</span><p><strong>30-Min Arrival</strong><small>Fast Emergency Dispatch</small></p></div>
              <div><span className="metric-icon star">★</span><p><strong>7-Day Warranty</strong><small>Free Re-service Guarantee</small></p></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-frame">
              <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1100&auto=format&fit=crop&q=85" alt="Sewa technician carrying out a professional home repair" />
              <div className="rating-card"><span>4.9</span><div><b>★★★★★</b><small>15,000+ Completed Bookings</small></div></div>
              <div className="price-card"><span className="mini-mark">⌁</span><div><b>Starting from Rs. 1,500</b><small>Zero Callout Fee if Booked</small></div></div>
            </div>
            <a className="technician-callout" href="#partner"><span>↗</span><div><b>Are you a skilled technician or service pro?</b><small>Join our verified specialist network across Sri Lanka.</small></div><strong>Register Now →</strong></a>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Sewa service guarantees">
        <div><strong>4.9 <span>★★★★★</span></strong><small>15,000+ Completed Bookings</small></div>
        <i />
        <div><strong>Rs. 1,500</strong><small>Starting service price</small></div>
        <i />
        <div><strong>100%</strong><small>Verified professionals</small></div>
        <i />
        <div><strong>7 days</strong><small>Workmanship warranty</small></div>
      </section>

      <section className="services-section section-wrap" id="services">
        <div className="section-heading">
          <span className="eyebrow"><i /> Professional Services Catalog</span>
          <h2>Certified Home Services <em>for your daily needs</em></h2>
          <p>Every service is handled by police-verified specialists with transparent estimates in LKR and backed by our standard 7-day workmanship warranty.</p>
        </div>
        <div className="service-filters" aria-label="Service categories">
          {["All Services", "Plumbing & Carpentry", "Electrical", "A/C & Appliance", "Cleaning & Care"].map((filter, index) => (
          <button key={filter} className={index === 0 && !activeFilter ? "selected" : ""} type="button" onClick={() => { setActiveFilter(index === 0 ? "" : filter); setQuery(""); }}>
              {filter}
            </button>
          ))}
        </div>
        {filteredServices.length > 0 ? (
          <div className="service-grid">
            {filteredServices.map((service) => (
              <article className="service-card" key={service.name}>
                <div className="service-image">
                  <img src={service.image} alt={`${service.name} service in Sri Lanka`} loading="lazy" />
                  <span className="service-icon">{service.icon}</span>
                  {service.fresh && <span className="new-tag">NEW</span>}
                  <span className="price-tag">Rs. {service.price}</span>
                </div>
                <div className="service-content">
                  <span className="service-detail">{service.detail}</span>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <div className="service-perks"><span>✓ &nbsp;7-Day Free Warranty included</span><span>✓ &nbsp;Arrives with complete professional tools</span></div>
                  <a href="#download-app" className="service-cta">Book on Mobile App <span>↗</span></a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-search">
            <strong>No exact service match found.</strong>
            <span>Try “Plumbing”, “Electricity”, or call our team for a custom request.</span>
            <a href="tel:+94112345678">Call +94 11 234 5678</a>
          </div>
        )}
        <div className="custom-quote">
          <span className="custom-icon">☏</span>
          <div><h3>Need a customized repair or custom quotation?</h3><p>Speak directly with our engineering coordinators in Colombo for immediate dispatch.</p></div>
          <a className="button button-green" href="tel:+94112345678">Call +94 11 234 5678</a>
          <a className="button button-outline" href="https://wa.me/94112345678">WhatsApp Support</a>
        </div>
      </section>

      <section className="steps-section" id="how-it-works">
        <div className="section-wrap">
          <div className="section-heading">
            <span className="eyebrow"><i /> Effortless Process</span>
            <h2>How Sewa Works in <em>3 Simple Steps</em></h2>
            <p>No endless phone calls or bargaining with unvetted handymen. We handle everything from booking to warranty.</p>
          </div>
          <div className="steps-grid">
            {[
              ["01", "30 Seconds", "Select Service & Location", "Pick your repair or maintenance need from our catalog and pinpoint your location on the map in seconds.", "⌕"],
              ["02", "Within 30 Mins", "Instant Matched Specialist Arrives", "Track your verified specialist in real-time as they travel to your home with tools and genuine spare parts.", "⌖"],
              ["03", "100% Guaranteed", "Job Done with 7-Day Warranty", "Inspect the completed work, pay seamlessly in LKR (Cash or Card), and enjoy peace of mind with our 7-day guarantee.", "✓"],
            ].map(([number, tag, title, text, icon]) => (
              <article className="step-card" key={number}>
                <div className="step-top"><span className="step-number">{number}</span><span className="step-label">{tag}</span></div>
                <div className="step-icon">{icon}</div>
                <h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="why-section section-wrap" id="why-us">
        <div className="why-intro">
          <span className="eyebrow"><i /> The Sewa Standard</span>
          <h2>Why Sri Lankan Homeowners <em>Choose Sewa</em></h2>
          <p>We are transforming Sri Lanka's informal handyman industry with security, reliability, and guaranteed quality standards.</p>
          <a className="text-link" href="#services">Explore our services <span>→</span></a>
        </div>
        <div className="benefit-grid">
          {benefits.map((benefit) => (
            <article className="benefit-card" key={benefit.title}>
              <span className="benefit-icon">{benefit.icon}</span>
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="partner-section" id="partner">
        <div className="partner-wrap">
          <div className="partner-intro">
            <span className="eyebrow eyebrow-dark"><i /> Technician Onboarding Portal</span>
            <h2>Grow Your Income <em>with Sewa Pro</em></h2>
            <p>Are you a skilled electrician, plumber, A/C technician, carpenter, or cleaner in Sri Lanka? Register today to receive daily verified customer jobs.</p>
            <div className="partner-points">
              <span><b>✓</b> Reach thousands of local customers</span>
              <span><b>✓</b> Flexible jobs in your service area</span>
              <span><b>✓</b> Build trust with a verified profile</span>
            </div>
          </div>
          <form className="partner-form">
            <div className="form-title"><span className="form-icon">↗</span><div><h3>Join Sewa as a Certified Service Professional</h3><p>Fill in your details to get started with verification.</p></div></div>
            <label className="photo-upload"><span className="photo-icon">＋</span><span><b>Profile Photo / Headshot</b><small>Clear face photo in work attire. Builds high trust with customers booking in the app.</small></span><input type="file" accept="image/*" aria-label="Choose profile photo" /></label>
            <div className="form-grid">
              <label>Full Name (as per NIC) *<input required placeholder="Your full name" /></label>
              <label>National Identity Card (NIC) *<input required placeholder="e.g. 199012345678" /></label>
              <label>WhatsApp Number *<input required type="tel" placeholder="+94 77 123 4567" /></label>
              <label>Email Address *<input required type="email" placeholder="you@example.com" /></label>
              <label>Age (Years)<input type="number" min="18" placeholder="Age" /></label>
              <label>Experience (Years)<input type="number" min="0" placeholder="Years of experience" /></label>
              <label className="full-field">Primary Operating City<select defaultValue=""><option value="" disabled>Select your city</option><option>Colombo 01 - 15</option><option>Dehiwala - Mount Lavinia</option><option>Nugegoda / Maharagama</option><option>Gampaha / Kadawatha</option><option>Negombo</option><option>Kandy</option><option>Galle</option><option>Kurunegala</option><option>Matara</option><option>Kalutara</option></select></label>
              <label className="full-field">Select Service Type<small className="field-note">Choose your main area of expertise</small><select defaultValue=""><option value="" disabled>Select a service type</option>{services.map((service) => <option key={service.name}>{service.name}</option>)}</select></label>
              <label className="full-field">Short Bio / Highlights<textarea rows={3} placeholder="Tell customers about your experience and specialties..." /></label>
            </div>
            <p className="consent">By submitting this application, you confirm that the details provided are accurate and consent to background checks in accordance with Sri Lanka's personal data protection principles.</p>
            <button className="button button-green submit-button" type="submit">Submit Partner Application for Approval <span>→</span></button>
          </form>
        </div>
      </section>

      <section className="reviews-section section-wrap" id="reviews">
        <div className="section-heading">
          <span className="eyebrow"><i /> 4.9 / 5.0 from 15,000+ Bookings</span>
          <h2>Loved by Homeowners <em>Across Sri Lanka</em></h2>
          <p>Read verified customer reviews from Colombo, Kandy, Galle, and beyond. Every review is authenticated by our moderation team.</p>
        </div>
        <div className="review-grid">
          {reviews.map((review) => (
            <article className="review-card" key={review.name}>
              <div className="review-top"><span className="review-stars">★★★★★</span><span>{review.date}</span></div>
              <p className="review-quote">“{review.text}”</p>
              <div className="review-person"><span className="avatar">{review.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span><div><h3>{review.name}</h3><small>{review.place}</small><span className="review-service">{review.service}</span></div><span className="verified-check">✓</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="app-section section-wrap" id="download-app">
        <div className="app-copy">
          <span className="eyebrow eyebrow-dark"><i /> Available for Android & iOS</span>
          <h2>Get the Sewa Mobile App <em>for Instant Bookings</em></h2>
          <p>Download the official Sewa Customer App to book certified technicians in 30 seconds, track them to your doorstep, and manage all your home maintenance with ease.</p>
          <ul className="app-features">
            <li>Real-time GPS tracking of arriving technicians</li>
            <li>Instant booking confirmation with zero callout fee</li>
            <li>Transparent estimates calculated in Sri Lankan Rupees</li>
            <li>7-Day Free Warranty auto-activated upon job completion</li>
            <li>Direct WhatsApp and phone contact with your assigned pro</li>
          </ul>
          <div className="store-links">
            <a href="#download-app"><span>▶</span><small>DOWNLOAD ON</small><b>Google Play Store</b></a>
            <a href="#download-app"><span></span><small>Download on the</small><b>Apple App Store</b></a>
          </div>
          <a className="apk-link" href="#download-app">Direct Release APK (v1.0.0) ↗</a>
        </div>
        <div className="phone-scene">
          <div className="phone">
            <div className="phone-notch" />
            <div className="phone-status"><span>09:41</span><span>5G　▰</span></div>
            <div className="phone-location"><small>Current Location</small><b>Colombo 03, Sri Lanka</b><span>⌄</span></div>
            <div className="phone-logo"><Logo small /></div>
            <div className="phone-search">⌕ &nbsp;Search 50+ home services...</div>
            <div className="phone-promo"><small>FIRST ORDER PROMO</small><b>Get Rs. 500 OFF with SEWA500</b><span>Valid across Colombo & Kandy</span></div>
            <div className="phone-pro"><div className="phone-avatar">S</div><div><b>Kasun Perera</b><small>Master Electrician • 4.95 ★</small><span>Arrives in 18 mins</span></div><strong>Rs. 1,800/hr</strong></div>
            <div className="phone-map"><span>⌖</span><i /><b>✓</b></div>
            <div className="phone-bottom">⌂　　　 ♡　　　 ◷　　　 ☻</div>
          </div>
          <span className="phone-orbit orbit-one" /><span className="phone-orbit orbit-two" />
        </div>
      </section>

      <section className="faq-section">
        <div className="section-wrap faq-wrap">
          <div className="section-heading">
            <span className="eyebrow"><i /> Support Centre</span>
            <h2>Got Questions? <em>We Have Answers.</em></h2>
            <p>Everything you need to know about booking, pricing, warranties, and working with Sewa.</p>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <details key={faq.question} open={index === 0}>
                <summary>{faq.question}<span>＋</span></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
          <div className="faq-contact">
            <div><h3>Still have questions or need a custom corporate quote?</h3><p>Our Colombo support team is ready 24/7 to assist with domestic, commercial, or partner inquiries.</p></div>
            <div><a className="button button-green" href="tel:+94112345678">Call +94 11 234 5678</a><a className="button button-outline" href="https://wa.me/94112345678">WhatsApp Us</a></div>
          </div>
        </div>
      </section>

      <footer className="site-footer" id="contact">
        <div className="footer-main section-wrap" id="about">
          <div className="footer-about">
            <Logo small />
            <p>Sri Lanka's trusted on-demand home & emergency repair marketplace. Connecting verified plumbers, electricians, carpenters, A/C technicians, and housekeepers with households across the island.</p>
            <div className="footer-badges"><span>✓ &nbsp;100% Police & NIC Verified</span><span>↻ &nbsp;7-Day Warranty</span></div>
          </div>
          <div className="footer-column"><h3>TOP SERVICES</h3><a href="#services">Plumbing & Leak Repairs</a><a href="#services">Electrical & Safety Inspections</a><a href="#services">A/C Repair & Chemical Wash</a><a href="#services">Carpentry & Woodwork</a><a href="#services">Deep House & Villa Cleaning</a><a href="#services">Elderly & Patient Caregiving</a></div>
          <div className="footer-column"><h3>COMPANY</h3><a href="#about">About Sewa</a><a href="#partner">Join as Technician (Earn More)</a><a href="#contact">Contact Support</a><a href="#contact">Privacy Policy</a><a href="#contact">Terms of Service</a></div>
          <div className="footer-column office"><h3>SRI LANKA OFFICE</h3><p>Level 4, Galle Road,<br />Colombo 03, Sri Lanka</p><a href="tel:+94112345678">+94 11 234 5678 (24/7 Hotline)</a><a href="mailto:support@sewa.lk">support@sewa.lk</a><a className="whatsapp-link" href="https://wa.me/94112345678">☏ &nbsp;Chat on WhatsApp</a></div>
        </div>
        <div className="footer-bottom section-wrap"><span>© 2026 Sewa Technologies (Pvt) Ltd. All rights reserved. Trademark registered in Sri Lanka.</span><span>Prices quoted in Sri Lankan Rupees (LKR / Rs.)</span><span>Sinhala • Tamil • English</span></div>
      </footer>
    </main>
  );
}
