import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const Hero = () => {
  const h1Ref = useRef(null)
  const h6Ref = useRef(null)

  useEffect(() => {
    // Animate the h1 and h6 elements
    gsap.fromTo(
      h1Ref.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, delay: 1, ease: "power2.out" }
    )

    gsap.fromTo(
      h6Ref.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, delay: 1.5, ease: "power2.out" }
    )
  }, [])

  return (
    <section className="relative w-full h-[100vh] overflow-hidden bg-black">
      {/* Northern Lights Background */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-b from-black to-gray-900">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ededed] via-[#0874f0] to-[#f10ef1] opacity-50 filter blur-[100px] animate-northern-lights" />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <h1
          ref={h1Ref}
          className="text-white text-[6em] md:text-[12em] font-bold text-center text-shadow-sm"
        >
          Infinite Pixel
        </h1>
        <h6
          ref={h6Ref}
          className="text-white text-[1.5em] md:text-[2em] text-center capitalize"
        >
          Affordable custom web design for small businesses
        </h6>
      </div>

      <style>{`
        @keyframes northern-lights {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-northern-lights {
          animation: northern-lights 10s ease-in-out infinite;
          background-size: 200% 200%;
        }
      `}</style>
    </section>
  )
}
export default Hero
