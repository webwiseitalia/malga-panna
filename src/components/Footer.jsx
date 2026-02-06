import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import logo from '../assets/logo-malgapanna.webp'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef(null)
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const footerElements = footerRef.current.querySelectorAll('.footer-element')

      gsap.fromTo(footerElements,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      )

    }, footerRef)

    return () => ctx.revert()
  }, [])

  const socialLinks = [
    { name: 'Facebook', href: 'https://facebook.com/malga.panna.5' },
    { name: 'Instagram', href: 'https://instagram.com/malga_panna' },
    { name: 'Twitter', href: 'https://twitter.com/pdonei' },
  ]

  return (
    <footer ref={footerRef} className="relative bg-[#050505]">
      {/* Top border accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a962]/30 to-transparent" />

      {/* Main content */}
      <div className="relative px-8 md:px-16 lg:px-24 pt-32 md:pt-40 pb-20 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Logo and brand */}
          <div className="lg:col-span-4 footer-element">
            <img
              src={logo}
              alt="Malga Panna"
              className="h-14 md:h-16 w-auto brightness-0 invert opacity-60 mb-10"
            />
            <p className="font-serif text-white/40 text-lg italic leading-relaxed max-w-sm mb-12">
              Ristorante gourmet stellato Michelin nel cuore delle Dolomiti.
              Una tradizione di famiglia dal 1900.
            </p>
            {/* Awards inline */}
            <div className="flex items-center gap-10">
              <div className="flex items-center gap-4">
                <span className="text-[#c9a962] text-2xl">★</span>
                <div>
                  <span className="font-sans text-white/60 text-sm block">Michelin</span>
                  <span className="font-sans text-white/30 text-[9px] tracking-wider">30 anni</span>
                </div>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="flex items-center gap-4">
                <span className="font-display text-[#c9a962] text-xl tracking-wider">JRE</span>
                <div>
                  <span className="font-sans text-white/60 text-sm block">Jeunes</span>
                  <span className="font-sans text-white/30 text-[9px] tracking-wider">Restaurateurs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 lg:col-start-6 footer-element">
            <span className="font-sans text-[#c9a962] text-[9px] tracking-[0.5em] uppercase block mb-10">
              Navigazione
            </span>
            <nav className="space-y-5">
              {['Storia', 'Chef', 'Menu', 'Location', 'Contatti'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="font-sans text-white/50 text-base tracking-wider hover:text-[#c9a962] transition-colors duration-500 block"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 footer-element">
            <span className="font-sans text-[#c9a962] text-[9px] tracking-[0.5em] uppercase block mb-10">
              Contatti
            </span>
            <div className="space-y-8">
              <div>
                <a
                  href="tel:+390462573489"
                  className="font-display text-4xl text-white hover:text-[#c9a962] transition-colors duration-500 block mb-3"
                >
                  0462 573489
                </a>
                <a
                  href="mailto:info@malgapanna.it"
                  className="font-sans text-white/40 text-base hover:text-[#c9a962] transition-colors duration-500 block"
                >
                  info@malgapanna.it
                </a>
              </div>
              <div>
                <span className="font-serif text-white/50 text-base italic leading-relaxed block">
                  Strada de Sort 64<br />
                  38035 Moena (TN)
                </span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="lg:col-span-2 footer-element">
            <span className="font-sans text-[#c9a962] text-[9px] tracking-[0.5em] uppercase block mb-10">
              Orari
            </span>
            <div className="space-y-6">
              <div>
                <span className="font-sans text-white/30 text-[9px] tracking-[0.3em] uppercase block mb-2">Pranzo</span>
                <span className="font-serif text-white/60 text-lg">12:15 — 13:45</span>
              </div>
              <div>
                <span className="font-sans text-white/30 text-[9px] tracking-[0.3em] uppercase block mb-2">Cena</span>
                <span className="font-serif text-white/60 text-lg">19:30 — 22:00</span>
              </div>
            </div>
            <p className="font-sans text-white/20 text-sm mt-8">
              Chiuso lun-mar pranzo
            </p>
          </div>
        </div>
      </div>

      {/* Social links */}
      <div className="px-8 md:px-16 lg:px-24 py-8 border-t border-white/5">
        <div className="flex flex-wrap items-center gap-10">
          <span className="font-sans text-white/20 text-[9px] tracking-[0.4em] uppercase">
            Seguici
          </span>
          {socialLinks.map((social) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-white/40 text-sm tracking-wider hover:text-[#c9a962] transition-colors duration-500"
              whileHover={{ x: 5 }}
            >
              {social.name}
            </motion.a>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative px-8 md:px-16 lg:px-24 py-10 border-t border-white/5">
        <div className="flex flex-wrap justify-between items-center gap-8">
          <span className="font-sans text-white/20 text-[11px] tracking-wider">
            © {currentYear} Ristorante Malga Panna S.n.c. — Tutti i diritti riservati
          </span>

          <div className="flex gap-10">
            {['Privacy Policy', 'Cookie Policy', 'Impressum'].map((link) => (
              <a
                key={link}
                href="#"
                className="font-sans text-white/20 text-[11px] tracking-wider hover:text-[#c9a962] transition-colors duration-500"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative large text */}
      <div className="absolute bottom-0 right-0 overflow-hidden pointer-events-none hidden lg:block">
        <span className="font-display text-[30vw] text-white/[0.015] leading-none block translate-x-[15%] translate-y-[35%]">
          MP
        </span>
      </div>
    </footer>
  )
}
