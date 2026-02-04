import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import piattoUovo from '../assets/foto/piatto-uovo-polenta-tartufo.webp'
import piattoLumache from '../assets/foto/piatto-lumache-bourguignonne.webp'
import piattoPasta from '../assets/foto/piatto-pasta-grano-saraceno.webp'
import piattoCarne from '../assets/foto/piatto-carne-tartufo.webp'
import dolce from '../assets/foto/dolce-mela-strudel.webp'
import piattoTortellini from '../assets/foto/piatto-tortellini-brodo.webp'

gsap.registerPlugin(ScrollTrigger)

export default function Menu() {
  const sectionRef = useRef(null)
  const horizontalRef = useRef(null)
  const titleRef = useRef(null)

  const signatureDishes = [
    { image: piattoUovo, name: 'Uovo in Crosta', desc: 'Polenta, spinaci, tartufo', rotation: -3 },
    { image: piattoLumache, name: 'Lumache', desc: 'Bourguignonne, mais croccante', rotation: 2 },
    { image: piattoPasta, name: 'Grano Saraceno', desc: 'Burro, erbe, salmerino', rotation: -1 },
    { image: piattoCarne, name: 'Carne & Tartufo', desc: 'Scaglie di tartufo nero', rotation: 4 },
    { image: dolce, name: 'Mela Tradizione', desc: 'Pasta frolla, vaniglia', rotation: -2 },
    { image: piattoTortellini, name: 'Tortellini', desc: 'Brodo aromatico', rotation: 1 },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { x: -200, opacity: 0, skewX: -10 },
        {
          x: 0,
          opacity: 1,
          skewX: 0,
          duration: 1.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Horizontal scroll
      const horizontal = horizontalRef.current
      const dishes = horizontal.querySelectorAll('.dish-card')
      const totalWidth = horizontal.scrollWidth - window.innerWidth

      gsap.to(dishes, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: horizontal,
          pin: true,
          scrub: 1,
          end: () => `+=${totalWidth}`,
        }
      })

      // Individual dish animations
      dishes.forEach((dish, i) => {
        gsap.fromTo(dish,
          { rotate: signatureDishes[i].rotation * 2, scale: 0.9 },
          {
            rotate: signatureDishes[i].rotation,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: horizontal,
              start: 'top top',
              end: () => `+=${totalWidth}`,
              scrub: 1
            }
          }
        )
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="menu" ref={sectionRef} className="relative bg-cream-light overflow-hidden">
      {/* Intro section - irregular layout */}
      <div className="relative py-[20vh]">
        {/* Background text */}
        <div className="absolute top-[5vh] -right-[10vw] font-display text-[30vw] text-forest/[0.03] leading-none pointer-events-none">
          MENU
        </div>

        <div className="ml-[8vw] mr-[40vw] md:mr-[50vw]">
          <span className="font-sans text-gold text-[9px] tracking-[0.5em] uppercase block mb-8">
            I Menu
          </span>
          <h2
            ref={titleRef}
            className="font-display text-[12vw] md:text-[8vw] text-forest leading-[0.9]"
          >
            Cucina antica
            <span className="text-gold italic block ml-[10vw]">negli ingredienti</span>
          </h2>
        </div>

        <div className="absolute top-[30vh] right-[8vw] w-[30vw] md:w-[20vw]">
          <p className="font-sans text-forest/80 text-fluid-xs leading-relaxed">
            Contemporanea nel pensiero. Ogni piatto racconta la montagna.
          </p>
        </div>

        {/* Menu cards - wild positions */}
        <div className="mt-[15vh] relative">
          <div className="ml-[5vw] mr-[55vw]">
            <div className="relative group" style={{ transform: 'rotate(-2deg)' }}>
              <div className="absolute -inset-3 bg-forest/5 translate-x-3 translate-y-3" />
              <div className="relative bg-white p-8 md:p-10 border border-forest/10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="font-sans text-gold text-[9px] tracking-[0.3em] uppercase block mb-2">
                      Percorso Creativo
                    </span>
                    <h3 className="font-display text-fluid-xl text-forest">Suggestioni</h3>
                  </div>
                  <span className="font-display text-[8vw] md:text-[4vw] text-gold/30 leading-none">€135</span>
                </div>
                <p className="text-forest/70 font-sans text-fluid-xs leading-relaxed">
                  Un viaggio attraverso la creatività dello chef.
                </p>
              </div>
            </div>
          </div>

          <div className="absolute top-[5vh] right-[8vw] w-[35vw] md:w-[30vw]" style={{ transform: 'rotate(3deg)' }}>
            <div className="bg-forest p-8 md:p-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="font-sans text-gold text-[9px] tracking-[0.3em] uppercase block mb-2">
                    Tradizione
                  </span>
                  <h3 className="font-display text-fluid-xl text-cream">Tradizioni</h3>
                </div>
                <span className="font-display text-[8vw] md:text-[4vw] text-gold/40 leading-none">€120</span>
              </div>
              <p className="text-cream/80 font-sans text-fluid-xs leading-relaxed">
                I sapori della cucina contadina trentina.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal scroll header */}
      <div className="ml-[60vw] mr-[5vw] py-8">
        <span className="font-display text-fluid-lg text-forest">Piatti Signature</span>
        <span className="block font-sans text-forest/60 text-[10px] tracking-[0.3em] uppercase mt-2">
          Scorri →
        </span>
      </div>

      {/* Horizontal scroll gallery - chaotic */}
      <div ref={horizontalRef} className="flex h-[85vh] items-center pl-[10vw]">
        {signatureDishes.map((dish, i) => (
          <div
            key={i}
            className="dish-card flex-shrink-0 relative mr-[-5vw]"
            style={{
              width: i % 2 === 0 ? '60vw' : '45vw',
              height: i % 3 === 0 ? '70vh' : i % 3 === 1 ? '55vh' : '65vh',
              marginTop: `${(i % 3) * 8 - 10}vh`,
              transform: `rotate(${dish.rotation}deg)`,
              zIndex: 10 - i,
            }}
          >
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </div>

            <div className="absolute bottom-8 left-8 right-8">
              <span className="font-display text-[6vw] md:text-[3vw] text-white leading-none block mb-2">
                {dish.name}
              </span>
              <span className="font-sans text-white/80 text-[11px] tracking-wider">
                {dish.desc}
              </span>
            </div>

            <div className="absolute top-6 right-6">
              <span className="font-display text-[10vw] md:text-[5vw] text-white/10 leading-none">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Special initiative - skewed */}
      <div className="relative py-[15vh] -skew-y-2 bg-forest my-[10vh]">
        <div className="skew-y-2">
          <div className="ml-[15vw] mr-[10vw] md:mr-[40vw]">
            <span className="font-sans text-gold text-[9px] tracking-[0.5em] uppercase block mb-4">
              Iniziativa Speciale
            </span>
            <h3 className="font-display text-[8vw] md:text-[4vw] text-cream leading-[1.1] mb-6">
              "Il Pane e il Cuore"
            </h3>
            <p className="font-sans text-cream/80 text-fluid-sm leading-relaxed mb-4">
              L'alta cucina accessibile a tutti.
            </p>
            <p className="font-display text-gold text-fluid-xl">
              6 portate — €25
            </p>
          </div>

          <div className="absolute top-[20%] right-[10vw] font-display text-[20vw] text-cream/[0.03] leading-none pointer-events-none">
            €25
          </div>
        </div>
      </div>

      {/* Prices - scattered */}
      <div className="relative py-[10vh]">
        <div className="flex flex-wrap">
          {[
            { label: 'Antipasti', price: '€30', left: '10vw', top: '0' },
            { label: 'Primi', price: '€31', left: '35vw', top: '5vh' },
            { label: 'Secondi', price: '€40', left: '55vw', top: '-2vh' },
            { label: 'Dolci', price: '€18', left: '78vw', top: '8vh' },
          ].map((item) => (
            <div
              key={item.label}
              className="absolute"
              style={{ left: item.left, top: item.top }}
            >
              <span className="font-sans text-forest/60 text-[9px] tracking-[0.3em] uppercase block mb-2">
                {item.label}
              </span>
              <span className="font-display text-fluid-xl text-forest">
                da {item.price}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-[20vh] ml-[50vw]">
          <span className="font-sans text-forest/60 text-[11px] tracking-wider">
            Coperto €6,00
          </span>
        </div>
      </div>

      {/* Decorative */}
      <div className="absolute top-[50vh] left-[3vw] w-px h-[30vh] bg-gradient-to-b from-gold/30 to-transparent" />
    </section>
  )
}
