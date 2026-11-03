import { useEffect, useRef } from 'react'
import { FiArrowUpRight, FiMenu, FiX } from 'react-icons/fi'
import '../css/Navbar.css'

const NAV_LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Selected work', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Credentials', id: 'credentials' },
  { label: 'Contact', id: 'contact' },
]

export default function Navbar({ activeSection, isMenuOpen, setIsMenuOpen, scrollToSection }) {
  const menuButtonRef = useRef(null)
  const mobileMenuRef = useRef(null)

  useEffect(() => {
    if (!isMenuOpen) return undefined

    const menu = mobileMenuRef.current
    const firstLink = menu?.querySelector('a')
    firstLink?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
        return
      }

      if (event.key !== 'Tab' || !menu) return
      const focusable = [...menu.querySelectorAll('a, button')]
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen, setIsMenuOpen])

  const handleLink = (event, id) => {
    event.preventDefault()
    scrollToSection(id)
  }

  return (
    <>
      <header className="site-header">
        <nav className="nav-shell" aria-label="Main navigation">
          <a className="nav-brand" href="#home" onClick={(event) => handleLink(event, 'home')} aria-label="Felix Natanael Butarbutar, home">
            <img
              className="nav-brand__logo"
              src="/assets/image/logonavbar.png"
              alt="Felix Natanael Butarbutar"
              width="1563"
              height="347"
            />
          </a>

          <ul className="nav-links">
            {NAV_LINKS.map(({ label, id }) => (
              <li key={id}>
                <a
                  href={'#' + id}
                  className={'nav-link' + (activeSection === id ? ' is-active' : '')}
                  aria-current={activeSection === id ? 'location' : undefined}
                  onClick={(event) => handleLink(event, id)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <a className="nav-contact" href="#contact" onClick={(event) => handleLink(event, 'contact')}>
            Let’s talk <FiArrowUpRight aria-hidden="true" />
          </a>

          <button
            ref={menuButtonRef}
            className="nav-menu-toggle"
            type="button"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </nav>
      </header>

      {isMenuOpen && (
        <button
          className="nav-backdrop"
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <div
        ref={mobileMenuRef}
        id="mobile-navigation"
        className={'mobile-navigation' + (isMenuOpen ? ' is-open' : '')}
        role="dialog"
        aria-modal={isMenuOpen ? 'true' : undefined}
        aria-label="Navigation menu"
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
      >
        <span className="mobile-navigation__eyebrow">Navigate</span>
        <ul>
          {NAV_LINKS.map(({ label, id }, index) => (
            <li key={id}>
              <a
                href={'#' + id}
                className={activeSection === id ? 'is-active' : ''}
                onClick={(event) => handleLink(event, id)}
              >
                <span className="mobile-navigation__number">0{index + 1}</span>
                {label}
                <FiArrowUpRight aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
        <a className="mobile-navigation__email" href="mailto:felixnatb@gmail.com">felixnatb@gmail.com</a>
      </div>
    </>
  )
}
