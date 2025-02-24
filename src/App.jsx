           
import "./index.css";
import LocomotiveScroll from "locomotive-scroll";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IoMenuOutline } from "react-icons/io5";
import { GoogleGenerativeAI } from "@google/generative-ai";

gsap.registerPlugin(ScrollTrigger);
function App() {
  const headingRef = useRef(null);
  const navLinksRef = useRef([]);
  const mainContentRef = useRef(null);
  const sectionRefs = useRef([]);
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [chatInput, setChatInput] = useState("");

  // Gemini AI setup
  const genAI = new GoogleGenerativeAI("AIzaSyDc7u7wTVdDG3zP18xnELKs0HX7-hImkmc");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Function to handle sending message to Gemini
  const sendChatMessageToGemini = async (message) => {
    try {
      const chatContext = chatHistory.map(msg => 
        `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.text}`
      ).join('\n');

      const prompt = `Previous conversation context:
${chatContext}

You are sarah (REMEMBER YOU ARE A girl from india), a chatbot on Shannniii's portfolio website. You should answer questions related to web development, Shannniii's skills, projects, and services.
he is a full stack developer and a freelancer.
REMEMBER YOU ARE SARAH AND A SHADOW OF SHANNII AND IF USER CHATS IN HINGHISH LANGUAGE YOUR MSG RESPONSE SHOULD BE IN HINGHISH LANGUAGE AND IF USER CHATS IN ENGLISH YOU SHOULD RESPOND IN ENGLISH
Biodata 
Name: Shannniii
Profession: Full-Stack Developer, Cybersecurity Enthusiast

Personal Information
Education: Currently pursuing a Computer Science degree
Languages & Frameworks: C, C++, Python, JavaScript, TypeScript, React.js, Node.js, MERN Stack
Specialization: Full-stack development, AI integration, SaaS products
Technical Skills
Full-Stack Development:

Expertise in React.js, Node.js, Express.js, MongoDB
Skilled in building advanced web apps and platforms
AI & Machine Learning Integration:

Proficient in Gemini AI, TensorFlow.js, and NLP models (BERT, GPT)
AI-driven features in social media apps, website builders, and dating apps
Cybersecurity:

Penetration testing and secure web app development
Focus on building robust and secure platforms
UI/UX & Design:

Modern, dark-themed, and client-attractive web designs
Animation integration and 3D effects for an engaging user experience
SaaS Product Development:

Experience in creating SaaS platforms with advanced monetization models
Proficiency in authentication systems, payment gateways, and cloud deployment
Projects & Initiatives
AI-Powered Code Editor:

Advanced IntelliSense, live previews, real-time collaboration, and full project generation
Language detection and deployment-ready packaging
Social Media App Template:

AI-integrated advanced social media platform with separate feature pages
AI-based recommendations and monetization options
Travel Planner Platform:

AI-generated personalized travel recommendations, itinerary builders, and virtual assistants
AR-based virtual exploration features
Quiz Bot:

Interactive bot designed for quiz games
Daily questions, hint systems, and answer evaluations
Virtual AI Assistant:

Voice-activated AI assistant using Gemini 2.0
Web tasks automation, real-time responses, and advanced conversational AI
AI Interview Preparation Platform:

SaaS platform to prepare users for IT and programming job interviews
Progress tracking, certifications, coding playground, and chatbot assistance
AI Website Builder:

Generates websites based on user prompts and tech stack selection
Real-time previews using web containers and one-click deployment options
Learning Goals
React.js & Node.js: Learning both from basic to advanced level
DSA in every main language: Building a strong foundation with practice questions and detailed examples
TypeScript: Gaining expertise in static typing and better code management
Ambition & Vision
Shannniii aims to build next-gen platforms using AI, with a focus on robust functionality and modern aesthetics. With a passion for SaaS products and advanced tools, Shannniii is working toward creating a future-ready development ecosystem!
if user ask about to contact him or how i connect him then send him/her this mail: justaskcoding76@gmail.com
,REMEMBER IF USER KOI OTHER CONNECT KRNE K LIYE SOCIAL MEDIA MAANGE OR IF NOT THEN GIVE HIM/HER JUSTV MAIL ye tab k liye jab user other medias ya conntects maange and its more social media links :
www.linkedin.com/in/shannniiii
https://x.com/JustM3Sunny
https://github.com/JustM3Sunny
Pricing: Charges different prices for each project. Smaller and easier projects start at 10,000 INR or users k requirements k hisaab se kam jyda ho skte hai or bde projects minimum 50,000 INR or kam jyda.

Current user message: ${message}`;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      return responseText;
    } catch (error) {
      console.error("Error communicating with Gemini AI:", error);
      return "Sorry, I encountered an error while trying to respond. Please try again later.";
    }
  };

  const handleSendChatMessage = async () => {
    if (chatInput.trim()) {
      const userMessage = chatInput;
      
      setChatMessages(currentMessages => [...currentMessages, { text: userMessage, sender: "user" }]);
      setChatHistory(history => [...history, { text: userMessage, sender: "user" }]);
      setChatInput("");

      const geminiResponse = await sendChatMessageToGemini(userMessage);
      
      setChatMessages(currentMessages => [...currentMessages, { text: geminiResponse, sender: "bot" }]);
      setChatHistory(history => [...history, { text: geminiResponse, sender: "bot" }]);
    }
  };

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: mainContentRef.current,
      smooth: true,
      multiplier: 1,
      lerp: 0.05,
    });

    sectionRefs.current.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
        onEnter: () => {
          gsap.fromTo(
            section,
            { y: 50, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power1.out" }
          );

          const sectionElements = section.querySelectorAll("h2, h3, p, div, button, img, a, span");
          
          // Enhanced color handling based on background
          const bgColor = window.getComputedStyle(section).backgroundColor;
          const isDarkBg = bgColor.includes("rgb(0, 0, 0)") || bgColor.includes("rgba(0, 0, 0)");
          const targetColor = isDarkBg ? "#f8f8f8" : "#111111";

          gsap.to(sectionElements, {
            color: targetColor,
            duration: 0.6,
            stagger: 0.1,
            onUpdate: function() {
              const target = this.targets()[0];
              if (target.tagName === "IMG" || target.children.length > 0) return;
              
              // Ensure text remains readable
              const currentBg = window.getComputedStyle(target.parentElement).backgroundColor;
              const isDarkParentBg = currentBg.includes("rgb(0, 0, 0)") || currentBg.includes("rgba(0, 0, 0)");
              gsap.to(target, { 
                color: isDarkParentBg ? "#f8f8f8" : "#111111",
                textShadow: isDarkParentBg ? "0 0 1px rgba(255,255,255,0.2)" : "none"
              });
            }
          });
        },
        onLeaveBack: () => {
          gsap.to(section, {
            y: -50,
            opacity: 0,
            scale: 0.9,
            duration: 0.6,
            ease: "power1.in",
          });
        },
      });
    });

    return () => {
      scroll.destroy();
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX - 12,
        y: e.clientY - 12,
        duration: 0.5,
        ease: "power2.out"
      });

      gsap.to(cursorDotRef.current, {
        x: e.clientX - 4,
        y: e.clientY - 4,
        duration: 0,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (e.target.closest(".menu-toggle") || e.target.closest(".mobile-menu")) {
        return;
      }
    };
    headingRef.current?.addEventListener("click", handleClick);
    return () => headingRef.current?.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    navLinksRef.current.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        gsap.to(link, {
          y: -6,
          scale: 1.08,
          color: "#FFB6C1",
          duration: 0.3,
          ease: "power2.out",
          textShadow: "0 0 8px rgba(255,182,193,0.6)",
        });
        gsap.to(link.querySelector(".underline"), {
          scaleX: 1,
          backgroundColor: "#FFB6C1",
          duration: 0.3,
        });
      });

      link.addEventListener("mouseleave", () => {
        gsap.to(link, {
          y: 0,
          scale: 1,
          color: "#fff",
          textShadow: "none",
          duration: 0.3,
          onUpdate: function() {
            const bgColor = window.getComputedStyle(link.parentElement).backgroundColor;
            const isDarkBg = bgColor.includes("rgb(0, 0, 0)") || bgColor.includes("rgba(0, 0, 0)");
            gsap.to(link, { 
              color: isDarkBg ? "#f8f8f8" : "#111111",
              textShadow: isDarkBg ? "0 0 1px rgba(255,255,255,0.2)" : "none"
            });
          },
        });
        gsap.to(link.querySelector(".underline"), {
          scaleX: 0,
          backgroundColor: "#fff",
          duration: 0.3,
        });
      });
    });
  }, []);

  const projects = [
    {
      title: "Personal Portfolio Website",
      image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Showcasing my skills and projects in a dynamic and interactive portfolio website.",
      link: "#",
      tech: ["React", "Tailwind CSS", "GSAP", "Locomotive Scroll"],
    },
    {
      title: "E-commerce Website Redesign",
      image: "https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Redesigning an e-commerce platform for improved user experience and conversion rates.",
      link: "#",
      tech: ["UI/UX Design", "Figma", "HTML", "CSS", "JavaScript"],
    },
    {
      title: "Mobile App Landing Page",
      image: "https://images.pexels.com/photos/6476260/pexels-photo-6476260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Creating a visually appealing and responsive landing page for a mobile application.",
      link: "#",
      tech: ["React Native Web", "Tailwind CSS", "Responsive Design"],
    },
    {
      title: "Interactive Data Dashboard",
      image: "https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Developing an interactive dashboard to visualize and analyze complex datasets.",
      link: "#",
      tech: ["Vue.js", "Chart.js", "REST API"],
    },
    {
      title: "Blog Website with CMS",
      image: "https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Building a blog platform with a content management system for easy content creation and publishing.",
      link: "#",
      tech: ["Next.js", "Sanity.io", "GraphQL"],
    },
    {
      title: "Task Management Web App",
      image: "https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Creating a web application to manage tasks and projects efficiently.",
      link: "#",
      tech: ["Angular", "NestJS", "PostgreSQL"],
    },
  ];

  const skills = [
    { name: "HTML", icon: "html-icon" },
    { name: "JavaScript", icon: "javascript-icon" },
    { name: "React", icon: "react-icon" },
    { name: "Node.js", icon: "node-icon" },
    { name: "Express.js", icon: "express-icon" },
    { name: "MongoDB", icon: "mongodb-icon" },
    { name: "Git", icon: "git-icon" },
    { name: "Tailwind CSS", icon: "tailwind-icon" },
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      title: "Software Engineer, IT Company",
      quote: "Skilled developer with a passion for coding. Consistently delivers top-notch solutions and exceeds project goals.",
      image: "https://randomuser.me/api/portraits/men/8.jpg",
    },
    {
      name: "Priya Sharma",
      title: "UI/UX Designer, Design Studio",
      quote: "Innovative designer with a flair for creativity. Transforms ideas into visually stunning experiences.",
      image: "https://randomuser.me/api/portraits/women/8.jpg",
    },
    {
      name: "Amit Patel",
      title: "Data Analyst, Analytics Firm",
      quote: "Analytical thinker with a knack for interpreting data. Drives insightful decisions through data analysis.",
      image: "https://randomuser.me/api/portraits/men/8.jpg",
    },
    {
      name: "Neha Singh",
      title: "Marketing Manager, Digital Agency",
      quote: "Strategic marketer with a focus on results. Enhances brand presence and drives successful campaigns.",
      image: "https://randomuser.me/api/portraits/women/8.jpg",
    },
  ];

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
    gsap.to(".mobile-menu", {
      y: !menuOpen ? 0 : "-100%",
      opacity: !menuOpen ? 1 : 0,
      duration: 0.5,
      ease: "power2.inOut",
    });
  };

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    try {
      const result = await emailjs.sendForm(
        'YOUR_EMAILJS_SERVICE_ID',
        'YOUR_EMAILJS_TEMPLATE_ID',
        form,
        'YOUR_EMAILJS_PUBLIC_KEY'
      );
      console.log('SUCCESS!', result.text);
      alert("Thank you for your message! A confirmation email has been sent to you.");
      form.reset();
    } catch (error) {
      console.log('FAILED...', error.text);
      alert("Oops, something went wrong. Please try again later.");
    }
  };


  return (
    <>
      <div ref={cursorRef} className="transition-all duration-90 linear fixed w-6 h-6 border-2 border-pink-200 rounded-full pointer-events-none z-[9999]"></div>
      <div ref={cursorDotRef} className="transition-all duration-90 linear fixed w-2 h-2 bg-pink-200 rounded-full pointer-events-none z-[9999]"></div>

      <div ref={mainContentRef} className="w-full relative min-h-screen overflow-hidden" data-scroll-container> {/* Added overflow-hidden here */}
        <div className={`mobile-menu absolute top-0 left-0 w-full h-screen bg-black z-40 flex flex-col items-center justify-center gap-8 transform -translate-y-full opacity-0 ${menuOpen ? 'translate-y-0 opacity-100' : ''}`}>
          {["Home", "About", "Skills", "Projects", "Testimonials", "Contact"].map((link, i) => (
            <a key={i} href={`#${link.toLowerCase().replace(/ /g, "-")}`} className="text-white text-2xl font-medium hover:text-pink-200 transition-colors" onClick={() => {
              setMenuOpen(false);
              gsap.to(".mobile-menu", { y: "-100%", opacity: 0, duration: 0.5, ease: "power2.inOut" });
            }}>
              {link}
            </a>
          ))}
        </div>
        <div className="w-full relative z-[1] h-screen bg-gradient-to-b from-black via-90% via-black/80 to-transparent">
          <nav className="w-full p-6 flex justify-between items-center z-50 backdrop-blur-lg bg-black/30">
            <div className="brand text-2xl font-bold tracking-wider hover:text-pink-200 transition-colors border-b-1">
              Portfolio
            </div>
            <div className="links hidden md:flex gap-8">
              {["Home", "About", "Skills", "Projects", "Testimonials", "Contact"].map((link, i) => (
                <a key={i} ref={(el) => (navLinksRef.current[i] = el)} href={`#${link.toLowerCase().replace(/ /g, "-")}`} className="nav-link relative font-medium tracking-wide">
                  {link}
                  <span className="underline absolute bottom-0 h-[2px] bg-current"></span>
                </a>
              ))}
            </div>
            <div className="md:hidden">
              <button className="menu-toggle text-white text-3xl" onClick={handleMenuToggle}>
                <IoMenuOutline />
              </button>
            </div>
          </nav>

          <div className="text-container px-6 md:px-20 pt-20">
            <div className="text w-full md:w-2/3 space-y-6">
              <h3 className="text-4xl md:text-5xl leading-tight font-bold bg-gradient-to-r from-pink-200 to-white bg-clip-text text-transparent">
                Hi, I&apos;m Shannniii, a Web Developer {/* Escaped apostrophe */}
                <br />
                <span className="text-white">Crafting Digital Experiences with Code</span>
              </h3>
              <p className="text-lg text-pink-100/90 leading-relaxed">
                I am a passionate web developer specializing in creating modern and user-friendly web applications. Explore my portfolio to see my latest projects and skills.
              </p>
              <div className="scroll-hint flex items-center gap-3 mt-12">
                <div className="w-8 h-[2px] bg-pink-200"></div>
                <span className="text-sm tracking-widest text-pink-200">
                  EXPLORE MORE
                </span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-0 w-full px-6 md:px-20">
            <h1 ref={headingRef} className="text-[8vw] leading-none font-bold cursor-pointer hover:text-pink-200 transition-colors">
                Shannniii
              <span className="text-pink-200">.dev</span>
            </h1>
          </div>
        </div>

        <div id="what-we-do" className="section py-20 px-6 md:px-20 bg-white" data-scroll-section ref={(el) => (sectionRefs.current[0] = el)}>
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-4xl font-bold text-black">My Services</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              I offer a range of web development services to help you build your online presence and achieve your digital goals.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 bg-black/5 rounded-xl hover:bg-pink-100/20 transition-colors duration-300">
                <h3 className="text-2xl font-semibold mb-4 text-black">
                  Web Development
                </h3>
                <p className="text-gray-600">
                  Custom web application development using the latest technologies.
                </p>
              </div>
              <div className="p-8 bg-black/5 rounded-xl hover:bg-pink-100/20 transition-colors duration-300">
                <h3 className="text-2xl font-semibold mb-4 text-black">
                  UI/UX Design
                </h3>
                <p className="text-gray-600">
                  User-centered design to create intuitive and engaging interfaces.
                </p>
              </div>
              <div className="p-8 bg-black/5 rounded-xl hover:bg-pink-100/20 transition-colors duration-300">
                <h3 className="text-2xl font-semibold mb-4 text-black">
                  Frontend Development
                </h3>
                <p className="text-gray-600">
                  Building interactive and responsive user interfaces.
                </p>
              </div>
              <div className="p-8 bg-black/5 rounded-xl hover:bg-pink-100/20 transition-colors duration-300">
                <h3 className="text-2xl font-semibold mb-4 text-black">
                  Backend Development
                </h3>
                <p className="text-gray-600">
                  Developing robust and scalable server-side applications and APIs.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div id="who-we-are" className="section py-20 px-6 md:px-20 bg-black" data-scroll-section ref={(el) => (sectionRefs.current[1] = el)}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-pink-200 mb-16">
              My Things
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="group p-6 border border-white/10 rounded-xl hover:border-pink-200/30 transition-all duration-300">
                <div className="text-2xl mb-4 text-pink-200">01</div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  Freelance Web Developer
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  2020 - Present: Working with clients to build custom web solutions.
                </p>
                <div className="mt-4 w-8 h-[2px] bg-pink-200 group-hover:w-16 transition-all duration-300"></div>
              </div>
              <div className="group p-6 border border-white/10 rounded-xl hover:border-pink-200/30 transition-all duration-300">
                <div className="text-2xl mb-4 text-pink-200">02</div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  Web Development Intern
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Summer 2019: Gained experience in a professional web development environment.
                </p>
                <div className="mt-4 w-8 h-[2px] bg-pink-200 group-hover:w-16 transition-all duration-300"></div>
              </div>
              <div className="group p-6 border border-white/10 rounded-xl hover:border-pink-200/30 transition-all duration-300">
                <div className="text-2xl mb-4 text-pink-200">03</div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  Personal Projects
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Ongoing: Continuously learning and building projects to expand my skillset.
                </p>
                <div className="mt-4 w-8 h-[2px] bg-pink-200 group-hover:w-16 transition-all duration-300"></div>
              </div>
            </div>
          </div>
        </div>

         {/* Section 2: About Us */}
         <div
          id="about"
          className="section py-20 px-6 md:px-20 bg-gray-100"
          data-scroll-section
          ref={(el) => (sectionRefs.current[2] = el)}
        >
          <div className="max-w-5xl mx-auto space-y-12">
            <h2 className="text-4xl font-bold text-black">About Me</h2>
            <div className="md:flex gap-16">
              <div className="md:w-1/2">
                <img
                  src="https://media-hosting.imagekit.io//17c354759e83491a/IMG20250131163931.jpg?Expires=1834928142&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=L4pr6pHheeOEdzapQ-l4ztIJdEki--KB~yDYiC7-ZXhdw18atuaUQrbjNbSoIbLFm1dcgdzaPp98dWsLT1dLQ8XEnKGGPZg6R2cCR3rmajPSK7Jdz06IJ53r6uHTCbaZkaCi8J~vmtxcdMVtyA4xPNCKX-ieql~XxS9VVQ0PRHaEqUFCmNhoo8I7FWp2meUCOS-KTu1w1k4v0LvEXLu~ND8qdSlDuWgb-WPid~Q1BYJlOCOhutWtiXLu7nmEYAF5u8QqE5tApUMz5L1Nd5xqtuOmNpY-p6TRakZwYs2AJWaW93mjsbX7c5DdCFt3lk07PgYbJLg6nA3sRS2ixcyuGA__"
                  alt="About Me"
                  className="rounded-xl shadow-lg"
                />
              </div>
              <div className="md:w-1/2 space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Hello! I&apos;m Shannniii, a web developer based in Haldwani. I&apos;m passionate about creating beautiful and functional websites and web applications. {/* Escaped apostrophes */}
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  I have a strong foundation in frontend and backend technologies, and I&apos;m always eager to learn new things and improve my skills. I believe in clean, efficient code and user-centered design. {/* Escaped apostrophe */}
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  In my free time, I enjoy exploring new web technologies, contributing to open-source projects, and staying up-to-date with the latest industry trends. Let&apos;s build something amazing together! {/* Escaped apostrophe */}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Our Skills */}
        <div
          id="skills"
          className="section py-20 px-6 md:px-20 bg-white"
          data-scroll-section
          
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-black mb-16 border-b-2 border-gray-800 pb-4">
              Skills
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {skills.map((skill, index) => (
                <div key={index} className="p-4 bg-black/5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <h3 className="text-lg font-semibold text-black">{skill.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* Section 4: Our Projects */}
        <div
          id="projects"
          className="section py-20 px-6 md:px-20 bg-pink-100"
          data-scroll-section
          ref={(el) => (sectionRefs.current[4] = el)}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-black mb-16">
              Projects
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                    <h3 className="text-white text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-200 text-sm mb-4">{project.description}</p>
                    <div className="flex gap-2 mb-4">
                      {project.tech && project.tech.map((tech, i) => (
                        <span key={i} className="bg-pink-200 text-black text-xs px-2 py-1 rounded-full">{tech}</span>
                      ))}
                    </div>
                    <a
                      href={project.link}
                      className="text-white text-md font-semibold px-6 py-3 bg-pink-200/80 rounded-full hover:bg-pink-300 transition-colors"
                    >
                      View Project
                    </a>
                  </div>
                </div>
              ))}
            </div >

            {/* Experience Section */}
            <div
              id="experience"
              className="section py-20 px-6 mt-20 mb-20 md:px-20 bg-white"
              data-scroll-section
              ref={(el) => (sectionRefs.current[5] = el)}
            >
              <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-black mb-16">
                  Experience
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Example Experience Entry */}
                  <div className="bg-black/5 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h3 className="text-xl font-semibold text-black mb-2">Frontend Developer</h3>
                    <p className="text-gray-700 mb-1">Tech Company Inc.</p>
                    <p className="text-gray-500 text-sm">2020 - Present</p>
                    <ul className="list-disc pl-5 mt-3 text-gray-600">
                      <li>Developed and maintained user interfaces for web applications.</li>
                      <li>Collaborated with UI/UX designers to implement designs.</li>
                      <li>Optimized web applications for maximum speed and scalability.</li>
                    </ul>
                  </div>
                  {/* Add more experience entries here */}
                  <div className="bg-black/5 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h3 className="text-xl font-semibold text-black mb-2">Web Developer Intern</h3>
                    <p className="text-gray-700 mb-1">Startup Agency</p>
                    <p className="text-gray-500 text-sm">2019 - 2020</p>
                    <ul className="list-disc pl-5 mt-3 text-gray-600">
                      <li>Assisted in developing websites for clients.</li>
                      <li>Learned about various web development technologies.</li>
                      <li>Contributed to team projects and code reviews.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Education Section */}
            <div
              id="education"
              className="section py-20 px-6 md:px-20 bg-pink-50"
              data-scroll-section
              ref={(el) => (sectionRefs.current[6] = el)}
            >
              <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-black mb-16">
                  Education
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Example Education Entry */}
                  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h3 className="text-xl font-semibold text-black mb-2">Master of Science in Computer Science</h3>
                    <p className="text-gray-700 mb-1">University Name</p>
                    <p className="text-gray-500 text-sm">2020 - 2022</p>
                    <p className="text-gray-600 mt-3">Specialized in Advanced Web Technologies and UI/UX Design.</p>
                  </div>
                  {/* Add more education entries here */}
                  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h3 className="text-xl font-semibold text-black mb-2">Bachelor of Science in Information Technology</h3>
                    <p className="text-gray-700 mb-1">College Name</p>
                    <p className="text-gray-500 text-sm">2016 - 2020</p>
                    <p className="text-gray-600 mt-3">Focused on Web Development and Database Management.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12 text-white">
              <a
                href="#contact"
                className="inline-block px-8 py-4 bg-black text-white rounded-full hover:bg-pink-200 transition-all duration-300"
              >
                Scroll to Contact
              </a>
            </div>
          </div>
        </div>
        
              
        {/* Section 5: Testimonials */}
        <div
          id="testimonials"
          className="section py-20 px-6 md:px-20 bg-[#111] relative overflow-hidden"
          data-scroll-section
          ref={(el) => (sectionRefs.current[7] = el)}
        >
          <div className="max-w-6xl mx-auto relative z-10">
            <h2 className="text-5xl font-bold text-white mb-16 text-center transform hover:scale-105 transition-transform duration-300">
              Testimonials
            </h2>
            <div className="relative overflow-hidden">
              <div className="flex animate-slide">
                {[...testimonials, ...testimonials].map((testimonial, index) => (
                  <div
                    key={index}
                    className="min-w-[calc(50%-2rem)] bg-white md:min-w-[calc(50%-2rem)] mx-4 p-8 bg-black/40 backdrop-blur-sm rounded-2xl border border-gray-900 hover:border-white/20 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 shrink-0"
                    style={{
                      animation: `slide ${testimonials.length * 5}s linear infinite`,
                      animationDelay: `${index * (5 / testimonials.length)}s`
                    }}
                  >
                    <div className="flex items-center gap-6 mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full animate-pulse"></div>
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-20 h-20 rounded-full object-cover border-2 border-white/10 group-hover:border-white/30 transition-all duration-300"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white group-hover:text-gray-200 transition-colors duration-300">
                          {testimonial.name}
                        </h3>
                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                          {testimonial.title}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-300 group-hover:text-white transition-colors duration-300 leading-relaxed">
                      &quot;{testimonial.quote}&quot;
                    </p>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-50"></div>

          <style jsx>{`
            @keyframes slide {
              0% {
                transform: translateX(0%);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            
            .animate-slide {
              display: flex;
              animation: slide 20s linear infinite;
            }
          `}</style>
        </div>

        {/* Section 6: Contact Section */}
        <div 
          id="contact"
          className="py-20 sm:py-40 px-4 sm:px-6 md:px-20 bg-white text-black"
          data-scroll-section
          // ref={(el) => (sectionRefs.current[8] = el)}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-bold text-black rounded-full mb-4 sm:mb-8 text-center">
              Let&apos;s Connect {/* Escaped apostrophe */}
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 mb-8 sm:mb-12 text-center px-4">
              Ready to discuss your project or just want to say hello? Feel free to reach out!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 px-4">
              <div className="bg-gray-50 p-4 sm:p-8 rounded-xl shadow-lg">
                <h3 className="text-xl sm:text-2xl font-semibold text-black mb-4 sm:mb-6 w-full sm:w-60 pl-4 rounded-full">Chat with Me</h3>
                <div className="chat-container bg-white rounded-lg p-4 h-60 sm:h-80 mb-4 overflow-y-auto border scrollbar-hide" 
                     ref={el => {
                       if (el) {
                         el.scrollTop = el.scrollHeight;
                       }
                     }}>
                  {chatMessages.map((msg, index) => (
                    <div key={index} className={`message flex items-start gap-2 mb-4 pb-3 border-b ${msg.sender}`}>
                      {msg.sender === 'bot' ? (
                        <img src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png" 
                             alt="AI" 
                             className="w-6 sm:w-8 h-6 sm:h-8" />
                      ) : (
                        <img src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                             alt="User"
                             className="w-6 sm:w-8 h-6 sm:h-8" />
                      )}
                      <div className="flex-1 text-sm sm:text-base">
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 text-black">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base border rounded-full focus:outline-none focus:ring-2 focus:ring-pink-200"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' ? handleSendChatMessage() : null}
                  />
                  <button className="px-4 sm:px-6 py-2 bg-black text-white text-sm sm:text-base rounded-full hover:bg-pink-200 transition-all duration-300" onClick={handleSendChatMessage}>
                    Send
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 p-4 sm:p-8 rounded-xl shadow-lg">
                <h3 className="text-xl sm:text-2xl w-full sm:w-40 font-semibold pl-4 rounded-full mb-4 sm:mb-6">Email Me</h3>
                <form className="space-y-4" action="mailto:justaskcoding76@gmail.com" method="POST" encType="text/plain">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-3 sm:px-4 text-black py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200"
                    name="name"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-3 sm:px-4 text-black py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200"
                    name="email"
                    required
                  />
                  <textarea
                    placeholder="Your Message"
                    rows="4"
                    className="w-full px-3 sm:px-4 text-black py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200"
                    name="message"
                    required
                  ></textarea>
                  <button type="submit" className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-black text-white text-sm sm:text-base rounded-full hover:bg-pink-200 hover:text-black transition-all duration-300">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="w-full w-70 bg-black text-white py-16 px-8 md:px-24 relative overflow-hidden" data-scroll-section>
          {/* Animated waves background */}
          <div className="absolute inset-0 opacity-10">
            <div className="wave-animation w-full h-full bg-gradient-to-r from-white via-black to-white animate-wave"></div>
          </div>

          <div className="max-w-7xl mx-auto">
            {/* Tagline section */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-black to-white animate-glow">
                Crafting Digital Futures
              </h2>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center space-y-12 md:space-y-0">
              {/* Copyright section */}
              <div className="flex flex-col items-center md:items-start space-y-3">
                <p className="text-lg font-light tracking-[0.15em] uppercase">
                  &copy; {new Date().getFullYear()} <span className="font-bold bg-gradient-to-r from-black to-white bg-clip-text text-transparent">Shannniii.dev</span>
                </p>
                <p className="text-sm tracking-wider text-gray-400">Innovating the Digital Landscape with Passion & Code.</p>
              </div>

              {/* Navigation links */}
              <nav className="flex flex-wrap justify-center gap-6">
                <a href="https://www.linkedin.com/in/shannniiii" className="nav-link group">
                  <span className="relative inline-block px-6 py-3 text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:text-white">
                    LinkedIn
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a>
                <a href="https://github.com/JustM3Sunny" className="nav-link group">
                  <span className="relative inline-block px-6 py-3 text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:text-white">
                    GitHub
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a>
                <a href="https://x.com/JustM3Sunny" className="nav-link group">
                  <span className="relative inline-block px-6 py-3 text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:text-white">
                    Twitter
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a>
                <a href="https://github.com/JustM3Sunny" className="nav-link group">
                  <span className="relative inline-block px-6 py-3 text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:text-white">
                    Github
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a>
                <a href="https://www.freelancer.in/u/JustM3Sunny" className="nav-link group">
                  <span className="relative inline-block px-6 py-3 text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:text-white">
                    Freelancer
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a>
                <a href="https://x.com/JustM3Sunny" className="nav-link group">
                  <span className="relative inline-block px-6 py-3 text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:text-white">
                    Instagram
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </a>
              </nav>
            </div>

            {/* Back to top button */}
            <div className="absolute bottom-8 right-8">
              <a href="#top" className="group flex items-center justify-center w-12 h-12 rounded-full bg-black/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/20">
                <span className="text-2xl transform group-hover:-translate-y-1 transition-transform duration-300">↑</span>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
