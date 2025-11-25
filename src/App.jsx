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
              <div className="profile-photo-placeholder" style={{display: 'none'}}>
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
              <span className="subtitle-text">UI/UX Designer</span>
            </p>
            <p className="home-description fade-in">
            Developer yang passionate dengan keahlian teknis yang luas di berbagai framework dan teknologi terkini. Terbiasa menangani siklus pengembangan aplikasi dari awal hingga akhir dengan rekam jejak penyelesaian proyek yang solid. Seorang team player yang andal dan bertanggung jawab, selalu siap beradaptasi dengan teknologi baru untuk menghadirkan solusi web dan mobile yang inovatif dan stabil.
            </p>
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
            <div className="skill-card float-animation skill-card-3d" style={{animationDelay: '0s'}}>
              <div className="skill-card-inner">
                <div className="skill-icon-wrapper">
                  <div className="skill-icon-bg skill-icon-frontend">
                    <div className="skill-icon-content">⚛️</div>
                  </div>
                  <div className="skill-icon-glow"></div>
                </div>
                <h3>Frontend</h3>
                <div className="skill-progress">
                  <div className="skill-progress-bar">
                    <div className="skill-progress-fill" style={{width: '90%'}}></div>
                  </div>
                  <span className="skill-progress-text">90%</span>
                </div>
                <div className="skill-tags">
                  <span className="skill-tag">React</span>
                  <span className="skill-tag">Vue</span>
                  <span className="skill-tag">JavaScript</span>
                  <span className="skill-tag">TypeScript</span>
                  <span className="skill-tag">HTML/CSS</span>
                </div>
                <div className="skill-card-shine"></div>
              </div>
            </div>
            <div className="skill-card float-animation skill-card-3d" style={{animationDelay: '0.2s'}}>
              <div className="skill-card-inner">
                <div className="skill-icon-wrapper">
                  <div className="skill-icon-bg skill-icon-backend">
                    <div className="skill-icon-content">⚙️</div>
                  </div>
                  <div className="skill-icon-glow"></div>
                </div>
                <h3>Backend</h3>
                <div className="skill-progress">
                  <div className="skill-progress-bar">
                    <div className="skill-progress-fill" style={{width: '85%'}}></div>
                  </div>
                  <span className="skill-progress-text">85%</span>
                </div>
                <div className="skill-tags">
                  <span className="skill-tag">Node.js</span>
                  <span className="skill-tag">Express</span>
                  <span className="skill-tag">Python</span>
                  <span className="skill-tag">RESTful API</span>
                </div>
                <div className="skill-card-shine"></div>
              </div>
            </div>
            <div className="skill-card float-animation skill-card-3d" style={{animationDelay: '0.4s'}}>
              <div className="skill-card-inner">
                <div className="skill-icon-wrapper">
                  <div className="skill-icon-bg skill-icon-design">
                    <div className="skill-icon-content">🎨</div>
                  </div>
                  <div className="skill-icon-glow"></div>
                </div>
                <h3>Design</h3>
                <div className="skill-progress">
                  <div className="skill-progress-bar">
                    <div className="skill-progress-fill" style={{width: '80%'}}></div>
                  </div>
                  <span className="skill-progress-text">80%</span>
                </div>
                <div className="skill-tags">
                  <span className="skill-tag">UI/UX</span>
                  <span className="skill-tag">Figma</span>
                  <span className="skill-tag">Adobe XD</span>
                </div>
                <div className="skill-card-shine"></div>
              </div>
            </div>
            <div className="skill-card float-animation skill-card-3d" style={{animationDelay: '0.6s'}}>
              <div className="skill-card-inner">
                <div className="skill-icon-wrapper">
                  <div className="skill-icon-bg skill-icon-tools">
                    <div className="skill-icon-content">🛠️</div>
                  </div>
                  <div className="skill-icon-glow"></div>
                </div>
                <h3>Tools</h3>
                <div className="skill-progress">
                  <div className="skill-progress-bar">
                    <div className="skill-progress-fill" style={{width: '88%'}}></div>
                  </div>
                  <span className="skill-progress-text">88%</span>
                </div>
                <div className="skill-tags">
                  <span className="skill-tag">Git</span>
                  <span className="skill-tag">Docker</span>
                  <span className="skill-tag">Vite</span>
                  <span className="skill-tag">Webpack</span>
                </div>
                <div className="skill-card-shine"></div>
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
                <span className="experience-date">Feb 2024 - Jul 2024</span>
              </div>
              <h3>Data Information Processing Website - HKBP Peanajagar</h3>
              <p className="experience-location">Sitoluama, Toba, North Sumatra</p>
              <ul>
                <li>Membangun sistem manajemen data jemaat yang digunakan oleh 300+ anggota untuk mendigitalkan workflow manual.</li>
                <li>Meningkatkan efisiensi administrasi hingga 70% melalui pemrosesan catatan otomatis dan penyimpanan data terpusat.</li>
                <li>Mendesain arsitektur sistem, struktur database, serta mengimplementasikan frontend dan backend hingga deployment production.</li>
              </ul>
            </div>
            <div className="experience-card slide-up">
              <div className="experience-meta">
                <span className="experience-role">Full Stack Developer</span>
                <span className="experience-date">Oct 2024 - Dec 2024</span>
              </div>
              <h3>DelCheckIn - Digital Attendance System</h3>
              <p className="experience-location">Sitoluama, Toba, North Sumatra</p>
              <ul>
                <li>Mengembangkan sistem absensi digital real-time untuk 500+ mahasiswa dan dosen dengan pemrosesan data instan.</li>
                <li>Memangkas waktu pencatatan kehadiran lebih dari 80% dibanding proses manual berbasis kertas.</li>
                <li>Merancang UI serta layanan backend lengkap dengan integrasi database dan deployment siap operasional.</li>
              </ul>
            </div>
            <div className="experience-card slide-up">
              <div className="experience-meta">
                <span className="experience-role">Full Stack Developer</span>
                <span className="experience-date">Jan 2025 - Jul 2025</span>
              </div>
              <h3>IT Del Student Information Management System</h3>
              <p className="experience-location">Sitoluama, Toba, North Sumatra</p>
              <ul>
                <li>Membangun sistem informasi kampus berbasis web dengan Laravel + Inertia.js + React yang memiliki 24 fitur dan 4 peran.</li>
                <li>Mempercepat akses informasi akademik dan organisasi mahasiswa hingga 70% dengan update real-time.</li>
                <li>Mengimplementasikan akses CRUD multi-otoritas untuk Admin, Staff, Dosen, dan Mahasiswa agar operasi akademik saling terhubung.</li>
              </ul>
            </div>
            <div className="experience-card slide-up">
              <div className="experience-meta">
                <span className="experience-role">Full Stack Developer</span>
                <span className="experience-date">Sep 2025 - Dec 2025</span>
              </div>
              <h3>PT. LPK Mori Silangit</h3>
              <p className="experience-location">Silangit, Tapanuli Utara, North Sumatra</p>
              <ul>
                <li>Menciptakan website multibahasa dengan pendaftaran online yang dijangkau 200+ calon peserta pelatihan di bulan pertama.</li>
                <li>Meningkatkan akses informasi institusi hingga 60% lewat UI/UX yang modern dan integrasi database yang solid.</li>
                <li>Menyediakan pengalaman responsif lintas perangkat dan deployment sistem yang stabil.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="section gallery-section">
        <div className="gallery-bg-decoration"></div>
        <div className="container">
          <h2 className="section-title fade-in">Gallery</h2>
          <p className="gallery-description fade-in">
            Koleksi karya dan momen terbaik saya
          </p>
          <div className="gallery-masonry">
            {/* Tambahkan foto-foto Anda di sini dengan format berikut */}
            {/* 
            <div className="gallery-item size-large">
              <div className="gallery-item-inner">
                <img src="/images/foto1.jpg" alt="Gallery 1" />
                <div className="gallery-overlay">
                  <div className="gallery-caption">
                    <h3>Judul Foto</h3>
                    <p>Deskripsi atau caption foto</p>
                  </div>
                </div>
              </div>
            </div>
            */}
            
            {/* Placeholder items dengan berbagai ukuran dan caption */}
            <div className="gallery-item size-large">
              <div className="gallery-item-inner">
                <div className="gallery-placeholder">
                  <div className="placeholder-content">
                    <span className="placeholder-icon">📷</span>
                    <p>Tambahkan Foto</p>
                    <small>Letakkan foto di public/images/</small>
                  </div>
                </div>
                <div className="gallery-overlay">
                  <div className="gallery-caption">
                    <h3>Project Showcase</h3>
                    <p>Karya terbaik saya</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="gallery-item size-medium">
              <div className="gallery-item-inner">
                <div className="gallery-placeholder">
                  <div className="placeholder-content">
                    <span className="placeholder-icon">🎨</span>
                    <p>Tambahkan Foto</p>
                    <small>Letakkan foto di public/images/</small>
                  </div>
                </div>
                <div className="gallery-overlay">
                  <div className="gallery-caption">
                    <h3>Design Work</h3>
                    <p>UI/UX Design</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="gallery-item size-small">
              <div className="gallery-item-inner">
                <div className="gallery-placeholder">
                  <div className="placeholder-content">
                    <span className="placeholder-icon">💻</span>
                    <p>Tambahkan Foto</p>
                    <small>Letakkan foto di public/images/</small>
                  </div>
                </div>
                <div className="gallery-overlay">
                  <div className="gallery-caption">
                    <h3>Code</h3>
                    <p>Development</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="gallery-item size-medium">
              <div className="gallery-item-inner">
                <div className="gallery-placeholder">
                  <div className="placeholder-content">
                    <span className="placeholder-icon">🚀</span>
                    <p>Tambahkan Foto</p>
                    <small>Letakkan foto di public/images/</small>
                  </div>
                </div>
                <div className="gallery-overlay">
                  <div className="gallery-caption">
                    <h3>Launch</h3>
                    <p>Project Launch</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="gallery-item size-small">
              <div className="gallery-item-inner">
                <div className="gallery-placeholder">
                  <div className="placeholder-content">
                    <span className="placeholder-icon">✨</span>
                    <p>Tambahkan Foto</p>
                    <small>Letakkan foto di public/images/</small>
                  </div>
                </div>
                <div className="gallery-overlay">
                  <div className="gallery-caption">
                    <h3>Innovation</h3>
                    <p>Creative Ideas</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="gallery-item size-large">
              <div className="gallery-item-inner">
                <div className="gallery-placeholder">
                  <div className="placeholder-content">
                    <span className="placeholder-icon">🎯</span>
                    <p>Tambahkan Foto</p>
                    <small>Letakkan foto di public/images/</small>
                  </div>
                </div>
                <div className="gallery-overlay">
                  <div className="gallery-caption">
                    <h3>Portfolio</h3>
                    <p>Best Works Collection</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="gallery-item size-small">
              <div className="gallery-item-inner">
                <div className="gallery-placeholder">
                  <div className="placeholder-content">
                    <span className="placeholder-icon">🔥</span>
                    <p>Tambahkan Foto</p>
                    <small>Letakkan foto di public/images/</small>
                  </div>
                </div>
                <div className="gallery-overlay">
                  <div className="gallery-caption">
                    <h3>Hot Project</h3>
                    <p>Latest Work</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="gallery-item size-medium">
              <div className="gallery-item-inner">
                <div className="gallery-placeholder">
                  <div className="placeholder-content">
                    <span className="placeholder-icon">🌟</span>
                    <p>Tambahkan Foto</p>
                    <small>Letakkan foto di public/images/</small>
                  </div>
                </div>
                <div className="gallery-overlay">
                  <div className="gallery-caption">
                    <h3>Achievement</h3>
                    <p>Milestones</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section projects-section">
        <div className="container">
          <h2 className="section-title fade-in">Projek Saya</h2>
            <div className="projects-grid">
            <div className="project-card tilt-effect">
              <div className="project-card-inner">
                <h3>Aplikasi E-Commerce</h3>
                <p>Aplikasi e-commerce modern dengan fitur keranjang belanja, pembayaran, dan manajemen produk.</p>
                <div className="project-tags">
                  <span>React</span>
                  <span>Node.js</span>
                  <span>MongoDB</span>
                </div>
              </div>
            </div>
            <div className="project-card tilt-effect">
              <div className="project-card-inner">
                <h3>Dashboard Analytics</h3>
                <p>Dashboard untuk visualisasi data dengan grafik interaktif dan real-time updates.</p>
                <div className="project-tags">
                  <span>Vue.js</span>
                  <span>D3.js</span>
                  <span>Python</span>
                </div>
              </div>
            </div>
            <div className="project-card tilt-effect">
              <div className="project-card-inner">
                <h3>Game Web App</h3>
                <p>Aplikasi game berbasis web dengan multiplayer support dan leaderboard.</p>
                <div className="project-tags">
                  <span>React</span>
                  <span>Socket.io</span>
                  <span>Express</span>
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

