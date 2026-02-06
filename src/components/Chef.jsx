import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import paoloCristina from '../assets/foto/paolo-cristina-dolomiti.webp'
import chefRitratto from '../assets/foto/chef-paolo-ritratto.webp'

gsap.registerPlugin(ScrollTrigger)

export default function Chef() {
  const sectionRef = useRef(null)
  const heroImageRef = useRef(null)
  const portraitRef = useRef(null)
  const nameRef = useRef(null)
  const bioRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Name reveal with 3D
      const nameSplit = new SplitType(nameRef.current, {
        types: 'chars',
        tagName: 'span'
      })

      gsap.fromTo(nameSplit.chars,
        { y: 180, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.6,
          stagger: 0.025,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: nameRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Hero image - cinematic entrance from dark
      gsap.fromTo(heroImageRef.current.querySelector('img'),
        { scale: 1.4, filter: 'brightness(0.2)' },
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

      // Hero image parallax
      gsap.to(heroImageRef.current.querySelector('img'), {
        y: -180,
        ease: 'none',
        scrollTrigger: {
          trigger: heroImageRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      })

      // Portrait reveal with clip-path
      gsap.fromTo(portraitRef.current,
        { clipPath: 'inset(100% 0 0 0)', scale: 1.1 },
        {
          clipPath: 'inset(0% 0 0 0)',
          scale: 1,
          duration: 1.8,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: portraitRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Bio text
      const bioElements = bioRef.current.querySelectorAll('.bio-element')
      gsap.fromTo(bioElements,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bioRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Team
      const teamItems = sectionRef.current.querySelectorAll('.team-item')
      gsap.fromTo(teamItems,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: teamItems[0],
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const team = [
    { name: 'Sebastiano Miorandi', role: 'Sous-chef' },
    { name: 'Miriam Lavina', role: 'Pastry Chef' },
    { name: 'Cristina Ganzi', role: 'Maître' },
    { name: 'Antonio Gilli', role: 'Sommelier' },
  ]

  return (
    <section id="chef" ref={sectionRef} className="relative bg-[#0a0a0a] overflow-hidden">
      {/* Hero section with name - ultra cinematic */}
      <div className="relative min-h-[100vh] flex items-end">
        {/* Fullscreen image */}
        <div className="absolute inset-0 overflow-hidden" ref={heroImageRef}>
          <img
            src={paoloCristina}
            alt="Paolo Donei e Cristina nelle Dolomiti"
            className="absolute inset-0 w-full h-[130%] object-cover"
          />
          {/* Luxury gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/60 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/30 via-transparent to-transparent" />
        </div>

        {/* Name overlay */}
        <div className="relative z-10 px-8 md:px-16 lg:px-24 pb-24 md:pb-40 w-full">
          <div className="flex items-center gap-6 mb-10">
            <span className="w-16 h-px bg-[#c9a962]/40" />
            <span className="font-sans text-[#c9a962] text-[9px] tracking-[0.6em] uppercase">
              Chef Patron
            </span>
          </div>
          <h2
            ref={nameRef}
            className="font-display text-[18vw] md:text-[14vw] lg:text-[11vw] text-white leading-[0.85] tracking-[-0.03em]"
            style={{ perspective: '1000px' }}
          >
            Paolo
            <span className="text-[#c9a962] block ml-[8%]">Donei</span>
          </h2>
        </div>

        {/* Floating age stat */}
        <div className="absolute top-16 right-8 md:right-16 lg:right-24 z-10 text-right hidden md:block">
          <div className="flex items-center gap-4">
            <div>
              <span className="font-sans text-white/30 text-[8px] tracking-[0.4em] uppercase block">
                Stella a
              </span>
              <span className="font-sans text-white/30 text-[8px] tracking-[0.4em] uppercase block">
                soli
              </span>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <span className="font-display text-7xl text-white/10 leading-none">
              19
            </span>
          </div>
        </div>
      </div>

      {/* Content section - ultra luxury */}
      <div className="relative px-8 md:px-16 lg:px-24 py-32 md:py-48">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-32">
          {/* Portrait */}
          <div className="lg:col-span-5">
            <div ref={portraitRef} className="relative aspect-[3/4] overflow-hidden">
              <img
                src={chefRitratto}
                alt="Ritratto di Chef Paolo Donei"
                className="w-full h-full object-cover"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/30 via-transparent to-transparent" />
            </div>
            {/* Caption */}
            <div className="mt-8 flex items-start gap-4">
              <span className="w-8 h-px bg-white/20 mt-3" />
              <p className="font-sans text-white/30 text-sm leading-relaxed">
                Il più giovane chef stellato nella storia d'Italia
              </p>
            </div>
          </div>

          {/* Bio */}
          <div className="lg:col-span-6 lg:col-start-7 flex flex-col justify-center" ref={bioRef}>
            <p className="bio-element font-serif text-4xl md:text-5xl lg:text-6xl text-white italic leading-[1.15] mb-12">
              A soli <span className="text-[#c9a962]">19 anni</span>, il più giovane chef stellato d'Italia.
            </p>

            <p className="bio-element font-sans text-white/50 text-base md:text-lg leading-[2] mb-16 max-w-lg">
              La sua cucina racconta il territorio: ingredienti antichi, tecniche contemporanee.
              Un equilibrio tra tradizione contadina trentina e visione creativa che ha conquistato
              la Stella Michelin per 30 anni consecutivi.
            </p>

            {/* Stats row - ultra refined */}
            <div className="bio-element flex gap-16 md:gap-24 pt-10 border-t border-white/10">
              <div>
                <span className="font-display text-6xl md:text-7xl text-[#c9a962]/30 leading-none block">
                  1994
                </span>
                <span className="font-sans text-[9px] text-white/40 tracking-[0.4em] uppercase mt-4 block">
                  Prima Stella
                </span>
              </div>
              <div>
                <span className="font-display text-6xl md:text-7xl text-white/10 leading-none block">
                  30
                </span>
                <span className="font-sans text-[9px] text-white/40 tracking-[0.4em] uppercase mt-4 block">
                  Anni Consecutivi
                </span>
              </div>
            </div>

            {/* JRE badge - refined */}
            <div className="bio-element flex items-center gap-8 mt-16">
              <div className="w-20 h-20 border border-[#c9a962]/30 flex items-center justify-center">
                <span className="font-display text-[#c9a962] text-2xl tracking-wider">JRE</span>
              </div>
              <div>
                <span className="font-sans text-white/80 text-base block mb-1">Jeunes Restaurateurs</span>
                <span className="font-sans text-white/40 text-[10px] tracking-[0.3em] uppercase">d'Europe · Membro</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team section - dark elegant */}
      <div className="relative px-8 md:px-16 lg:px-24 py-32 md:py-40 border-t border-white/5">
        {/* Background accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a]" />

        <div className="relative">
          <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <div className="flex items-center gap-6 mb-8">
                <span className="w-12 h-px bg-[#c9a962]/40" />
                <span className="font-sans text-[#c9a962] text-[9px] tracking-[0.5em] uppercase">
                  La Brigata
                </span>
              </div>
              <p className="font-serif text-3xl md:text-4xl text-white/90 italic max-w-lg">
                Un team affiatato che condivide la stessa passione per l'eccellenza.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-16 gap-y-12">
            {team.map((member, i) => (
              <div key={member.name} className="team-item group border-t border-white/10 pt-8">
                <span className="font-sans text-white/20 text-[10px] tracking-[0.4em] uppercase block mb-4">
                  0{i + 1}
                </span>
                <span className="font-display text-white text-2xl md:text-3xl block mb-3 group-hover:text-[#c9a962] transition-colors duration-700">
                  {member.name}
                </span>
                <span className="font-sans text-[#c9a962]/70 text-[10px] tracking-[0.4em] uppercase">
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
