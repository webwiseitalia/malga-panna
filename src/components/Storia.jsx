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
  const yearRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal with 3D rotation
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

      // Image 1 - cinematic scale reveal from dark
      gsap.fromTo(image1Ref.current.querySelector('img'),
        { scale: 1.4, filter: 'brightness(0.3)' },
        {
          scale: 1,
          filter: 'brightness(1)',
          duration: 2.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: image1Ref.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Image 1 parallax
      gsap.to(image1Ref.current.querySelector('img'), {
        y: -150,
        ease: 'none',
        scrollTrigger: {
          trigger: image1Ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      })

      // Year counter animation
      gsap.fromTo(yearRef.current,
        { innerText: 1900 },
        {
          innerText: 1994,
          duration: 2,
          ease: 'power2.out',
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: yearRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Image 2 - fade reveal
      gsap.fromTo(image2Ref.current,
        { opacity: 0, y: 80, scale: 1.05 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: image2Ref.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Quote - dramatic reveal
      const quoteSplit = new SplitType(quoteRef.current, {
        types: 'words',
        tagName: 'span'
      })

      gsap.fromTo(quoteSplit.words,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.04,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="storia" ref={sectionRef} className="relative bg-[#0a0a0a] overflow-hidden">
      {/* Intro - ultra generous spacing */}
      <div className="px-8 md:px-16 lg:px-24 pt-40 md:pt-56 pb-20 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <span className="font-sans text-[#c9a962] text-[9px] tracking-[0.6em] uppercase block mb-10">
              La Nostra Storia
            </span>
            <h2
              ref={titleRef}
              className="font-display text-[12vw] md:text-[8vw] lg:text-[5.5vw] text-white leading-[0.95] tracking-[-0.03em]"
              style={{ perspective: '1000px' }}
            >
              Una malga tra i boschi che diventa leggenda
            </h2>
          </div>
          <div className="lg:col-span-3 lg:col-start-10 flex items-end">
            <div className="hidden lg:block">
              <span className="font-display text-[8vw] text-white/5 leading-none block">
                1900
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero image - full width, ultra dramatic */}
      <div className="relative h-[80vh] md:h-[90vh] overflow-hidden" ref={image1Ref}>
        <img
          src={salaTradizionale}
          alt="La sala tradizionale in legno"
          className="absolute inset-0 w-full h-[130%] object-cover"
        />
        {/* Luxury gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/50 via-transparent to-transparent" />

        {/* Floating caption */}
        <div className="absolute bottom-16 left-8 md:left-16 lg:left-24 z-10">
          <span className="font-sans text-white/40 text-[9px] tracking-[0.4em] uppercase block mb-2">
            La Sala Storica
          </span>
          <span className="font-display text-white/80 text-2xl md:text-3xl">
            Legno antico, calore alpino
          </span>
        </div>
      </div>

      {/* Story content - luxury layout */}
      <div className="px-8 md:px-16 lg:px-24 py-32 md:py-48">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-32">
          {/* Text column */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <div className="flex items-center gap-6 mb-12">
                <span className="w-16 h-px bg-[#c9a962]/40" />
                <span className="font-sans text-[#c9a962] text-[9px] tracking-[0.5em] uppercase">
                  Il bisnonno Lattanzio
                </span>
              </div>

              <p className="font-serif text-3xl md:text-4xl text-white/90 italic leading-[1.3] mb-10">
                Costruì questa malga. La panna che produceva era così straordinariamente buona
                da dare il nome al luogo.
              </p>

              <p className="font-sans text-white/50 text-base leading-[2] mb-16">
                Quattro generazioni hanno custodito questo luogo a 1.400 metri di altitudine.
                Dai genitori che aprirono la trattoria per i primi villeggianti, fino ad oggi,
                dove la tradizione incontra l'eccellenza gastronomica.
              </p>

              {/* Stats - ultra refined */}
              <div className="flex gap-20">
                <div>
                  <span ref={yearRef} className="font-display text-7xl md:text-8xl text-[#c9a962]/30 leading-none block">
                    1994
                  </span>
                  <span className="font-sans text-[9px] text-white/40 tracking-[0.4em] uppercase mt-4 block">
                    Prima Stella
                  </span>
                </div>
                <div>
                  <span className="font-display text-7xl md:text-8xl text-white/10 leading-none block">
                    30
                  </span>
                  <span className="font-sans text-[9px] text-white/40 tracking-[0.4em] uppercase mt-4 block">
                    Anni Consecutivi
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Image column */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div ref={image2Ref} className="relative aspect-[3/4] overflow-hidden">
              <img
                src={naturaFoglia}
                alt="Dettaglio della natura circostante"
                className="w-full h-full object-cover"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 via-transparent to-transparent" />
            </div>
            <div className="mt-8 flex items-start gap-4">
              <span className="w-8 h-px bg-white/20 mt-3" />
              <p className="font-sans text-white/30 text-sm leading-relaxed max-w-xs">
                I boschi del Latemar che circondano la malga, patrimonio mondiale UNESCO.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quote section - ultra dramatic */}
      <div className="relative py-40 md:py-56 overflow-hidden">
        {/* Background accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a962]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c9a962]/20 to-transparent" />

        {/* Giant decorative quote */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <span className="font-display text-[40vw] text-white/[0.02] leading-none">"</span>
        </div>

        <div className="relative px-8 md:px-16 lg:px-24">
          <div className="max-w-5xl mx-auto text-center">
            <blockquote>
              <p
                ref={quoteRef}
                className="font-serif text-[7vw] md:text-[5vw] lg:text-[3.5vw] text-white italic leading-[1.2]"
              >
                Il cuoco non è una star,
                <span className="text-[#c9a962] block mt-6">è il cliente ad esserlo</span>
              </p>
              <footer className="mt-20 flex flex-col items-center gap-6">
                <span className="w-px h-16 bg-gradient-to-b from-transparent via-[#c9a962]/40 to-[#c9a962]" />
                <div className="text-center">
                  <span className="font-display text-xl text-white block mb-1">
                    Paolo Donei
                  </span>
                  <span className="font-sans text-[9px] text-white/40 tracking-[0.4em] uppercase">
                    Chef Patron
                  </span>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
