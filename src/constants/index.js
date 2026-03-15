export const myProjects = [
  {
    id: 1,
    title: "AI RAG Medical Chatbot",
    description:
      "An end-to-end LLM chatbot with retrieval-augmented generation:document ingestion, embedding, vector search (Pinecone), prompt orchestration (LangChain), and a Flask API/UI.",
    subDescription: [
      "Diagnosed and resolved hallucination issues by implementing chunking strategies, and fallback prompts, improving response accuracy through iterative testing.",
      "Deployed on AWS with environment-based configs and automated CI/CD for repeatable builds.",
    ],
    href: "https://github.com/2sumC/AI-Medical-Chatbot-Professional-LLM-RAG",
    logo: "",
    image: "/assets/projects/1.jpeg",
    tags: [
      {
        id: 1,
        name: "Python",
        path: "/assets/logos/python.png",
      },
      {
        id: 2,
        name: "LLM",
        path: "/assets/projects/LLM.png",
      },
      {
        id: 3,
        name: "RAG",
        path: "/assets/projects/RAG.png",
      },
      {
        id: 4,
        name: "TailwindCSS",
        path: "/assets/logos/tailwindcss.svg",
      },
    ],
  },
  {
    id: 2,
    title: "Financial App Landing Page",
    description:
      "A responsive landing page with modular React components, smooth navigation, and a reviews carousel to showcase product features.",
    subDescription: [
      "Refactored into reusable components and hooks; improved code maintainability and reduced development time.",
      "Deployed to AWS S3 with static website hosting for reliable public access while documenting repeatable deployment procedures.",
    ],
    href: "https://github.com/2sumC/Financial-App-LandingPage-FullStack-Responsive",
    logo: "",
    image: "/assets/projects/2.jpeg",
    tags: [
      {
        id: 1,
        name: "Typescript",
        path: "/assets/logos/TS.png",
      },
      {
        id: 2,
        name: "React",
        path: "/assets/logos/react.svg",
      },
      {
        id: 3,
        name: "SQLite",
        path: "/assets/logos/sqlite.svg",
      },
      {
        id: 4,
        name: "TailwindCSS",
        path: "/assets/logos/tailwindcss.svg",
      },
    ],
  },
  {
    id: 3,
    title: "Heart Attack Analysis and Prediction",
    description:
      "A machine learning pipeline using Kaggle data to predict heart attack risk, achieving 90.3% accuracy and 93% AUC with Random Forest classifier.",
    subDescription: [
      "Performed comprehensive data cleaning and conducted extensive Exploratory Data Analysis (EDA) with univariate and bivariate visualizations to extract insights.",
      "ImpleImplemented and compared 4 machine learning algorithms achieving varying accuracy rates: Random Forest, Logistic Regression, Decision Tree, and SVM.",
          ],
    href: "https://github.com/2sumC/Heart-Attack-Analaysis-And-Prediction-MachineLearning-EDA/blob/main/Uptodate-Heart-Attack-Analysis-And-Prediction.ipynb",
    logo: "",
    image: "/assets/projects/3.jpeg",
    tags: [
      {
        id: 1,
        name: "ML",
        path: "/assets/logos/ML.png",
      },
      {
        id: 2,
        name: "EDA",
        path: "/assets/logos/EDA.png",
      },
    ],
  },
  {
    id: 4,
    title: "Multi-site Network Monitoring Dashboard",
    description:
      "A comprehensive ICT infrastructure monitoring system designed for international organizations with distributed offices worldwide.",
    subDescription: [
      "It monitors network devices across multiple countries, integrates external APIs for contextual data (weather, geolocation, time, news), provides real-time SNMP device monitoring, and delivers actionable analytics through a responsive web dashboard.",
    ],
    href: "https://github.com/2sumC/Multi-Site-Office-Network-Monitoring-API-Dashboard",
    logo: "",
    image: "/assets/projects/4.jpeg",
    tags: [
      {
        id: 1,
        name: "Python",
        path: "/assets/logos/python.png",
      },
      {
        id: 2,
        name: "Git",
        path: "/assets/logos/git.svg",
      },
      {
        id: 3,
        name: "RESTful API",
        path: "/assets/logos/microsoft.svg",
      },
    ],
  },
];

export const mySocials = [
  {
    name: "Github",
    href: "https://github.com/2sumC",
    icon: "/assets/logos/github.svg",
  },
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/sylvie-yin",
    icon: "/assets/socials/linkedIn.svg",
  },
  /*{
    name: "Instagram",
    href: "https://www.instagram.com",
    icon: "/assets/socials/instagram.svg",
  },*/
];

export const experiences = [
  {
    title: "Master of Computer Science",
    job: "UoW",
    date: "2025-2027",
    contents: [
      "Related Course: Machine Learning, Network Security, Data Analytics, Web Development, Software Engineering",
       "WAM: HD",
    ],
  },
];
export const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://robohash.org/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://robohash.org/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://robohash.org/john",
  },
  {
    name: "Alice",
    username: "@alice",
    body: "This is hands down the best thing I've experienced. Highly recommend!",
    img: "https://robohash.org/alice",
  },
  {
    name: "Bob",
    username: "@bob",
    body: "Incredible work! The attention to detail is phenomenal.",
    img: "https://robohash.org/bob",
  },
  {
    name: "Charlie",
    username: "@charlie",
    body: "This exceeded all my expectations. Absolutely stunning!",
    img: "https://robohash.org/charlie",
  },
  {
    name: "Dave",
    username: "@dave",
    body: "Simply breathtaking. The best decision I've made in a while.",
    img: "https://robohash.org/dave",
  },
  {
    name: "Eve",
    username: "@eve",
    body: "So glad I found this. It has changed the game for me.",
    img: "https://robohash.org/eve",
  },
];
