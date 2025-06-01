"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from '@/components/ui/Image';

// Helper for fade-in animation
const useFadeIn = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("opacity-100", "translate-y-0");
        }
      },
      { threshold: 0.1 }
    );
    node.classList.add("opacity-0", "translate-y-8", "transition-all", "duration-700");
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return ref;
};

// Stat counter animation
const useCounter = (end: number, duration: number, prefix = "", suffix = "") => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const start = 0;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentValue = Math.floor(progress * (end - start) + start);
      setValue(currentValue);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  // Format large numbers with abbreviations
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${prefix}1M${suffix}`;
    }
    return `${prefix}${num}${suffix}`;
  };

  return formatNumber(value);
};

export default function Home() {
  // Refs for smooth scroll
  const overviewRef = useRef<HTMLDivElement | null>(null);

  // Ref for fade-in elements map
  const fadeInElementRefs = useRef<Map<number, HTMLDivElement | null>>(new Map());

  // Observer setup for fade-in effects
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all elements added to the ref map
    fadeInElementRefs.current.forEach(element => {
      if (element) {
        element.classList.add("opacity-0", "translate-y-8", "transition-all", "duration-700");
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []); // Empty dependency array means this runs once on mount

  // Function to set ref for each element, called in render
  const setFadeInRef = (index: number) => (element: HTMLDivElement | null) => {
    if (element) {
      fadeInElementRefs.current.set(index, element);
    } else {
      fadeInElementRefs.current.delete(index);
    }
  };

  let fadeIdx = 0; // Keep the index for assigning refs

  // Stat counters
  const grant = useCounter(1000000, 2000, "$", "+");
  const schools = useCounter(3, 1000);
  const minutes = useCounter(180, 1500);
  const areas = useCounter(3, 1000);

  return (
    <>
      {/* Hero Section */}
      <section className="hero min-h-screen flex items-center justify-center text-center text-white relative overflow-hidden bg-gradient-to-br from-indigo-400 to-purple-600">
        <div className="hero-content relative z-10 max-w-2xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent animate-slideInUp">
            Atlanthos Box
          </h1>
          <p className="subtitle text-2xl md:text-3xl mb-6 opacity-90 animate-slideInUp delay-200">
            Educational Innovation through Immersive Technology
          </p>
          <p className="description text-lg mb-8 max-w-xl mx-auto opacity-80 animate-slideInUp delay-400">
            The Atlanthos Box encourages student engagement through the integration of technology providing an opportunity to learn through play. A groundbreaking VR/AR educational initiative that brought future-focused Black narratives to BC K-12 curriculum, securing over $1M in funding and transforming how students engage with diverse stories.
          </p>
          <button
            className="cta-button inline-block px-10 py-4 bg-white/20 border-2 border-white/30 text-white rounded-full font-semibold text-lg transition-all duration-300 backdrop-blur hover:bg-white/30 hover:-translate-y-1 hover:shadow-xl animate-slideInUp delay-600"
            onClick={() => overviewRef.current?.scrollIntoView({ behavior: "smooth" })}
          >
            Explore the Project
          </button>
        </div>
        {/* SVG grid background */}
        <div className="absolute inset-0 pointer-events-none animate-float opacity-30">
          <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeOpacity="0.1" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content bg-white relative z-1">
        {/* Project Overview */}
        <section id="overview" ref={overviewRef} className="section py-24" >
          <div className="container max-w-5xl mx-auto px-4">
            <h2 ref={setFadeInRef(fadeIdx++)} className="section-title text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">Project Overview</h2>
            <div className="overview-grid grid md:grid-cols-3 gap-10 mt-10">
              <div ref={setFadeInRef(fadeIdx++)} className="overview-card bg-gradient-to-br from-gray-50 to-gray-100 p-10 rounded-2xl shadow-xl border border-white/20 hover:-translate-y-2 hover:shadow-2xl transition-all">
                <h3 className="text-xl font-bold mb-2">🎯 Mission</h3>
                <p className="text-gray-600">Address the gap in life-affirming and future-focused content about Black communities within the BC K-12 curriculum through innovative immersive technology.</p>
              </div>
              <div ref={setFadeInRef(fadeIdx++)} className="overview-card bg-gradient-to-br from-gray-50 to-gray-100 p-10 rounded-2xl shadow-xl border border-white/20 hover:-translate-y-2 hover:shadow-2xl transition-all">
                <h3 className="text-xl font-bold mb-2">🏫 Implementation</h3>
                <p className="text-gray-600">Successfully piloted in three Vancouver School District schools during Black History Month 2023, reaching grades 7-9 students aged 13-14.</p>
              </div>
              <div ref={setFadeInRef(fadeIdx++)} className="overview-card bg-gradient-to-br from-gray-50 to-gray-100 p-10 rounded-2xl shadow-xl border border-white/20 hover:-translate-y-2 hover:shadow-2xl transition-all">
                <h3 className="text-xl font-bold mb-2">💰 Funding Success</h3>
                <p className="text-gray-600">Secured over $1 million in grant funding from Unity and Meta to expand the program and scale its impact across more schools.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Product Design */}
        <section className="section product-design bg-gradient-to-br from-gray-50 to-gray-200 py-24">
          <div className="container max-w-5xl mx-auto px-4">
            <h2 ref={setFadeInRef(fadeIdx++)} className="section-title text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">Product Design</h2>
            <div className="product-showcase max-w-4xl mx-auto">
              <div ref={setFadeInRef(fadeIdx++)} className="product-hero grid md:grid-cols-2 gap-16 items-center mb-20">
                <div className="product-image relative rounded-2xl overflow-hidden shadow-2xl hover:-translate-y-2 transition-all">
                  <Image
                    src="/images/Atlanthos_Box_Design_image.png"
                    alt="Atlanthos Box - Educational VR/AR Kit by Ethos Lab"
                    width={1000}
                    height={750}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </div>
                <div className="product-description">
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">Atlanthos Box Design Concept</h3>
                  <p className="product-subtitle text-indigo-500 italic mb-4">by Tylar Campbell</p>
                  <p className="text-lg text-gray-600">The Atlanthos Box encourages student engagement through the integration of technology, providing an opportunity to learn through play. This innovative educational tool combines physical and digital elements to create immersive learning experiences.</p>
                </div>
              </div>
              <div className="product-layers bg-white p-10 rounded-2xl shadow-xl">
                <h3 ref={setFadeInRef(fadeIdx++)} className="layers-title text-2xl font-bold text-center mb-10 text-gray-800">Three-Layer Architecture</h3>
                <div className="layers-grid grid md:grid-cols-3 gap-8">
                  <div ref={setFadeInRef(fadeIdx++)} className="layer-card text-center p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-indigo-200/20 hover:-translate-y-1 hover:shadow-xl transition-all">
                    <div className="layer-icon text-4xl mb-4">📚</div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">Resources Layer</h4>
                    <p className="text-gray-600">Wide array of materials including instruction guides, QR codes for digital access, and comprehensive teaching resources to enhance learning experiences.</p>
                  </div>
                  <div ref={setFadeInRef(fadeIdx++)} className="layer-card text-center p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-indigo-200/20 hover:-translate-y-1 hover:shadow-xl transition-all">
                    <div className="layer-icon text-4xl mb-4">🎓</div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">Teaching Materials Layer</h4>
                    <p className="text-gray-600">Curated content including storytelling frameworks, interactive lore, and tactile learning components to support educators in delivering engaging lessons.</p>
                  </div>
                  <div ref={setFadeInRef(fadeIdx++)} className="layer-card text-center p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-indigo-200/20 hover:-translate-y-1 hover:shadow-xl transition-all">
                    <div className="layer-icon text-4xl mb-4">💻</div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">Technology Layer</h4>
                    <p className="text-gray-600">Interactive elements including VR headsets, AR tablets, and digital tools that create immersive learning environments for students.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section 
          className="section features bg-gradient-to-br from-indigo-400 to-purple-600 text-white py-24 relative overflow-hidden"
          style={{ /* Remove background image style */ }}
        >
          {/* Remove overlay div */}
          {/* <div className="absolute inset-0 bg-indigo-400 opacity-80"></div> */}
          <div className="container max-w-5xl mx-auto px-4 relative z-10"> 
            <h2 ref={setFadeInRef(fadeIdx++)} className="section-title text-4xl md:text-5xl font-bold text-center mb-12">Key Components</h2>

            {/* Add the visual image here, below the title */}
            <div ref={setFadeInRef(fadeIdx++)} className="mb-12 flex justify-center"> 
              <Image
                src="/images/Box_Key_components_visual.png"
                alt="Atlanthos Box Key Components Visual"
                width={1000} // Increased width
                height={750} // Increased height (maintaining aspect ratio)
                className="w-full h-auto rounded-lg shadow-lg" // w-full allows it to fill the container width
                priority
              />
            </div>

            {/* The feature cards grid remains here, add margin top to push it down */}
            <div className="features-grid grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 pt-12"> {/* Added pt-12 to create space below the image */}
              {/* Feature Card 1: Teacher Training Materials */}
              <div ref={setFadeInRef(fadeIdx++)} className="feature-card bg-white/10 p-8 rounded-xl backdrop-blur border border-white/20 hover:bg-white/20 hover:-translate-y-1 transition-all flex flex-col items-center text-center">
                <div className="feature-icon w-16 h-16 mb-4 bg-white/20 rounded-lg flex items-center justify-center text-2xl">👨‍🏫</div>
                <h3 className="text-xl font-bold mb-2">Teacher Training Materials</h3>
                <p>Comprehensive training resources and administrative guidelines to ensure seamless integration into existing classroom workflows.</p>
              </div>
              {/* Feature Card 2: Interactive Learning Content */}
              <div ref={setFadeInRef(fadeIdx++)} className="feature-card bg-white/10 p-8 rounded-xl backdrop-blur border border-white/20 hover:bg-white/20 hover:-translate-y-1 transition-all flex flex-col items-center text-center">
                <div className="feature-icon w-16 h-16 mb-4 bg-white/20 rounded-lg flex items-center justify-center text-2xl">📚</div>
                <h3 className="text-xl font-bold mb-2">Interactive Learning Content</h3>
                <p>Three comprehensive 60-minute lessons focused on immersive storytelling, perfectly aligned with BC Curriculum standards across multiple subjects.</p>
              </div>
              {/* Feature Card 3: VR/AR Technology Package */}
              <div ref={setFadeInRef(fadeIdx++)} className="feature-card bg-white/10 p-8 rounded-xl backdrop-blur border border-white/20 hover:bg-white/20 hover:-translate-y-1 transition-all flex flex-col items-center text-center">
                <div className="feature-icon w-16 h-16 mb-4 bg-white/20 rounded-lg flex items-center justify-center text-2xl">🥽</div>
                <h3 className="text-xl font-bold mb-2">VR/AR Technology Package</h3>
                <p>Complete tech suite including Quest 2 VR headsets, iPad Pro for Web XR experiences, 360° camera equipment, and AI-powered world building tools.</p>
              </div>
              {/* Feature Card 4: Curriculum Integration */}
              <div ref={setFadeInRef(fadeIdx++)} className="feature-card bg-white/10 p-8 rounded-xl backdrop-blur border border-white/20 hover:bg-white/20 hover:-translate-y-1 transition-all flex flex-col items-center text-center">
                <div className="feature-icon w-16 h-16 mb-4 bg-white/20 rounded-lg flex items-center justify-center text-2xl">🎓</div>
                <h3 className="text-xl font-bold mb-2">Curriculum Integration</h3>
                <p>Seamlessly integrated with Applied Design Skills and Technology (ADST), Social Studies, and English curricula for holistic learning.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Impact & Results */}
        <section className="section impact bg-gray-50 py-24">
          <div className="container max-w-5xl mx-auto px-4">
            <h2 ref={setFadeInRef(fadeIdx++)} className="section-title text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">Impact & Results</h2>
            <div className="impact-stats grid md:grid-cols-4 gap-8 mt-10">
              <div ref={setFadeInRef(fadeIdx++)} className="stat-card text-center p-10 bg-white rounded-xl shadow-lg hover:-translate-y-1 transition-all">
                <span className="stat-number text-4xl font-extrabold text-indigo-500 block mb-2">{grant}</span>
                <span className="stat-label text-lg text-gray-600 font-semibold">Grant Funding Secured</span>
              </div>
              <div ref={setFadeInRef(fadeIdx++)} className="stat-card text-center p-10 bg-white rounded-xl shadow-lg hover:-translate-y-1 transition-all">
                <span className="stat-number text-4xl font-extrabold text-indigo-500 block mb-2">{schools}</span>
                <span className="stat-label text-lg text-gray-600 font-semibold">Vancouver Schools</span>
              </div>
              <div ref={setFadeInRef(fadeIdx++)} className="stat-card text-center p-10 bg-white rounded-xl shadow-lg hover:-translate-y-1 transition-all">
                <span className="stat-number text-4xl font-extrabold text-indigo-500 block mb-2">{minutes}</span>
                <span className="stat-label text-lg text-gray-600 font-semibold">Minutes of Content</span>
              </div>
              <div ref={setFadeInRef(fadeIdx++)} className="stat-card text-center p-10 bg-white rounded-xl shadow-lg hover:-translate-y-1 transition-all">
                <span className="stat-number text-4xl font-extrabold text-indigo-500 block mb-2">{areas}</span>
                <span className="stat-label text-lg text-gray-600 font-semibold">Curriculum Areas</span>
              </div>
            </div>
            {/* Project Timeline */}
            <div ref={setFadeInRef(fadeIdx++)} className="timeline mt-20">
              <h3 className="text-center mb-12 text-2xl font-bold text-gray-800">Project Timeline</h3>
              <div className="space-y-10">
                <div className="timeline-item flex flex-col md:flex-row items-start gap-4 md:gap-8">
                  <div className="timeline-date w-full md:w-48 font-bold text-indigo-500 text-lg">September 2022</div>
                  <div className="timeline-content flex-1 relative">
                    <h4 className="text-lg font-bold text-gray-800 mb-2">Project Initiation</h4>
                    <p className="text-gray-600">Began development of the Atlanthos Box concept and curriculum framework at Ethos Lab.</p>
                  </div>
                </div>
                <div className="timeline-item flex flex-col md:flex-row items-start gap-4 md:gap-8">
                  <div className="timeline-date w-full md:w-48 font-bold text-indigo-500 text-lg">October - December 2022</div>
                  <div className="timeline-content flex-1 relative">
                    <h4 className="text-lg font-bold text-gray-800 mb-2">Content Development</h4>
                    <p className="text-gray-600">Created immersive learning experiences and aligned content with BC Curriculum standards.</p>
                  </div>
                </div>
                <div className="timeline-item flex flex-col md:flex-row items-start gap-4 md:gap-8">
                  <div className="timeline-date w-full md:w-48 font-bold text-indigo-500 text-lg">January 2023</div>
                  <div className="timeline-content flex-1 relative">
                    <h4 className="text-lg font-bold text-gray-800 mb-2">Teacher Training</h4>
                    <p className="text-gray-600">Developed comprehensive training materials and conducted educator workshops.</p>
                  </div>
                </div>
                <div className="timeline-item flex flex-col md:flex-row items-start gap-4 md:gap-8">
                  <div className="timeline-date w-full md:w-48 font-bold text-indigo-500 text-lg">February 2023</div>
                  <div className="timeline-content flex-1 relative">
                    <h4 className="text-lg font-bold text-gray-800 mb-2">Pilot Launch</h4>
                    <p className="text-gray-600">Successfully launched pilot program in three Vancouver School District schools during Black History Month.</p>
                  </div>
                </div>
                <div className="timeline-item flex flex-col md:flex-row items-start gap-4 md:gap-8">
                  <div className="timeline-date w-full md:w-48 font-bold text-indigo-500 text-lg">March - May 2023</div>
                  <div className="timeline-content flex-1 relative">
                    <h4 className="text-lg font-bold text-gray-800 mb-2">Funding Success</h4>
                    <p className="text-gray-600">Secured over $1 million in grants from Unity and Meta for program expansion.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="section py-24">
          <div className="container max-w-5xl mx-auto px-4">
            <h2 ref={setFadeInRef(fadeIdx++)} className="section-title text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">Technology & Tools</h2>
            <div className="tech-stack grid md:grid-cols-4 gap-8 mt-10">
              <div ref={setFadeInRef(fadeIdx++)} className="tech-category bg-white p-8 rounded-xl shadow-lg hover:-translate-y-1 transition-all">
                <h4 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-indigo-400 pb-2">🥽 VR/AR Hardware</h4>
                <ul className="tech-list list-none">
                  <li className="py-2 border-b border-gray-200 last:border-b-0 text-gray-600">Meta Quest 2 VR Headsets</li>
                  <li className="py-2 border-b border-gray-200 last:border-b-0 text-gray-600">iPad Pro for Web XR</li>
                  <li className="py-2 border-b border-gray-200 last:border-b-0 text-gray-600">360° Camera Equipment</li>
                  <li className="py-2 border-b-0 text-gray-600">Mobile VR Accessories</li>
                </ul>
              </div>
              <div ref={setFadeInRef(fadeIdx++)} className="tech-category bg-white p-8 rounded-xl shadow-lg hover:-translate-y-1 transition-all">
                <h4 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-indigo-400 pb-2">🤖 AI & Development</h4>
                <ul className="tech-list list-none">
                  <li className="py-2 border-b border-gray-200 last:border-b-0 text-gray-600">Generative AI Tools</li>
                  <li className="py-2 border-b border-gray-200 last:border-b-0 text-gray-600">World Building Platforms</li>
                  <li className="py-2 border-b border-gray-200 last:border-b-0 text-gray-600">Unity 3D Engine</li>
                  <li className="py-2 border-b-0 text-gray-600">WebXR Technologies</li>
                </ul>
              </div>
              <div ref={setFadeInRef(fadeIdx++)} className="tech-category bg-white p-8 rounded-xl shadow-lg hover:-translate-y-1 transition-all">
                <h4 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-indigo-400 pb-2">📚 Educational Framework</h4>
                <ul className="tech-list list-none">
                  <li className="py-2 border-b border-gray-200 last:border-b-0 text-gray-600">BC Curriculum Standards</li>
                  <li className="py-2 border-b border-gray-200 last:border-b-0 text-gray-600">ADST Integration</li>
                  <li className="py-2 border-b border-gray-200 last:border-b-0 text-gray-600">Social Studies Alignment</li>
                  <li className="py-2 border-b-0 text-gray-600">English Language Arts</li>
                </ul>
              </div>
              <div ref={setFadeInRef(fadeIdx++)} className="tech-category bg-white p-8 rounded-xl shadow-lg hover:-translate-y-1 transition-all">
                <h4 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-indigo-400 pb-2">🎯 Implementation</h4>
                <ul className="tech-list list-none">
                  <li className="py-2 border-b border-gray-200 last:border-b-0 text-gray-600">Teacher Training Modules</li>
                  <li className="py-2 border-b border-gray-200 last:border-b-0 text-gray-600">Assessment Tools</li>
                  <li className="py-2 border-b border-gray-200 last:border-b-0 text-gray-600">Administrative Guidelines</li>
                  <li className="py-2 border-b-0 text-gray-600">Technical Support Systems</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
