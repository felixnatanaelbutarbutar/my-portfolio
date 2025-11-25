import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const observerRef = useRef(null)
  const heroRef = useRef(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const particlesRef = useRef([])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'gallery', 'projects', 'education', 'organization', 'highlights', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    // Intersection Observer untuk animasi scroll
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    )

    // Observe semua elemen yang perlu di-animate
    const elementsToObserve = document.querySelectorAll('.fade-in, .slide-up, .skill-card, .project-card, .gallery-item')
    elementsToObserve.forEach((el) => observerRef.current.observe(el))

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  // Mouse tracking untuk interaksi hero
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePosition.current = { x: e.clientX, y: e.clientY }

      // Update cursor trail
      const cursor = document.querySelector('.custom-cursor')
      if (cursor) {
        cursor.style.left = `${e.clientX}px`
        cursor.style.top = `${e.clientY}px`
      }

      // Parallax effect untuk foto profil
      const profilePhoto = document.querySelector('.profile-photo')
      if (profilePhoto && heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height

        profilePhoto.style.transform = `translate(${x * 20}px, ${y * 20}px) scale(1.05)`
      }

      // Floating elements interaction
      const floatingElements = document.querySelectorAll('.floating-element')
      floatingElements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const elX = rect.left + rect.width / 2
        const elY = rect.top + rect.height / 2
        const distance = Math.sqrt(
          Math.pow(e.clientX - elX, 2) + Math.pow(e.clientY - elY, 2)
        )

        if (distance < 150) {
          const angle = Math.atan2(e.clientY - elY, e.clientX - elX)
          const force = (150 - distance) / 150
          el.style.transform = `translate(${Math.cos(angle) * force * 30}px, ${Math.sin(angle) * force * 30}px) scale(${1 + force * 0.2})`
        }
      })
    }

    // Create particles
    const createParticle = () => {
      const particle = document.createElement('div')
      particle.className = 'particle'
      const size = Math.random() * 4 + 2
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`
      particle.style.animationDuration = `${Math.random() * 20 + 10}s`
      particle.style.animationDelay = `${Math.random() * 5}s`
      particle.style.opacity = Math.random() * 0.5 + 0.2

      if (heroRef.current) {
        heroRef.current.appendChild(particle)
        particlesRef.current.push(particle)
      }
    }

    // Initialize particles
    for (let i = 0; i < 30; i++) {
      createParticle()
    }

    // Store particles reference for cleanup
    const particles = [...particlesRef.current]

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      particles.forEach(particle => {
        if (particle && particle.parentNode) {
          particle.remove()
        }
      })
    }
  }, [])

  // 3D Tilt effect untuk skill cards
  useEffect(() => {
    const handleSkillCardMouseMove = (e) => {
      const skillCards = document.querySelectorAll('.skill-card-3d')
      skillCards.forEach((card) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateX = (y - centerY) / 10
        const rotateY = (centerX - x) / 10

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      })
    }

    const handleSkillCardMouseLeave = () => {
      const skillCards = document.querySelectorAll('.skill-card-3d')
      skillCards.forEach((card) => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)'
      })
    }

    const skillCards = document.querySelectorAll('.skill-card-3d')
    skillCards.forEach((card) => {
      card.addEventListener('mousemove', handleSkillCardMouseMove)
      card.addEventListener('mouseleave', handleSkillCardMouseLeave)
    })

    return () => {
      skillCards.forEach((card) => {
        card.removeEventListener('mousemove', handleSkillCardMouseMove)
        card.removeEventListener('mouseleave', handleSkillCardMouseLeave)
      })
    }
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsMenuOpen(false) // Tutup menu mobile setelah klik
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo" onClick={() => scrollToSection('home')}>
            Portfolio
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
                Tentang
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
                Keahlian
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
                Pengalaman
              </a>
            </li>
            <li>
              <a
                href="#gallery"
                className={activeSection === 'gallery' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('gallery')
                }}
              >
                Gallery
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className={activeSection === 'projects' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('projects')
                }}
              >
                Projek
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
                Pendidikan
              </a>
            </li>
            <li>
              <a
                href="#organization"
                className={activeSection === 'organization' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('organization')
                }}
              >
                Organisasi
              </a>
            </li>
            <li>
              <a
                href="#highlights"
                className={activeSection === 'highlights' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('highlights')
                }}
              >
                Sorotan
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={activeSection === 'contact' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('contact')
                }}
              >
                Kontak
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Custom Cursor */}
      <div className="custom-cursor"></div>

      {/* Home Section */}
      <section id="home" className="section home-section" ref={heroRef}>
        <div className="animated-bg"></div>
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>

        {/* Floating Elements */}
        <div className="floating-element floating-1"></div>
        <div className="floating-element floating-2"></div>
        <div className="floating-element floating-3"></div>
        <div className="floating-element floating-4"></div>

        <div className="container">
          <div className="home-content">
            <div className="profile-photo-container fade-in">
              <div className="photo-glow"></div>
              <div className="photo-ring"></div>
              <img
                src="/src/assets/profile.jpg"
                alt="Profile"
                className="profile-photo"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <div className="profile-photo-placeholder" style={{ display: 'none' }}>
                <span>Foto Profil</span>
                <small>Tempatkan foto Anda di: src/assets/profile.jpg</small>
              </div>
            </div>
            <h1 className="home-title fade-in">
              <span className="title-line">Halo, Saya</span>
              <span className="highlight typing-effect">Felix Natanael Butarbutar</span>
            </h1>
            <p className="home-subtitle fade-in">
              <span className="subtitle-text">Full Stack Developer</span>
              <span className="subtitle-separator"> & </span>
              {/* <span className="subtitle-text">UI/UX Designer</span> */}
            </p>
            <p className="home-description fade-in">
              Passionate and highly motivated developer with strong technical expertise in modern frameworks and emerging technologies. Experienced in managing the full application development lifecycle from planning and system design to implementation, deployment, and maintenance. Consistently deliver reliable, scalable, and high-quality solutions for both web and mobile platforms.            </p>
            <div className="home-buttons fade-in">
              <button
                className="btn btn-primary pulse-on-hover"
                onClick={() => scrollToSection('projects')}
              >
                <span>Lihat Projek</span>
                <div className="btn-ripple"></div>
              </button>
              <button
                className="btn btn-secondary pulse-on-hover"
                onClick={() => scrollToSection('contact')}
              >
                <span>Hubungi Saya</span>
                <div className="btn-ripple"></div>
              </button>
            </div>
            <div className="scroll-indicator">
              <div className="mouse"></div>
              <div className="scroll-arrow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about-section">
        <div className="container">
          <h2 className="section-title fade-in">Tentang Saya</h2>
          <div className="about-content slide-up">
            <div className="about-text">
              <p>
                I am a passionate and highly motivated developer with strong technical expertise in modern frameworks and emerging technologies. I manage the complete application development lifecycle—from planning and system design to implementation, deployment, and maintenance—while consistently delivering reliable, scalable, and high-quality solutions for both web and mobile platforms.
              </p>
              <p>
                I thrive in collaborative environments, take responsibility seriously, and adapt quickly to new tools and technologies to solve complex problems and build innovative digital products. My focus is on crafting systems that stay stable in production while remaining delightful to use.
              </p>
            </div>
            <div className="about-details">
              <div className="info-card">
                <p className="info-label">Telepon</p>
                <a href="tel:+6285142232595" className="info-value">+62 851-4223-2595</a>
              </div>
              <div className="info-card">
                <p className="info-label">Email</p>
                <a href="mailto:felixnatb@gmail.com" className="info-value">felixnatb@gmail.com</a>
              </div>
              <div className="info-card">
                <p className="info-label">LinkedIn</p>
                <a href="https://www.linkedin.com/in/felix-natanael-butarbutar-19b1712b0/" target="_blank" rel="noopener noreferrer" className="info-value">
                  linkedin.com/in/felix-natanael-butarbutar
                </a>
              </div>
              <div className="info-card">
                <p className="info-label">Portfolio</p>
                <a href="https://felixnatanael.my.id" target="_blank" rel="noopener noreferrer" className="info-value">
                  felixnatanael.my.id
                </a>
              </div>
              <div className="info-card wide">
                <p className="info-label">Lokasi</p>
                <p className="info-value">Jl. Bandara - Muara, Kec. Muara, Tapanuli Utara</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section skills-section">
        <div className="skills-bg-pattern"></div>
        <div className="container">
          <h2 className="section-title fade-in">Keahlian</h2>
          <div className="skills-grid">
            <div className="skill-card float-animation skill-card-3d" style={{ animationDelay: '0s' }}>
              <div className="skill-card-inner">
                <div className="skill-icon-wrapper">
                  <div className="skill-icon-bg skill-icon-frontend">
                    <div className="skill-icon-content">Code</div>
                  </div>
                </div>
                <h3>Programming Languages</h3>
                <div className="skill-tags">
                  <span className="skill-tag">JavaScript</span>
                  <span className="skill-tag">PHP</span>
                  <span className="skill-tag">Go</span>
                  <span className="skill-tag">Python</span>
                  <span className="skill-tag">Dart</span>
                  <span className="skill-tag">Java</span>
                  <span className="skill-tag">C</span>
                </div>
              </div>
            </div>
            <div className="skill-card float-animation skill-card-3d" style={{ animationDelay: '0.2s' }}>
              <div className="skill-card-inner">
                <div className="skill-icon-wrapper">
                  <div className="skill-icon-bg skill-icon-backend">
                    <div className="skill-icon-content">Server</div>
                  </div>
                </div>
                <h3>Frameworks & Tech</h3>
                <div className="skill-tags">
                  <span className="skill-tag">Laravel</span>
                  <span className="skill-tag">React.js</span>
                  <span className="skill-tag">Next.js</span>
                  <span className="skill-tag">Vue.js</span>
                  <span className="skill-tag">Node.js</span>
                  <span className="skill-tag">FastAPI</span>
                  <span className="skill-tag">Inertia.js</span>
                  <span className="skill-tag">Flutter</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section experience-section">
        <div className="container">
          <h2 className="section-title fade-in">Pengalaman & Projek</h2>
          <div className="experience-grid">
            <div className="experience-card slide-up">
              <div className="experience-meta">
                <span className="experience-role">Full Stack Developer</span>
                <span className="experience-date">Feb 2024 – Jul 2024</span>
              </div>
              <h3>Data Information Processing Website</h3>
              <p className="experience-company">HKBP Peanajagar Church • Sitoluama, Toba</p>
              <ul>
                <li>Sistem manajemen data jemaat untuk 300+ anggota gereja</li>
                <li>Meningkatkan efisiensi administrasi hingga 70% dengan otomasi</li>
                <li>Full cycle: arsitektur, database, frontend, backend, deployment</li>
              </ul>
            </div>
            <div className="experience-card slide-up">
              <div className="experience-meta">
                <span className="experience-role">Full Stack Developer</span>
                <span className="experience-date">Oct 2024 – Dec 2024</span>
              </div>
              <h3>DelCheckIn – Digital Attendance System</h3>
              <p className="experience-company">Institut Teknologi Del</p>
              <ul>
                <li>Absensi real-time untuk 500+ mahasiswa & dosen</li>
                <li>Mengurangi waktu proses absen 80%</li>
                <li>Full development + deployment</li>
              </ul>
            </div>
            <div className="experience-card slide-up">
              <div className="experience-meta">
                <span className="experience-role">Full Stack Developer</span>
                <span className="experience-date">Jan 2025 – Jul 2025</span>
              </div>
              <h3>IT Del Student Information Management System</h3>
              <p className="experience-company">Institut Teknologi Del</p>
              <ul>
                <li>24 fitur, 4 role (Admin, Staff, Dosen, Mahasiswa)</li>
                <li>Laravel + Inertia.js + React</li>
                <li>Meningkatkan akses informasi kampus 70%</li>
              </ul>
            </div>
            <div className="experience-card slide-up">
              <div className="experience-meta">
                <span className="experience-role">Full Stack Developer</span>
                <span className="experience-date">Sep 2025 – Dec 2025</span>
              </div>
              <h3>PT. LPK Mori Silangit – Website Resmi</h3>
              <p className="experience-company">Silangit, Tapanuli Utara</p>
              <ul>
                <li>Website multibahasa + pendaftaran online</li>
                <li>200+ pendaftar di bulan pertama</li>
                <li>Responsive, modern UI/UX, full deployment</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section – tetap placeholder seperti permintaan */}
      <section id="gallery" className="section gallery-section">
        <div className="gallery-bg-decoration"></div>
        <div className="container">
          <h2 className="section-title fade-in">Gallery</h2>
          <p className="gallery-description fade-in">
            Koleksi karya dan momen terbaik saya (akan diisi sendiri)
          </p>
          <div className="gallery-masonry">
            {/* Kamu isi sendiri nanti */}
            <div className="gallery-item size-large">
              <div className="gallery-item-inner">
                <div className="gallery-placeholder">
                  <div className="placeholder-content">
                    <span className="placeholder-icon">Photo</span>
                    <p>Tambahkan Foto</p>
                    <small>public/images/</small>
                  </div>
                </div>
              </div>
            </div>
            {/* ... placeholder lain tetap sama seperti kode asli ... */}
          </div>
        </div>
      </section>

      {/* Projects Section – pakai 4 proyek utama kamu */}
      <section id="projects" className="section projects-section">
        <div className="container">
          <h2 className="section-title fade-in">Projek Saya</h2>
          <div className="projects-grid">
            <div className="project-card tilt-effect">
              <div className="project-card-inner">
                <h3>IT Del Student Information System</h3>
                <p>Sistem informasi kampus full-featured dengan Laravel + React + Inertia.js, 24 fitur, 4 role user.</p>
                <div className="project-tags">
                  <span>Laravel</span><span>React</span><span>Inertia.js</span><span>MySQL</span>
                </div>
              </div>
            </div>
            <div className="project-card tilt-effect">
              <div className="project-card-inner">
                <h3>DelCheckIn – Digital Attendance</h3>
                <p>Absensi real-time untuk 500+ pengguna, menghemat 80% waktu proses.</p>
                <div className="project-tags">
                  <span>FLUTTER</span><span>SQLite</span><span>FIREBASE</span>
                </div>
              </div>
            </div>
            <div className="project-card tilt-effect">
              <div className="project-card-inner">
                <h3>Church Data Management System</h3>
                <p>Digitalisasi data jemaat gereja, meningkatkan efisiensi 70%.</p>
                <div className="project-tags">
                  <span>PHP</span><span>Laravel</span><span>Admin Panel</span>
                </div>
              </div>
            </div>
            <div className="project-card tilt-effect">
              <div className="project-card-inner">
                <h3>LPK Mori Silangit Website</h3>
                <p>Website multibahasa dengan sistem pendaftaran online.</p>
                <div className="project-tags">
                  <span>Laravel</span><span>Vue</span><span>Multilingual</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="section education-section">
        <div className="container">
          <h2 className="section-title fade-in">Pendidikan</h2>
          <div className="education-grid">
            <div className="education-card slide-up">
              <div className="education-meta">
                <span className="education-date">Aug 2023 - Sep 2026 (Expected)</span>
                <span className="education-score">IPK 3.35 / 4.00</span>
              </div>
              <h3>Institut Teknologi Del</h3>
              <p className="education-location">Laguboti, Toba, North Sumatra</p>
              <p className="education-detail">Diploma in Information Technology</p>
            </div>
            <div className="education-card slide-up">
              <div className="education-meta">
                <span className="education-date">Jul 2020 - Apr 2023</span>
              </div>
              <h3>SMA Swasta Bintang Timur 1 Balige</h3>
              <p className="education-location">Balige, Toba, North Sumatra</p>
              <p className="education-detail">Science Major</p>
            </div>
          </div>
        </div>
      </section>

      {/* Organization Section */}
      <section id="organization" className="section organization-section">
        <div className="container">
          <h2 className="section-title fade-in">Pengalaman Organisasi</h2>
          <div className="organization-grid">
            <div className="organization-card slide-up">
              <div className="organization-meta">
                <span className="organization-role">Person in Charge</span>
                <span className="organization-date">Oct 2024</span>
              </div>
              <h3>Committe for the Cadre Program - IT Student Association</h3>
              <p className="organization-location">Sitoluama, Toba, North Sumatra</p>
              <ul>
                <li>Mengorganisir logistik acara dan perencanaan kegiatan kaderisasi.</li>
                <li>Mengelola komunikasi dan kolaborasi tim demi kesuksesan program.</li>
                <li>Menjamin jalannya aktivitas dengan tanggung jawab penuh.</li>
              </ul>
            </div>
            <div className="organization-card slide-up">
              <div className="organization-meta">
                <span className="organization-role">Member</span>
                <span className="organization-date">Aug 2024 - Dec 2024</span>
              </div>
              <h3>Del Software Development Club</h3>
              <p className="organization-location">Sitoluama, Toba, North Sumatra</p>
              <ul>
                <li>Aktif dalam pelatihan software development dan kolaborasi coding dengan 10 anggota.</li>
                <li>Ikut serta dalam diskusi teknis mingguan dan sesi hands-on untuk meningkatkan skill.</li>
                <li>Kontributor pada proyek internal dan inisiatif peer-learning.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section id="highlights" className="section highlights-section">
        <div className="container">
          <h2 className="section-title fade-in">Skills & Achievements</h2>
          <div className="highlights-grid">
            <div className="highlight-card slide-up">
              <h3>Hard Skills</h3>
              <ul>
                <li>Languages: C, JavaScript, Java, Dart, Python, Go, PHP</li>
                <li>Frameworks & Technologies: Laravel, FastAPI, React.js, Node.js, Next.js, Vue.js</li>
              </ul>
            </div>
            <div className="highlight-card slide-up">
              <h3>Soft Skills</h3>
              <ul className="multiple-columns">
                <li>Problem-Solving</li>
                <li>Critical Thinking</li>
                <li>Attention to Detail</li>
                <li>Adaptability</li>
                <li>Time Management</li>
                <li>Team Collaboration</li>
                <li>Communication</li>
                <li>Continuous Learning</li>
                <li>Responsibility</li>
                <li>Creativity</li>
              </ul>
            </div>
            <div className="highlight-card slide-up">
              <h3>Webinars</h3>
              <p>AWS Certified Machine Learning Specialty 2025 - Hands On</p>
            </div>
            <div className="highlight-card slide-up">
              <h3>Achievements</h3>
              <p>2025 - Memulai Pemrograman Dengan C</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="container">
          <h2 className="section-title fade-in">Hubungi Saya</h2>
          <div className="contact-content slide-up">
            <p className="contact-description">
              Tertarik untuk berkolaborasi? Mari kita berbicara!
            </p>
            <div className="contact-links">
              <a href="mailto:felixnatb@gmail.com" className="contact-link glow-on-hover">
                <span>Email</span>
              </a>
              <a href="https://github.com/felixnatanaelbutarbutar" target="_blank" rel="noopener noreferrer" className="contact-link glow-on-hover">
                <span>GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/felixnatanaelbutarbutar" target="_blank" rel="noopener noreferrer" className="contact-link glow-on-hover">
                <span>LinkedIn</span>
              </a>
              <a href="https://www.instagram.com/felixfbi_/" target="_blank" rel="noopener noreferrer" className="contact-link glow-on-hover">
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Felix Natanael Butarbutar</p>
        </div>
      </footer>
    </div>
  )
}

export default App

