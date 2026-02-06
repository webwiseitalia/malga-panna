import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { motion } from 'framer-motion'
import verandaInverno from '../assets/foto/veranda-inverno.webp'

gsap.registerPlugin(ScrollTrigger)

export default function Contatti() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const heroImageRef = useRef(null)
  const bookingRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal with 3D
      const titleSplit = new SplitType(titleRef.current, {
        types: 'chars',
        tagName: 'span'
      })

      gsap.fromTo(titleSplit.chars,
        { y: 150, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.4,
          stagger: 0.02,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Hero image cinematic
      gsap.fromTo(heroImageRef.current.querySelector('img'),
        { scale: 1.4, filter: 'brightness(0.3)' },
        {
          scale: 1,
          filter: 'brightness(1)',
          duration: 2.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heroImageRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Hero parallax
      gsap.to(heroImageRef.current.querySelector('img'), {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: heroImageRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      })

      // Contact items
      const contactItems = sectionRef.current.querySelectorAll('.contact-item')
      gsap.fromTo(contactItems,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contactItems[0],
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Booking box
      gsap.fromTo(bookingRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bookingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="contatti" ref={sectionRef} className="relative bg-[#0a0a0a] overflow-hidden">
      {/* Intro */}
      <div className="px-8 md:px-16 lg:px-24 pt-40 md:pt-56 pb-20 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-6 mb-10">
              <span className="w-16 h-px bg-[#c9a962]/40" />
              <span className="font-sans text-[#c9a962] text-[9px] tracking-[0.6em] uppercase">
                Contatti & Prenotazioni
              </span>
            </div>
            <h2
              ref={titleRef}
              className="font-display text-[11vw] md:text-[8vw] lg:text-[5vw] text-white leading-[0.95] tracking-[-0.03em]"
              style={{ perspective: '1000px' }}
            >
              Raggiungi la malga nel cuore delle Dolomiti
            </h2>
          </div>
        </div>
      </div>

      {/* Hero image - winter veranda */}
      <div className="relative h-[60vh] md:h-[80vh] overflow-hidden" ref={heroImageRef}>
        <img
          src={verandaInverno}
          alt="La veranda in inverno"
          className="absolute inset-0 w-full h-[130%] object-cover"
        />
        {/* Luxury gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/50 via-transparent to-transparent" />
      </div>

      {/* Contact grid */}
      <div className="px-8 md:px-16 lg:px-24 py-32 md:py-48">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-32">
          {/* Left column - Info */}
          <div className="lg:col-span-5">
            <div className="space-y-20">
              {/* Address */}
              <div className="contact-item">
                <div className="flex items-center gap-6 mb-8">
                  <span className="w-12 h-px bg-[#c9a962]/40" />
                  <span className="font-sans text-[#c9a962] text-[9px] tracking-[0.5em] uppercase">
                    Indirizzo
                  </span>
                </div>
                <p className="font-serif text-4xl md:text-5xl text-white/90 italic leading-snug mb-8">
                  Strada de Sort 64<br />
                  38035 Moena (TN)
                </p>
                <p className="font-sans text-white/40 text-base leading-relaxed">
                  A 2 km da Moena, seguendo le indicazioni per Passo San Pellegrino.
                  Il ristorante si trova immerso nel bosco con vista sulle Dolomiti.
                </p>
              </div>

              {/* Phone */}
              <div className="contact-item">
                <div className="flex items-center gap-6 mb-8">
                  <span className="w-12 h-px bg-[#c9a962]/40" />
                  <span className="font-sans text-[#c9a962] text-[9px] tracking-[0.5em] uppercase">
                    Telefono
                  </span>
                </div>
                <a
                  href="tel:+390462573489"
                  className="font-display text-6xl md:text-7xl text-white leading-none hover:text-[#c9a962] transition-colors duration-700 block mb-6"
                >
                  0462 573489
                </a>
                <a
                  href="tel:+393337978223"
                  className="font-sans text-white/40 text-lg hover:text-[#c9a962] transition-colors duration-500 block"
                >
                  +39 333 797 8223
                </a>
              </div>

              {/* Hours */}
              <div className="contact-item">
                <div className="flex items-center gap-6 mb-8">
                  <span className="w-12 h-px bg-[#c9a962]/40" />
                  <span className="font-sans text-[#c9a962] text-[9px] tracking-[0.5em] uppercase">
                    Orari
                  </span>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-baseline border-b border-white/10 pb-6">
                    <span className="font-sans text-white/30 text-[10px] tracking-[0.3em] uppercase">Pranzo</span>
                    <span className="font-display text-3xl text-white">12:15 — 13:45</span>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-white/10 pb-6">
                    <span className="font-sans text-white/30 text-[10px] tracking-[0.3em] uppercase">Cena</span>
                    <span className="font-display text-3xl text-white">19:30 — 22:00</span>
                  </div>
                </div>
                <p className="font-sans text-white/30 text-sm mt-8">
                  Chiuso lunedì e martedì a pranzo
                </p>
              </div>
            </div>
          </div>

          {/* Right column - Booking */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div
              id="prenota"
              ref={bookingRef}
              className="relative p-12 md:p-16 border border-white/10"
            >
              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-[#c9a962]/30" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-[#c9a962]/30" />

              <div className="flex items-center gap-6 mb-10">
                <span className="w-12 h-px bg-[#c9a962]/40" />
                <span className="font-sans text-[#c9a962] text-[9px] tracking-[0.5em] uppercase">
                  Prenotazioni
                </span>
              </div>

              <h3 className="font-display text-[12vw] md:text-[7vw] text-white leading-[0.9] mb-10">
                Riserva il
                <span className="text-[#c9a962] block">tuo tavolo</span>
              </h3>

              <p className="font-serif text-white/50 text-xl md:text-2xl italic leading-relaxed mb-14">
                La prenotazione è consigliabile e gradita per garantire il miglior servizio.
              </p>

              <div className="space-y-6">
                <motion.a
                  href="tel:+390462573489"
                  className="group flex items-center justify-between w-full py-6 px-8 bg-[#c9a962] text-[#0a0a0a]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="font-sans text-[10px] tracking-[0.4em] uppercase font-medium">
                    Chiama ora
                  </span>
                  <svg className="w-6 h-6 group-hover:translate-x-3 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.a>

                <motion.a
                  href="mailto:info@malgapanna.it?subject=Prenotazione Tavolo"
                  className="group flex items-center justify-between w-full py-6 px-8 border border-white/20 text-white hover:bg-white hover:text-[#0a0a0a] transition-all duration-500"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="font-sans text-[10px] tracking-[0.4em] uppercase">
                    Scrivi email
                  </span>
                  <svg className="w-6 h-6 group-hover:translate-x-3 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.a>
              </div>

              <div className="mt-14 pt-8 border-t border-white/10">
                <a
                  href="mailto:info@malgapanna.it"
                  className="font-sans text-white/40 text-base hover:text-[#c9a962] transition-colors duration-500"
                >
                  info@malgapanna.it
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Directions section */}
      <div className="relative py-32 md:py-40 border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a]" />

        <div className="relative px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-6 mb-10">
                <span className="w-12 h-px bg-[#c9a962]/40" />
                <span className="font-sans text-[#c9a962] text-[9px] tracking-[0.5em] uppercase">
                  Come Raggiungerci
                </span>
              </div>
              <p className="font-serif text-3xl md:text-4xl text-white/80 italic leading-relaxed mb-8">
                Da Moena, seguire le indicazioni per Passo San Pellegrino per circa 2 km.
              </p>
              <p className="font-sans text-white/40 text-base leading-[2]">
                Il ristorante si trova sulla destra, immerso nel bosco del Latemar con
                vista privilegiata sulle cime dolomitiche, patrimonio UNESCO.
              </p>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="grid grid-cols-2 gap-x-12 gap-y-10">
                {[
                  { label: 'Parcheggio', value: 'Privato gratuito' },
                  { label: 'Navetta', value: 'Inverno su richiesta' },
                  { label: 'Ricarica EV', value: 'Porsche Destination' },
                  { label: 'Pet Friendly', value: 'Animali ammessi' },
                ].map((item) => (
                  <div key={item.label} className="contact-item border-t border-white/10 pt-6">
                    <span className="font-sans text-white/30 text-[9px] tracking-[0.4em] uppercase block mb-3">
                      {item.label}
                    </span>
                    <span className="font-serif text-white/70 text-lg">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map - full width with overlay */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2745.1234567890123!2d11.7234567890123!3d46.3234567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDbCsDE5JzM0LjgiTiAxMcKwNDMnMjUuMCJF!5e0!3m2!1sit!2sit!4v1234567890123"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(100%) contrast(1.2) brightness(0.8)' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mappa Malga Panna"
          className="hover:filter-none transition-all duration-1000"
        />
        {/* Map overlay with address */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent py-12 px-8 md:px-16 lg:px-24">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <span className="font-display text-4xl md:text-5xl text-white leading-none block mb-3">
                Malga Panna
              </span>
              <span className="font-sans text-white/50 text-sm tracking-wider">
                Strada de Sort 64, 38035 Moena (TN)
              </span>
            </div>
            <a
              href="https://goo.gl/maps/..."
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4"
            >
              <span className="font-sans text-[#c9a962] text-[10px] tracking-[0.4em] uppercase">
                Apri in Google Maps
              </span>
              <span className="w-8 h-px bg-[#c9a962]/50 group-hover:w-12 group-hover:bg-[#c9a962] transition-all duration-500" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
