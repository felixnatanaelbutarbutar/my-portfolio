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

const SKILLS_DATA = [
  {
    id: "programming",
    title: "Programming Languages",
    tags: ["C", "C#", "PHP", "Java", "Python", "Golang", "Javascript", "TypeScript", "Dart"]
  },
  {
    id: "frameworks",
    title: "Frameworks & Libraries",
    tags: ["Laravel", "FastAPI", "React.js", "Flutter", "Flask", "Node.js", "Next.js", "Streamlit"]
  },
  {
    id: "testing",
    title: "Testing Tools",
    tags: ["Manual Testing", "Selenium", "Katalon"]
  },
  {
    id: "database",
    title: "Database Management",
    tags: ["MySQL", "PostgreSQL", "MongoDB"]
  },
  {
    id: "cloud",
    title: "Cloud Services",
    tags: ["Amazon Web Services", "Google Cloud"]
  },
  {
    id: "others",
    title: "Others",
    tags: [
      "Git", "GitHub", "Trello", "SDLC", "BPMN", "Bizagi",
      "Figma", "Balsamic", "CRISP-DM", "Business Model Canvas",
      "Market Analysis", "Stakeholder Analysis",
      "Creative Thinking", "Entrepreneurial Thinking"
    ]
  }
];

const ICON_MAP = {
  c: SiC, "c#": FiCode, php: SiPhp, java: FiCode,
  python: SiPython, golang: SiGo, javascript: SiJavascript,
  typescript: SiTypescript, dart: SiDart, laravel: SiLaravel,
  fastapi: SiFastapi, "react.js": SiReact, flutter: SiFlutter,
  flask: SiFlask, "node.js": SiNodedotjs, "next.js": SiNextdotjs,
  streamlit: SiStreamlit, selenium: SiSelenium, github: SiGithub,
  git: SiGit, mysql: SiMysql, postgresql: SiPostgresql,
  mongodb: SiMongodb, "amazon web services": SiAmazon,
  "google cloud": SiGooglecloud, figma: SiFigma, trello: SiTrello,
  "manual testing": TbTestPipe, katalon: TbTestPipe,
};

function getIcon(name) {
  const key = name.toLowerCase().trim();
  return ICON_MAP[key] || null;
}

export default function SkillsSection() {
  return (
    <section id="skills" className="skills-section" aria-label="Skills">
      <div className="skills-container">
        <h2 className="skills-heading">Skills</h2>

        <div className="skills-grid">
          {SKILLS_DATA.map((group) => (
            <div key={group.id} className="skills-group">
              <h3 className="skills-group__title">{group.title}</h3>
              <div className="skills-group__tags">
                {group.tags.map((name) => {
                  const Icon = getIcon(name);
                  return (
                    <span key={name} className="skill-chip">
                      {Icon && <Icon className="skill-chip__icon" aria-hidden="true" />}
                      {name}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}