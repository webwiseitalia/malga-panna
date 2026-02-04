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
      gsap.fromTo(links,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.3
        }
      )
    }
  }, [isOpen])

  const navLinks = [
    { href: '#storia', label: 'Storia' },
    { href: '#chef', label: 'Chef' },
    { href: '#menu', label: 'Menu' },
    { href: '#location', label: 'Location' },
    { href: '#contatti', label: 'Contatti' },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 mix-blend-difference transition-all duration-700 ${
          isScrolled ? 'py-4' : 'py-6 md:py-8'
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12">
          <a href="#" className="relative z-50">
            <img
              src={logo}
              alt="Malga Panna"
              className="h-8 md:h-10 w-auto invert"
            />
          </a>

          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-white text-fluid-xs font-sans tracking-[0.2em] uppercase hover:opacity-50 transition-opacity duration-300"
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          <motion.a
            href="#prenota"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="hidden lg:block text-white text-fluid-xs font-sans tracking-[0.3em] uppercase border border-white/30 px-6 py-3 hover:bg-white hover:text-black transition-all duration-300"
          >
            Prenota
          </motion.a>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center"
            aria-label="Menu"
          >
            <div className="relative w-6 h-4">
              <span className={`absolute left-0 w-full h-px bg-white transition-all duration-300 ${isOpen ? 'top-1/2 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-1/2 w-full h-px bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 w-full h-px bg-white transition-all duration-300 ${isOpen ? 'top-1/2 -rotate-45' : 'bottom-0'}`} />
            </div>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-forest-deep flex flex-col justify-center px-8"
          >
            <nav className="space-y-2">
              {navLinks.map((link) => (
                <div key={link.href} className="overflow-hidden">
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="menu-link block text-fluid-3xl font-display text-cream hover:text-gold transition-colors duration-300"
                    style={{ opacity: 0 }}
                  >
                    {link.label}
                  </a>
                </div>
              ))}
            </nav>

            <div className="absolute bottom-12 left-8 right-8 flex justify-between items-end">
              <div className="text-cream/50 text-fluid-xs font-sans tracking-wider">
                <p>Strada de Sort 64</p>
                <p>38035 Moena (TN)</p>
              </div>
              <a
                href="#prenota"
                onClick={() => setIsOpen(false)}
                className="text-gold text-fluid-sm font-sans tracking-[0.3em] uppercase"
              >
                Prenota →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
