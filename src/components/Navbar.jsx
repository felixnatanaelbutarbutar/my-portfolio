import { useEffect, useState, useRef } from 'react';
import '../css/Navbar.css' // pastikan path ini sesuai struktur proyekmu
import navLogo from '/assets/image/logonavbar.png';

const Navbar = ({ activeSection, isMenuOpen, toggleMenu, scrollToSection }) => {
  const [pillStyle, setPillStyle] = useState({ opacity: 0 });
  const navRef = useRef(null);

  useEffect(() => {
    const updatePill = () => {
      if (navRef.current) {
        if (window.innerWidth <= 900) {
          setPillStyle({ opacity: 0 });
          return;
        }
        const activeLink = navRef.current.querySelector(`a:not(.contact-btn)[href="#${activeSection}"]`);
        if (activeLink) {
          const { offsetLeft, offsetWidth, offsetTop, offsetHeight } = activeLink;
          setPillStyle({
            left: `${offsetLeft}px`,
            width: `${offsetWidth}px`,
            top: `${offsetTop}px`,
            height: `${offsetHeight}px`,
            opacity: 1
          });
        } else {
          setPillStyle({ opacity: 0 });
        }
      }
    };

    const timer = setTimeout(updatePill, 50);
    window.addEventListener('resize', updatePill);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updatePill);
    };
  }, [activeSection, isMenuOpen]);

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

          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`} ref={navRef}>
            {/* Sliding Magnifying Glass Pill */}
            <li className="nav-pill" style={pillStyle} aria-hidden="true"></li>
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