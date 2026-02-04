import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import salaTradizionale from '../assets/foto/sala-tradizionale-legno.webp'
import naturaFoglia from '../assets/foto/natura-foglia-muschio.webp'

gsap.registerPlugin(ScrollTrigger)

export default function Storia() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const image1Ref = useRef(null)
  const image2Ref = useRef(null)
  const quoteRef = useRef(null)
  const numberRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleSplit = new SplitType(titleRef.current, {
        types: 'words',
        tagName: 'span'
      })

      gsap.set(titleSplit.words, { y: 120, opacity: 0, rotate: 5 })

      gsap.to(titleSplit.words, {
        y: 0,
        opacity: 1,
        rotate: 0,
        duration: 1.2,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      })

      // Image 1 - dramatic reveal
      gsap.fromTo(image1Ref.current,
        { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', scale: 1.4, rotate: 3 },
        {
          clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
          scale: 1,
          rotate: 0,
          duration: 1.8,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: image1Ref.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Image 2 - different animation
      gsap.fromTo(image2Ref.current,
        { x: -200, opacity: 0, rotate: -8 },
        {
          x: 0,
          opacity: 1,
          rotate: -3,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: image2Ref.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Parallax on images
      gsap.to(image1Ref.current.querySelector('img'), {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      })

      // Big number animation
      gsap.fromTo(numberRef.current,
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 0.08,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: numberRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Quote slide in
      gsap.fromTo(quoteRef.current,
        { x: 200, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="storia" ref={sectionRef} className="relative bg-cream-light overflow-hidden">
      {/* Background number */}
      <div
        ref={numberRef}
        className="absolute -top-[10vh] -left-[10vw] font-display text-[50vw] text-forest leading-none select-none pointer-events-none"
      >
        1900
      </div>

      {/* First block - irregular width */}
      <div className="relative pt-[15vh] pb-[5vh]">
        <div className="ml-[5vw] md:ml-[20vw] mr-[8vw] md:mr-[25vw]">
          <span className="font-sans text-gold text-[10px] tracking-[0.5em] uppercase block mb-8">
            Una storia di famiglia
          </span>
          <h2
            ref={titleRef}
            className="font-display text-[10vw] md:text-[7vw] text-forest leading-[0.9] tracking-[-0.02em]"
          >
            Una malga tra i boschi del Latemar che diventa leggenda
          </h2>
        </div>
      </div>

      {/* Image block - breaking grid completely */}
      <div className="relative h-[80vh] md:h-[100vh]">
        {/* Main image - oversized, bleeds */}
        <div
          ref={image1Ref}
          className="absolute top-0 right-0 w-[85vw] md:w-[65vw] h-[70vh] md:h-[90vh] overflow-hidden"
        >
          <img
            src={salaTradizionale}
            alt="Sala tradizionale in legno di Malga Panna"
            className="w-full h-[120%] object-cover"
          />
        </div>

        {/* Secondary image - overlapping */}
        <div
          ref={image2Ref}
          className="absolute bottom-[5vh] left-[3vw] md:left-[8vw] w-[45vw] md:w-[30vw] h-[35vh] md:h-[45vh] z-10 overflow-hidden shadow-2xl"
          style={{ transform: 'rotate(-3deg)' }}
        >
          <img
            src={naturaFoglia}
            alt="Dettaglio naturale"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Floating text box - unusual position */}
        <div className="absolute top-[15vh] left-[5vw] md:left-[10vw] w-[60vw] md:w-[35vw] bg-forest p-6 md:p-10 z-20">
          <span className="text-gold font-sans text-[9px] tracking-[0.4em] uppercase block mb-4">
            Il bisnonno Lattanzio
          </span>
          <p className="text-cream font-serif text-fluid-base italic leading-relaxed">
            Costruì questa malga. La panna che produceva era così straordinariamente buona da dare il nome al luogo.
          </p>
          <div className="flex items-center gap-3 mt-6">
            <span className="w-12 h-px bg-gold/50" />
            <span className="text-cream/60 font-sans text-[10px] tracking-wider">
              Inizio '900
            </span>
          </div>
        </div>
      </div>

      {/* Text section - radically offset */}
      <div className="relative py-[10vh]">
        <div className="ml-[50vw] md:ml-[55vw] mr-[5vw] md:mr-[10vw]">
          <p className="text-forest font-sans text-fluid-base leading-[1.8] mb-8">
            Quattro generazioni hanno custodito questo luogo a 1.400 metri.
          </p>
          <p className="text-forest/80 font-sans text-fluid-sm leading-relaxed">
            Dai genitori che aprirono la trattoria per i primi villeggianti, fino a oggi.
            Nel <strong className="text-forest">1994</strong>, Paolo Donei — a soli 19 anni —
            diventa il più giovane chef d'Italia a ricevere la Stella Michelin.
          </p>
        </div>

        {/* Big stat - floating */}
        <div className="absolute top-[5vh] left-[8vw] md:left-[15vw]">
          <span className="font-display text-[20vw] md:text-[15vw] text-gold/20 leading-none">30</span>
          <span className="block font-sans text-[10px] text-forest/70 tracking-[0.3em] uppercase ml-2">
            Stelle consecutive
          </span>
        </div>
      </div>

      {/* Quote - full width but offset */}
      <div className="relative py-[15vh] bg-forest -mx-[5vw] px-[5vw] skew-y-1">
        <div className="skew-y-[-1deg]">
          <div ref={quoteRef} className="ml-[10vw] md:ml-[25vw] mr-[5vw] md:mr-[15vw]">
            <span className="absolute -top-[5vh] left-[5vw] text-gold/10 font-display text-[40vw] leading-none select-none">
              "
            </span>
            <blockquote className="relative z-10">
              <p className="font-serif text-[7vw] md:text-[4vw] text-cream italic leading-[1.2]">
                Il cuoco non è una star,
                <span className="text-gold block mt-2">è il cliente ad esserlo</span>
              </p>
              <footer className="mt-10 flex items-center gap-6">
                <span className="w-20 h-px bg-gold/50" />
                <span className="font-sans text-[11px] text-cream/80 tracking-[0.3em] uppercase">
                  Paolo Donei
                </span>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>

      {/* Tags - scattered */}
      <div className="relative py-[10vh]">
        <div className="flex flex-wrap gap-4 ml-[15vw] mr-[30vw]">
          {['Tradizione Trentina', 'Creatività', 'Ospitalità'].map((tag, i) => (
            <span
              key={tag}
              className="px-6 py-3 border border-forest/30 text-forest font-sans text-[11px] tracking-[0.2em] uppercase hover:bg-forest hover:text-cream hover:border-forest transition-all duration-500"
              style={{ transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)` }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-[30vh] right-[5vw] w-px h-[40vh] bg-gradient-to-b from-gold/20 via-gold/10 to-transparent hidden lg:block" />
      <div className="absolute bottom-[20vh] left-[40vw] w-32 h-32 border border-forest/5 rounded-full hidden lg:block" />
    </section>
  )
}
