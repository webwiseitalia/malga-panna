import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import piattoUovo from '../assets/foto/piatto-uovo-polenta-tartufo.webp'
import piattoLumache from '../assets/foto/piatto-lumache-bourguignonne.webp'
import piattoPasta from '../assets/foto/piatto-pasta-grano-saraceno.webp'
import piattoCarne from '../assets/foto/piatto-carne-tartufo.webp'
import dolce from '../assets/foto/dolce-mela-strudel.webp'
import piattoTortellini from '../assets/foto/piatto-tortellini-brodo.webp'

gsap.registerPlugin(ScrollTrigger)

export default function Menu() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const heroImageRef = useRef(null)
  const galleryRef = useRef(null)

  const dishes = [
    { image: piattoUovo, name: 'Uovo in Crosta', desc: 'Polenta, spinaci, tartufo nero pregiato' },
    { image: piattoLumache, name: 'Lumache alla Bourguignonne', desc: 'Rivisitazione con mais croccante' },
    { image: piattoPasta, name: 'Grano Saraceno', desc: 'Burro nocciola, erbe alpine, salmerino' },
    { image: piattoCarne, name: 'Filetto & Tartufo', desc: 'Carne rosa, scaglie di tartufo nero' },
    { image: dolce, name: 'Mela Tradizione', desc: 'Strudel decostruito, vaniglia bourbon' },
    { image: piattoTortellini, name: 'Tortellini in Brodo', desc: 'Brodo aromatico di cappone' },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title with 3D
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

      // Hero image - cinematic
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
        y: -120,
        ease: 'none',
        scrollTrigger: {
          trigger: heroImageRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      })

      // Gallery images
      const images = galleryRef.current.querySelectorAll('.dish-image')
      images.forEach((img) => {
        gsap.fromTo(img,
          { y: 80, opacity: 0, scale: 1.05 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: img,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        )

        // Individual parallax
        gsap.to(img.querySelector('img'), {
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          }
        })
      })

      // Menu cards
      const cards = sectionRef.current.querySelectorAll('.menu-card')
      gsap.fromTo(cards,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cards[0],
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="menu" ref={sectionRef} className="relative bg-[#0a0a0a] overflow-hidden">
      {/* Intro */}
      <div className="px-8 md:px-16 lg:px-24 pt-40 md:pt-56 pb-20 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-6 mb-10">
              <span className="w-16 h-px bg-[#c9a962]/40" />
              <span className="font-sans text-[#c9a962] text-[9px] tracking-[0.6em] uppercase">
                I Menu
              </span>
            </div>
            <h2
              ref={titleRef}
              className="font-display text-[11vw] md:text-[8vw] lg:text-[5vw] text-white leading-[0.95] tracking-[-0.03em]"
              style={{ perspective: '1000px' }}
            >
              Cucina antica negli ingredienti, contemporanea nel pensiero
            </h2>
          </div>
        </div>
      </div>

      {/* Hero dish image - full bleed, ultra cinematic */}
      <div className="relative h-[70vh] md:h-[90vh] overflow-hidden" ref={heroImageRef}>
        <img
          src={dishes[0].image}
          alt={dishes[0].name}
          className="absolute inset-0 w-full h-[130%] object-cover"
        />
        {/* Luxury gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/50 via-transparent to-transparent" />

        {/* Dish info overlay */}
        <div className="absolute bottom-16 md:bottom-24 left-8 md:left-16 lg:left-24 z-10">
          <span className="font-sans text-[#c9a962] text-[9px] tracking-[0.5em] uppercase block mb-4">
            Piatto Signature
          </span>
          <span className="font-display text-5xl md:text-7xl text-white leading-none block mb-3">
            {dishes[0].name}
          </span>
          <span className="font-serif text-white/60 text-lg italic">
            {dishes[0].desc}
          </span>
        </div>
      </div>

      {/* Menu options - ultra luxury */}
      <div className="px-8 md:px-16 lg:px-24 py-32 md:py-48">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Suggestioni */}
          <div className="menu-card group relative p-10 md:p-14 border border-white/10 hover:border-[#c9a962]/30 transition-colors duration-700">
            <div className="absolute top-0 left-10 md:left-14 -translate-y-1/2">
              <span className="font-sans text-[#0a0a0a] text-[10px] tracking-[0.4em] uppercase bg-[#c9a962] px-4 py-2">
                Percorso Creativo
              </span>
            </div>
            <h3 className="font-display text-6xl md:text-7xl text-white leading-none mb-8 mt-4">
              Suggestioni
            </h3>
            <p className="font-serif text-white/60 text-xl italic leading-relaxed mb-10">
              Un viaggio attraverso la creatività dello chef.
              Otto portate che raccontano il territorio e le stagioni.
            </p>
            <div className="flex items-baseline gap-4 mb-10">
              <span className="font-display text-6xl md:text-7xl text-[#c9a962] leading-none">€135</span>
              <span className="font-sans text-white/40 text-sm tracking-wider">per persona</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <span className="px-5 py-3 border border-white/10 text-white/50 font-sans text-[9px] tracking-[0.3em] uppercase group-hover:border-[#c9a962]/30 group-hover:text-white/70 transition-all duration-500">
                8 portate
              </span>
              <span className="px-5 py-3 border border-white/10 text-white/50 font-sans text-[9px] tracking-[0.3em] uppercase group-hover:border-[#c9a962]/30 group-hover:text-white/70 transition-all duration-500">
                Abbinamento vini +€65
              </span>
            </div>
          </div>

          {/* Tradizioni */}
          <div className="menu-card group relative p-10 md:p-14 border border-white/10 hover:border-[#c9a962]/30 transition-colors duration-700">
            <div className="absolute top-0 left-10 md:left-14 -translate-y-1/2">
              <span className="font-sans text-[#0a0a0a] text-[10px] tracking-[0.4em] uppercase bg-[#c9a962] px-4 py-2">
                Tradizione Trentina
              </span>
            </div>
            <h3 className="font-display text-6xl md:text-7xl text-white leading-none mb-8 mt-4">
              Tradizioni
            </h3>
            <p className="font-serif text-white/60 text-xl italic leading-relaxed mb-10">
              I sapori autentici della cucina contadina,
              rivisitati con eleganza e rispetto per la materia prima.
            </p>
            <div className="flex items-baseline gap-4 mb-10">
              <span className="font-display text-6xl md:text-7xl text-[#c9a962] leading-none">€120</span>
              <span className="font-sans text-white/40 text-sm tracking-wider">per persona</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <span className="px-5 py-3 border border-white/10 text-white/50 font-sans text-[9px] tracking-[0.3em] uppercase group-hover:border-[#c9a962]/30 group-hover:text-white/70 transition-all duration-500">
                6 portate
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Dish gallery - dramatic masonry */}
      <div className="px-8 md:px-16 lg:px-24 pb-32 md:pb-48" ref={galleryRef}>
        <div className="mb-16 flex items-center gap-6">
          <span className="w-12 h-px bg-[#c9a962]/40" />
          <span className="font-sans text-[#c9a962] text-[9px] tracking-[0.5em] uppercase">
            Piatti Signature
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {dishes.slice(1).map((dish, i) => (
            <div
              key={dish.name}
              className={`dish-image relative overflow-hidden group cursor-pointer ${
                i === 0 ? 'md:col-span-2 aspect-[2/1]' :
                i === 3 ? 'md:col-span-2 lg:col-span-1 aspect-square' :
                'aspect-[4/3]'
              }`}
            >
              <img
                src={dish.image}
                alt={dish.name}
                className="absolute inset-0 w-full h-[120%] object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                <span className="font-display text-3xl text-white leading-none block mb-2">
                  {dish.name}
                </span>
                <span className="font-serif text-white/60 text-base italic">
                  {dish.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Special initiative - dramatic section */}
      <div className="relative py-40 md:py-56 overflow-hidden">
        {/* Background accent lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a962]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a962]/20 to-transparent" />

        <div className="px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-6 mb-10">
                <span className="w-12 h-px bg-[#c9a962]/40" />
                <span className="font-sans text-[#c9a962] text-[9px] tracking-[0.5em] uppercase">
                  Iniziativa Sociale
                </span>
              </div>
              <h3 className="font-display text-[12vw] md:text-[8vw] lg:text-[6vw] text-white leading-[0.9] mb-10">
                "Il Pane
                <span className="text-[#c9a962] block">e il Cuore"</span>
              </h3>
              <p className="font-serif text-white/60 text-2xl md:text-3xl italic leading-relaxed max-w-lg">
                L'alta cucina accessibile a tutti.
                Un gesto d'amore per la comunità.
              </p>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 flex items-center">
              <div>
                <span className="font-display text-[25vw] md:text-[15vw] text-[#c9a962]/20 leading-none block">
                  €25
                </span>
                <span className="font-sans text-white/40 text-[10px] tracking-[0.4em] uppercase block mt-4">
                  6 portate complete
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* À la carte - refined */}
      <div className="px-8 md:px-16 lg:px-24 py-24 md:py-32 border-t border-white/5">
        <div className="flex items-center gap-6 mb-16">
          <span className="w-12 h-px bg-[#c9a962]/40" />
          <span className="font-sans text-[#c9a962] text-[9px] tracking-[0.5em] uppercase">
            À La Carte
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-20">
          {[
            { label: 'Antipasti', price: '€30' },
            { label: 'Primi', price: '€31' },
            { label: 'Secondi', price: '€40' },
            { label: 'Dolci', price: '€18' },
          ].map((item) => (
            <div key={item.label} className="group">
              <span className="font-sans text-white/30 text-[9px] tracking-[0.4em] uppercase block mb-4 group-hover:text-[#c9a962]/70 transition-colors duration-500">
                {item.label}
              </span>
              <span className="font-display text-5xl md:text-6xl text-white/80 leading-none group-hover:text-white transition-colors duration-500">
                da {item.price}
              </span>
            </div>
          ))}
        </div>
        <p className="font-sans text-white/20 text-sm mt-16">Coperto €6,00</p>
      </div>
    </section>
  )
}
