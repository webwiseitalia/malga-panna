import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import logo from '../assets/logo-malgapanna.webp'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen && menuRef.current) {
      const links = menuRef.current.querySelectorAll('.menu-link')
      const details = menuRef.current.querySelectorAll('.menu-detail')

      gsap.fromTo(links,
        { y: 120, opacity: 0, rotateX: -40 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.08,
          ease: 'power4.out',
          delay: 0.4
        }
      )

      gsap.fromTo(details,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.8
        }
      )
    }
  }, [isOpen])

  const navLinks = [
    { href: '#storia', label: 'Storia', subtitle: 'Dal 1900' },
    { href: '#chef', label: 'Chef', subtitle: 'Paolo Donei' },
    { href: '#menu', label: 'Menu', subtitle: 'Degustazione' },
    { href: '#location', label: 'Location', subtitle: '1400m' },
    { href: '#contatti', label: 'Contatti', subtitle: 'Prenotazioni' },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? 'py-4 bg-[#0a0a0a]/80 backdrop-blur-md'
            : 'py-6 md:py-10'
        }`}
      >
        <div className="flex items-center justify-between px-8 md:px-16 lg:px-24">
          {/* Logo */}
          <a href="#" className="relative z-50">
            <img
              src={logo}
              alt="Malga Panna"
              className={`w-auto transition-all duration-500 brightness-0 invert ${
                isScrolled ? 'h-8' : 'h-10 md:h-12'
              }`}
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-16">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative"
              >
                <span className="text-white/80 text-[11px] font-sans tracking-[0.25em] uppercase group-hover:text-white transition-colors duration-500">
                  {link.label}
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c9a962] group-hover:w-full transition-all duration-500" />
              </motion.a>
            ))}
          </div>

          {/* CTA */}
          <motion.a
            href="#prenota"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.7 }}
            className="hidden lg:flex items-center gap-3 group"
          >
            <span className="text-[#c9a962] text-[10px] font-sans tracking-[0.4em] uppercase">
              Riserva
            </span>
            <span className="w-8 h-px bg-[#c9a962]/50 group-hover:w-12 group-hover:bg-[#c9a962] transition-all duration-500" />
          </motion.a>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-50 w-12 h-12 flex items-center justify-center"
            aria-label="Menu"
          >
            <div className="relative w-7 h-5">
              <span className={`absolute left-0 w-full h-px bg-white transition-all duration-500 ease-out ${isOpen ? 'top-1/2 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-1/2 w-full h-px bg-white transition-all duration-300 ${isOpen ? 'opacity-0 scale-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 w-full h-px bg-white transition-all duration-500 ease-out ${isOpen ? 'top-1/2 -rotate-45' : 'bottom-0'}`} />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Fullscreen menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.02]">
              <div className="absolute top-1/4 right-1/4 w-96 h-96 border border-white/20 rounded-full" />
              <div className="absolute bottom-1/4 left-1/4 w-64 h-64 border border-white/10 rounded-full" />
            </div>

            {/* Main nav */}
            <nav className="flex-1 flex flex-col justify-center px-8 md:px-16" style={{ perspective: '1000px' }}>
              {navLinks.map((link, i) => (
                <div key={link.href} className="overflow-hidden border-b border-white/5 py-4">
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="menu-link flex items-baseline justify-between group"
                    style={{ opacity: 0 }}
                  >
                    <span className="font-display text-5xl md:text-7xl text-white group-hover:text-[#c9a962] transition-colors duration-500">
                      {link.label}
                    </span>
                    <span className="font-sans text-white/30 text-[10px] tracking-[0.3em] uppercase group-hover:text-white/60 transition-colors duration-500">
                      {link.subtitle}
                    </span>
                  </a>
                </div>
              ))}
            </nav>

            {/* Bottom info */}
            <div className="px-8 md:px-16 py-12 border-t border-white/5">
              <div className="flex flex-wrap justify-between items-end gap-8">
                <div className="menu-detail" style={{ opacity: 0 }}>
                  <span className="font-sans text-white/30 text-[9px] tracking-[0.4em] uppercase block mb-3">
                    Indirizzo
                  </span>
                  <span className="font-serif text-white/60 text-base italic">
                    Strada de Sort 64, Moena
                  </span>
                </div>

                <div className="menu-detail" style={{ opacity: 0 }}>
                  <span className="font-sans text-white/30 text-[9px] tracking-[0.4em] uppercase block mb-3">
                    Telefono
                  </span>
                  <a href="tel:+390462573489" className="font-display text-white text-xl hover:text-[#c9a962] transition-colors duration-300">
                    0462 573489
                  </a>
                </div>

                <a
                  href="#prenota"
                  onClick={() => setIsOpen(false)}
                  className="menu-detail group flex items-center gap-4"
                  style={{ opacity: 0 }}
                >
                  <span className="font-sans text-[#c9a962] text-[11px] tracking-[0.4em] uppercase">
                    Prenota ora
                  </span>
                  <span className="w-8 h-px bg-[#c9a962]/50 group-hover:w-16 group-hover:bg-[#c9a962] transition-all duration-500" />
                </a>
              </div>
            </div>

            {/* Decorative star */}
            <div className="absolute top-16 right-8 md:right-16">
              <span className="text-[#c9a962]/30 text-4xl">★</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
