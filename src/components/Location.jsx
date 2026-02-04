import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import salaModernaSera from '../assets/foto/sala-moderna-sera.webp'
import verandaPanoramica from '../assets/foto/veranda-panoramica.webp'
import salaArte from '../assets/foto/sala-arte-moderna.webp'
import verandaAutunno from '../assets/foto/veranda-autunno.webp'
import tavoloIntimo from '../assets/foto/tavolo-intimo-sera.webp'
import salaScultura from '../assets/foto/sala-scultura-sera.webp'

gsap.registerPlugin(ScrollTrigger)

export default function Location() {
  const sectionRef = useRef(null)
  const [selectedImage, setSelectedImage] = useState(null)

  const images = [
    { src: verandaPanoramica, alt: 'Veranda panoramica' },
    { src: salaModernaSera, alt: 'Sala moderna' },
    { src: salaArte, alt: 'Arte e design' },
    { src: verandaAutunno, alt: 'Colori autunno' },
    { src: tavoloIntimo, alt: 'Tavolo intimo' },
    { src: salaScultura, alt: 'Scultura' },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      const galleryItems = sectionRef.current.querySelectorAll('.gallery-item')

      galleryItems.forEach((item, i) => {
        const randomRotation = (Math.random() - 0.5) * 10
        const randomY = 50 + Math.random() * 100

        gsap.fromTo(item,
          {
            y: randomY,
            opacity: 0,
            rotate: randomRotation,
            scale: 0.8
          },
          {
            y: 0,
            opacity: 1,
            rotate: randomRotation * 0.3,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            }
          }
        )

        // Parallax
        gsap.to(item, {
          y: -30 - (i % 3) * 20,
          rotate: randomRotation * 0.1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          }
        })
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="location" ref={sectionRef} className="relative py-[15vh] bg-forest overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute -top-[20vh] -right-[20vw] w-[60vw] h-[60vw] bg-gold/5 rounded-full blur-3xl" />

      {/* Header - wild positioning */}
      <div className="relative mb-[10vh]">
        <div className="ml-[5vw] md:ml-[15vw] mr-[30vw]">
          <span className="font-sans text-gold text-[9px] tracking-[0.5em] uppercase block mb-6">
            1.400 metri
          </span>
          <h2 className="font-display text-[14vw] md:text-[10vw] text-cream leading-[0.85]">
            Dove il tempo
            <span className="block text-gold italic ml-[20vw]">si ferma</span>
          </h2>
        </div>

        <div className="absolute top-[15vh] right-[5vw] w-[25vw] md:w-[18vw]">
          <p className="font-sans text-cream/70 text-fluid-xs leading-relaxed">
            A 2 km da Moena, tra i boschi del Latemar. Veranda vetrata
            con vista sulle Dolomiti.
          </p>
        </div>
      </div>

      {/* Chaotic gallery - absolutely positioned */}
      <div className="relative h-[200vh] md:h-[180vh]">
        {/* Image 1 - large, top right */}
        <div
          className="gallery-item absolute top-0 right-[3vw] w-[70vw] md:w-[50vw] h-[60vh] cursor-pointer overflow-hidden"
          style={{ transform: 'rotate(2deg)' }}
          onClick={() => setSelectedImage(images[0])}
        >
          <img src={images[0].src} alt={images[0].alt} className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" />
        </div>

        {/* Image 2 - medium, left overlap */}
        <div
          className="gallery-item absolute top-[25vh] left-[5vw] w-[50vw] md:w-[35vw] h-[45vh] cursor-pointer overflow-hidden z-10"
          style={{ transform: 'rotate(-4deg)' }}
          onClick={() => setSelectedImage(images[1])}
        >
          <img src={images[1].src} alt={images[1].alt} className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" />
        </div>

        {/* Image 3 - small, floating */}
        <div
          className="gallery-item absolute top-[50vh] right-[25vw] w-[30vw] md:w-[22vw] h-[30vh] cursor-pointer overflow-hidden"
          style={{ transform: 'rotate(5deg)' }}
          onClick={() => setSelectedImage(images[2])}
        >
          <img src={images[2].src} alt={images[2].alt} className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" />
        </div>

        {/* Image 4 - wide, center */}
        <div
          className="gallery-item absolute top-[70vh] left-[15vw] w-[75vw] md:w-[55vw] h-[50vh] cursor-pointer overflow-hidden"
          style={{ transform: 'rotate(-2deg)' }}
          onClick={() => setSelectedImage(images[3])}
        >
          <img src={images[3].src} alt={images[3].alt} className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" />
        </div>

        {/* Image 5 - small, scattered */}
        <div
          className="gallery-item absolute top-[95vh] right-[8vw] w-[35vw] md:w-[25vw] h-[35vh] cursor-pointer overflow-hidden z-10"
          style={{ transform: 'rotate(6deg)' }}
          onClick={() => setSelectedImage(images[4])}
        >
          <img src={images[4].src} alt={images[4].alt} className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" />
        </div>

        {/* Image 6 - bottom left */}
        <div
          className="gallery-item absolute top-[120vh] left-[3vw] w-[55vw] md:w-[40vw] h-[50vh] cursor-pointer overflow-hidden"
          style={{ transform: 'rotate(-3deg)' }}
          onClick={() => setSelectedImage(images[5])}
        >
          <img src={images[5].src} alt={images[5].alt} className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" />
        </div>

        {/* Floating text elements */}
        <div className="absolute top-[40vh] left-[60vw] z-20 hidden md:block">
          <span className="font-display text-[8vw] text-cream/[0.05] leading-none">
            Latemar
          </span>
        </div>

        <div className="absolute top-[110vh] right-[40vw] z-20">
          <span className="font-sans text-gold text-[10px] tracking-[0.4em] uppercase"
            style={{ writingMode: 'vertical-rl' }}
          >
            Dolomiti UNESCO
          </span>
        </div>
      </div>

      {/* Features - scattered layout */}
      <div className="relative mt-[10vh]">
        <div className="ml-[50vw] mr-[5vw] mb-10">
          <span className="font-sans text-gold text-[10px] tracking-[0.4em] uppercase">
            Servizi
          </span>
        </div>

        <div className="relative h-[30vh]">
          {[
            { label: 'Parcheggio privato', left: '8vw', top: '0' },
            { label: 'Ricarica Porsche', left: '35vw', top: '8vh' },
            { label: 'Navetta inverno', left: '60vw', top: '2vh' },
            { label: 'Animali ammessi', left: '25vw', top: '18vh' },
          ].map((feature, i) => (
            <div
              key={feature.label}
              className="absolute flex items-center gap-3 group"
              style={{ left: feature.left, top: feature.top, transform: `rotate(${(i % 2 === 0 ? -1 : 1) * 2}deg)` }}
            >
              <span className="w-2 h-2 bg-gold/50 group-hover:bg-gold transition-colors duration-500" />
              <span className="font-sans text-cream/80 text-fluid-xs tracking-wider group-hover:text-cream transition-colors duration-500">
                {feature.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Wine section - different structure */}
      <div className="relative mt-[15vh] -skew-y-1">
        <div className="bg-cream-light py-[12vh] skew-y-1">
          <div className="ml-[8vw] mr-[45vw] md:mr-[55vw]">
            <span className="font-sans text-gold text-[9px] tracking-[0.4em] uppercase block mb-4">
              La Cantina
            </span>
            <h3 className="font-display text-[8vw] md:text-[5vw] text-forest leading-[0.95] mb-6">
              Vini del Territorio
            </h3>
            <p className="font-sans text-forest/80 text-fluid-xs leading-relaxed">
              Il sommelier Antonio Gilli guida attraverso etichette rare
              e abbinamenti studiati.
            </p>
          </div>

          <div className="absolute top-[8vh] right-[8vw]">
            <div className="flex flex-wrap gap-3">
              {['Trentino', 'Alto Adige', 'Etichette Rare'].map((tag, i) => (
                <span
                  key={tag}
                  className="px-4 py-2 border border-forest/30 text-forest font-sans text-[9px] tracking-[0.2em] uppercase hover:bg-forest hover:text-cream hover:border-forest transition-all duration-500"
                  style={{ transform: `rotate(${i % 2 === 0 ? 2 : -2}deg)` }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative */}
      <div className="absolute bottom-[30vh] right-[15vw] w-32 h-32 border border-cream/5 rounded-full" />
      <div className="absolute top-[60vh] left-[40vw] w-1 h-1 bg-gold" />

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              initial={{ scale: 0.7, opacity: 0, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.7, opacity: 0, rotate: 5 }}
              transition={{ duration: 0.4 }}
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-[90vw] max-h-[90vh] object-contain"
            />
            <button
              className="absolute top-8 right-8 text-cream/50 hover:text-cream text-3xl font-light"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
