import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/SkillsSection'
import ExperienceSection from './components/ExperienceSection'
import EducationSection from './components/EducationSection'
import AchievementSection from './components/AchievementSection'
import ContactSection from './components/ContactSection'
import CertificateSection from './components/CertificateSection'
import Footer from './components/Footer'

const SECTION_IDS = ['home', 'about', 'projects', 'experience', 'skills', 'credentials', 'contact']

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const updateActiveSection = () => {
      const marker = window.innerHeight * 0.34
      let current = 'home'

      for (const id of SECTION_IDS) {
        const section = document.getElementById(id)
        if (section && section.getBoundingClientRect().top <= marker) current = id
      }

      setActiveSection(current)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    if (isMenuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = previousOverflow

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isMenuOpen])

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (!section) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    section.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
    setIsMenuOpen(false)
  }

  return (
    <div className="app">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar
        activeSection={activeSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollToSection={scrollToSection}
      />

      <main id="main-content">
        <HeroSection scrollToSection={scrollToSection} />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <div id="credentials" className="credentials">
          <EducationSection />
          <AchievementSection />
          <CertificateSection />
        </div>
        <ContactSection />
      </main>

      <Footer />
    </div>
  )
}

export default App
