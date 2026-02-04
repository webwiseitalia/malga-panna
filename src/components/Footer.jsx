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
      const elements = footerRef.current.querySelectorAll('.footer-element')

      elements.forEach((el, i) => {
        gsap.fromTo(el,
          { y: 80, opacity: 0, rotate: (i % 2 === 0 ? 3 : -3) },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 95%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })

    }, footerRef)

    return () => ctx.revert()
  }, [])

  const socialLinks = [
    { name: 'Fb', href: 'https://facebook.com/malga.panna.5' },
    { name: 'Ig', href: 'https://instagram.com/malga_panna' },
    { name: 'Tw', href: 'https://twitter.com/pdonei' },
  ]

  return (
    <footer ref={footerRef} className="relative bg-forest overflow-hidden">
      {/* Giant background text */}
      <div className="absolute -bottom-[15vh] -left-[5vw] font-display text-[25vw] text-cream/[0.02] leading-none pointer-events-none select-none whitespace-nowrap">
        MALGA PANNA
      </div>

      {/* Top line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* Main content - chaotic layout */}
      <div className="relative pt-[15vh] pb-[10vh]">
        {/* Logo - offset position */}
        <div className="footer-element absolute top-[12vh] left-[5vw] md:left-[8vw]">
          <img
            src={logo}
            alt="Malga Panna"
            className="h-16 md:h-24 w-auto brightness-0 invert opacity-80"
          />
        </div>

        {/* Navigation - scattered */}
        <div className="footer-element ml-[40vw] md:ml-[35vw] mb-[10vh]">
          <span className="font-sans text-gold text-[9px] tracking-[0.4em] uppercase block mb-6">
            Navigazione
          </span>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {['Storia', 'Chef', 'Menu', 'Location', 'Contatti'].map((link, i) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="font-sans text-cream/70 text-fluid-xs tracking-wider hover:text-gold transition-colors duration-500"
                style={{ transform: `translateY(${i % 2 === 0 ? -5 : 5}px)` }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Contact info - wild positioning */}
        <div className="relative h-[40vh]">
          {/* Phone */}
          <div className="footer-element absolute top-0 right-[10vw]" style={{ transform: 'rotate(2deg)' }}>
            <a href="tel:+390462573489" className="font-display text-[6vw] md:text-[4vw] text-cream/50 leading-none hover:text-gold transition-colors duration-500">
              0462 573489
            </a>
          </div>

          {/* Address */}
          <div className="footer-element absolute top-[15vh] left-[15vw] md:left-[25vw]" style={{ transform: 'rotate(-1deg)' }}>
            <span className="font-sans text-cream/60 text-fluid-xs leading-relaxed">
              Strada de Sort 64<br />
              38035 Moena (TN)
            </span>
          </div>

          {/* Email */}
          <div className="footer-element absolute top-[25vh] right-[25vw]">
            <a href="mailto:info@malgapanna.it" className="font-sans text-cream/70 text-[11px] tracking-wider hover:text-gold transition-colors duration-500">
              info@malgapanna.it
            </a>
          </div>

          {/* Social - scattered */}
          <div className="footer-element absolute top-[30vh] left-[8vw] flex gap-4">
            {socialLinks.map((social, i) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border border-cream/20 flex items-center justify-center text-cream/70 font-sans text-[11px] tracking-wider hover:bg-gold hover:border-gold hover:text-forest transition-all duration-500"
                style={{ transform: `rotate(${i % 2 === 0 ? 3 : -3}deg)` }}
                whileHover={{ scale: 1.1, rotate: 0 }}
              >
                {social.name}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Awards - offset right */}
        <div className="footer-element ml-[55vw] md:ml-[60vw] mr-[5vw] mb-[10vh]">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-16 h-16 border border-gold/20 flex items-center justify-center">
              <span className="text-gold text-2xl">★</span>
            </div>
            <div>
              <span className="font-serif text-cream text-fluid-sm block">Stella Michelin</span>
              <span className="font-sans text-cream/60 text-[9px] tracking-wider">30 anni</span>
            </div>
          </div>

          <div className="flex items-center gap-6 ml-[5vw]" style={{ transform: 'rotate(2deg)' }}>
            <div className="w-16 h-16 border border-gold/20 flex items-center justify-center">
              <span className="font-display text-gold text-fluid-base">JRE</span>
            </div>
            <div>
              <span className="font-serif text-cream text-fluid-sm block">Jeunes Restaurateurs</span>
              <span className="font-sans text-cream/60 text-[9px] tracking-wider">d'Europe</span>
            </div>
          </div>
        </div>

        {/* Description - floating */}
        <div className="footer-element absolute bottom-[25vh] left-[10vw] w-[25vw] md:w-[18vw]" style={{ transform: 'rotate(-2deg)' }}>
          <p className="font-sans text-cream/50 text-[11px] leading-relaxed">
            Ristorante gourmet stellato Michelin nel cuore delle Dolomiti.
          </p>
        </div>
      </div>

      {/* Bottom section - irregular */}
      <div className="relative border-t border-cream/5">
        <div className="py-8 px-[5vw]">
          <div className="flex flex-wrap justify-between items-end gap-8">
            <div className="footer-element">
              <span className="font-sans text-cream/50 text-[10px] tracking-wider">
                © {currentYear} Ristorante Malga Panna S.n.c.
              </span>
            </div>

            <div className="footer-element flex gap-8">
              {['Privacy', 'Cookie', 'Impressum'].map((link, i) => (
                <a
                  key={link}
                  href="#"
                  className="font-sans text-cream/50 text-[10px] tracking-wider hover:text-gold transition-colors duration-500"
                  style={{ transform: `translateY(${(i - 1) * 3}px)` }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Final decorative element */}
        <div className="h-[15vh] relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-[12vw] text-cream/[0.015] leading-none tracking-[-0.03em]">
              1994 — {currentYear}
            </span>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-[20vh] right-[30vw] w-1 h-1 bg-gold/30" />
      <div className="absolute bottom-[30vh] left-[45vw] w-24 h-24 border border-cream/[0.03] rounded-full" />
      <div className="absolute top-[40vh] right-[8vw] w-px h-[15vh] bg-gradient-to-b from-gold/10 to-transparent" />
    </footer>
  )
}
