// Single source of truth for the whole portfolio.
// Content follows the resume in public/assets (see "resume" below), with the current role added.
// Edit this file to change what the site shows; the section components only render it.

export const profile = {
  name: "Sesan Duraisamy",
  role: "AI Automation Engineer & Implementation Expert",
  roleNote: "Forward Deployed Engineer",
  headline: "Implementing AI automation for industrial products: computer vision, edge AI and generative AI, taken from prototype to production.",
  // The hero types each phrase in turn (split on " | ").
  subHeadline: "AI Automation Engineer | Implementation Expert | Forward Deployed Engineer | Computer Vision & Edge AI | Generative AI",
  location: "Coimbatore, Tamil Nadu, India",
  // The Resume button and the dev server both use this file. To publish a new resume: drop it in public/assets and change these two lines.
  resume: { file: "/assets/AI_Engineer_SesanD_112026.docx", name: "AI_Engineer_SesanD_112026.docx" },

  about: "AI Automation Engineer and implementation expert (Forward Deployed Engineer) working on industrial products. 2+ years of experience building production-ready Computer Vision, Edge AI, Generative AI, and automation solutions. Skilled in developing real-time video analytics, face recognition, ANPR, and LLM/RAG-based applications for surveillance, healthcare, identity management, traffic analytics, and business operations. Strong focus on converting AI models into practical business applications with APIs, dashboards, and cloud/on-premise deployment workflows.",

  coreExpertise: [
    { title: "AI Automation & Implementation", text: "Forward Deployed Engineering: implementing AI automation and getting AI solutions deployed and running for industrial products" },
    { title: "Computer Vision", text: "Real-time video analytics, face recognition, anti-spoofing, object detection, tracking, OCR, ANPR" },
    { title: "AI/ML Engineering", text: "Machine learning, deep learning, model development, model evaluation, inference optimization" },
    { title: "Generative AI", text: "LLM integration, RAG pipelines, AI agents, tool calling, prompt engineering" },
    { title: "Deployment", text: "Edge AI, GPU inference, Docker, cloud, on-premise servers, low-latency production systems" },
    { title: "Backend & Streaming", text: "FastAPI, REST APIs, RTSP, FFmpeg, WebSockets, multi-camera processing" },
  ],

  // Icon cards (kept from the original site). The level bars are a visual self-rating, not resume data.
  skills: [
    { name: "Computer Vision (YOLO, OpenCV)", level: 98, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg" },
    { name: "Edge AI (Raspberry Pi CM4)", level: 95, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/raspberrypi/raspberrypi-original.svg" },
    { name: "TensorFlow", level: 92, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" },
    { name: "PyTorch", level: 95, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg" },
    { name: "Python", level: 98, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
    { name: "FastAPI & Backend", level: 90, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
    { name: "Docker & Deployment", level: 85, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
    { name: "PostgreSQL", level: 88, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
    { name: "Linux & Bash", level: 85, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
    { name: "Git & Version Control", level: 95, iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  ],

  // Full skill set, grouped exactly as on the resume.
  skillGroups: [
    { title: "Languages", items: ["Python", "SQL"] },
    { title: "ML / Deep Learning", items: ["PyTorch", "TensorFlow", "NumPy", "Scikit-learn", "Model training", "Evaluation", "Optimization"] },
    { title: "Computer Vision", items: ["OpenCV", "YOLOv8", "InsightFace", "Object detection", "Face recognition", "Tracking", "OCR", "Anti-spoofing", "Image processing"] },
    { title: "Generative AI", items: ["LLM integration", "RAG pipelines", "Prompt engineering", "Tool calling", "LangChain", "LangGraph", "CrewAI"] },
    { title: "AI Automation", items: ["AI workflow automation", "LLM-based automation", "Agent-based API orchestration", "Tool calling", "n8n", "API integration"] },
    { title: "Backend & APIs", items: ["FastAPI", "REST APIs", "WebSockets", "API integration", "Backend services"] },
    { title: "Streaming & Optimization", items: ["RTSP", "FFmpeg", "ONNX Runtime", "OpenVINO", "GPU inference", "FP16 & INT8 quantization"] },
    { title: "Deployment & Tools", items: ["Docker", "Podman", "Microsoft Azure", "On-premise GPU servers", "Edge deployment", "Linux", "Windows", "GitHub", "VS Code", "CVAT", "Roboflow"] },
  ],

  experience: [
    {
      role: "AI Automation Engineer & Implementation Expert",
      roleNote: "Forward Deployed Engineer",
      company: "Surin Automotive Private Limited",
      period: "Sep 2026 – Present",
      location: "Bengaluru, Karnataka",
      description: "Working on industrial AI products as an AI Automation Engineer and implementation expert (Forward Deployed Engineer), implementing and deploying AI automation solutions.",
      highlights: [],
      tech: ["AI Automation", "Industrial Products", "Implementation"],
    },
    {
      role: "AI Engineer",
      company: "PrimeMover Solutions",
      period: "May 2024 – Sep 2026",
      location: "Coimbatore, Tamil Nadu",
      description: "Designed and deployed real-time Computer Vision and AI systems for surveillance, healthcare, identity management, traffic analytics, and business automation use cases.",
      highlights: [
        "Built production-ready AI inference pipelines using Python, FastAPI, OpenCV, PyTorch, ONNX Runtime, and GPU-optimized deployment workflows.",
        "Developed RTSP-based multi-camera video analytics architectures for continuous real-time monitoring, alert generation, and dashboard integration.",
        "Implemented face recognition, anti-spoofing validation, object detection, ANPR, OCR, and tracking workflows for AI-powered applications.",
        "Optimized model inference using NVIDIA GPU acceleration, ONNX Runtime, OpenVINO, FP16, and INT8 optimization techniques.",
        "Deployed scalable AI services using Docker across cloud, on-premise GPU servers, and edge environments.",
        "Integrated LLM-based automation workflows, RAG pipelines, and agent-based API orchestration into practical business applications.",
        "Collaborated with cross-functional teams to convert AI prototypes into usable, deployable, and business-ready software products.",
      ],
      tech: ["Python", "FastAPI", "PyTorch", "OpenCV", "ONNX Runtime", "OpenVINO", "Docker", "RTSP"],
    },
    {
      role: "Machine Learning Engineer Intern",
      company: "Center for Machine Learning and Intelligence (CMLI)",
      period: "Dec 2023 – Apr 2024",
      location: "Coimbatore, Tamil Nadu",
      description: "Developed a Raspberry Pi-based postal sign recognition system using image processing and Machine Learning techniques.",
      highlights: [
        "Worked on dataset preparation, preprocessing, model training, lightweight edge inference, and embedded Computer Vision deployment.",
        "Gained hands-on exposure to real-time detection workflows, Raspberry Pi deployment, and practical model optimization.",
      ],
      tech: ["Raspberry Pi", "Machine Learning", "Image Processing", "Edge Inference"],
    },
  ],

  education: [
    {
      degree: "Master of Computer Applications (MCA)",
      school: "Gobi Arts & Science College, Tamil Nadu",
      score: "CGPA: 8.54",
      period: "2022 – 2024"
    },
    {
      degree: "Bachelor of Science in Mathematics",
      school: "Gobi Arts & Science College, Tamil Nadu",
      score: "CGPA: 8.08",
      period: "2019 – 2022"
    }
  ],

  languages: [
    { name: "Tamil", level: "Native" },
    { name: "English", level: "Professional working proficiency" },
  ],

  // Industrial products first, then the five "Key Projects" from the resume, then the other work.
  projects: [
    {
      title: "Industrial AI Products",
      description: "Hands-on work on industrial AI products as the implementation expert (Forward Deployed Engineer): AI automation, computer vision and edge deployment. The details are kept high-level here; get in touch to talk about it.",
      tech: ["AI Automation", "Computer Vision", "Edge AI", "Implementation"],
      link: "#",
      codeLink: "https://github.com/sesand",
      image: "https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "SnapFace – Real-Time Face Recognition & Attendance",
      description: "Production-ready face recognition system using dual RTSP camera streams, InsightFace, ONNX Runtime, FastAPI, and OpenCV. Includes anti-spoofing validation, live monitoring, automated alerts, secure role-based access, and attendance workflows, with GPU-optimized inference for stable, low-latency continuous streaming and on-premise deployment.",
      tech: ["Python", "FastAPI", "InsightFace", "OpenCV", "ONNX Runtime", "RTSP", "Docker"],
      link: "https://www.primemoversolutions.in/ai-in-actions/",
      codeLink: "https://github.com/sesand",
      image: "https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      title: "SpeedVision AI – Video Analytics, ANPR & Speed Detection",
      description: "Real-time video analytics pipeline for vehicle detection, tracking, ANPR, OCR-based license plate recognition, and speed estimation. GPU-accelerated YOLOv8 inference with FFmpeg and RTSP streaming, plus structured alert logging, event tracking, and evidence capture that turn raw camera feeds into searchable traffic analytics and dashboard-ready records.",
      tech: ["Python", "YOLOv8", "OpenCV", "FFmpeg", "Tesseract OCR", "FastAPI", "RTSP"],
      link: "https://www.primemoversolutions.in/speed-vision-ai/",
      codeLink: "https://github.com/sesand",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "AI-Enhanced LMS – Learning & Assessment Platform",
      description: "AI-driven LMS workflows for intelligent content processing, learner assistance, question generation, and automated education support. Integrates LLM automation, RAG pipelines, tool calling, and agent-based API orchestration, connecting AI reasoning with structured API actions, chatbot interactions, and mentor-style guidance.",
      tech: ["Python", "FastAPI", "LangChain", "LangGraph", "CrewAI", "RAG", "Tool Calling"],
      link: "https://www.primemoversolutions.in/lms/",
      codeLink: "https://github.com/sesand",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "MedToolVision – Edge AI Surgical Tool Tracking",
      description: "Edge-deployed surgical instrument tracking system on Raspberry Pi CM4 with low-latency object detection and HDMI live visualization. Real-time tool visibility workflows with inference tuned for constrained compute, memory, and latency.",
      tech: ["Python", "OpenCV", "YOLOv8", "Raspberry Pi CM4", "Edge AI"],
      link: "https://www.primemoversolutions.in/ai-co-pilot-for-laparoscopy/",
      codeLink: "https://github.com/sesand",
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Postal Sign Recognition System",
      description: "Raspberry Pi-based edge computer vision application using image preprocessing, model training, lightweight inference, and embedded deployment. Research-oriented work on Computer Vision, Machine Learning, IoT, and edge deployment, published as a research paper with Springer.",
      tech: ["Python", "OpenCV", "Machine Learning", "Raspberry Pi", "Edge AI", "Springer"],
      link: "https://link.springer.com/chapter/10.1007/978-3-031-81308-5_36",
      codeLink: "https://github.com/sesand",
      image: "/assets/project-postal.png"
    },

    // ---- Other work (unchanged from the previous version of the site) ----
    {
      title: "DefectXpert - Quality Control",
      description: "Automated defect detection and quality control system leveraging advanced computer vision and deep learning for manufacturing pipelines.",
      tech: ["Computer Vision", "Deep Learning", "Quality Assurance"],
      link: "https://www.primemoversolutions.in/defectxpert/",
      codeLink: "https://github.com/sesand",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Hotel Tariff Forecasting AI",
      description: "AI-powered hotel booking and tariff forecasting system to optimize pricing strategies using machine learning and time-series analysis.",
      tech: ["Machine Learning", "Time Series Forecasting", "Python"],
      link: "https://www.primemoversolutions.in/hotel-booking-ai/",
      codeLink: "https://github.com/sesand",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Edhaa Solutions",
      description: "Enterprise software solution providing AI-driven insights, workflow automation, and intelligent analytics for modern businesses.",
      tech: ["AI Analytics", "Enterprise Automation", "FastAPI"],
      link: "https://www.primemoversolutions.in/edhaa/",
      codeLink: "https://github.com/sesand",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Video Summarization Agent",
      description: "Advanced AI tool powered by Gemini 2.0 Flash and Streamlit for multi-modal video analysis and summarization. Integrated real-time web research and agentic orchestration.",
      tech: ["Gemini 2.0", "Streamlit", "Agentic AI", "Python"],
      link: "https://www.linkedin.com/feed/update/urn:li:activity:7304303273841213440/",
      codeLink: "https://github.com/sesand",
      image: "/assets/project-video.png"
    },
    {
      title: "AI Workflow Optimization",
      description: "End-to-end data annotation, preprocessing, and object detection pipeline optimization utilizing Roboflow, CVAT, and YOLO.",
      tech: ["YOLO", "Roboflow", "CVAT", "Computer Vision"],
      link: "https://www.linkedin.com/posts/sesan-duraisamy-76474a219_sam3-metaai-computervision-activity-7398268250318491648-DEZk?utm_source=share&utm_medium=member_desktop&rcm=ACoAADca77wBDnJylgS6qCFoYFhpAeoH0z8vsSE",
      codeLink: "https://github.com/sesand",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Light Detection Automation",
      description: "IoT-enabled Edge AI system that detects street light status during day and night, automatically turning them off when not needed to significantly reduce power consumption.",
      tech: ["IoT", "Edge AI", "Sensors"],
      link: "#",
      codeLink: "https://github.com/sesand",
      image: "https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      title: "Email Automation using n8n",
      description: "Intelligent email workflow automation utilizing n8n for automated routing, processing, and response management.",
      tech: ["n8n", "Workflow Automation", "API Integration"],
      link: "https://www.linkedin.com/posts/sesan-duraisamy-76474a219_aiproductivity-executivetools-meetingscheduler-activity-7364324468460027906-XdGg?utm_source=share&utm_medium=member_desktop&rcm=ACoAADca77wBDnJylgS6qCFoYFhpAeoH0z8vsSE",
      codeLink: "https://github.com/sesand",
      image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=1000&auto=format&fit=crop"
    }
  ],

  publications: [
    {
      title: "IoT Enabled Indian Postal Sign Recognition System: Facilitating Communication Among Individuals with Hearing and Speech Impairments",
      venue: "Springer",
      description: "Published research on IoT-enabled Computer Vision and Machine Learning-based postal sign recognition, demonstrating applied AI implementation using image processing, model development, and edge deployment concepts.",
      doi: "10.1007/978-3-031-81308-5_36",
      link: "https://doi.org/10.1007/978-3-031-81308-5_36",
    },
  ],

  achievements: [
    { title: "Ideathon 24 Winner", organization: "PrimeMover Solutions" },
    { title: "Machine Learning Internship Certificate", organization: "Avinashilingam University" },
    { title: "AI for IoT Speech Appreciation Letter", organization: "Gobi Arts and Science College" },
    { title: "Employee Upliftment Program Certificate", organization: "Skill Hub" },
    { title: "Python Programming Certification", organization: "Udemy" }
  ],

  social: {
    linkedin: "https://www.linkedin.com/in/sesan-duraisamy/",
    github: "https://github.com/sesand",
    topmate: "https://topmate.io/sesan_d",
    email: "sesanvk007@gmail.com",
    phone: "+91 9025443984",
    framer: "https://sesan-portfolio.framer.website"
  },
};
