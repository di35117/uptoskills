import { useState, useEffect, useRef } from "react";
import { ForceFieldBackground } from "./ForceFieldBackground";

const ChevronDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

// --- NEW COMPONENT: Neon Creepy Button ---
const NeonCreepyButton = ({
  children,
  colorTheme = "cyan",
  onClick,
  ...props
}) => {
  const eyesRef = useRef(null);
  const [eyeCoords, setEyeCoords] = useState({ x: 0, y: 0 });

  const updateEyes = (e) => {
    const userEvent = "touches" in e ? e.touches[0] : e;
    if (!eyesRef.current) return;

    const eyesRect = eyesRef.current.getBoundingClientRect();
    const eyesCenter = {
      x: eyesRect.left + eyesRect.width / 2,
      y: eyesRect.top + eyesRect.height / 2,
    };
    const cursor = { x: userEvent.clientX, y: userEvent.clientY };

    const dx = cursor.x - eyesCenter.x;
    const dy = cursor.y - eyesCenter.y;
    const angle = Math.atan2(-dy, dx) + Math.PI / 2;

    const distance = Math.min(Math.hypot(dx, dy), 200);
    const x = (Math.sin(angle) * distance) / 150;
    const y = (Math.cos(angle) * distance) / 100;

    setEyeCoords({ x, y });
  };

  const resetEyes = () => setEyeCoords({ x: 0, y: 0 });

  const isCyan = colorTheme === "cyan";
  const textColor = isCyan ? "text-cyan-400" : "text-pink-400";
  const borderColor = isCyan ? "border-cyan-500/50" : "border-pink-500/50";
  const shadowHover = isCyan
    ? "hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]"
    : "hover:shadow-[0_0_30px_rgba(236,72,153,0.6)]";

  return (
    <button
      className={`group relative inline-flex items-center justify-center p-0 border-0 bg-transparent cursor-pointer font-bold ${textColor}`}
      onMouseMove={updateEyes}
      onTouchMove={updateEyes}
      onMouseLeave={resetEyes}
      onClick={onClick}
      {...props}
    >
      {/* Dark base that holds the eyes */}
      <span className="absolute inset-0 bg-[#050508] rounded-full border border-white/5 z-0 shadow-lg"></span>

      {/* The Eyes Container */}
      <span
        className="absolute right-6 top-1/2 -translate-y-1/2 flex gap-1.5 z-0 pointer-events-none"
        ref={eyesRef}
      >
        <span className="w-2.5 h-2.5 bg-gray-200 rounded-full relative overflow-hidden animate-blink">
          <span
            className="absolute w-1.5 h-1.5 bg-black rounded-full"
            style={{
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) translate(${eyeCoords.x * 50}%, ${eyeCoords.y * 50}%)`,
            }}
          ></span>
        </span>
        <span className="w-2.5 h-2.5 bg-gray-200 rounded-full relative overflow-hidden animate-blink">
          <span
            className="absolute w-1.5 h-1.5 bg-black rounded-full"
            style={{
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) translate(${eyeCoords.x * 50}%, ${eyeCoords.y * 50}%)`,
            }}
          ></span>
        </span>
      </span>

      {/* The Cover (Rotates away on hover to reveal eyes) */}
      <span
        className={`relative z-10 flex items-center justify-center gap-2 px-8 py-4 w-full h-full rounded-full bg-[#0a0a0f] border ${borderColor} transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] origin-[20px_50%] group-hover:-rotate-[12deg] group-focus-visible:-rotate-[12deg] ${shadowHover}`}
      >
        {children}
      </span>
    </button>
  );
};

const ScrollReveal = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 },
    );

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-[#050508]/80 backdrop-blur-md border-b border-white/10">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          UptoSkills
        </span>
      </div>

      <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
        <a
          href="#"
          className="hover:text-white transition-colors flex items-center gap-1"
        >
          Learn & Earn <ChevronDown />
        </a>
        <a
          href="#"
          className="hover:text-white transition-colors flex items-center gap-1"
        >
          Jobs <ChevronDown />
        </a>
        <a
          href="#"
          className="hover:text-white transition-colors flex items-center gap-1"
        >
          Compete <ChevronDown />
        </a>
        <a
          href="#"
          className="hover:text-white transition-colors flex items-center gap-1"
        >
          Discover <ChevronDown />
        </a>
      </div>

      <div className="flex items-center gap-6">
        <button className="text-gray-400 hover:text-white">
          <SearchIcon />
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500"></div>
        <button className="hidden md:block px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:opacity-90 transition-opacity">
          For Enterprise
        </button>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative pt-40 pb-32 px-6 flex flex-col items-center text-center min-h-screen justify-center overflow-hidden">
    <div className="absolute inset-0 z-0 opacity-50 mix-blend-screen">
      <ForceFieldBackground />
    </div>

    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
    <div
      className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] -z-10 animate-pulse"
      style={{ animationDelay: "1s" }}
    ></div>

    <div className="relative z-10 flex flex-col items-center pointer-events-none w-full">
      <ScrollReveal>
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs font-semibold tracking-widest text-gray-300 uppercase">
          The World's Best Competition Platform
        </div>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-6 bg-gradient-to-br from-white via-white to-gray-500 bg-clip-text text-transparent drop-shadow-2xl animate-float">
          THRILL
        </h1>
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Unleash Innovation with <br />
          <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(236,72,153,0.5)]">
            Thrill Engine
          </span>
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={300}>
        {/* NEW: Frosted glass background to make this paragraph pop against the particles */}
        <p className="max-w-2xl text-lg text-gray-200 font-medium mb-10 bg-[#050508]/40 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/10 drop-shadow-xl">
          The industry standard for hackathon hosting. Whether you're a global
          enterprise looking for high-impact results or a college faculty
          building student communities.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={400}>
        {/* NEW: Replaced standard buttons with Neon Creepy Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 pointer-events-auto">
          <NeonCreepyButton colorTheme="cyan">
            For Companies <span>→</span>
          </NeonCreepyButton>

          <NeonCreepyButton colorTheme="pink">
            For Universities <PlusIcon />
          </NeonCreepyButton>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

const Stats = () => {
  const stats = [
    {
      value: "500+",
      label: "EVENTS HOSTED",
      color: "text-cyan-400",
      border: "border-cyan-500/30",
    },
    {
      value: "100K+",
      label: "PARTICIPANTS",
      color: "text-pink-400",
      border: "border-pink-500/30",
    },
    {
      value: "20K+",
      label: "COLLEGE PARTNERS",
      color: "text-purple-400",
      border: "border-purple-500/30",
    },
    {
      value: "∞",
      label: "INNOVATION",
      color: "text-orange-400",
      border: "border-orange-500/30",
    },
  ];

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <ScrollReveal key={i} delay={i * 100}>
            <div
              className={`p-8 rounded-3xl bg-gradient-to-b from-[#0a0a0f] to-[#050508] border ${stat.border} flex flex-col items-center justify-center text-center hover:-translate-y-2 transition-transform duration-300 hover:shadow-lg hover:shadow-${stat.color.split("-")[1]}-500/20`}
            >
              <h3
                className={`text-4xl md:text-5xl font-black mb-2 ${stat.color}`}
              >
                {stat.value}
              </h3>
              <p className="text-xs font-bold tracking-widest text-gray-500">
                {stat.label}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

const SetupSection = () => (
  <section className="py-20 px-6 max-w-7xl mx-auto">
    <div className="grid md:grid-cols-2 gap-8">
      <ScrollReveal delay={0}>
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-b from-[#0a0a0f] to-[#050508] border border-cyan-500/20 relative overflow-hidden group hover:border-cyan-500/50 transition-colors duration-500">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full group-hover:bg-cyan-500/20 transition-colors duration-500"></div>
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-3xl font-bold text-white">For Corporations</h3>
            <div className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold border border-cyan-500/20">
              SYS_CORP // ACTIVE
            </div>
          </div>
          <p className="text-gray-400 mb-8 max-w-sm">
            Bespoke hackathons & recruitment drives managed through an advanced,
            highly-secure dashboard.
          </p>
          <div className="space-y-4 mb-10">
            {[
              "Custom Branding & Portals",
              "Dedicated Event Consultant",
              "Direct Support Lead",
              "Recruitment-Focused Data",
            ].map((item, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4 hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-colors cursor-pointer group/item"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-400 group-hover/item:shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
                <span className="font-medium text-gray-300 group-hover/item:text-white transition-colors">
                  {item}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full py-4 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 font-bold hover:bg-cyan-500 hover:text-white transition-all duration-300">
            INITIALIZE SETUP →
          </button>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-b from-[#0a0a0f] to-[#050508] border border-pink-500/20 relative overflow-hidden group hover:border-pink-500/50 transition-colors duration-500">
          <div className="absolute top-0 left-0 w-64 h-64 bg-pink-500/10 blur-[80px] rounded-full group-hover:bg-pink-500/20 transition-colors duration-500"></div>
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-3xl font-bold text-white">For Universities</h3>
            <div className="px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 text-xs font-bold border border-pink-500/20">
              SYS_UNIV // ACTIVE
            </div>
          </div>
          <p className="text-gray-400 mb-8 max-w-sm">
            Empower students with self-serve tools to launch hackathons and
            workshops in minutes.
          </p>
          <div className="space-y-4 mb-10">
            {[
              "Self-Serve Event Creation",
              "Customizable Student Forms",
              "Automated Participant Grading",
              "Instant Event Distribution",
            ].map((item, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4 hover:bg-pink-500/10 hover:border-pink-500/50 transition-colors cursor-pointer group/item"
              >
                <div className="w-2 h-2 rounded-full bg-pink-400 group-hover/item:shadow-[0_0_10px_rgba(236,72,153,0.8)]"></div>
                <span className="font-medium text-gray-300 group-hover/item:text-white transition-colors">
                  {item}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full py-4 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/50 font-bold hover:bg-pink-500 hover:text-white transition-all duration-300">
            LAUNCH EVENT →
          </button>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

const Timeline = () => {
  const stages = [
    {
      num: "01",
      title: "REGISTRATION",
      align: "justify-start",
      color: "border-cyan-500/50",
      text: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },
    {
      num: "02",
      title: "TEAM FORMATION",
      align: "justify-end",
      color: "border-purple-500/50",
      text: "text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      num: "03",
      title: "IDEA SUBMISSION",
      align: "justify-start",
      color: "border-pink-500/50",
      text: "text-pink-400",
      bg: "bg-pink-500/10",
    },
    {
      num: "04",
      title: "MENTORSHIP",
      align: "justify-end",
      color: "border-orange-500/50",
      text: "text-orange-400",
      bg: "bg-orange-500/10",
    },
    {
      num: "05",
      title: "JUDGEMENT",
      align: "justify-start",
      color: "border-green-500/50",
      text: "text-green-400",
      bg: "bg-green-500/10",
    },
  ];

  return (
    <section className="py-20 px-6 max-w-4xl mx-auto text-center">
      <ScrollReveal>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Progressive Timeline
        </h2>
        <p className="text-gray-400 mb-16 max-w-2xl mx-auto">
          Our industry-leading timeline system adapts to your event flow in full
          3D space.
        </p>
      </ScrollReveal>

      <div className="relative flex flex-col items-center">
        <div className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-pink-500/50 to-green-500/50"></div>
        {stages.map((stage, i) => (
          <ScrollReveal key={i} delay={i * 150}>
            <div className={`w-full flex ${stage.align} mb-8 relative z-10`}>
              <div
                className={`w-full md:w-[45%] p-6 rounded-2xl bg-[#0a0a0f] border ${stage.color} hover:scale-105 transition-transform duration-300 cursor-pointer flex items-center gap-6`}
              >
                <div
                  className={`w-12 h-12 rounded-xl ${stage.bg} flex items-center justify-center`}
                >
                  <PlusIcon />
                </div>
                <div className="text-left">
                  <p
                    className={`text-xs font-bold tracking-wider ${stage.text}`}
                  >
                    STAGE {stage.num}
                  </p>
                  <h4 className="text-xl font-bold text-white">
                    {stage.title}
                  </h4>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

const ProFeatures = () => {
  const features = [
    {
      title: "CUSTOM FORM BUILDER",
      desc: "Design perfect registration forms with any field type, validation, and logic.",
      icon: "📝",
      border: "border-pink-500/30",
      bg: "bg-pink-500/10",
    },
    {
      title: "MONETIZATION",
      desc: "Support for both paid and free events.",
      icon: "💰",
      border: "border-green-500/30",
      bg: "bg-green-500/10",
    },
    {
      title: "SMART AWARDS",
      desc: "Auto-generate certificates and manage prizes.",
      icon: "🏆",
      border: "border-yellow-500/30",
      bg: "bg-yellow-500/10",
    },
    {
      title: "AUTO-COMMS",
      desc: "Automated emails.",
      icon: "✉️",
      border: "border-cyan-500/30",
      bg: "bg-cyan-500/10",
    },
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
          <span className="px-4 py-1.5 rounded-full bg-blue-600 text-white text-xs font-bold tracking-wider">
            PRO FEATURE
          </span>
          <p className="text-gray-300 text-lg">
            Entirely modifiable system.{" "}
            <span className="text-white font-semibold">
              Milestone-based email alerts.
            </span>
          </p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-6">
        {features.map((f, i) => (
          <ScrollReveal key={i} delay={i * 100}>
            <div
              className={`p-8 rounded-3xl bg-gradient-to-br from-[#0a0a0f] to-[#050508] border ${f.border} hover:border-opacity-100 transition-colors duration-300 group`}
            >
              <div
                className={`w-14 h-14 rounded-2xl ${f.bg} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}
              >
                {f.icon}
              </div>
              <h4 className="text-xl font-bold text-white mb-2">{f.title}</h4>
              <p className="text-gray-400">{f.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

const FeatureGrid = () => {
  const features = [
    { title: "EVENT BANNER", desc: "HIGH-RES VISUALS", color: "text-cyan-400" },
    { title: "CUSTOM LOGO", desc: "BRAND IDENTITY", color: "text-purple-400" },
    {
      title: "SPONSOR DECK",
      desc: "PARTNER INTEGRATION",
      color: "text-pink-400",
    },
    { title: "SOCIAL LINKS", desc: "COMMUNITY SYNC", color: "text-blue-400" },
    { title: "GALLERY THEME", desc: "IMMERSIVE UI", color: "text-orange-400" },
    { title: "PRICE OPTIONS", desc: "PAID & FREE", color: "text-green-400" },
    {
      title: "EMAIL TEMPLATES",
      desc: "AUTO-COMMUNICATION",
      color: "text-yellow-400",
      active: true,
    },
    { title: "DIGITAL CARDS", desc: "PARTICIPANT ID", color: "text-red-400" },
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Showcase Your Brand
          </h2>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {features.map((f, i) => (
          <ScrollReveal key={i} delay={i * 50}>
            <div
              className={`p-6 rounded-2xl bg-[#0a0a0f] border ${f.active ? "border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.3)]" : "border-white/10"} hover:border-white/30 transition-all duration-300 cursor-pointer flex flex-col items-center text-center group`}
            >
              <h4 className="text-lg font-bold text-white mb-2 group-hover:scale-105 transition-transform">
                {f.title}
              </h4>
              <p className={`text-xs font-bold tracking-widest ${f.color}`}>
                {f.desc}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const faqs = [
    {
      q: "Is Thrill suitable for global hackathons?",
      a: "Absolutely. Our infrastructure is built to scale for thousands of concurrent participants with global proctoring and real-time support.",
    },
    {
      q: "How customizable is the event portal?",
      a: "Total customization. From colors and logos to custom URLs and form logic, Thrill is built to be an extension of your brand.",
    },
    {
      q: "Do participants get automated updates?",
      a: "Yes, our automated communication system keeps participants informed at every stage of the timeline.",
    },
  ];

  return (
    <section className="py-20 px-6 max-w-3xl mx-auto">
      <ScrollReveal>
        <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center">
          System FAQ
        </h2>
      </ScrollReveal>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <ScrollReveal key={i} delay={i * 100}>
            <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] overflow-hidden hover:border-white/20 transition-colors">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-semibold text-lg">{faq.q}</span>
                <div
                  className={`transform transition-transform duration-300 ${openIndex === i ? "rotate-180 text-cyan-400" : "text-gray-500"}`}
                >
                  <ChevronDown />
                </div>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${openIndex === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <p className="px-6 pb-5 text-gray-400 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="border-t border-white/10 bg-[#020203] pt-16 pb-8 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
      <div className="col-span-2 md:col-span-2">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
          UptoSkills
        </h3>
        <p className="text-gray-400 text-sm mb-6 max-w-xs leading-relaxed">
          Connecting Colleges, Candidates, and Corporates. EMPOWERING THE NEXT
          GENERATION.
        </p>
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors text-sm font-bold">
            in
          </div>
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors text-sm font-bold">
            ig
          </div>
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors text-sm font-bold">
            tw
          </div>
        </div>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-white tracking-wide">
          Our Services
        </h4>
        <ul className="space-y-4 text-sm text-gray-400">
          <li>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              For Companies
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              AI Interview
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              AI Assessment
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-white tracking-wide">
          Jobs & Internships
        </h4>
        <ul className="space-y-4 text-sm text-gray-400">
          <li>
            <a href="#" className="hover:text-pink-400 transition-colors">
              Internships
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-pink-400 transition-colors">
              IT & CS Jobs
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-pink-400 transition-colors">
              Technical Jobs
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-white tracking-wide">
          Contact Info
        </h4>
        <ul className="space-y-4 text-sm text-gray-400">
          <li className="flex items-center gap-2">
            <span>📍</span> Palam, New Delhi
          </li>
          <li className="flex items-center gap-2">
            <span>✉️</span> info@uptoskills.com
          </li>
          <li className="flex items-center gap-2">
            <span>📞</span> +91-9319772294
          </li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 font-medium">
      <p>© 2026 UptoSkills. All rights reserved.</p>
      <div className="flex gap-6 mt-4 md:mt-0">
        <a href="#" className="hover:text-white transition-colors">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-white transition-colors">
          Terms of Service
        </a>
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <div className="min-h-screen selection:bg-purple-500/30 font-sans bg-[#020203]">
      <Navbar />
      <main className="overflow-hidden">
        <Hero />
        <Stats />
        <SetupSection />
        <Timeline />
        <ProFeatures />
        <FeatureGrid />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;
