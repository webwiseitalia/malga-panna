import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

export default function Contatti() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const bookingRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title dramatic reveal
      gsap.fromTo(titleRef.current,
        { x: -300, opacity: 0, skewX: -15 },
        {
          x: 0,
          opacity: 1,
          skewX: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Info items - scattered animation
      const infoItems = sectionRef.current.querySelectorAll('.info-item')
      infoItems.forEach((item, i) => {
        gsap.fromTo(item,
          { y: 100 + i * 20, opacity: 0, rotate: (i % 2 === 0 ? 5 : -5) },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })

      // Booking box - scale and rotate
      gsap.fromTo(bookingRef.current,
        { scale: 0.7, opacity: 0, rotate: 5 },
        {
          scale: 1,
          opacity: 1,
          rotate: -2,
          duration: 1.2,
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
    <section id="contatti" ref={sectionRef} className="relative bg-cream-light overflow-hidden">
      {/* Background giant text */}
      <div className="absolute top-[5vh] -left-[15vw] font-display text-[40vw] text-forest/[0.02] leading-none pointer-events-none select-none">
        INFO
      </div>

      {/* Header - extreme offset */}
      <div className="relative pt-[20vh] pb-[10vh]">
        <div ref={titleRef} className="ml-[3vw] md:ml-[10vw] mr-[20vw]">
          <span className="font-sans text-gold text-[9px] tracking-[0.5em] uppercase block mb-8">
            Val di Fassa — 1.400m
          </span>
          <h2 className="font-display text-[15vw] md:text-[12vw] text-forest leading-[0.85]">
            Raggiungi
            <span className="block text-gold italic ml-[25vw] -mt-[2vw]">la malga</span>
          </h2>
        </div>

        {/* Floating description */}
        <div className="absolute top-[35vh] right-[5vw] w-[30vw] md:w-[20vw]" style={{ transform: 'rotate(3deg)' }}>
          <p className="font-sans text-forest/70 text-fluid-xs leading-relaxed">
            A 2 km da Moena, seguendo le indicazioni per Passo San Pellegrino.
          </p>
        </div>
      </div>

      {/* Contact info - wildly scattered */}
      <div className="relative h-[80vh] md:h-[70vh]">
        {/* Address */}
        <div
          className="info-item absolute top-0 left-[5vw] md:left-[15vw]"
          style={{ transform: 'rotate(-2deg)' }}
        >
          <motion.div
            className="group"
            whileHover={{ x: 20, rotate: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-forest flex items-center justify-center group-hover:bg-gold transition-colors duration-500">
                <svg className="w-8 h-8 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <span className="font-sans text-gold text-[9px] tracking-[0.4em] uppercase block mb-3">
                  Indirizzo
                </span>
                <p className="font-serif text-forest text-fluid-lg leading-tight">
                  Strada de Sort 64<br />
                  38035 Moena (TN)
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Phone - different position */}
        <div
          className="info-item absolute top-[20vh] right-[10vw] md:right-[25vw]"
          style={{ transform: 'rotate(3deg)' }}
        >
          <motion.div
            className="group"
            whileHover={{ x: -15, rotate: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="font-sans text-gold text-[9px] tracking-[0.4em] uppercase block mb-3">
              Telefono
            </span>
            <a href="tel:+390462573489" className="font-display text-[8vw] md:text-[5vw] text-forest leading-none hover:text-gold transition-colors duration-500 block">
              0462 573489
            </a>
            <a href="tel:+393337978223" className="font-sans text-forest/70 text-fluid-xs mt-2 block hover:text-gold transition-colors duration-500">
              +39 333 797 8223
            </a>
          </motion.div>
        </div>

        {/* Hours - offset */}
        <div
          className="info-item absolute top-[45vh] left-[8vw] md:left-[40vw]"
          style={{ transform: 'rotate(-1deg)' }}
        >
          <motion.div
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <span className="font-sans text-gold text-[9px] tracking-[0.4em] uppercase block mb-4">
              Orari
            </span>
            <div className="font-serif text-forest text-fluid-base leading-loose">
              <p><span className="text-forest/60 font-sans text-[11px] tracking-wider mr-4">Pranzo</span>12:15 — 13:45</p>
              <p><span className="text-forest/60 font-sans text-[11px] tracking-wider mr-4">Cena</span>19:30 — 22:00</p>
            </div>
            <p className="font-sans text-forest/60 text-[10px] tracking-wider mt-4">
              Chiuso lunedì e martedì a pranzo
            </p>
          </motion.div>
        </div>

        {/* Email - floating */}
        <div
          className="info-item absolute top-[60vh] right-[5vw] md:right-[15vw]"
        >
          <a href="mailto:info@malgapanna.it" className="font-sans text-forest text-fluid-xs tracking-wider hover:text-gold transition-colors duration-500">
            info@malgapanna.it
          </a>
        </div>
      </div>

      {/* Booking section - dramatic placement */}
      <div className="relative py-[15vh]">
        <div
          ref={bookingRef}
          id="prenota"
          className="ml-[40vw] md:ml-[50vw] mr-[5vw] md:mr-[10vw]"
        >
          <div className="relative bg-forest p-10 md:p-14">
            {/* Shadow element */}
            <div className="absolute -inset-4 bg-gold/30 -z-10 translate-x-6 translate-y-6" />

            <span className="font-sans text-gold text-[9px] tracking-[0.5em] uppercase block mb-6">
              Prenotazioni
            </span>
            <h3 className="font-display text-[10vw] md:text-[5vw] text-cream leading-[0.9] mb-8">
              Riserva<br />
              <span className="text-gold ml-[5vw]">il tuo tavolo</span>
            </h3>

            <p className="font-sans text-cream/70 text-fluid-xs leading-relaxed mb-10 max-w-xs">
              La prenotazione è consigliabile e gradita.
            </p>

            <div className="space-y-4">
              <motion.a
                href="tel:+390462573489"
                className="group flex items-center justify-between w-full py-6 px-8 bg-gold text-forest font-sans text-[11px] tracking-[0.3em] uppercase"
                whileHover={{ scale: 1.02, x: 10 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Chiama ora</span>
                <svg className="w-5 h-5 group-hover:translate-x-3 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.a>

              <motion.a
                href="mailto:info@malgapanna.it?subject=Prenotazione"
                className="group flex items-center justify-between w-full py-6 px-8 border border-cream/20 text-cream font-sans text-[11px] tracking-[0.3em] uppercase hover:bg-cream hover:text-forest transition-colors duration-500"
                whileHover={{ scale: 1.02, x: 10 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Scrivi email</span>
                <svg className="w-5 h-5 group-hover:translate-x-3 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.a>
            </div>
          </div>
        </div>

        {/* Directions - offset left */}
        <div className="absolute top-[25vh] left-[5vw] w-[30vw] md:w-[25vw]" style={{ transform: 'rotate(-3deg)' }}>
          <span className="font-sans text-gold text-[9px] tracking-[0.4em] uppercase block mb-4">
            Come raggiungerci
          </span>
          <p className="font-sans text-forest/80 text-fluid-xs leading-relaxed">
            Da Moena, seguire le indicazioni per Passo San Pellegrino per circa 2 km.
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            {['Parcheggio', 'Navetta', 'EV'].map((tag, i) => (
              <span
                key={tag}
                className="px-3 py-1 bg-forest/10 text-forest font-sans text-[9px] tracking-wider"
                style={{ transform: `rotate(${i % 2 === 0 ? 2 : -2}deg)` }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Map section - skewed */}
      <div className="relative -skew-y-2 my-[5vh]">
        <div className="skew-y-2 ml-[10vw] mr-[20vw] md:mr-[35vw]">
          <div className="relative h-[50vh] overflow-hidden" style={{ transform: 'rotate(1deg)' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2745.1234567890123!2d11.7234567890123!3d46.3234567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDbCsDE5JzM0LjgiTiAxMcKwNDMnMjUuMCJF!5e0!3m2!1sit!2sit!4v1234567890123"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(100%) contrast(1.2)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mappa Malga Panna"
              className="hover:filter-none transition-all duration-1000"
            />
          </div>
        </div>
      </div>

      {/* Decorative */}
      <div className="absolute top-[30vh] right-[40vw] w-40 h-40 border border-forest/5 rounded-full" />
      <div className="absolute bottom-[20vh] left-[60vw] w-px h-[20vh] bg-gradient-to-b from-gold/20 to-transparent" />
      <div className="absolute top-[50vh] left-[3vw] w-2 h-2 bg-gold/30" />
    </section>
  )
}
