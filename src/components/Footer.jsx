import { FiArrowUp, FiArrowUpRight } from 'react-icons/fi'
import '../css/Footer.css'

const FOOTER_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Selected work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Credentials', href: '#credentials' },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <a className="site-footer__brand" href="#home" aria-label="Back to top">
            <img
              src="/assets/image/logonavbar.png"
              alt="Felix Natanael Butarbutar"
              width="1563"
              height="347"
            />
          </a>
          <p>Software engineer · Applied AI</p>
          <a className="site-footer__top-link" href="#home">
            Back to top <FiArrowUp aria-hidden="true" />
          </a>
        </div>

        <div className="site-footer__bottom">
          <nav aria-label="Footer navigation">
            {FOOTER_LINKS.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}
          </nav>
          <span>© {new Date().getFullYear()} Felix Natanael Butarbutar</span>
          <a href="https://github.com/felixnatanaelbutarbutar" target="_blank" rel="noreferrer">
            GitHub <FiArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
