import { FiArrowUpRight } from 'react-icons/fi'
import '../css/CertificateSection.css'

const TRAINING = [
  {
    title: 'AWS Machine Learning Specialty — Hands On!',
    issuer: 'Udemy',
    date: '2025',
    type: 'Training',
    href: '/assets/pdf/certificate_aws_felixnatanaelbutarbutar.pdf',
  },
  {
    title: 'Memulai Pemrograman Dengan C',
    issuer: 'Dicoding Indonesia',
    date: '2025',
    type: 'Course completion',
    href: '/assets/pdf/Dicoding Academy Certificate.pdf',
  },
]

export default function CertificateSection() {
  return (
    <section id="certificates" className="credentials-training section-wrap" aria-labelledby="training-heading">
      <div className="credentials-training__heading">
        <span className="section-label">Courses &amp; credentials</span>
        <h2 id="training-heading" className="section-heading">Formal learning,<br /><em>kept in practice.</em></h2>
      </div>

      <div className="training-list">
        {TRAINING.map((item, index) => (
          <article className="training-item" key={item.title}>
            <span className="training-item__index">0{index + 1}</span>
            <div className="training-item__main">
              <h3>{item.title}</h3>
              <p>{item.issuer} <span>·</span> {item.type}</p>
            </div>
            <span className="training-item__date">{item.date}</span>
            <a href={item.href} target="_blank" rel="noreferrer" aria-label={'View ' + item.title}>
              View proof <FiArrowUpRight aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
