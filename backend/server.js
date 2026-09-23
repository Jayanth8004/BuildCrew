import express from "express";
import cors from "cors";

const app = express();                  // This is everything the express is called API also passed through it 
app.use(cors());
app.use(express.json());

// =========================================================================
// 📦 Self-Contained Project Data (Stored directly inside server.js)
// Even if the data folder is deleted, this server.js has all data!
// =========================================================================
const initialProjects = [
  {
    id: 'studysync-ai',
    title: 'StudySync AI - Collaborative Note Synthesizer',
    fullTitle: 'StudySync AI — Autonomous Real-Time Collaborative Research Synthesizer',
    tagline: 'Autonomous multi-modal note condensation engine synchronizing real-time classroom audio streams directly into searchable Pinecone vector graphs.',
    fullDescription: 'Multi-agent LLM pipeline transforming messy seminar notes, audio lectures, and PDFs into verified research synthesis maps with interactive whiteboard memory.',
    type: 'hackathon',
    categoryBadge: 'HackNova 2026',
    recruitingBadge: 'Recruiting 2 Roles',
    trackName: 'TreeHacks \'25 Track',
    sprintNotice: 'Sprint 2 Live · TreeHacks \'25 Track',
    urgency: 'high',
    matchScore: 94,
    publishedTime: '2 days ago',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjbkVkD8ugQCopgjlKUdX6h2t7iGR8U7cAotGEX4gkVp2iZGYgNXuhDd7uv8XKPdDKxRc5LVG5-2ku_w-inG49pGRXEBeatfaGIbtDqTB4GZbf-12sVHdMJBR4s9dSwOvIgdwjHPZxHAYY6iul7GnOXO1wqM8s9NQjaFCIpekgajipka8rL8aNXyl4sNuZ5jWKKChl91y1bgaayoCYgzuMAvhhpxODIRFzAx9FdSUbydfyLDzrLu9E',
    imageTag: 'NLP & Study Graphs',
    techStack: ['React 19', 'FastAPI', 'Pinecone', 'Tailwind', 'LangChain', 'Fabric.js', 'WebSockets', 'MongoDB Atlas'],
    rolesNeeded: ['frontend', 'ai'],
    campus: 'stanford',
    filledCount: 2,
    totalCapacity: 4,
    lead: {
      name: 'Maya Chen',
      university: 'Stanford CS',
      program: 'Stanford \'26 (SymSys & CS)',
      roleTitle: 'Lead Architect',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDj8rfKgKGYJOxl-peX0YLvOw6ySeIhn0XjE0cX3j7Pea0oBM1HHLCSYm-k4lm5vWUqCF1VtVwXY0QESMoDaSSF9tk9aQWB0T3D2BZDM6Ezy_23eymF3i6G6fes0oJ3aEM1-5XWifWl_PNo-39urmN5Q8g2NLDqQ2Lv6TE46GTEVc1EzdkGgpKT8Lge4aiJw7Uny0uDg47QiOKXP2wcPXRP3iufmQ9sldhgwMnZhOUilqmfFcPuoxbX',
      leadAvatarFull: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtB4g7Rt44tR_ssttqy-nFfXkLTLAZI2Df_pV8LofmlYWdeXDlAnC6fnhQ66qUJoVhiB8N_EfeGIh-zXnAf5J_V1vfxmSf4p011-amDyMylMhus7E4kYmRMbUdv95aeAV0vo3nxOXQAbwzTZaC6vaVEBzPf-XH7hzEhloFXiREPRvxrefJyiczzW30Q-0N_ofN1fn6eiKB2EPMVUWRZMyYtUqNlh8l3NeruxibmJn46c33N5Tvbmd1'
    },
    metaStats: {
      commits: '68 commits',
      branches: 'across 3 branches',
      submissionTarget: 'HackNova 2025'
    },
    problemSolving: {
      description: 'Undergraduate research seminars and capstone study pods suffer from acute cognitive overload. Vital insights dissolve into disconnected Google Docs, ephemeral Slack links, and unwieldy Otter transcripts with zero citation provenance.',
      cards: [
        {
          icon: 'broken_image',
          color: 'text-error',
          title: 'Fragmented Artifacts',
          desc: 'Over 65% of peer citations get lost between raw PDF annotations and collaborative deck assemblies.'
        },
        {
          icon: 'sync_problem',
          color: 'text-secondary',
          title: 'Context Drift',
          desc: 'Team members work off differing revisions of seminar debates without real-time state synchrony.'
        },
        {
          icon: 'memory',
          color: 'text-secondary',
          title: 'Zero Vector Grounding',
          desc: 'Standard GPT wrappers hallucinate non-existent page citations without local chunk verification.'
        }
      ]
    },
    architecture: {
      summary: 'StudySync couples a low-latency WebSockets canvas frontend built on React 19 and Fabric.js with an asynchronous LangChain semantic indexer streaming embeddings to MongoDB Atlas Vector Search.',
      badge: 'MERN + Python FastAPI Microservice',
      stages: [
        {
          stage: 'Stage 01',
          icon: 'picture_as_pdf',
          title: 'Document Parser',
          desc: 'Chunking unstructured PDFs & lecture audio via PyMuPDF.',
          tech: 'Python / Celery'
        },
        {
          stage: 'Stage 02',
          icon: 'alt_route',
          title: 'Vector Embeddings',
          desc: 'Voyage-3-large vectors stored in MongoDB Atlas.',
          tech: 'FastAPI / Atlas'
        },
        {
          stage: 'Stage 03',
          icon: 'dynamic_feed',
          title: 'State Sync Engine',
          desc: 'Yjs CRDT protocol broadcasting canvas changes.',
          tech: 'Node.js / WebSockets'
        },
        {
          stage: 'Stage 04',
          icon: 'draw',
          title: 'Infinite Canvas',
          desc: 'Hardware accelerated mind-node renderer.',
          tech: 'React 19 / Fabric.js'
        }
      ]
    },
    sprints: [
      {
        id: 1,
        title: 'Sprint 1: Vectorization & Core Pipeline Backend',
        status: 'Completed Nov 10',
        state: 'done',
        desc: 'Completed PDF vector embeddings microservice, MongoDB collection schema, and session auth middleware.'
      },
      {
        id: 2,
        title: 'Sprint 2: Real-time Canvas & Presence Sync',
        status: 'In Progress (Current)',
        state: 'in-progress',
        desc: 'Connecting WebSocket rooms for real-time cursor sync, node dragging, live markdown editing, and citation card popovers.'
      },
      {
        id: 3,
        title: 'Sprint 3: HackNova Submission & User Testing',
        status: 'Upcoming · Nov 24',
        state: 'upcoming',
        desc: 'Stress testing 50 concurrent researchers per whiteboard, polish motion curves, record live demo walkthrough for judges.'
      }
    ],
    squadRoster: [
      {
        name: 'Maya Chen',
        role: 'Backend & Infra Architecture',
        badge: 'Lead',
        school: 'Stanford CS \'26',
        skills: 'FastAPI, LangChain, Mongo',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7PDnT8RjWo9k5iTTX2KiOAZARzRUhtcdEDIbuWWsvidKnJjYY0jeQKF4rwAzsApy0CrvE_MBP1Oahy6H6Cxf5XdFs_C-JAFlHen7L88-DhRITp5Y320BpjinFkSHhOcWcSuYsA7bw09aESLoQN2rvZ2se_Uqw9Zi9Lmxq8BA6IfWNuk91MLDTAipJQltKMajM2ZnG153z_m5poQGk2g99F0IRApDu3zK97uBbxZuUoja_B69TvK6n'
      },
      {
        name: 'Alex Vance',
        role: 'Model Inference & Evaluation',
        badge: 'AI Engineer',
        school: 'Stanford CS \'25',
        skills: 'RAG, PyTorch, Embeddings',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCM4VJ_y3eQXx_ZHkdkypEkb7yiKToP7XJhWP_YDFlZfxGJ3MN3udbXoX2FRhx3dPmQ-yEZqmNebAKWJ2h-grRjGY_of0K2uTM7Rok4fj5vO6Wj8jTyql1s2JZDvTJ5Q-jxt9ivZlV-bmHx6XBuaV01dsed81fwl7nVCB0T-4u31a-tkPM2tapPgPF3vFcTY3wg4K8hcQrf0I7v4NTXkQxco37OGKfcQ9quJb_twlg0XiCwWPYsXe_'
      }
    ],
    openVacancies: [
      {
        id: 'frontend',
        track: 'Frontend Track',
        title: 'Frontend & Interactive Canvas Engineer',
        seats: '1 seat available',
        desc: 'Take full ownership of the zoomable infinite canvas using Fabric.js or Canvas API. Bridge WebSocket deltas into smooth 60fps rendering of research concept cards.',
        skills: ['React 19', 'Tailwind CSS', 'Fabric.js', 'WebSockets'],
        hours: '8–10 hrs / week'
      },
      {
        id: 'designer',
        track: 'Design Track',
        title: 'UI/UX Product Designer',
        seats: '1 seat available',
        desc: 'Lead the end-to-end design language for complex academic multi-view synthesis. Craft Figma components, design interactive spatial canvas controls, and conduct usability tests.',
        skills: ['Figma Systems', 'Wireframing', 'Micro-interactions', 'User Research'],
        hours: '6–8 hrs / week'
      }
    ]
  },
  {
    id: 'campus-flow',
    title: 'Campus Flow - Smart Bike Sharing & Geofencing',
    fullTitle: 'Campus Flow — Next-Gen Micromobility & Dynamic IoT Allocation',
    tagline: 'Sub-meter geofenced campus dockless bicycle allocation system powered by low-power telemetry and dynamic pricing incentives.',
    fullDescription: 'Sub-meter geofenced campus dockless bicycle allocation system powered by low-power telemetry and dynamic pricing incentives.',
    type: 'startup',
    categoryBadge: 'Startup Seed',
    recruitingBadge: 'Recruiting 1 Role',
    urgency: 'medium',
    matchScore: 89,
    publishedTime: '3 days ago',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR3M7UkQCPNzjpONbSJT0QO2zJFwQdtL8buACgs6rn2nJ4KTL4CUur5E44usKnz4TMiMdbjsgLLakukIqyeZk-7F8Ruwha8lgbQCEN0kSD4yR9MzsArl9fr3IKXjJhEaJAb_zyEuRYQhAXj2Unp0SkDgue7uDtt6ZyVq0FaaNQ64Y4zt-W9iX2JAJerJyqiUwjk7dWfN7QHV_PUSKHdMYSEV_6Wdm4pfGy_utOpMWPqh-o_HmHqvZs',
    imageTag: 'Micromobility & IoT',
    techStack: ['React Native', 'Node.js', 'Express', 'Mapbox'],
    rolesNeeded: ['uiux'],
    campus: 'cmu',
    filledCount: 3,
    totalCapacity: 4,
    lead: {
      name: 'Rahul S.',
      university: 'IIT Delhi / CMU',
      program: 'CMU MS ECE \'26',
      roleTitle: 'Co-Founder & Systems Lead',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnmEZNtZGZBJt86mDapjBMA0jOqw7hClt5LtW8N3lZ1PQ1ZC9mxCwRPM0ZfJRe8FPjziwi8z-_eN14d36A7R-ixuMvlxN0uo5C1tIcO3PKyrDcVXCOAHrzgD10dDNX-1ahjrVulehRiTbJcd-o8XWvwMCQ-wXRLPvIzrI5cQ5jr2JctNHGF-GIFCXFEKkq3h6Ubriud652-Lvq5GUFgOVhef4OgN8z8bnkWKXgL3usgFpNzAG4LBHY'
    },
    openVacancies: [
      {
        id: 'uiux',
        track: 'Product Design',
        title: 'UI/UX Mobile Experience Designer',
        seats: '1 seat available',
        desc: 'Shape user flows, checkout ergonomics, and ride metrics dashboard for over 4,000 student riders.',
        skills: ['Figma', 'Prototyping', 'Design Systems', 'Mobile UX'],
        hours: '6–8 hrs / week'
      }
    ]
  },
  {
    id: 'verigrade',
    title: 'VeriGrade - Decentralized Peer Grading Protocol',
    fullTitle: 'VeriGrade — Zero-Knowledge Consensus for Distributed Peer Assessment',
    tagline: 'Zero-knowledge cryptographic consensus protocol for blind peer assessment in massive distributed collegiate engineering courses.',
    fullDescription: 'Zero-knowledge cryptographic consensus protocol for blind peer assessment in massive distributed collegiate engineering courses.',
    type: 'research',
    categoryBadge: 'Research Capstone',
    recruitingBadge: 'Recruiting 2 Roles',
    urgency: 'high',
    matchScore: 87,
    publishedTime: '4 days ago',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuzsEyege64n8fNbI7l4E_vkyPgb43U9G6U4ndzBQoYO_p2ex3KAPCUMjdwG78QNfeFJfsSM_qjvITpZdAIvEbGfygamzCuJevn56VOwj7wGfFcKGCP2_srBIfWy5O-Ey_1oCUTCnooYwUk6cFPPjsKW2-ocZRjoGOSZnXwXZt_3kFufn5w1b8A-evBPoc3DsKOppefj0o03FE1nW9Sk1rUcOnsp1b6X49jQJ5jnImn1t6NbZKcrnK',
    imageTag: 'ZK-Proofs & Web3',
    techStack: ['Next.js', 'Solidity', 'Python'],
    rolesNeeded: ['backend', 'fullstack'],
    campus: 'mit',
    filledCount: 1,
    totalCapacity: 3,
    lead: {
      name: 'Elena R.',
      university: 'MIT EECS',
      program: 'MIT PhD Fellow \'27',
      roleTitle: 'Principal Investigator',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBirUkNQSo04g_tpOZ4BCEqxhIS1X_JeuPCz7HOuaAg-iBZjD079_5Kw5JH_beVshiDR-hGgf25xxHWHIOiujBaIs-w4YI0ynogQcCH-ChPBSE6SQTry_Dqz24c73Jk7DeMfwiJy0dTYKPf4u-A8WVNw1oUjo6ssG1p_WKvOPmg1OVEotk4p7HgClGq2FLb6UoHwks2MTWuddYD2hBI5uOVcjsqA5gleuV5YGmocfJVn1MpOeHrvsPd'
    },
    openVacancies: [
      {
        id: 'solidity',
        track: 'Smart Contracts',
        title: 'Solidity & Circom Engineer',
        seats: '1 seat available',
        desc: 'Implement succinct zero-knowledge verifiable scoring circuits and EVM peer review contracts.',
        skills: ['Solidity', 'Circom', 'Foundry', 'ZK-SNARKs'],
        hours: '10–12 hrs / week'
      },
      {
        id: 'fullstack',
        track: 'Fullstack Track',
        title: 'Fullstack Next.js Web3 Developer',
        seats: '1 seat available',
        desc: 'Build wallet-authenticated professor review portals and student submission dashboards.',
        skills: ['Next.js', 'TypeScript', 'Wagmi', 'Tailwind'],
        hours: '8–10 hrs / week'
      }
    ]
  },
  {
    id: 'pulsehealth',
    title: 'PulseHealth - Campus Wellness Tracker',
    fullTitle: 'PulseHealth — Anonymous Collegiate Mental Health & Circadian Analytics',
    tagline: 'Anonymous collegiate mental health and sleep pattern aggregation engine connecting struggling students to on-demand counseling cohorts.',
    fullDescription: 'Anonymous collegiate mental health and sleep pattern aggregation engine connecting struggling students to on-demand counseling cohorts.',
    type: 'hackathon',
    categoryBadge: 'HealthTech Sprint',
    recruitingBadge: 'Recruiting 1 Role',
    urgency: 'medium',
    matchScore: 91,
    publishedTime: '5 days ago',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9qCzk4kFt7bl-vd1I3C4mBYSkJaXBlUIxKQ4XfWSy2pLZBVHEDmPNcbJITYd-_tf7QdzGjJ61A0raZMPd3mTVKENT3ZV8bjLCOoUbw9rGih-xEyJE1PVfNX9H5PsA_eyZI_IC7vuI2h-TKTzV83EEDKmoXrypkUxpKxuTIRRoxsHMrcbymCZiI0ouf0AetBrcL8K5L0ZLAihqkxHBKXCirNvt0msBlouI_U8MdaYwB6SC1L13yYEl',
    imageTag: 'Campus Mental Health',
    techStack: ['React', 'Express', 'MongoDB', 'Tailwind'],
    rolesNeeded: ['devops'],
    campus: 'berkeley',
    filledCount: 3,
    totalCapacity: 4,
    lead: {
      name: 'Marcus Thorne',
      university: 'UC Berkeley',
      program: 'Berkeley Bioengineering \'26',
      roleTitle: 'Product Lead',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyFPqZS3StaIAnqelNN3xTwBPyR1jhHAjRL-zVVlZiR-opyKFF-S25EV7sgFP1pg5loQQmf0lUZDr07AUuFBj6vJBgd-uLu46GutrwbPDQH3GeKSEhZlQejBrAe8q0TwGmQTOLPcOiGUbq4NWemE6fAOt-44Yce-0l8sXqSSQWFG_7rqdTPwYWcdG9bYddFmOn7lSvXNArJ3s0LzVs9EjSSmQUfOMIvrlaoRqOlO84MTJmuUEPXaF-'
    },
    openVacancies: [
      {
        id: 'devops',
        track: 'Cloud & Infrastructure',
        title: 'DevOps / Cloud Specialist',
        seats: '1 seat available',
        desc: 'Build HIPAA-compliant encrypted telemetry ingestion pipelines using AWS and Terraform.',
        skills: ['AWS ECS', 'Docker', 'Terraform', 'PostgreSQL'],
        hours: '6–8 hrs / week'
      }
    ]
  },
  {
    id: 'codecollab',
    title: 'CodeCollab - Live Browser IDE with Audio Rooms',
    fullTitle: 'CodeCollab — Zero-Latency Browser IDE with Spatial Voice Rooms',
    tagline: 'Zero-latency multi-cursor browser code workspace with peer-to-peer spatial audio rooms for high-tempo remote hackathon teams.',
    fullDescription: 'Zero-latency multi-cursor browser code workspace with peer-to-peer spatial audio rooms for high-tempo remote hackathon teams.',
    type: 'startup',
    categoryBadge: 'DevTools Venture',
    recruitingBadge: 'Recruiting 2 Roles',
    urgency: 'high',
    matchScore: 92,
    publishedTime: '1 day ago',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9LUEpKqejh2uq7ieB6_s5ibMNnitHzJKFAABnd_jN88ZrIt87CPU_F-ci_rIIpX_dC-MjR-VQCdNAWk-KOyQbR_TVRyse9W5ICrL7vBv8jNiKaersRfP3z-i83ikw868QXdvqKADmPO9pKNJmVYUeLJDBjoQEmh9tdWr0c-zMK-TAmKyAAIjb0fweK8gSdEMnXqTfaZbZhz9h2Zok6aKeM9_7eVzpT38E3n-6c0YlF_BGuh9U2dyB',
    imageTag: 'Real-Time Systems',
    techStack: ['WebRTC', 'React', 'Node.js', 'Redis'],
    rolesNeeded: ['frontend', 'fullstack'],
    campus: 'stanford',
    filledCount: 2,
    totalCapacity: 4,
    lead: {
      name: 'Alex Zhang',
      university: 'Waterloo CS',
      program: 'Waterloo Software Eng \'26',
      roleTitle: 'Systems Architect',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoHUlbt9Z2sZE1mNrCaUHyErYt_nL322OdfYzB0hiI8-AOawIa2sqnJLQQD_sqL1U8SCgXiSI4sVALubBquMriTb43OtSTlUGC2BIFYgwC15LG292xTlpOxUbyMjR5mQVp4WFHcI8pfDdWEpA52lCwe4_1hcLlPIBRRROOP4PbmUC_6HmuPfflnSYm1xbSIWGAoZ8_zhnZU_kZ_cIMOEzm2vVAkdt-rO7wnmRB7jNUyhuN6y36YZOH'
    },
    openVacancies: [
      {
        id: 'webrtc',
        track: 'Audio & Networking',
        title: 'WebRTC Specialist',
        seats: '1 seat available',
        desc: 'Optimize mesh peer audio connections, jitter buffers, and spatial panning audio engine.',
        skills: ['WebRTC', 'MediaStreams', 'Socket.io', 'Node.js'],
        hours: '8–10 hrs / week'
      },
      {
        id: 'frontend',
        track: 'Frontend Track',
        title: 'Monaco Editor & UI Dev',
        seats: '1 seat available',
        desc: 'Integrate Monaco editor syntax AST, multi-cursor presence, and custom diff widgets.',
        skills: ['React 19', 'Monaco Editor', 'TypeScript', 'Tailwind'],
        hours: '8–10 hrs / week'
      }
    ]
  },
  {
    id: 'ecosense',
    title: 'EcoSense - Dorm Energy Optimization IoT',
    fullTitle: 'EcoSense — Sub-Watt Microcontroller Energy Analytics Mesh',
    tagline: 'Low-cost sensor deployment in residential student dorms reporting automated HVAC and power telemetry via time-series pipelines.',
    fullDescription: 'Low-cost sensor deployment in residential student dorms reporting automated HVAC and power telemetry via time-series pipelines.',
    type: 'capstone',
    categoryBadge: 'Climate Tech',
    recruitingBadge: 'Recruiting 1 Role',
    urgency: 'medium',
    matchScore: 84,
    publishedTime: '6 days ago',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSwEJiaU6RkOkR9KsOWyg8SNkEMV-ETMD-RbJx0cwyxDprvLydZShoww885eBX3-CD3QMIAwMRHOoMx3rH7625kiOzs3le1uMlOSZ1CAcqXqCVPxPIHavGpRTi7cLG1MzbWOTVJixM0GDQFGTluNvP-OqIER5b-8xrHpJdDmYZpDTqUUlaUYkYRPcpLPpOA4y5zCVs6aLo55d5QKn7rKdMbLtmaVNMRwGf-qR-M9NhDZdcHXBW1JoW',
    imageTag: 'IoT & Energy',
    techStack: ['ESP32', 'React', 'FastAPI', 'TimescaleDB'],
    rolesNeeded: ['fullstack'],
    campus: 'iit',
    filledCount: 2,
    totalCapacity: 3,
    lead: {
      name: 'Sarah Jenkins',
      university: 'Georgia Tech',
      program: 'Georgia Tech Environmental Eng \'26',
      roleTitle: 'Hardware Lead',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQ4L7we6LwbEsUj0RFqsg_rHzUjOuupTLlSo7mO7Spl-y4GdefKVfGecoaKgcF0XJ1VvW2j45ctDUZ4nxXbPfiJJNw2MKtCGo_xrr7hn7AOUc3pwPcQQ9uK4oE0mGO8B9rNXJKD3s9DSXWfXNllo9tyj-c7PYNiG7UJXRc2V8LVJhPAxT9LHLBLOqOGmkOAPdjqZt_WY66eWyYy_R9PMmoU7Jw-0bJD9sgc_70JjzrkZygUQ_mUfLB'
    },
    openVacancies: [
      {
        id: 'fullstack',
        track: 'Fullstack Track',
        title: 'Fullstack Sensor Dashboard Dev',
        seats: '1 seat available',
        desc: 'Build real-time watt telemetry charts, heatmaps, and building manager alert controls.',
        skills: ['React', 'FastAPI', 'TimescaleDB', 'Chart.js'],
        hours: '6–8 hrs / week'
      }
    ]
  }
];

const initialHackathons = [
  {
    id: 'hacknova-2026',
    circuitId: 'BC-CIRC-2026-01',
    title: 'HACKNOVA 2026',
    subtitle: 'North American Student Engineering Flagship',
    organizer: {
      name: 'MIT Tech Alliance & BuildCrew',
      website: 'https://hacknova.org',
      partnerType: 'Tier-1 Host Partner'
    },
    dates: 'Oct 24–26, 2026',
    startDate: 'Oct 24, 2026 · 6:00 PM ET',
    endDate: 'Oct 26, 2026 · 4:00 PM ET',
    location: 'MIT Stata Center, Cambridge, MA',
    mode: 'hybrid',
    prizePool: '₹45,000 Grants',
    squadLimits: '2 to 4 Builders',
    freeEntry: true,
    registrationFee: '100% Free (Host & Sponsor Funded)',
    status: 'closing-soon',
    statusLabel: 'Closing soon',
    registrationDeadline: 'Oct 14, 2026 (4 days left)',
    isFeatured: true,
    isVerified: true,
    tier: 'Tier-1 Global Sanctioned',
    registeredTeams: 410,
    maxCap: 500,
    soloMatches: 64,
    seekersCount: 64,
    tracks: ['ai', 'web3', 'fintech', 'healthtech'],
    trackLabels: ['Autonomic Agents', 'Verifiable Security', 'Decentralized Infra', 'Edge AI'],
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDX_mOFXLVvuCbf1oQQGndJsT954Hu501_6TXKcXha4PJEZCHX7aAeew7Ba3klJT6TZLJWHaXBRIlrGvwl4nkJEOkxRMe4ZACjZMBItltyN0Moo2jI2S-wQGguh_Fz7mz8SqaoPR3vK8o3LyiRR6Lp9KnZRL7HZ11AzFuw67X1KJpSrmBPsQK8M6r2F643jQA5Mm3d6T9-W74OdrVDI5a_eZ9l8DmNPlqfwk7IHGUTlbGrP90R1nFJU',
    badge: 'Featured Flagship 2026',
    description: 'Join 1,200 elite collegiate technologists at the intersection of autonomic agent swarms, verifiable hardware security, and decentralized infrastructure. Fast-track check-in and dedicated BuildCrew workspace lounges enabled.',
    eligibility: 'Open to enrolled undergraduate, master\'s, and PhD students globally. Valid university (.edu) email or student verification card required upon check-in.',
    teamRequirements: 'Squads must consist of 2 to 4 builders. Cross-campus collaborative teams are strongly encouraged. Solo builders can match in the BuildCrew circuit before project lockdown.',
    officialRegistrationLink: 'https://hacknova.org/register',
    lastVerified: {
      verifiedAt: 'Sep 22, 2026, 14:30 PT',
      verifier: 'BuildCrew Collegiate Sanctioning Board',
      circuitSanction: 'BC-CIRC-2026-01',
      notes: 'Direct liaison with MIT Tech Alliance confirmed. Escrow bounties locked.'
    },
    rules: [
      'Fresh Code Policy: All architecture code, frontend components, and model pipelines must be created during the official 36-hour hacking period. Open-source libraries and APIs may be used if disclosed.',
      'Intellectual Property Ownership: Participating squads retain 100% ownership, copyright, and patent rights over their prototypes and codebases.',
      'Team Capacity Limits: Strict minimum of 2 and maximum of 4 registered builders per squad. All contributors must be listed on the official roster.',
      'Submission Standards: Each squad must provide a public GitHub repository, a live working deployment/demo link, and a 2-minute pitch video with audio narration.',
      'Academic Integrity & Code of Conduct: Mutual respect, zero tolerance for harassment or plagiarism, and adherence to collegiate circuit guidelines are strictly enforced.'
    ],
    bounties: [
      { track: 'Autonomic Agents & LLM Swarms', prize: '₹15,000', sponsor: 'OpenAI Foundation' },
      { track: 'Verifiable Hardware Security', prize: '₹12,000', sponsor: 'Intel Labs' },
      { track: 'Decentralized Data Mesh', prize: '₹10,000', sponsor: 'Protocol Labs' },
      { track: 'Edge Healthcare Diagnostics', prize: '₹8,000', sponsor: 'Broad Institute' }
    ],
    schedule: [
      { phase: 'Team Applications Close', date: 'Oct 14, 11:59 PM PT', status: 'upcoming' },
      { phase: 'Acceptances & Squad Confirmation', date: 'Oct 18, 5:00 PM PT', status: 'upcoming' },
      { phase: 'Opening Ceremony & Hacking Begins', date: 'Oct 24, 6:00 PM ET', status: 'upcoming' },
      { phase: 'Project Expo & Live Demos', date: 'Oct 26, 12:00 PM ET', status: 'upcoming' },
      { phase: 'Grand Prize Awards Ceremony', date: 'Oct 26, 4:00 PM ET', status: 'upcoming' }
    ]
  },
  {
    id: 'treehacks-2026',
    circuitId: 'BC-CIRC-2026-02',
    title: 'Stanford TreeHacks 2026',
    subtitle: 'Stanford ACM & TreeHacks Organizing Board',
    organizer: {
      name: 'Stanford ACM & TreeHacks Board',
      website: 'https://treehacks.com',
      partnerType: 'Collegiate Host'
    },
    dates: 'Nov 14–16, 2026',
    startDate: 'Nov 14, 2026 · 5:00 PM PT',
    endDate: 'Nov 16, 2026 · 2:00 PM PT',
    location: 'Stanford University, Stanford, CA',
    mode: 'hybrid',
    prizePool: '₹30,000+ Prizes',
    squadLimits: '3 to 4 Builders',
    freeEntry: true,
    registrationFee: '100% Free',
    status: 'open',
    statusLabel: 'Registration open',
    registrationDeadline: 'Nov 01, 2026 at 11:59 PM PT',
    isFeatured: false,
    isVerified: true,
    tier: 'Tier-1 Global Sanctioned',
    registeredTeams: 320,
    maxCap: 450,
    tracks: ['ai', 'healthtech', 'climate'],
    trackLabels: ['Frontier AI', 'Health & Bio', 'Civic Tech', 'Hardware Lab'],
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOiGrwOIFIYq7j2gSwuRQE4AyyqIM3qvFGmQZIAqK9KBLYrF917kTJTPCVLikb83bqBM3AipMVnXjC2Wpal1RveyUcrdcMG22bPZZ8TKzti5MGWnEmAPL8l93XhYZzzY56BOcV5IKYyLAJwmquyvQG87Aqmggo9T4d2r--ZodoybeZxomgaJC1bUlvQ-YFzqFQX-Gcy6jRsQsQhLmjY3yl6cA_43SIhdIcq6IajJOwchOYpF2ruRi7',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDX_mOFXLVvuCbf1oQQGndJsT954Hu501_6TXKcXha4PJEZCHX7aAeew7Ba3klJT6TZLJWHaXBRIlrGvwl4nkJEOkxRMe4ZACjZMBItltyN0Moo2jI2S-wQGguh_Fz7mz8SqaoPR3vK8o3LyiRR6Lp9KnZRL7HZ11AzFuw67X1KJpSrmBPsQK8M6r2F643jQA5Mm3d6T9-W74OdrVDI5a_eZ9l8DmNPlqfwk7IHGUTlbGrP90R1nFJU',
    seekersCount: 38,
    description: 'Stanford University’s premier hackathon bringing together students from around the world to build systems that tackle humanity’s toughest challenges in health, climate, and intelligence.',
    eligibility: 'Open to all current university students (undergrad, grad, PhD) across accredited institutions worldwide.',
    teamRequirements: 'Squads must consist of 3 to 4 registered hackers. Solos can form teams on Friday evening at the Stanford Maker Lounge.',
    officialRegistrationLink: 'https://treehacks.com/apply',
    lastVerified: {
      verifiedAt: 'Sep 21, 2026, 11:15 PT',
      verifier: 'Stanford ACM Verification Officer',
      circuitSanction: 'BC-CIRC-2026-02',
      notes: 'Official TreeHacks 2026 sponsorship track and hardware kits approved.'
    },
    rules: [
      'Original Creation: All projects must be started from scratch during the hackathon. Using pre-existing code beyond open libraries will lead to disqualification.',
      'Full IP Retention: All code and intellectual property created remains 100% owned by the squad members.',
      'Team Constraints: Teams must adhere to 3-4 active builders. No solo project submissions for track judging.',
      'Transparent Verification: Judging requires showing git commit history and live demo execution before mentors and venture judges.',
      'Inclusive Community: Stanford code of conduct applies in-person and in the Discord workspaces.'
    ],
    bounties: [
      { track: 'Grand Prize Winner', prize: '₹10,000', sponsor: 'TreeHacks Fund' },
      { track: 'Best Climate & Sustainability System', prize: '₹8,000', sponsor: 'Doerr School' },
      { track: 'Biomedical Innovation Bounty', prize: '₹7,000', sponsor: 'Stanford Bio-X' },
      { track: 'Frontier AI Agent Architect', prize: '₹5,000', sponsor: 'Anthropic' }
    ],
    schedule: [
      { phase: 'Priority Admissions Deadline', date: 'Oct 28, 2026', status: 'upcoming' },
      { phase: 'Final Squad Confirmation', date: 'Nov 07, 2026', status: 'upcoming' },
      { phase: 'Check-in & Hackathon Kickoff', date: 'Nov 14, 5:00 PM PT', status: 'upcoming' },
      { phase: 'Project Expo & Judging', date: 'Nov 16, 1:00 PM PT', status: 'upcoming' }
    ],
    seekerAvatars: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCirG--i4oV_UcIgbN-oAICBrqo3JmwNzCYjG3hmc01buB8LVzvSBVNZO5jsmoBE1_tu-iY1GNLoFhiRwsIPWtehaTsR3cbek5Ma2zIXKmiW4oauEjY_vmGAs2m6RfkBY-Xx1cMkX_y-tGOJz94deuFqcKrnIoaEuCwyOg8m_XmjkDBP06_zLix4og7Z69QT-TjNLZplZ0gumu6KcTYx8jVqsFWt01EXQC-Sp_NKxNmg-5u1oTXkggg',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBIUDlb_eJeqJf_ER_NQsFjlW6ppZ8CpxQ3AE7AU0B_ETT1zxECjI522nhhaXf9FGczCf3JCXe0Yr46rpYKvI-hOk6tDuivz1Avbunnrofbr_e6MxqvoCsbHQYxfTUkroSXNEGG_Kp55rpsSHQB5Rvmo3T5YbC25mkMdmYghZo1A8bcWbfTkdc_4Nw4hDvWihqXNjnRCrLEURSG6U0uy__r6auSEzcvxxALuEKqRHnHGOzC-tJa4vTH',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCTCIA058u-LtW_Giqqh9Qz4t3mFq1NZOmZDW583_ebTio5lo5QHwsD2q3PJS64QaillpBbUj5P_K_q0DdDeUUCKYji8gKWUpCLVTn4dq_JUyiAPi0Hfzw1I0MIx7Lkp56fY6uHfyifJ88tynSLtQaW4tuBAseLZsgM_w71aR3RGEfM0geH5fQoPEqe2b3iYvmB5g6zdmMfhjitagHjHjmt2no5-7wTogOa3YrWvhaC6dr1N8m46l-X'
    ]
  },
  {
    id: 'calhacks-12',
    circuitId: 'BC-CIRC-2026-03',
    title: 'CalHacks 12.0',
    subtitle: 'UC Berkeley Engineering Alliance',
    organizer: {
      name: 'UC Berkeley Engineering Alliance',
      website: 'https://calhacks.io',
      partnerType: 'Collegiate Host'
    },
    dates: 'Dec 05–07, 2026',
    startDate: 'Dec 05, 2026 · 4:00 PM PT',
    endDate: 'Dec 07, 2026 · 2:00 PM PT',
    location: 'Metreon, San Francisco, CA',
    mode: 'in-person',
    prizePool: '₹50,000+ Capital Pool',
    squadLimits: '2 to 4 Builders',
    freeEntry: true,
    registrationFee: '100% Free (Venue & Meals Provided)',
    status: 'team-full',
    statusLabel: 'Team full',
    registrationDeadline: 'Nov 18, 2026 (Max Capacity Reached)',
    isFeatured: false,
    isVerified: true,
    tier: 'Tier-1 Global Sanctioned',
    registeredTeams: 600,
    maxCap: 600,
    tracks: ['ai', 'web3'],
    trackLabels: ['Open Web', 'Foundation Models', 'Autonomous Systems'],
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFEyEOOQXj9CwklVF6bBrUA92fv6FN3WR154qabpGHQiBNSMrmqmonmpEiBM9VwTTcvc8to1_-Q_m48AyfMnBkWdCpVO5lz9FC8AIvpIQFb06P4NpUOFCHTR7oakGTYJHfdlWnyX7rvJCcnDpKWvMDGZUKZBlwMOAykYjSuw0KYkvj48dP7wTQu2XFbrH_ORQGegZCjnMhlKuh4nHjKXSgEdNyPzsTSc6mOepH58l3PGc8_3fS_ceB',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDX_mOFXLVvuCbf1oQQGndJsT954Hu501_6TXKcXha4PJEZCHX7aAeew7Ba3klJT6TZLJWHaXBRIlrGvwl4nkJEOkxRMe4ZACjZMBItltyN0Moo2jI2S-wQGguh_Fz7mz8SqaoPR3vK8o3LyiRR6Lp9KnZRL7HZ11AzFuw67X1KJpSrmBPsQK8M6r2F643jQA5Mm3d6T9-W74OdrVDI5a_eZ9l8DmNPlqfwk7IHGUTlbGrP90R1nFJU',
    seekersCount: 51,
    description: 'The world’s largest collegiate hackathon hosted by UC Berkeley students in the heart of downtown San Francisco. 36 hours of relentless creation alongside Silicon Valley venture funds.',
    eligibility: 'Open to college students from all universities. In-person capacity capped at 2,400 students across 600 squads. Registration is currently at capacity; waitlist applications active.',
    teamRequirements: 'Squads must have 2 to 4 members. Registered squads with vacant seats may recruit verified replacement builders via BuildCrew until Dec 1.',
    officialRegistrationLink: 'https://calhacks.io/waitlist',
    lastVerified: {
      verifiedAt: 'Sep 23, 2026, 09:00 PT',
      verifier: 'UC Berkeley Engineering Board',
      circuitSanction: 'BC-CIRC-2026-03',
      notes: 'Capacity threshold reached (600/600 squads). Waitlist and seat transfers monitored.'
    },
    rules: [
      'Original Sprint Work: Projects must be developed during the hackathon timeframe. No pre-built codebases permitted.',
      'Intellectual Property: Developers retain all rights to their code and prototypes.',
      'Team Boundaries: Teams of 2-4 builders. No outside developer assistance allowed.',
      'Demonstration Obligation: Live presentation in front of judges is mandatory for venture prize consideration.',
      'Venue Guidelines: In-person check-in requires photo ID and signed student waiver.'
    ],
    bounties: [
      { track: 'Grand Prize Venture Investment', prize: '₹25,000 Check', sponsor: 'Berkeley SkyDeck' },
      { track: 'Autonomous Agent Benchmark Prize', prize: '₹15,000', sponsor: 'Scale AI' },
      { track: 'Decentralized Compute Award', prize: '₹10,000', sponsor: 'Solana Ventures' }
    ],
    schedule: [
      { phase: 'Applications Close (Max Capacity)', date: 'Nov 18, 2026', status: 'upcoming' },
      { phase: 'Hacker Welcome & Team Check-in', date: 'Dec 05, 4:00 PM PT', status: 'upcoming' },
      { phase: 'Midnight Tech Talks & Mentorship', date: 'Dec 06, 12:00 AM PT', status: 'upcoming' },
      { phase: 'Demo Day & Investor Judging', date: 'Dec 07, 2:00 PM PT', status: 'upcoming' }
    ],
    seekerAvatars: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAPypdllsjXA2SDKEUO6iV9jbI3v9sf1sJ8ACrhCFvaT0BaPrA516WVQSIK8RL0Ep85ub5Sxeb1Pivav0rlRUQbEEpC9uK7z-LQLfQDyYeco7iFckrp0L83mzDq-uPbqGjShut168HkT22VfTCr1fWKZNjTrW83YhSefWPh7AAaetX5N54hVRRPuj47LI49uQCZlzJK0TAIy3hW7wwKdRjhyCi4NfpydAYy1ql96PKUrqBKoJlk-PGC',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCxgKC2pBGNF02cPVF1DzTEMnFnFBuSkDHI38fJZEcTa4qzwO4sEQPnhjbQfulWro34dv45CoSSYIEx6m5yyMdQnxWZ1zlQKOdWWw5Z2e_s-sPKIWj6mqHxHIczxxjYRsvWno6_yK_v7-FEcw53xuDteAV_thuupSXOuJxJQUvQWaeYU1mWo_G4M2a_l7brD8npuyJHaCTE4yu_zeAwoq1blJ9WoTwyBrPkMzY7jzj6EljjrXl_dl4c'
    ]
  },
  {
    id: 'pennapps-xxvii',
    circuitId: 'BC-CIRC-2027-04',
    title: 'PennApps XXVII',
    subtitle: 'University of Pennsylvania',
    organizer: {
      name: 'University of Pennsylvania',
      website: 'https://pennapps.com',
      partnerType: 'Collegiate Host'
    },
    dates: 'Jan 16–18, 2027',
    startDate: 'Jan 16, 2027 · 6:00 PM ET',
    endDate: 'Jan 18, 2027 · 3:00 PM ET',
    location: 'Engineering Quad, Philadelphia, PA',
    mode: 'in-person',
    prizePool: '₹40,000+ Hardware & Grants',
    squadLimits: '1 to 4 Builders',
    freeEntry: true,
    registrationFee: '100% Free (Hardware Kits Provided)',
    status: 'upcoming',
    statusLabel: 'Upcoming',
    registrationDeadline: 'Dec 15, 2026 (Opens Dec 01)',
    isFeatured: false,
    isVerified: true,
    tier: 'Tier-1 Global Sanctioned',
    registeredTeams: 190,
    maxCap: 500,
    tracks: ['fintech', 'healthtech'],
    trackLabels: ['Embedded Systems', 'FinTech & Payments', 'Health Diagnostics'],
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDJzq8Xfkz-MOzw6DBSGSlNaKyW0Qh9bQlJJYZUS7gB54-SyEy1ZIZQfRfXiV4GnypO_Ewg2sl9PRh-yNWwoYB7jC7JcRaPkOEFeTYZroe7ne7Br_b3GV5JbuNMsjz6qXSAAeuwDK7WtUG-eWev8uDCjwApB-I9W3UegEmUU6zseJ-wVZMOHChfO3S_3n6cqZX8gluTB9RYHrMBoHDnr9M9xxiPFhblrol0NBH-go7lOarNwILb28W',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDX_mOFXLVvuCbf1oQQGndJsT954Hu501_6TXKcXha4PJEZCHX7aAeew7Ba3klJT6TZLJWHaXBRIlrGvwl4nkJEOkxRMe4ZACjZMBItltyN0Moo2jI2S-wQGguh_Fz7mz8SqaoPR3vK8o3LyiRR6Lp9KnZRL7HZ11AzFuw67X1KJpSrmBPsQK8M6r2F643jQA5Mm3d6T9-W74OdrVDI5a_eZ9l8DmNPlqfwk7IHGUTlbGrP90R1nFJU',
    seekersCount: 24,
    description: 'The nation’s first student-run collegiate hackathon. Featuring hardware labs, real-time clinical diagnostics mentorship, and specialized FinTech bounties.',
    eligibility: 'All collegiate engineering and design students eligible. Hardware component loaners provided on-site with student ID.',
    teamRequirements: '1 to 4 builders. Solo hackers permitted in hardware track with designated safety mentor.',
    officialRegistrationLink: 'https://pennapps.com/register',
    lastVerified: {
      verifiedAt: 'Sep 20, 2026, 16:45 ET',
      verifier: 'UPenn ACM Sanctioning Committee',
      circuitSanction: 'BC-CIRC-2027-04',
      notes: 'Sanction renewal complete for Season 2027. Hardware lab sponsorship locked.'
    },
    rules: [
      'Original Design & Build: Both hardware circuitry and software logic must be prototyped on-site during the sprint.',
      '100% IP Ownership: Squads retain all proprietary ownership and commercialization rights.',
      'Hardware Safety: All custom electronic rigs must pass initial mentor inspection prior to AC power connection.',
      'Submission: Working demo video and public repository required.',
      'Code of Conduct: Collegiate circuit community code strictly in effect.',
    ],
    bounties: [
      { track: 'Hardware Lab Grand Prize', prize: '₹12,000', sponsor: 'Penn Engineering' },
      { track: 'Next-Gen Payment Infrastructure', prize: '₹10,000', sponsor: 'Stripe' },
      { track: 'Clinical Care Diagnostics', prize: '₹8,000', sponsor: 'Penn Medicine' }
    ],
    schedule: [
      { phase: 'Applications Open', date: 'Dec 01, 2026', status: 'upcoming' },
      { phase: 'Admissions Decision Waves', date: 'Dec 22, 2026', status: 'upcoming' },
      { phase: 'Hardware Lab Check-in', date: 'Jan 16, 6:00 PM ET', status: 'upcoming' }
    ],
    seekerAvatars: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCBnDqHq7n8m_K6j4eGKbfcjul0Rdr1QG5Ai8saCMYCXkObI8mE9oih96TixdnmcMXtFEQlqlJewoM56m3xVQh80IrQnjI75C0okcQgPtX5VRLyQyG1xncpm5xM1SIeGzIhdLzcGFIWr8ybJVxQlX3eAktW5BI5tcsgx9mTd85e_M5KIx3k4DKPbO4vVPaoJaaSIwqtLbYIOZafGhQxDeE9kN9GO3OSsDJWyLRvcTHafkjcPmV0Rs2I',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCqeSGW7ZHBh6T-I-RKuu_cHLduY7JDkqSkw4YS8aOCLjgWK83zNBiimf5wAiIWudgwRyolqK7NvqM04shOwQFFcKe2wNHcEpGMlY2yZmfK3oTBaiIBmEffziOYRJyZsyBJvldr765bNXAmXvtDOhjzujDkO_1EN9Eymc6FsU6z42DGK5D_24_75narmil7zM5kGoRmhJQoVUaxzEQ6voivP7LuOiWXoR8Byp9EmQtmEfXfchU5BPaW'
    ]
  },
  {
    id: 'ethglobal-sf-2026',
    circuitId: 'BC-CIRC-2026-05',
    title: 'ETHGlobal San Francisco',
    subtitle: 'ETHGlobal Collegiate Circuit',
    organizer: {
      name: 'ETHGlobal & Web3 Campus Alliance',
      website: 'https://ethglobal.com',
      partnerType: 'Ecosystem Partner'
    },
    dates: 'Nov 20–22, 2026',
    startDate: 'Nov 20, 2026 · 4:00 PM PT',
    endDate: 'Nov 22, 2026 · 3:00 PM PT',
    location: 'Palace of Fine Arts, San Francisco, CA',
    mode: 'in-person',
    prizePool: '₹125,000 Bounties',
    squadLimits: '1 to 5 Builders',
    freeEntry: true,
    registrationFee: '100% Free (Staking Stake Returned at Door)',
    status: 'open',
    statusLabel: 'Registration open',
    registrationDeadline: 'Nov 10, 2026 at 11:59 PM PT',
    isFeatured: false,
    isVerified: true,
    tier: 'Tier-1 Global Sanctioned',
    registeredTeams: 260,
    maxCap: 400,
    tracks: ['web3', 'fintech'],
    trackLabels: ['Zero-Knowledge Circuits', 'On-chain AI Agents', 'DeFi Protocols'],
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFEyEOOQXj9CwklVF6bBrUA92fv6FN3WR154qabpGHQiBNSMrmqmonmpEiBM9VwTTcvc8to1_-Q_m48AyfMnBkWdCpVO5lz9FC8AIvpIQFb06P4NpUOFCHTR7oakGTYJHfdlWnyX7rvJCcnDpKWvMDGZUKZBlwMOAykYjSuw0KYkvj48dP7wTQu2XFbrH_ORQGegZCjnMhlKuh4nHjKXSgEdNyPzsTSc6mOepH58l3PGc8_3fS_ceB',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDX_mOFXLVvuCbf1oQQGndJsT954Hu501_6TXKcXha4PJEZCHX7aAeew7Ba3klJT6TZLJWHaXBRIlrGvwl4nkJEOkxRMe4ZACjZMBItltyN0Moo2jI2S-wQGguh_Fz7mz8SqaoPR3vK8o3LyiRR6Lp9KnZRL7HZ11AzFuw67X1KJpSrmBPsQK8M6r2F643jQA5Mm3d6T9-W74OdrVDI5a_eZ9l8DmNPlqfwk7IHGUTlbGrP90R1nFJU',
    seekersCount: 29,
    description: 'Premier hackathon dedicated to decentralized protocols, smart contract execution, and autonomous on-chain agents. Connect with leading protocol engineers and founders.',
    eligibility: 'Open to enrolled collegiate developers and student founders. Staking deposit refunded in full upon on-site badge scan.',
    teamRequirements: 'Teams of 1 to 5 members. Multi-disciplinary builder groups (contracts, UX, distributed nodes) encouraged.',
    officialRegistrationLink: 'https://ethglobal.com/events/sanfrancisco2026',
    lastVerified: {
      verifiedAt: 'Sep 22, 2026, 18:00 PT',
      verifier: 'Web3 Campus Collegiate Alliance',
      circuitSanction: 'BC-CIRC-2026-05',
      notes: 'Prize smart contracts deployed on Sepolia for automated audit.'
    },
    rules: [
      'Fresh Contract Deployment: Smart contracts submitted for prize evaluation must be deployed to testnet or mainnet during the hacking window.',
      'Open Source Requirement: Repositories must be public and licensed under open source (MIT/Apache 2.0).',
      'Team Allocation: 1-5 builders per registered project.',
      'Live Demonstration: Working frontends interacting with verified smart contracts.',
      'Security Standards: Malicious code or testnet exploits will result in immediate disqualification and circuit banning.'
    ],
    bounties: [
      { track: 'Best Autonomous AI On-Chain Agent', prize: '₹20,000', sponsor: 'Base & Coinbase' },
      { track: 'Privacy & ZK Circuits', prize: '₹15,000', sponsor: 'Aztec Network' },
      { track: 'Decentralized Finance Innovations', prize: '₹15,000', sponsor: 'Uniswap Labs' }
    ],
    schedule: [
      { phase: 'Registration Deadline', date: 'Nov 10, 2026', status: 'upcoming' },
      { phase: 'Hacker Staking & Opening', date: 'Nov 20, 4:00 PM PT', status: 'upcoming' },
      { phase: 'Final Project Pitches', date: 'Nov 22, 1:00 PM PT', status: 'upcoming' }
    ],
    seekerAvatars: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBirUkNQSo04g_tpOZ4BCEqxhIS1X_JeuPCz7HOuaAg-iBZjD079_5Kw5JH_beVshiDR-hGgf25xxHWHIOiujBaIs-w4YI0ynogQcCH-ChPBSE6SQTry_Dqz24c73Jk7DeMfwiJy0dTYKPf4u-A8WVNw1oUjo6ssG1p_WKvOPmg1OVEotk4p7HgClGq2FLb6UoHwks2MTWuddYD2hBI5uOVcjsqA5gleuV5YGmocfJVn1MpOeHrvsPd',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAoHUlbt9Z2sZE1mNrCaUHyErYt_nL322OdfYzB0hiI8-AOawIa2sqnJLQQD_sqL1U8SCgXiSI4sVALubBquMriTb43OtSTlUGC2BIFYgwC15LG292xTlpOxUbyMjR5mQVp4WFHcI8pfDdWEpA52lCwe4_1hcLlPIBRRROOP4PbmUC_6HmuPfflnSYm1xbSIWGAoZ8_zhnZU_kZ_cIMOEzm2vVAkdt-rO7wnmRB7jNUyhuN6y36YZOH'
    ]
  },
  {
    id: 'hackmit-2026',
    circuitId: 'BC-CIRC-2026-ARCH',
    title: 'HackMIT 2026',
    subtitle: 'MIT Tech Club',
    organizer: {
      name: 'MIT Tech Club',
      website: 'https://hackmit.org',
      partnerType: 'Collegiate Host'
    },
    dates: 'Sep 19–21, 2026',
    startDate: 'Sep 19, 2026 · 5:00 PM ET',
    endDate: 'Sep 21, 2026 · 2:00 PM ET',
    location: 'MIT Campus, Cambridge, MA',
    mode: 'in-person',
    prizePool: '₹35,000 Awarded',
    squadLimits: '2 to 4 Builders',
    freeEntry: true,
    registrationFee: '100% Free',
    status: 'closed',
    statusLabel: 'Registration closed',
    registrationDeadline: 'Sep 10, 2026 (Event Concluded)',
    isFeatured: false,
    isVerified: true,
    tier: 'Tier-1 Global Sanctioned',
    registeredTeams: 500,
    maxCap: 500,
    tracks: ['ai', 'climate'],
    trackLabels: ['Frontier AI', 'Robotics', 'Climate Models'],
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBA_EZF8FakmJ9gNE8Qb-O6hhCLOQvPHlf5p5jpmVZuF3QjfcOhr3pB4eN0g3KQev_luZCzYShKt221pvgDKZsB0E5LgqAoq8ncczUwUGGWJr2ZuK8BpiejOTLZSdgrSZGIIUJllj3mXWh7zpeW5AGOa5TRJe4aoZOerdz_y0LM-UWOf--D_QHyOBjLuTtijx9aV3mU2Yjd0kRGKjhPQ-iLBJ62_yn63lT7wAWPLt7P4ceD1tP5UFDz',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDX_mOFXLVvuCbf1oQQGndJsT954Hu501_6TXKcXha4PJEZCHX7aAeew7Ba3klJT6TZLJWHaXBRIlrGvwl4nkJEOkxRMe4ZACjZMBItltyN0Moo2jI2S-wQGguh_Fz7mz8SqaoPR3vK8o3LyiRR6Lp9KnZRL7HZ11AzFuw67X1KJpSrmBPsQK8M6r2F643jQA5Mm3d6T9-W74OdrVDI5a_eZ9l8DmNPlqfwk7IHGUTlbGrP90R1nFJU',
    podiumBadge: '3 BuildCrew Podium Teams',
    archiveHighlight: 'First place won by BuildCrew squad "NeuroMesh" (₹15,000 grant)',
    description: 'MIT’s premier collegiate hackathon. Over 1,000 hackers convened to prototype software and hardware solutions over 24 continuous hacking hours.',
    eligibility: 'Event concluded. Archived for collegiate podium rankings and verified squad portfolio credentials.',
    teamRequirements: 'Squads had 2 to 4 members. Official winners registered in circuit record books.',
    officialRegistrationLink: 'https://hackmit.org/archive/2026',
    lastVerified: {
      verifiedAt: 'Sep 21, 2026, 20:00 ET',
      verifier: 'MIT Tech Club Organizing Board',
      circuitSanction: 'BC-CIRC-2026-ARCH',
      notes: 'Final winners and code repositories audited and archived in BuildCrew Hall of Fame.'
    },
    rules: [
      'Official competition concluded and archived.',
      'Podium code repositories audited for open integrity.',
      'Grants disbursed via escrow to winning student teams.'
    ],
    bounties: [
      { track: 'Grand Prize 1st Place', prize: '₹15,000', sponsor: 'BuildCrew & MIT Alliance' },
      { track: 'Best AI Inference Engine', prize: '₹10,000', sponsor: 'NVIDIA' },
      { track: 'Green Energy Optimizer', prize: '₹10,000', sponsor: 'Breakthrough Energy' }
    ],
    schedule: [
      { phase: 'Event Concluded & Judging Complete', date: 'Sep 21, 2026', status: 'completed' }
    ]
  }
].map(h => ({ isPublished: true, ...h }));

const initialSquadWins = [
  {
    rank: '1st',
    team: 'NeuroMesh',
    event: 'HackMIT 2026 · Frontier AI Track',
    amount: '₹15,000'
  },
  {
    rank: '1st',
    team: 'ZeroGuard',
    event: 'CalHacks 11 · Security Grand Prize',
    amount: '₹20,000'
  },
  {
    rank: '2nd',
    team: 'BioPulse AI',
    event: 'TreeHacks 2025 · Health Track',
    amount: '₹10,000'
  }
];

const initialBuilders = [
  {
    id: 'b1',
    name: 'Maya Chen',
    university: 'Stanford University',
    year: 'CS & SymSys \'26',
    role: 'Backend & ML Infra',
    skills: ['FastAPI', 'LangChain', 'MongoDB', 'Celery', 'Python'],
    lookingFor: 'TreeHacks \'26 / HackNova squad',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDj8rfKgKGYJOxl-peX0YLvOw6ySeIhn0XjE0cX3j7Pea0oBM1HHLCSYm-k4lm5vWUqCF1VtVwXY0QESMoDaSSF9tk9aQWB0T3D2BZDM6Ezy_23eymF3i6G6fes0oJ3aEM1-5XWifWl_PNo-39urmN5Q8g2NLDqQ2Lv6TE46GTEVc1EzdkGgpKT8Lge4aiJw7Uny0uDg47QiOKXP2wcPXRP3iufmQ9sldhgwMnZhOUilqmfFcPuoxbX',
    match: '98% Match'
  },
  {
    id: 'b2',
    name: 'Rahul Sharma',
    university: 'Carnegie Mellon University',
    year: 'ECE \'26',
    role: 'IoT & Real-time Systems',
    skills: ['C++', 'React Native', 'Embedded', 'Mapbox', 'MQTT'],
    lookingFor: 'Smart City & Micromobility hackathon team',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnmEZNtZGZBJt86mDapjBMA0jOqw7hClt5LtW8N3lZ1PQ1ZC9mxCwRPM0ZfJRe8FPjziwi8z-_eN14d36A7R-ixuMvlxN0uo5C1tIcO3PKyrDcVXCOAHrzgD10dDNX-1ahjrVulehRiTbJcd-o8XWvwMCQ-wXRLPvIzrI5cQ5jr2JctNHGF-GIFCXFEKkq3h6Ubriud652-Lvq5GUFgOVhef4OgN8z8bnkWKXgL3usgFpNzAG4LBHY',
    match: '94% Match'
  },
  {
    id: 'b3',
    name: 'Elena Rostova',
    university: 'MIT EECS',
    year: 'PhD Candidate',
    role: 'ZK Cryptography & Smart Contracts',
    skills: ['Circom', 'Solidity', 'Foundry', 'Next.js', 'Rust'],
    lookingFor: 'HackNova Web3 track co-builders',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBirUkNQSo04g_tpOZ4BCEqxhIS1X_JeuPCz7HOuaAg-iBZjD079_5Kw5JH_beVshiDR-hGgf25xxHWHIOiujBaIs-w4YI0ynogQcCH-ChPBSE6SQTry_Dqz24c73Jk7DeMfwiJy0dTYKPf4u-A8WVNw1oUjo6ssG1p_WKvOPmg1OVEotk4p7HgClGq2FLb6UoHwks2MTWuddYD2hBI5uOVcjsqA5gleuV5YGmocfJVn1MpOeHrvsPd',
    match: '91% Match'
  },
  {
    id: 'b4',
    name: 'Alex Zhang',
    university: 'University of Waterloo',
    year: 'SE \'26',
    role: 'Frontend & WebSockets Specialist',
    skills: ['React 19', 'WebSockets', 'WebRTC', 'TypeScript', 'Tailwind'],
    lookingFor: 'Real-time collaborative developer tool project',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoHUlbt9Z2sZE1mNrCaUHyErYt_nL322OdfYzB0hiI8-AOawIa2sqnJLQQD_sqL1U8SCgXiSI4sVALubBquMriTb43OtSTlUGC2BIFYgwC15LG292xTlpOxUbyMjR5mQVp4WFHcI8pfDdWEpA52lCwe4_1hcLlPIBRRROOP4PbmUC_6HmuPfflnSYm1xbSIWGAoZ8_zhnZU_kZ_cIMOEzm2vVAkdt-rO7wnmRB7jNUyhuN6y36YZOH',
    match: '96% Match'
  },
  {
    id: 'b5',
    name: 'Sarah Jenkins',
    university: 'Georgia Tech',
    year: 'EnvEng & CS \'26',
    role: 'Hardware & Sensor Analytics',
    skills: ['ESP32', 'Python', 'FastAPI', 'TimescaleDB', 'Fusion360'],
    lookingFor: 'CleanTech & Energy hackathon team',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQ4L7we6LwbEsUj0RFqsg_rHzUjOuupTLlSo7mO7Spl-y4GdefKVfGecoaKgcF0XJ1VvW2j45ctDUZ4nxXbPfiJJNw2MKtCGo_xrr7hn7AOUc3pwPcQQ9uK4oE0mGO8B9rNXJKD3s9DSXWfXNllo9tyj-c7PYNiG7UJXRc2V8LVJhPAxT9LHLBLOqOGmkOAPdjqZt_WY66eWyYy_R9PMmoU7Jw-0bJD9sgc_70JjzrkZygUQ_mUfLB',
    match: '88% Match'
  }
];

const initialApplications = [
  {
    id: 'app-1',
    projectId: 'studysync-ai',
    projectTitle: 'StudySync AI',
    role: 'Frontend & Interactive Canvas Engineer',
    submittedAt: 'Just now',
    status: 'Pending Lead Review',
    statusColor: 'bg-secondary-fixed text-on-secondary-fixed',
    note: 'Application received by Maya Chen. Response expected within 24 hours.'
  },
  {
    id: 'app-0',
    projectId: 'campus-flow',
    projectTitle: 'Campus Flow',
    role: 'UI/UX Product Designer',
    submittedAt: 'Yesterday',
    status: 'Interview Scheduled',
    statusColor: 'bg-surface-container-highest text-secondary',
    note: 'Rahul sent you a Discord invite for a 15-min sprint alignment call.'
  }
];

const mockAccounts = [
  {
    id: 'admin-founder-1',
    email: 'jayanth@buildcrew.com',
    password: 'buildcrew123',
    name: 'Jayanth V.',
    role: 'admin',
    title: 'Founder & Lead Architect',
    organization: 'BuildCrew Core Team',
    university: 'Stanford University (Founder)',
    avatar: 'https://lh3.googleusercontent.com/aida/AEtjO1U9z5PpV3Oif5HhhByVbwFRYk7HWVBiaoD0VNB5HJ0qL8NTgyV9zdv3Z0kb1LWlSYbxqz2J0ARPqkm6aWj8V5UZtnnkauBTB6e-Pvqfvt90EnUwriRM5A97Q9V9iZdlRCjtwercmGE3G05yZRlXzzCm7g9O5kGcUVghkc3NcvdMvplHHEzkzeKbC2NS5k3KzdHOvmlEJGz_SqF5Q0Kz5kl0mRpG_0NW8L5Hs51VIWTludWsf0Raog0dXhpSS-eK4_xEupfb60OG'
  },
  {
    id: 'admin-founder-2',
    email: 'praveen@buildcrew.com',
    password: 'buildcrew123',
    name: 'Praveen K.',
    role: 'admin',
    title: 'Co-Founder & Operations Lead',
    organization: 'BuildCrew Core Team',
    university: 'Stanford University (Founder)',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCM4VJ_y3eQXx_ZHkdkypEkb7yiKToP7XJhWP_YDFlZfxGJ3MN3udbXoX2FRhx3dPmQ-yEZqmNebAKWJ2h-grRjGY_of0K2uTM7Rok4fj5vO6Wj8jTyql1s2JZDvTJ5Q-jxt9ivZlV-bmHx6XBuaV01dsed81fwl7nVCB0T-4u31a-tkPM2tapPgPF3vFcTY3wg4K8hcQrf0I7v4NTXkQxco37OGKfcQ9quJb_twlg0XiCwWPYsXe_'
  },
  {
    id: 'user-student-core',
    email: 'student@buildcrew.com',
    password: 'buildcrew123',
    name: 'Alex Rivera',
    role: 'student',
    university: 'Stanford University',
    major: 'Computer Science',
    gradYear: '2026',
    bio: 'Junior CS student passionate about collegiate hackathons and web development.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBirUkNQSo04g_tpOZ4BCEqxhIS1X_JeuPCz7HOuaAg-iBZjD079_5Kw5JH_beVshiDR-hGgf25xxHWHIOiujBaIs-w4YI0ynogQcCH-ChPBSE6SQTry_Dqz24c73Jk7DeMfwiJy0dTYKPf4u-A8WVNw1oUjo6ssG1p_WKvOPmg1OVEotk4p7HgClGq2FLb6UoHwks2MTWuddYD2hBI5uOVcjsqA5gleuV5YGmocfJVn1MpOeHrvsPd'
  },
  {
    id: 'admin-alias',
    email: 'admin@buildcrew.com',
    password: 'buildcrew123',
    name: 'BuildCrew Admin',
    role: 'admin',
    title: 'Founder & Admin',
    organization: 'BuildCrew',
    university: 'Stanford University',
    avatar: 'https://lh3.googleusercontent.com/aida/AEtjO1U9z5PpV3Oif5HhhByVbwFRYk7HWVBiaoD0VNB5HJ0qL8NTgyV9zdv3Z0kb1LWlSYbxqz2J0ARPqkm6aWj8V5UZtnnkauBTB6e-Pvqfvt90EnUwriRM5A97Q9V9iZdlRCjtwercmGE3G05yZRlXzzCm7g9O5kGcUVghkc3NcvdMvplHHEzkzeKbC2NS5k3KzdHOvmlEJGz_SqF5Q0Kz5kl0mRpG_0NW8L5Hs51VIWTludWsf0Raog0dXhpSS-eK4_xEupfb60OG'
  },
  {
    id: 'user-student-1',
    email: 'student@stanford.edu',
    password: 'buildcrew123',
    name: 'Alex Rivera',
    role: 'student',
    university: 'Stanford University',
    major: 'Computer Science',
    gradYear: '2026',
    bio: 'Junior CS student passionate about web applications and hackathon sprint teams.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBirUkNQSo04g_tpOZ4BCEqxhIS1X_JeuPCz7HOuaAg-iBZjD079_5Kw5JH_beVshiDR-hGgf25xxHWHIOiujBaIs-w4YI0ynogQcCH-ChPBSE6SQTry_Dqz24c73Jk7DeMfwiJy0dTYKPf4u-A8WVNw1oUjo6ssG1p_WKvOPmg1OVEotk4p7HgClGq2FLb6UoHwks2MTWuddYD2hBI5uOVcjsqA5gleuV5YGmocfJVn1MpOeHrvsPd'
  },
  {
    id: 'user-student-2',
    email: 'jayanth@stanford.edu',
    password: 'buildcrew123',
    name: 'Jayanth V.',
    role: 'student',
    university: 'Stanford University',
    major: 'Computer Science',
    gradYear: '2026',
    bio: 'Junior CS student specializing in distributed systems and real-time collaboration engines.',
    avatar: 'https://lh3.googleusercontent.com/aida/AEtjO1U9z5PpV3Oif5HhhByVbwFRYk7HWVBiaoD0VNB5HJ0qL8NTgyV9zdv3Z0kb1LWlSYbxqz2J0ARPqkm6aWj8V5UZtnnkauBTB6e-Pvqfvt90EnUwriRM5A97Q9V9iZdlRCjtwercmGE3G05yZRlXzzCm7g9O5kGcUVghkc3NcvdMvplHHEzkzeKbC2NS5k3KzdHOvmlEJGz_SqF5Q0Kz5kl0mRpG_0NW8L5Hs51VIWTludWsf0Raog0dXhpSS-eK4_xEupfb60OG'
  }
];

const initialHackathonSquads = [
  {
    id: 'squad-studysync',
    hackathonId: 'hacknova-2026',
    hackathonTitle: 'HACKNOVA 2026',
    title: 'StudySync AI',
    track: 'Autonomic Agents & LLM Swarms',
    tagline: 'Multi-modal seminar synthesis engine for HackNova 2026',
    description: 'We are engineering an asynchronous agent graph that ingests real-time seminar audio and slides into a collaborative vector canvas. Looking for a strong frontend canvas developer and a prompt evaluation engineer.',
    techStack: ['React 19', 'FastAPI', 'Fabric.js', 'Pinecone', 'WebSockets'],
    filledCount: 2,
    totalCapacity: 4,
    syncSchedule: 'Sunday 7:00 PM PT (Discord Stage)',
    lead: {
      name: 'Maya Chen',
      university: 'Stanford CS \'26',
      role: 'Lead Architect & ML Infra',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDj8rfKgKGYJOxl-peX0YLvOw6ySeIhn0XjE0cX3j7Pea0oBM1HHLCSYm-k4lm5vWUqCF1VtVwXY0QESMoDaSSF9tk9aQWB0T3D2BZDM6Ezy_23eymF3i6G6fes0oJ3aEM1-5XWifWl_PNo-39urmN5Q8g2NLDqQ2Lv6TE46GTEVc1EzdkGgpKT8Lge4aiJw7Uny0uDg47QiOKXP2wcPXRP3iufmQ9sldhgwMnZhOUilqmfFcPuoxbX'
    },
    members: [
      {
        name: 'Maya Chen',
        university: 'Stanford CS \'26',
        role: 'Lead Architect',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDj8rfKgKGYJOxl-peX0YLvOw6ySeIhn0XjE0cX3j7Pea0oBM1HHLCSYm-k4lm5vWUqCF1VtVwXY0QESMoDaSSF9tk9aQWB0T3D2BZDM6Ezy_23eymF3i6G6fes0oJ3aEM1-5XWifWl_PNo-39urmN5Q8g2NLDqQ2Lv6TE46GTEVc1EzdkGgpKT8Lge4aiJw7Uny0uDg47QiOKXP2wcPXRP3iufmQ9sldhgwMnZhOUilqmfFcPuoxbX'
      },
      {
        name: 'Alex Vance',
        university: 'Stanford CS \'25',
        role: 'Model Inference',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCM4VJ_y3eQXx_ZHkdkypEkb7yiKToP7XJhWP_YDFlZfxGJ3MN3udbXoX2FRhx3dPmQ-yEZqmNebAKWJ2h-grRjGY_of0K2uTM7Rok4fj5vO6Wj8jTyql1s2JZDvTJ5Q-jxt9ivZlV-bmHx6XBuaV01dsed81fwl7nVCB0T-4u31a-tkPM2tapPgPF3vFcTY3wg4K8hcQrf0I7v4NTXkQxco37OGKfcQ9quJb_twlg0XiCwWPYsXe_'
      }
    ],
    openVacancies: [
      {
        title: 'Frontend & Canvas Engineer',
        seats: '1 seat open',
        skills: ['React 19', 'Fabric.js', 'Tailwind', 'WebSockets'],
        hours: '10–12 hrs/week'
      },
      {
        title: 'Evaluation & Benchmarks Dev',
        seats: '1 seat open',
        skills: ['Python', 'RAG Eval', 'Prompt Optimization'],
        hours: '8–10 hrs/week'
      }
    ]
  },
  {
    id: 'squad-zeromesh',
    hackathonId: 'hacknova-2026',
    hackathonTitle: 'HACKNOVA 2026',
    title: 'ZeroMesh Verifier',
    track: 'Verifiable Hardware Security',
    tagline: 'Cryptographic proof layer for edge sensor telemetry',
    description: 'Designing zero-knowledge verification proofs for embedded IoT devices. Aiming for the ₹12,000 Intel Labs bounty at HackNova.',
    techStack: ['Circom', 'Rust', 'ESP32', 'Next.js'],
    filledCount: 3,
    totalCapacity: 4,
    syncSchedule: 'Tuesdays 8:00 PM ET',
    lead: {
      name: 'Elena Rostova',
      university: 'MIT EECS PhD',
      role: 'Cryptographic Systems Lead',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBirUkNQSo04g_tpOZ4BCEqxhIS1X_JeuPCz7HOuaAg-iBZjD079_5Kw5JH_beVshiDR-hGgf25xxHWHIOiujBaIs-w4YI0ynogQcCH-ChPBSE6SQTry_Dqz24c73Jk7DeMfwiJy0dTYKPf4u-A8WVNw1oUjo6ssG1p_WKvOPmg1OVEotk4p7HgClGq2FLb6UoHwks2MTWuddYD2hBI5uOVcjsqA5gleuV5YGmocfJVn1MpOeHrvsPd'
    },
    members: [
      {
        name: 'Elena Rostova',
        university: 'MIT EECS PhD',
        role: 'ZK Lead',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBirUkNQSo04g_tpOZ4BCEqxhIS1X_JeuPCz7HOuaAg-iBZjD079_5Kw5JH_beVshiDR-hGgf25xxHWHIOiujBaIs-w4YI0ynogQcCH-ChPBSE6SQTry_Dqz24c73Jk7DeMfwiJy0dTYKPf4u-A8WVNw1oUjo6ssG1p_WKvOPmg1OVEotk4p7HgClGq2FLb6UoHwks2MTWuddYD2hBI5uOVcjsqA5gleuV5YGmocfJVn1MpOeHrvsPd'
      },
      {
        name: 'Rahul Sharma',
        university: 'Carnegie Mellon ECE',
        role: 'Hardware Firmware',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnmEZNtZGZBJt86mDapjBMA0jOqw7hClt5LtW8N3lZ1PQ1ZC9mxCwRPM0ZfJRe8FPjziwi8z-_eN14d36A7R-ixuMvlxN0uo5C1tIcO3PKyrDcVXCOAHrzgD10dDNX-1ahjrVulehRiTbJcd-o8XWvwMCQ-wXRLPvIzrI5cQ5jr2JctNHGF-GIFCXFEKkq3h6Ubriud652-Lvq5GUFgOVhef4OgN8z8bnkWKXgL3usgFpNzAG4LBHY'
      },
      {
        name: 'David Kim',
        university: 'Harvard CS \'26',
        role: 'Verification Testing',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBnDqHq7n8m_K6j4eGKbfcjul0Rdr1QG5Ai8saCMYCXkObI8mE9oih96TixdnmcMXtFEQlqlJewoM56m3xVQh80IrQnjI75C0okcQgPtX5VRLyQyG1xncpm5xM1SIeGzIhdLzcGFIWr8ybJVxQlX3eAktW5BI5tcsgx9mTd85e_M5KIx3k4DKPbO4vVPaoJaaSIwqtLbYIOZafGhQxDeE9kN9GO3OSsDJWyLRvcTHafkjcPmV0Rs2I'
      }
    ],
    openVacancies: [
      {
        title: 'Fullstack Explorer Dev',
        seats: '1 seat open',
        skills: ['TypeScript', 'React', 'Tailwind', 'Ethers.js'],
        hours: '8 hrs/week'
      }
    ]
  },
  {
    id: 'squad-biopulse',
    hackathonId: 'treehacks-2026',
    hackathonTitle: 'Stanford TreeHacks 2026',
    title: 'BioPulse On-Device',
    track: 'Health & Bio Track',
    tagline: 'Edge acoustic biomarker detector for cardiovascular murmurs',
    description: 'Competing for the ₹7,000 Stanford Bio-X track at TreeHacks. Leveraging lightweight spectrogram CNNs running locally on mobile devices.',
    techStack: ['Flutter', 'TensorFlow Lite', 'FastAPI', 'Python'],
    filledCount: 2,
    totalCapacity: 4,
    syncSchedule: 'Thursdays 6:00 PM PT',
    lead: {
      name: 'Sarah Jenkins',
      university: 'Georgia Tech \'26',
      role: 'Sensor & Signal Lead',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQ4L7we6LwbEsUj0RFqsg_rHzUjOuupTLlSo7mO7Spl-y4GdefKVfGecoaKgcF0XJ1VvW2j45ctDUZ4nxXbPfiJJNw2MKtCGo_xrr7hn7AOUc3pwPcQQ9uK4oE0mGO8B9rNXJKD3s9DSXWfXNllo9tyj-c7PYNiG7UJXRc2V8LVJhPAxT9LHLBLOqOGmkOAPdjqZt_WY66eWyYy_R9PMmoU7Jw-0bJD9sgc_70JjzrkZygUQ_mUfLB'
    },
    members: [
      {
        name: 'Sarah Jenkins',
        university: 'Georgia Tech \'26',
        role: 'Sensor Lead',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQ4L7we6LwbEsUj0RFqsg_rHzUjOuupTLlSo7mO7Spl-y4GdefKVfGecoaKgcF0XJ1VvW2j45ctDUZ4nxXbPfiJJNw2MKtCGo_xrr7hn7AOUc3pwPcQQ9uK4oE0mGO8B9rNXJKD3s9DSXWfXNllo9tyj-c7PYNiG7UJXRc2V8LVJhPAxT9LHLBLOqOGmkOAPdjqZt_WY66eWyYy_R9PMmoU7Jw-0bJD9sgc_70JjzrkZygUQ_mUfLB'
      },
      {
        name: 'Michael Torres',
        university: 'Stanford BioE \'25',
        role: 'Clinical Data Validator',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPypdllsjXA2SDKEUO6iV9jbI3v9sf1sJ8ACrhCFvaT0BaPrA516WVQSIK8RL0Ep85ub5Sxeb1Pivav0rlRUQbEEpC9uK7z-LQLfQDyYeco7iFckrp0L83mzDq-uPbqGjShut168HkT22VfTCr1fWKZNjTrW83YhSefWPh7AAaetX5N54hVRRPuj47LI49uQCZlzJK0TAIy3hW7wwKdRjhyCi4NfpydAYy1ql96PKUrqBKoJlk-PGC'
      }
    ],
    openVacancies: [
      {
        title: 'Mobile App Developer',
        seats: '1 seat open',
        skills: ['React Native', 'Flutter', 'Audio API'],
        hours: '10 hrs/week'
      },
      {
        title: 'ML Audio Signal Specialist',
        seats: '1 seat open',
        skills: ['PyTorch', 'Spectrograms', 'ONNX'],
        hours: '10 hrs/week'
      }
    ]
  }
];


// =========================================================================
// 🚀 API Routes
// =========================================================================

// Root Route: Quick verification in browser (http://localhost:5000/)
app.get("/", (req, res) => {
    res.send("Backend is working");            // this is the api route We work on arrow function in backend
});

// Bootstrap Route: Delivers all initial datasets to frontend in one fast call
app.get("/api/bootstrap", (req, res) => {
    res.json({
        success: true,
        data: {
            projects: initialProjects,
            hackathons: initialHackathons,
            squadWins: initialSquadWins,
            builders: initialBuilders,
            applications: initialApplications,
            accounts: mockAccounts,
            hackathonSquads: initialHackathonSquads
        }
    });
});

// ---------------- PROJECTS API ----------------
app.get("/api/projects", (req, res) => {
    res.json(initialProjects);
});

app.post("/api/projects", (req, res) => {
    const newProject = req.body;
    if (!newProject.id) {
        newProject.id = 'proj-' + Date.now();
    }
    initialProjects.unshift(newProject);
    res.json({
        message: "Project added successfully",
        project: newProject
    });
});

app.delete("/api/projects/:id", (req, res) => {
    const projId = req.params.id;
    const projectIndex = initialProjects.findIndex(p => String(p.id) === String(projId));

    if (projectIndex === -1) {
        return res.status(404).json({ message: "Project not found" });
    }

    initialProjects.splice(projectIndex, 1);
    res.json({ message: "Project deleted successfully" });
});

app.put("/api/projects/:id", (req, res) => {
    const projId = req.params.id;
    const updatedProject = req.body;
    const projectIndex = initialProjects.findIndex(p => String(p.id) === String(projId));

    if (projectIndex === -1) {
        return res.status(404).json({ message: "Project not found" });
    }

    initialProjects[projectIndex] = {
        ...initialProjects[projectIndex],
        ...updatedProject
    };

    res.json({
        message: "Project updated successfully",
        project: initialProjects[projectIndex]
    });
});

// ---------------- HACKATHONS API ----------------
app.get("/api/hackathons", (req, res) => {
    res.json(initialHackathons);
});

app.post("/api/hackathons", (req, res) => {
    const newHackathon = req.body;
    if (!newHackathon.id) {
        newHackathon.id = 'hack-' + Date.now();
    }
    initialHackathons.unshift(newHackathon);
    res.json({
        message: "Hackathon added successfully",
        hackathon: newHackathon
    });
});

app.delete("/api/hackathons/:id", (req, res) => {
    const hackId = req.params.id;
    const hackIndex = initialHackathons.findIndex(h => String(h.id) === String(hackId));

    if (hackIndex === -1) {
        return res.status(404).json({ message: "Hackathon not found" });
    }

    initialHackathons.splice(hackIndex, 1);
    res.json({ message: "Hackathon deleted successfully" });
});

app.put("/api/hackathons/:id", (req, res) => {
    const hackId = req.params.id;
    const updatedHackathon = req.body;
    const hackIndex = initialHackathons.findIndex(h => String(h.id) === String(hackId));

    if (hackIndex === -1) {
        return res.status(404).json({ message: "Hackathon not found" });
    }

    initialHackathons[hackIndex] = {
        ...initialHackathons[hackIndex],
        ...updatedHackathon
    };

    res.json({
        message: "Hackathon updated successfully",
        hackathon: initialHackathons[hackIndex]
    });
});

// ---------------- BUILDERS TALENT API ----------------
app.get("/api/builders", (req, res) => {
    res.json(initialBuilders);
});

// ---------------- SQUAD WINS API ----------------
app.get("/api/squad-wins", (req, res) => {
    res.json(initialSquadWins);
});

// ---------------- APPLICATIONS API ----------------
app.get("/api/applications", (req, res) => {
    res.json(initialApplications);
});

app.post("/api/applications", (req, res) => {
    const newApp = req.body;
    if (!newApp.id) {
        newApp.id = 'app-' + Date.now();
    }
    initialApplications.unshift(newApp);
    res.json({
        message: "Application added successfully",
        application: newApp
    });
});

app.delete("/api/applications/:id", (req, res) => {
    const appId = req.params.id;
    const appIndex = initialApplications.findIndex(a => String(a.id) === String(appId));

    if (appIndex === -1) {
        return res.status(404).json({ message: "Application not found" });
    }

    initialApplications.splice(appIndex, 1);
    res.json({ message: "Application deleted successfully" });
});

// ---------------- ACCOUNTS & AUTH API ----------------
app.get("/api/accounts", (req, res) => {
    res.json(mockAccounts);
});

app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    const matched = mockAccounts.find(
        acc => acc.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (matched) {
        if (password.trim() === matched.password || password.trim() === 'buildcrew123' || password.trim() === 'password123') {
            return res.json({
                success: true,
                user: matched
            });
        } else {
            return res.status(401).json({ error: "Invalid password credentials" });
        }
    }

    if (email.includes('@')) {
        const customUser = {
            id: 'user-' + Date.now(),
            email: email.trim(),
            name: email.split('@')[0].replace('.', ' ').replace(/^./, str => str.toUpperCase()),
            role: 'student',
            university: 'Collegiate Member',
            major: 'Computer Science',
            gradYear: '2026',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBirUkNQSo04g_tpOZ4BCEqxhIS1X_JeuPCz7HOuaAg-iBZjD079_5Kw5JH_beVshiDR-hGgf25xxHWHIOiujBaIs-w4YI0ynogQcCH-ChPBSE6SQTry_Dqz24c73Jk7DeMfwiJy0dTYKPf4u-A8WVNw1oUjo6ssG1p_WKvOPmg1OVEotk4p7HgClGq2FLb6UoHwks2MTWuddYD2hBI5uOVcjsqA5gleuV5YGmocfJVn1MpOeHrvsPd'
        };
        mockAccounts.push(customUser);
        return res.json({
            success: true,
            user: customUser
        });
    }

    return res.status(400).json({ error: "Invalid email address" });
});

// ---------------- HACKATHON SQUADS API ----------------
app.get("/api/hackathon-squads", (req, res) => {
    res.json(initialHackathonSquads);
});

// =========================================================================
// 🚀 Server Listener
// =========================================================================
app.listen(5000, () => {
    console.log("server is running on port 5000"); // without these the server will not start 
});
