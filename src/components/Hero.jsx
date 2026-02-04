import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import heroImage from '../assets/foto/chef-paolo-dolomiti-cane.webp'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  const imageRef = useRef(null)
  const overlayRef = useRef(null)
  const floatingTextRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const headlineSplit = new SplitType(headlineRef.current, {
        types: 'chars',
        tagName: 'span'
      })

      gsap.set(headlineSplit.chars, { y: 200, opacity: 0, rotateX: -90, rotateY: 15 })
      gsap.set(imageRef.current, { scale: 1.5, x: 100 })
      gsap.set(overlayRef.current, { opacity: 1 })
      gsap.set(floatingTextRef.current, { x: '100%', opacity: 0 })

      const tl = gsap.timeline({ delay: 0.2 })

      tl.to(overlayRef.current, {
        opacity: 0.3,
        duration: 2,
        ease: 'power2.out'
      })
      .to(imageRef.current, {
        scale: 1.1,
        x: 0,
        duration: 2.5,
        ease: 'power2.out'
      }, '<')
      .to(headlineSplit.chars, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        rotateY: 0,
        duration: 1.4,
        stagger: {
          each: 0.02,
          from: 'random'
        },
        ease: 'power4.out'
      }, '-=1.5')
      .to(floatingTextRef.current, {
        x: '0%',
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out'
      }, '-=0.8')

      // Intense parallax
      gsap.to(imageRef.current, {
        y: 300,
        scale: 1.3,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5
        }
      })

      gsap.to(headlineRef.current, {
        y: -200,
        x: -100,
        rotate: -3,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.3
        }
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative h-[120vh] min-h-[900px] overflow-hidden">
      {/* Image - breaks out of container */}
      <div className="absolute -top-[10vh] -right-[15vw] w-[90vw] h-[130vh] overflow-hidden">
        <img
          ref={imageRef}
          src={heroImage}
          alt="Chef Paolo Donei"
          className="w-full h-full object-cover"
        />
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/40 to-transparent"
        />
      </div>

      {/* Massive headline - positioned irregularly */}
      <div className="absolute bottom-[5vh] -left-[5vw] z-20">
        <h1
          ref={headlineRef}
          className="font-display text-[18vw] md:text-[15vw] text-white leading-[0.8] tracking-[-0.04em] mix-blend-difference"
          style={{ perspective: '1000px' }}
        >
          Alta<br />
          <span className="ml-[15vw]">quota</span>
        </h1>
      </div>

      {/* Floating vertical text */}
      <div
        ref={floatingTextRef}
        className="absolute top-[20vh] left-[8vw] z-10"
        style={{ writingMode: 'vertical-rl' }}
      >
        <span className="font-sans text-[10px] tracking-[0.5em] text-white/70 uppercase">
          Ristorante Stellato Michelin
        </span>
      </div>

      {/* Scattered elements */}
      <div className="absolute top-[15vh] right-[25vw] z-30">
        <div className="flex items-center gap-2 px-5 py-3 bg-black/30 backdrop-blur-sm border border-white/10">
          <span className="text-gold text-xl">★</span>
          <span className="text-white font-sans text-[9px] tracking-[0.4em] uppercase">
            Dal 1994
          </span>
        </div>
      </div>

      {/* Altitude marker - floating */}
      <div className="absolute bottom-[35vh] right-[8vw] z-20">
        <span className="font-display text-[8vw] text-white/30 leading-none">
          1400
        </span>
        <span className="block text-right font-sans text-[10px] text-white/60 tracking-[0.3em] uppercase -mt-2">
          metri
        </span>
      </div>

      {/* Irregular decorative line */}
      <div className="absolute top-[40vh] left-[3vw] w-px h-[30vh] bg-gradient-to-b from-transparent via-gold/40 to-transparent" />

      {/* CTA - unusual position */}
      <div className="absolute bottom-[15vh] right-[5vw] z-30">
        <a
          href="#prenota"
          className="group flex items-center gap-6"
        >
          <span className="font-sans text-[11px] text-white tracking-[0.4em] uppercase">
            Prenota
          </span>
          <span className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition-all duration-700">
            <svg
              className="w-5 h-5 text-white group-hover:text-forest transition-colors duration-500 rotate-[-45deg] group-hover:rotate-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </a>
      </div>

      {/* Subline - offset position */}
      <div className="absolute bottom-[25vh] left-[20vw] md:left-[30vw] z-20 max-w-xs">
        <p className="font-serif text-fluid-lg text-white/80 italic leading-relaxed">
          Dove tradizione contadina
          <span className="text-gold block">incontra l'alta cucina</span>
        </p>
      </div>

      {/* Random geometric */}
      <div className="absolute top-[60vh] left-[12vw] w-24 h-24 border border-gold/10 rotate-45 hidden md:block" />
      <div className="absolute bottom-[50vh] right-[35vw] w-3 h-3 bg-gold/30 hidden md:block" />
    </section>
  )
}
