import '../css/EducationSection.css'

const EDUCATION = [
  {
    id: 'binus',
    title: 'BINUS University',
    degree: 'Bachelor of Computer Science',
    date: 'Sep 2026 — Sep 2028 · Expected',
    location: 'Jakarta, Indonesia',
    status: 'In progress',
  },
  {
    id: 'itdel',
    title: 'Del Institute of Technology',
    degree: 'Associate Degree in Information Technology',
    date: 'Sep 2023 — Aug 2026',
    location: 'Toba, North Sumatra',
    score: 'GPA 3.50 / 4.00',
    status: 'Graduated',
  },
  {
    id: 'bintang-timur',
    title: 'SMA Swasta Bintang Timur 1 Balige',
    degree: 'Science Major',
    date: 'Jul 2020 — Apr 2023',
    location: 'Balige, Toba, North Sumatra',
  },
]

export default function EducationSection() {
  return (
    <section className="education section-wrap" aria-labelledby="education-heading">
      <div className="education__heading">
        <span className="section-label">Education</span>
        <h2 id="education-heading" className="section-heading">Learning by<br /><em>building onward.</em></h2>
      </div>

      <div className="education-list">
        {EDUCATION.map((item, index) => (
          <article className="education-item" key={item.id}>
            <span className="education-item__index">0{index + 1}</span>
            <div className="education-item__main">
              <h3>{item.title}</h3>
              <p>{item.degree}</p>
            </div>
            <div className="education-item__meta">
              <span>{item.date}</span>
              <span>{item.location}</span>
            </div>
            <div className="education-item__result">
              {item.score && <strong>{item.score}</strong>}
              {item.status && <span>{item.status}</span>}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
