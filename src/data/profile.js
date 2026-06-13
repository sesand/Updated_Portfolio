export const profile = {
  name: "Sesan Duraisamy",
  role: "AI Systems Engineer",
  headline: "Specializing in GPU-optimized Computer Vision, Edge AI, and Agentic RAG Workflows.",
  subHeadline: "AI Systems Engineer | Computer Vision & Edge AI | Generative AI | Full Stack AI",
  about: "AI Systems Engineer with 2+ years of hands-on experience building and deploying real-time computer vision and intelligent automation systems. I specialize in GPU-optimized inference, multi-camera video analytics, edge deployment (Raspberry Pi/CM4), and scalable FastAPI-based AI services. I have a proven track record of integrating LLM and agent-driven workflows (LangChain, CrewAI) into production systems across cloud and on-premise environments.",
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
  experience: [
    {
      role: "AI Systems Engineer",
      company: "PrimeMover Solutions, Coimbatore",
      period: "May 2024 – Present",
      location: "Coimbatore, Tamil Nadu",
      description: "Designing and deploying real-time CV systems for surveillance, healthcare, and identity management. Built production-ready inference pipelines using FastAPI and PyTorch with GPU-optimized deployment (NVIDIA). Developed RTSP-based multi-camera streaming architectures. Implemented Face Recognition, ANPR, and Anti-spoof validation. Optimized inference latency using ONNX Runtime and integrated Agent-based API orchestration."
    },
    {
        role: "Machine Learning Engineer Intern",
        company: "Center for Machine Learning and Intelligence (CMLI)",
        period: "Dec 2023 – Apr 2024",
        location: "Coimbatore, Tamil Nadu",
        description: "Developed a Raspberry Pi-based postal sign recognition system using computer vision. Implemented image preprocessing, model training, and lightweight edge inference for real-time detection on embedded hardware."
    }
  ],
  education: [
    {
      degree: "Master of Computer Applications (MCA)",
      school: "Gobi Arts & Science College, Tamil Nadu",
      score: "CGPA: 8.54/10.0",
      period: "2022 – 2024"
    },
    {
      degree: "Bachelor of Science in Mathematics",
      school: "Gobi Arts & Science College, Tamil Nadu",
      score: "CGPA: 8.08/10.0",
      period: "2019 – 2022"
    }
  ],
  projects: [
    {
      title: "MedToolVision – Edge Surgical Tool Tracking",
      description: "Designed edge-deployed surgical instrument tracking system on Raspberry Pi CM4. Implemented low-latency detection pipeline with HDMI live visualization output.",
      tech: ["Python", "OpenCV", "YOLOv8", "Raspberry Pi CM4"],
      link: "https://www.primemoversolutions.in/ai-co-pilot-for-laparoscopy/",
      codeLink: "https://github.com/sesand",
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "SpeedVision AI – Video Analytics & ANPR",
      description: "Real-time video analytics pipeline for detection, tracking, ANPR, and speed estimation. Built RTSP streaming pipeline with GPU-accelerated YOLOv8 inference.",
      tech: ["YOLOv8", "OpenCV", "FFmpeg", "Tesseract"],
      link: "https://www.primemoversolutions.in/speed-vision-ai/",
      codeLink: "https://github.com/sesand",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1000&auto=format&fit=crop"
    },
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
      title: "AI LMS - Learning Management System",
      description: "Advanced Learning Management System developed to facilitate modern, AI-assisted educational workflows and course management.",
      tech: ["Web Development", "AI Integration", "Backend Orchestration"],
      link: "https://www.primemoversolutions.in/lms/",
      codeLink: "https://github.com/sesand",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "SnapFace – Automated Attendance",
      description: "An automated attendance monitoring system utilizing bullet cameras. Detects and marks attendance seamlessly within a 5 to 7-meter range.",
      tech: ["Python", "InsightFace", "ONNX Runtime"],
      link: "https://www.primemoversolutions.in/ai-in-actions/",
      codeLink: "https://github.com/sesand",
      image: "https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=800"
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
      title: "Postal Sign Recognition System",
      description: "Edge AI project for embedded hardware using lightweight inference. Assistive technology for real-time sign detection on Raspberry Pi. Published as a research paper on Springer.",
      tech: ["Edge AI", "Raspberry Pi", "Computer Vision", "Springer"],
      link: "https://link.springer.com/chapter/10.1007/978-3-031-81308-5_36",
      codeLink: "https://github.com/sesand",
      image: "/assets/project-postal.png"
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
  achievements: [
    { title: "Ideathon 24 Winner", organization: "PrimeMover Solutions" },
    { title: "Machine Learning Internship", organization: "Avinashilingam University" },
    { title: "AI for IoT Appreciation", organization: "Gobi Arts and Science College" },
    { title: "Employee Upliftment Program", organization: "Skill Hub" }
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
