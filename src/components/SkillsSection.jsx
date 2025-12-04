import React from "react";
import "../css/SkillsSection.css";
import {
  SiC,
  SiPhp,
  SiPython,
  SiGo,
  SiJavascript,
  SiTypescript,
  SiDart,
  SiLaravel,
  SiFastapi,
  SiReact,
  SiFlutter,
  SiFlask,
  SiNodedotjs,
  SiNextdotjs,
  SiStreamlit,
  SiSelenium,
  SiGithub,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiAmazon,
  SiGooglecloud,
  SiGit,
  SiFigma,
  SiTrello
} from "react-icons/si";
import { TbTestPipe, TbCloud } from "react-icons/tb";
import { FiTool, FiCode } from "react-icons/fi";

// === DATA: tetap kompatibel dengan string lama atau object { name, level? } ===
const SKILLS_DATA = [
  {
    id: "programming",
    title: "Programming Languages",
    icon: <SiJavascript />,
    tags: [
      "C",
      "C#",
      "PHP",
      "Java",
      "Python",
      "Golang",
      { name: "JavaScript", level: 85 },
      "TypeScript",
      "Dart"
    ]
  },
  {
    id: "frameworks",
    title: "Frameworks & Libraries",
    icon: <SiReact />,
    tags: [
      "Laravel",
      "FastAPI",
      "React.js",
      "Flutter",
      "Flask",
      "Node.js",
      "Next.js",
      "Streamlit"
    ]
  },
  {
    id: "testing",
    title: "Testing Tools",
    icon: <TbTestPipe />,
    tags: ["Manual Testing", "Selenium", "Katalon"]
  },
  {
    id: "database",
    title: "Database Management",
    icon: <SiMongodb />,
    tags: ["MySQL", "PostgreSQL", "MongoDB"]
  },
  {
    id: "cloud",
    title: "Cloud Services",
    icon: <TbCloud />,
    tags: ["Amazon Web Services", "Google Cloud"]
  },
  {
    id: "others",
    title: "Others",
    icon: <FiTool />,
    tags: [
      "Git",
      "GitHub",
      "Trello",
      "SDLC",
      "BPMN",
      "Bizagi",
      "Figma",
      "Balsamic",
      "CRISP-DM",
      "Business Model Canvas",
      "Market Analysis",
      "Stakeholder Analysis",
      "Creative Thinking",
      "Entrepreneurial Thinking"
    ]
  }
];

// === ICON MAP untuk tag spesifik (nama normalisasi ke lowercase tanpa spasi yang umum) ===
const ICON_MAP = {
  c: SiC,
  "c#": FiCode, // C# tidak ada icon spesifik, gunakan fallback
  "csharp": FiCode,
  php: SiPhp,
  java: FiCode, // Java tidak ada di react-icons/si, gunakan fallback
  python: SiPython,
  golang: SiGo,
  go: SiGo,
  javascript: SiJavascript,
  js: SiJavascript,
  typescript: SiTypescript,
  ts: SiTypescript,
  dart: SiDart,
  laravel: SiLaravel,
  fastapi: SiFastapi,
  react: SiReact,
  "react.js": SiReact,
  reactjs: SiReact,
  flutter: SiFlutter,
  flask: SiFlask,
  "node.js": SiNodedotjs,
  node: SiNodedotjs,
  nodejs: SiNodedotjs,
  nextjs: SiNextdotjs,
  "next.js": SiNextdotjs,
  streamlit: SiStreamlit,
  selenium: SiSelenium,
  github: SiGithub,
  git: SiGit,
  mysql: SiMysql,
  postgresql: SiPostgresql,
  postgres: SiPostgresql,
  mongodb: SiMongodb,
  mongo: SiMongodb,
  "amazon web services": SiAmazon,
  "amazonwebservices": SiAmazon,
  aws: SiAmazon,
  amazon: SiAmazon,
  "google cloud": SiGooglecloud,
  "googlecloud": SiGooglecloud,
  gcp: SiGooglecloud,
  figma: SiFigma,
  trello: SiTrello,
  // Fallback untuk yang tidak ada icon spesifik
  "manual testing": TbTestPipe,
  "manualtesting": TbTestPipe,
  katalon: TbTestPipe,
  sdlc: FiTool,
  bpmn: FiTool,
  bizagi: FiTool,
  balsamic: FiTool,
  "crisp-dm": FiTool,
  "crispdm": FiTool,
  "business model canvas": FiTool,
  "businessmodelcanvas": FiTool,
  "market analysis": FiTool,
  "marketanalysis": FiTool,
  "stakeholder analysis": FiTool,
  "stakeholderanalysis": FiTool,
  "creative thinking": FiTool,
  "creativethinking": FiTool,
  "entrepreneurial thinking": FiTool,
  "entrepreneurialthinking": FiTool
};

// helper: normalisasi nama tag
// function normalizeTagKey(name) {
//   return String(name).toLowerCase().replace(/\s+/g, "").replace(/[-_.]/g, "");
// }

function getIconForTag(name) {
  const key = String(name).toLowerCase().trim();
  // coba beberapa variasi
  const variants = [
    key, 
    key.replace(/\s+/g, ""), 
    key.replace(/\./g, ""), 
    key.replace(/\s+/g, "").replace(/[-_.]/g, "")
  ];
  
  for (const v of variants) {
    if (ICON_MAP[v]) return ICON_MAP[v];
  }
  return null;
}

export default function SkillsSection() {
  return (
    <section id="skills" className="skills-section" aria-label="Skills">
      <div className="skills-container">
        <h2 className="section-title">Skills</h2>
        <p className="section-sub">Toolbox lengkap dari low level sampai cloud & product thinking</p>

        {SKILLS_DATA.map((group) => (
          <article key={group.id} className="skill-panel" tabIndex={0} aria-labelledby={`skill-${group.id}-title`}>
            <div className="skill-header">
              <div className="skill-icon" aria-hidden="true">
                {group.icon || <FiTool />}
              </div>
              <div>
                <div id={`skill-${group.id}-title`} className="skill-title">{group.title}</div>
                <div className="skill-sub">{group.tags.length} items</div>
              </div>
            </div>

            <div className="skill-tags" aria-hidden={false}>
              {group.tags.map((raw) => {
                const tag =
                  typeof raw === "string" ? { name: raw } : { name: raw.name || raw.label, level: raw.level };
                const IconComponent = getIconForTag(tag.name);
                return (
                  <button
                    key={tag.name}
                    className="skill-tag"
                    title={tag.name}
                    aria-pressed="false"
                    onClick={() => {}}
                  >
                    {IconComponent ? (
                      <>
                        <span className="tag-icon" aria-hidden="true"><IconComponent /></span>
                        <span className="tag-text">{tag.name}</span>
                      </>
                    ) : (
                      <span className="tag-text">{tag.name}</span>
                    )}

                    {typeof tag.level === "number" ? (
                      <span className="tag-level" aria-hidden="true">
                        <span
                          className="tag-level-bar"
                          style={{ width: `${Math.max(6, Math.min(tag.level, 100))}%` }}
                        />
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}