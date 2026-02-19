import React from "react";
import "../css/EducationSection.css";

const EDUCATION = [
  {
    id: "itdel",
    title: "Institut Teknologi Del",
    date: "Aug 2023 — Sep 2026 (Expected)",
    score: "IPK 3.35 / 4.00",
    location: "Laguboti, Toba, North Sumatra",
    degree: "Diploma — Information Technology",
    highlights: [
      "Focus: Software Development & System Design",
      "3rd Winner — Coding Day Competition 2025"
    ],
    logo: "/assets/image/logo1.jpg"
  },
  {
    id: "sma",
    title: "SMA Swasta Bintang Timur 1 Balige",
    date: "Jul 2020 — Apr 2023",
    score: null,
    location: "Balige, Toba, North Sumatra",
    degree: "Science Major",
    highlights: [
      "Focus: Mathematics & Natural Sciences"
    ],
    logo: "/assets/image/logo2.png"
  }
];

const EducationCard = ({ item }) => {
  return (
    <article className="edu-card" aria-labelledby={`${item.id}-title`}>
      <div className="edu-card__logo">
        <img src={item.logo} alt={item.title} />
      </div>

      <div className="edu-card__body">
        <div className="edu-card__header">
          <div>
            <h3 id={`${item.id}-title`} className="edu-card__title">{item.title}</h3>
            <p className="edu-card__degree">{item.degree}</p>
          </div>
          <span className="edu-card__date">{item.date}</span>
        </div>

        <p className="edu-card__location">{item.location}</p>

        {item.score && <span className="edu-card__score">{item.score}</span>}

        <ul className="edu-card__highlights">
          {item.highlights.map((text, i) => (
            <li key={i}>{text}</li>
          ))}
        </ul>
      </div>
    </article>
  );
};

const EducationSection = () => {
  return (
    <section id="education" className="section education-section" aria-labelledby="education-title">
      <div className="education-container">
        <h2 id="education-title" className="section-title">Education</h2>
        <div className="edu-list">
          {EDUCATION.map((item) => (
            <EducationCard item={item} key={item.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
