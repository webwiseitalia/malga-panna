import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import paoloCristina from '../assets/foto/paolo-cristina-dolomiti.webp'
import chefRitratto from '../assets/foto/chef-paolo-ritratto.webp'

gsap.registerPlugin(ScrollTrigger)

export default function Chef() {
  const sectionRef = useRef(null)
  const image1Ref = useRef(null)
  const image2Ref = useRef(null)
  const nameRef = useRef(null)
  const bioRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Name reveal - dramatic
      gsap.fromTo(nameRef.current,
        { y: 300, opacity: 0, skewY: 10 },
        {
          y: 0,
          opacity: 1,
          skewY: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: nameRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Image 1 - scale from corner
      gsap.fromTo(image1Ref.current,
        { clipPath: 'circle(0% at 100% 0%)', scale: 1.3 },
        {
          clipPath: 'circle(150% at 100% 0%)',
          scale: 1,
          duration: 2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: image1Ref.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Image 2 - slide and rotate
      gsap.fromTo(image2Ref.current,
        { x: 200, rotate: 15, opacity: 0 },
        {
          x: 0,
          rotate: 5,
          opacity: 1,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: image2Ref.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Bio text stagger
      const bioLines = bioRef.current.querySelectorAll('p')
      gsap.fromTo(bioLines,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bioRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Team members stagger with rotation
      const teamItems = sectionRef.current.querySelectorAll('.team-item')
      teamItems.forEach((item, i) => {
        gsap.fromTo(item,
          { y: 100, opacity: 0, rotate: i % 2 === 0 ? 5 : -5 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })

      // Parallax on images
      gsap.to(image1Ref.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      })

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
    <section id="chef" ref={sectionRef} className="relative bg-forest overflow-hidden">
      {/* Giant name - positioned wildly */}
      <div
        ref={nameRef}
        className="absolute top-[5vh] -left-[5vw] z-30 pointer-events-none"
      >
        <span className="font-display text-[25vw] md:text-[18vw] text-transparent leading-[0.85] tracking-[-0.03em]"
          style={{ WebkitTextStroke: '1px rgba(197, 160, 40, 0.3)' }}
        >
          Paolo
        </span>
        <span className="block font-display text-[25vw] md:text-[18vw] text-gold/20 leading-[0.85] tracking-[-0.03em] -mt-[5vw] ml-[20vw]">
          Donei
        </span>
      </div>

      {/* Main image - irregular position */}
      <div
        ref={image1Ref}
        className="relative ml-[25vw] md:ml-[35vw] w-[75vw] md:w-[55vw] h-[90vh] overflow-hidden"
      >
        <img
          src={paoloCristina}
          alt="Paolo Donei e Cristina Ganzi"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest via-transparent to-transparent" />
      </div>

      {/* Secondary image - overlapping */}
      <div
        ref={image2Ref}
        className="absolute bottom-[15vh] left-[5vw] w-[40vw] md:w-[25vw] h-[50vh] z-20 overflow-hidden"
        style={{ transform: 'rotate(5deg)' }}
      >
        <img
          src={chefRitratto}
          alt="Chef Paolo ritratto"
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
        />
        <div className="absolute inset-0 border border-gold/20" />
      </div>

      {/* Bio content - unusual positioning */}
      <div className="absolute top-[20vh] left-[8vw] w-[35vw] md:w-[25vw] z-20">
        <span className="font-sans text-gold text-[9px] tracking-[0.5em] uppercase block mb-6">
          Chef Patron
        </span>
        <div ref={bioRef} className="space-y-6">
          <p className="text-cream font-serif text-fluid-lg italic leading-relaxed">
            A soli <span className="text-gold">19 anni</span>, diventa
            il più giovane chef d'Italia a ricevere la Stella Michelin.
          </p>
          <p className="text-cream/70 font-sans text-fluid-xs leading-relaxed">
            La sua cucina racconta il territorio: ingredienti antichi, tecniche contemporanee.
          </p>
        </div>
      </div>

      {/* Stats - scattered wildly */}
      <div className="absolute top-[60vh] right-[8vw] z-20">
        <span className="font-display text-[15vw] md:text-[10vw] text-gold leading-none">1994</span>
        <span className="block text-cream/70 font-sans text-[9px] tracking-[0.3em] uppercase mt-2">
          Prima stella
        </span>
      </div>

      <div className="absolute top-[75vh] right-[30vw] z-20">
        <span className="font-display text-[10vw] md:text-[6vw] text-cream/30 leading-none">30</span>
        <span className="block text-cream/50 font-sans text-[9px] tracking-[0.3em] uppercase mt-1">
          Consecutive
        </span>
      </div>

      {/* Team section - broken layout */}
      <div className="relative py-[15vh] mt-[10vh]">
        <div className="ml-[55vw] mr-[5vw] mb-12">
          <span className="font-sans text-gold text-[10px] tracking-[0.4em] uppercase">
            La Brigata
          </span>
        </div>

        <div className="relative">
          {team.map((member, i) => (
            <div
              key={member.name}
              className="team-item"
              style={{
                marginLeft: `${10 + (i * 18)}vw`,
                marginTop: i > 0 ? '-3vh' : '0',
              }}
            >
              <div className="flex items-center gap-6 group">
                <div className="w-16 h-16 border border-cream/10 flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition-all duration-500">
                  <span className="font-display text-fluid-lg text-cream/70 group-hover:text-forest transition-colors duration-500">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <span className="font-serif text-cream text-fluid-sm block mb-1">
                    {member.name}
                  </span>
                  <span className="font-sans text-gold text-[9px] tracking-[0.2em] uppercase">
                    {member.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* JRE badge - floating */}
      <div className="absolute bottom-[10vh] right-[15vw] z-20">
        <div className="px-6 py-4 border border-gold/30 backdrop-blur-sm">
          <span className="font-display text-gold text-fluid-xl">JRE</span>
          <span className="block font-sans text-cream/70 text-[9px] tracking-[0.2em] uppercase mt-1">
            Membro
          </span>
        </div>
      </div>

      {/* Decorative */}
      <div className="absolute top-[40vh] left-[50vw] w-px h-[30vh] bg-gradient-to-b from-gold/20 to-transparent" />
      <div className="absolute bottom-[30vh] left-[30vw] w-20 h-20 border border-cream/5 rounded-full" />
      <div className="absolute top-[25vh] right-[20vw] w-2 h-2 bg-gold/40" />
    </section>
  )
}
