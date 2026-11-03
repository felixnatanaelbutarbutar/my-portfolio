import {
  FiArrowUpRight,
  FiGithub,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiMessageCircle,
  FiPhone,
  FiTwitter,
} from 'react-icons/fi'
import { createElement } from 'react'
import '../css/ContactSection.css'

const SOCIALS = [
  {
    name: 'LinkedIn',
    detail: 'Professional profile',
    href: 'https://www.linkedin.com/in/felix-natanael-butarbutar-19b1712b0/',
    icon: FiLinkedin,
  },
  {
    name: 'GitHub',
    detail: 'Code and projects',
    href: 'https://github.com/felixnatanaelbutarbutar',
    icon: FiGithub,
  },
  {
    name: 'Instagram',
    detail: '@felixfbi_',
    href: 'https://www.instagram.com/felixfbi_/',
    icon: FiInstagram,
  },
  {
    name: 'X',
    detail: '@felixfbi_',
    href: 'https://twitter.com/felixfbi_',
    icon: FiTwitter,
  },
]

export default function ContactSection() {
  return (
    <section id="contact" className="contact section-wrap" aria-labelledby="contact-heading">
      <div className="contact__topline">
        <span className="section-label">Contact</span>
        <span className="contact__note">South Jakarta · Indonesia</span>
      </div>

      <div className="contact__main">
        <div>
          <h2 id="contact-heading">Have a good<br /><em>problem to solve?</em></h2>
          <p>I’m open to thoughtful conversations about software engineering, enterprise systems, and applied AI.</p>
        </div>

        <div className="contact__actions">
          <a href="mailto:felixnatb@gmail.com" className="contact__primary">
            <FiMail aria-hidden="true" />
            <span>felixnatb@gmail.com</span>
            <FiArrowUpRight aria-hidden="true" />
          </a>
          <a href="https://wa.me/6285142232595" target="_blank" rel="noreferrer" className="contact__secondary">
            <FiMessageCircle aria-hidden="true" />
            WhatsApp
            <FiArrowUpRight aria-hidden="true" />
          </a>
          <a href="tel:+6285142232595" className="contact__secondary">
            <FiPhone aria-hidden="true" />
            +62 851-4223-2595
          </a>
        </div>
      </div>

      <div className="contact__socials">
        <span className="contact__social-label">Elsewhere</span>
        <div>
          {SOCIALS.map(({ name, detail, href, icon }) => (
            <a key={name} href={href} target="_blank" rel="noreferrer">
              {createElement(icon, { 'aria-hidden': true })}
              <span>{name}</span>
              <small>{detail}</small>
              <FiArrowUpRight aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
