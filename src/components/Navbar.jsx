import '../css/Navbar.css' // pastikan path ini sesuai struktur proyekmu
import navLogo from '/assets/image/logonavbar.png';

const Navbar = ({ activeSection, isMenuOpen, toggleMenu, scrollToSection }) => {
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo" onClick={() => scrollToSection('home')}>
            <img
              src={navLogo}
              alt="Felix Natanael Logo"
              className="logo-image"
            />
          </div>

          <button
            className={`hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {isMenuOpen && (
            <div className="menu-overlay" onClick={toggleMenu}></div>
          )}

          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <li>
              <a
                href="#home"
                className={activeSection === 'home' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('home')
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className={activeSection === 'about' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('about')
                }}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className={activeSection === 'skills' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('skills')
                }}
              >
                Skills
              </a>
            </li>
            <li>
              <a
                href="#experience"
                className={activeSection === 'experience' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('experience')
                }}
              >
                Experience
              </a>
            </li>
            <li>
              <a
                href="#education"
                className={activeSection === 'education' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('education')
                }}
              >
                Education
              </a>
            </li>
            <li>
              <a
                href="#certificates"
                className={activeSection === 'certificates' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('certificates')
                }}
              >
                Certificate
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={`${activeSection === 'contact' ? 'active' : ''} contact-btn`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('contact')
                }}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar;