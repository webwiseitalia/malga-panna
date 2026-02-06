import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { motion, AnimatePresence } from 'framer-motion'
import verandaPanoramica from '../assets/foto/veranda-panoramica.webp'
import salaModernaSera from '../assets/foto/sala-moderna-sera.webp'
import salaArte from '../assets/foto/sala-arte-moderna.webp'
import verandaAutunno from '../assets/foto/veranda-autunno.webp'
import tavoloIntimo from '../assets/foto/tavolo-intimo-sera.webp'
import salaScultura from '../assets/foto/sala-scultura-sera.webp'
import salaTradizionale from '../assets/foto/sala-tradizionale-legno.webp'

gsap.registerPlugin(ScrollTrigger)

export default function Location() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const heroImageRef = useRef(null)
  const galleryRef = useRef(null)
  const [selectedImage, setSelectedImage] = useState(null)

  const galleryImages = [
    { src: salaModernaSera, alt: 'Sala moderna sera', caption: 'Design Contemporaneo' },
    { src: salaArte, alt: 'Arte e design', caption: 'Arte e Luce' },
    { src: verandaAutunno, alt: 'Veranda autunno', caption: 'Colori d\'Autunno' },
    { src: tavoloIntimo, alt: 'Tavolo intimo', caption: 'Atmosfera Intima' },
    { src: salaScultura, alt: 'Scultura', caption: 'Dettagli d\'Arte' },
    { src: salaTradizionale, alt: 'Sala tradizionale', caption: 'Calore Alpino' },
  ]

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

      // Hero image cinematic entrance
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
        y: -150,
        ease: 'none',
        scrollTrigger: {
          trigger: heroImageRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      })

      // Gallery items staggered reveal
      const galleryItems = galleryRef.current.querySelectorAll('.gallery-item')
      galleryItems.forEach((item) => {
        gsap.fromTo(item,
          { y: 80, opacity: 0, scale: 1.05 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        )

        // Individual parallax on each gallery image
        gsap.to(item.querySelector('img'), {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          }
        })
      })

      // Features
      const features = sectionRef.current.querySelectorAll('.feature-item')
      gsap.fromTo(features,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: features[0],
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="location" ref={sectionRef} className="relative bg-[#0a0a0a] overflow-hidden">
      {/* Intro */}
      <div className="px-8 md:px-16 lg:px-24 pt-40 md:pt-56 pb-20 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-6 mb-10">
              <span className="w-16 h-px bg-[#c9a962]/40" />
              <span className="font-sans text-[#c9a962] text-[9px] tracking-[0.6em] uppercase">
                1.400 metri · Val di Fassa
              </span>
            </div>
            <h2
              ref={titleRef}
              className="font-display text-[11vw] md:text-[8vw] lg:text-[5vw] text-white leading-[0.95] tracking-[-0.03em]"
              style={{ perspective: '1000px' }}
            >
              Dove il tempo si ferma, tra i boschi del Latemar
            </h2>
          </div>
          <div className="lg:col-span-3 lg:col-start-10 flex items-end">
            <div className="hidden lg:block">
              <span className="font-display text-[8vw] text-white/5 leading-none block">
                1400
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero image - fullscreen, ultra dramatic */}
      <div className="relative h-[80vh] md:h-[95vh] overflow-hidden" ref={heroImageRef}>
        <img
          src={verandaPanoramica}
          alt="Veranda panoramica sulle Dolomiti"
          className="absolute inset-0 w-full h-[130%] object-cover"
        />
        {/* Luxury gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/50 via-transparent to-transparent" />

        {/* Caption overlay */}
        <div className="absolute bottom-16 md:bottom-24 left-8 md:left-16 lg:left-24">
          <span className="font-sans text-[#c9a962] text-[9px] tracking-[0.5em] uppercase block mb-4">
            La Veranda
          </span>
          <span className="font-display text-5xl md:text-7xl text-white leading-none block mb-3">
            Vista Panoramica
          </span>
          <span className="font-serif text-white/60 text-lg italic">
            Patrimonio UNESCO delle Dolomiti
          </span>
        </div>

        {/* Floating altitude */}
        <div className="absolute top-16 right-8 md:right-16 lg:right-24 text-right hidden md:block">
          <div className="flex items-center gap-4">
            <div>
              <span className="font-sans text-white/30 text-[8px] tracking-[0.4em] uppercase block">
                Altitudine
              </span>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <span className="font-display text-7xl text-white/10 leading-none">
              1400
            </span>
          </div>
        </div>
      </div>

      {/* Description block */}
      <div className="px-8 md:px-16 lg:px-24 py-32 md:py-48">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-32">
          <div className="lg:col-span-5">
            <p className="font-serif text-4xl md:text-5xl text-white/90 italic leading-[1.2]">
              A due chilometri da Moena, immerso tra i boschi del Latemar.
            </p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex flex-col justify-center">
            <p className="font-sans text-white/50 text-base md:text-lg leading-[2] mb-12">
              Tre sale con personalità distinte: il calore del legno antico,
              l'eleganza del design contemporaneo, la luce della veranda vetrata
              con vista sulle cime dolomitiche.
            </p>
            <div className="flex items-center gap-8">
              <span className="font-display text-6xl text-[#c9a962]/30 leading-none">50</span>
              <span className="font-sans text-white/40 text-[10px] tracking-[0.4em] uppercase">Posti a sedere</span>
            </div>
          </div>
        </div>
      </div>

      {/* Immersive Gallery */}
      <div className="px-8 md:px-16 lg:px-24 pb-32 md:pb-48" ref={galleryRef}>
        <div className="mb-16 flex items-center gap-6">
          <span className="w-12 h-px bg-[#c9a962]/40" />
          <span className="font-sans text-[#c9a962] text-[9px] tracking-[0.5em] uppercase">
            Gli Ambienti
          </span>
        </div>

        {/* Masonry-style gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {galleryImages.map((image, i) => (
            <div
              key={image.alt}
              className={`gallery-item relative overflow-hidden group cursor-pointer ${
                i === 0 ? 'md:col-span-2 aspect-[2/1]' :
                i === 3 ? 'md:col-span-2 lg:col-span-1 aspect-square' :
                'aspect-[4/3]'
              }`}
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="absolute inset-0 w-full h-[120%] object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                <span className="font-display text-3xl text-white leading-none block">
                  {image.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features - dramatic dark section */}
      <div className="relative py-32 md:py-40 border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a]" />

        <div className="relative px-8 md:px-16 lg:px-24">
          <div className="mb-20">
            <div className="flex items-center gap-6 mb-10">
              <span className="w-12 h-px bg-[#c9a962]/40" />
              <span className="font-sans text-[#c9a962] text-[9px] tracking-[0.5em] uppercase">
                Servizi
              </span>
            </div>
            <p className="font-serif text-3xl md:text-4xl text-white/80 italic max-w-xl">
              Ogni dettaglio pensato per il vostro comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-16 gap-y-12">
            {[
              { name: 'Parcheggio Privato', desc: 'Comodo e riservato', num: '01' },
              { name: 'Ricarica EV', desc: 'Porsche Destination', num: '02' },
              { name: 'Navetta Inverno', desc: 'Su richiesta', num: '03' },
              { name: 'Pet Friendly', desc: 'Animali ammessi', num: '04' },
            ].map((feature) => (
              <div key={feature.name} className="feature-item group border-t border-white/10 pt-8">
                <span className="font-sans text-white/20 text-[10px] tracking-[0.4em] uppercase block mb-4">
                  {feature.num}
                </span>
                <span className="font-display text-white text-2xl md:text-3xl block mb-3 group-hover:text-[#c9a962] transition-colors duration-700">
                  {feature.name}
                </span>
                <span className="font-sans text-white/40 text-sm">
                  {feature.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wine cellar section */}
      <div className="relative py-40 md:py-56 overflow-hidden">
        {/* Background accent lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a962]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a962]/20 to-transparent" />

        <div className="px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-6">
              <div className="flex items-center gap-6 mb-10">
                <span className="w-12 h-px bg-[#c9a962]/40" />
                <span className="font-sans text-[#c9a962] text-[9px] tracking-[0.5em] uppercase">
                  La Cantina
                </span>
              </div>
              <h3 className="font-display text-[14vw] md:text-[10vw] lg:text-[7vw] text-white leading-[0.9] mb-10">
                Vini del
                <span className="text-[#c9a962] block">Territorio</span>
              </h3>
              <p className="font-serif text-white/60 text-2xl md:text-3xl italic leading-relaxed mb-12">
                Il sommelier Antonio Gilli guida attraverso etichette rare
                e abbinamenti studiati per ogni portata.
              </p>
              <div className="flex flex-wrap gap-4">
                {['Trentino DOC', 'Alto Adige', 'Etichette Rare'].map((tag) => (
                  <span
                    key={tag}
                    className="px-6 py-3 border border-white/10 text-white/50 font-sans text-[9px] tracking-[0.3em] uppercase hover:border-[#c9a962]/30 hover:text-white/70 transition-all duration-500 cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 flex items-center">
              <div>
                <span className="font-display text-[25vw] md:text-[15vw] text-[#c9a962]/15 leading-none block">
                  350
                </span>
                <span className="font-sans text-white/40 text-[10px] tracking-[0.4em] uppercase block mt-4">
                  Etichette selezionate
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0a0a0a]/98 z-50 flex items-center justify-center p-8 cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5 }}
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-[90vw] max-h-[85vh] object-contain"
            />
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 font-display text-4xl text-white"
            >
              {selectedImage.caption}
            </motion.span>
            <button
              className="absolute top-8 right-8 text-white/30 hover:text-white text-5xl font-light transition-colors duration-500"
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
