import '../css/AchievementSection.css'

const ACHIEVEMENTS = [
  {
    rank: 'Finalist',
    title: 'DEL AI Hackathon',
    scope: 'National competition · Institut Teknologi Del',
    year: '2026',
  },
  {
    rank: '3rd place',
    title: 'Coding Day Competition',
    scope: 'Faculty of Vocational Studies',
    year: '2025',
  },
]

export default function AchievementSection() {
  return (
    <section className="achievements section-wrap" aria-labelledby="achievements-heading">
      <div className="achievements__heading">
        <div>
          <span className="section-label">Recognition</span>
          <h2 id="achievements-heading" className="section-heading">Competitions &amp;<br /><em>distinctions.</em></h2>
        </div>
        <p>Recognition from technical and academic competitions.</p>
      </div>

      <div className="achievement-list">
        {ACHIEVEMENTS.map((item, index) => (
          <article className="achievement" key={item.title}>
            <span className="achievement__index">0{index + 1}</span>
            <span className="achievement__rank">{item.rank}</span>
            <div className="achievement__detail">
              <h3>{item.title}</h3>
              <p>{item.scope}</p>
            </div>
            <span className="achievement__year">{item.year}</span>
          </article>
        ))}
      </div>
    </section>
  )
}
