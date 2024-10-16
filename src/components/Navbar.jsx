import { useEffect, useRef } from "react"
import { FaBars, FaTimes } from "react-icons/fa"
import gsap from "gsap"
import ReactLogo from "../assets/logo.svg"

const Navbar = () => {
  const isOpen = useRef(false) // Use useRef to manage menu state
  const isOverBg = useRef(false) // Use useRef to track background state
  const textRef = useRef(null)

  // Toggle the mobile menu open/closed and manage scroll
  const toggleMenu = () => {
    isOpen.current = !isOpen.current
    document.body.classList.toggle("overflow-hidden", isOpen.current)
  }

  // Close the mobile menu and re-enable scrolling
  const closeMenu = () => {
    isOpen.current = false
    document.body.classList.remove("overflow-hidden")
  }

  // Detect scroll and check if the navbar is over the specific background
  useEffect(() => {
    const handleScroll = () => {
      const targetSection = document.querySelector(".bg-target")
      if (targetSection) {
        const { top, bottom } = targetSection.getBoundingClientRect()
        isOverBg.current = top <= 0 && bottom >= 0
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // GSAP animation for hover
  useEffect(() => {
    const textElement = textRef.current
    const hoverAnimation = (color) =>
      gsap.to(textElement, {
        color,
        duration: color === "#ff6347" ? 0.1 : 0.2,
        ease: "power1.inOut",
      })

    if (textElement) {
      textElement.addEventListener("mouseenter", () =>
        hoverAnimation("#ff6347")
      )
      textElement.addEventListener("mouseleave", () =>
        hoverAnimation(isOverBg.current ? "#083344" : "#F1F5F9")
      )
    }

    return () => {
      if (textElement) {
        textElement.removeEventListener("mouseenter", null)
        textElement.removeEventListener("mouseleave", null)
      }
    }
  }, [isOverBg.current])

  return (
    <nav className="fixed top-0 left-0 z-50 flex items-center justify-between w-full p-4 bg-transparent">
      <div className="flex items-center">
        <img src={ReactLogo} alt="React Logo" className="h-8 w-15" />
      </div>

      <div className="flex items-center ml-auto">
        <a
          href="#"
          ref={textRef}
          className={`z-20 hidden mr-4 text-lg font-semibold transition duration-300 md:block ${
            isOverBg.current ? "text-cyan-950" : "text-slate-100"
          }`}
        >
          Let&apos;s Create Something Together
        </a>
        <button
          onClick={toggleMenu}
          className={`z-50 text-2xl transition-transform duration-300 transform focus:outline-none ${
            isOverBg.current ? "text-cyan-950" : "text-white"
          }`}
          aria-label="Menu button"
        >
          <div
            className={`transition-transform duration-300 ${
              isOpen.current ? "rotate-90" : "rotate-0"
            }`}
          >
            {isOpen.current ? <FaTimes /> : <FaBars />}
          </div>
        </button>
      </div>

      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
          isOpen.current
            ? "bg-black opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <ul
          className="relative space-y-10 text-6xl text-white transition-transform duration-500 transform"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the list
        >
          <li className="absolute left-0 text-2xl -top-10">Menu</li>
          {["About", "Our Projects", "Contact Us"].map((item) => (
            <li
              key={item}
              onClick={closeMenu}
              className="cursor-pointer hover:underline"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
