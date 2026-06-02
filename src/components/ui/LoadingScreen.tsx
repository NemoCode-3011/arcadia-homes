import { useEffect, useState } from "react"
import logo from "../../assets/logo-img-5.png"

interface LoadingScreenProps {
  onComplete: () => void
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [visibleLetters, setVisibleLetters] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

  const word = "ARCADIA"

  useEffect(() => {
    // reveal one letter every 150ms
    const letterInterval = setInterval(() => {
      setVisibleLetters((prev) => {
        if (prev >= word.length) {
          clearInterval(letterInterval)
          return prev
        }
        return prev + 1
      })
    }, 250)

    // after all letters shown — wait then fade out
    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, 3000)

    // after fade out — tell parent we're done
    const completeTimer = setTimeout(() => {
      onComplete()
    }, 3800)

    return () => {
      clearInterval(letterInterval)
      clearTimeout(fadeTimer)
      clearTimeout(completeTimer)
    }
  }, [])

  return (
    <div
      className={`fixed inset-0 z-100 flex flex-col items-center justify-center bg-arcadia-charcoal transition-opacity duration-700 ${fadeOut ? "opacity-0" : "opacity-100"
        }`}
    >
      {/* The Logo */}
      <img
        src={logo}
        alt="Arcadia"
        className="h-30 w-auto object-contain mb-8 opacity-80"
      />

      {/* Animated Letters  */}
      <div className="flex items-center gap-2">
        {word.split("").map((letter, index) => (
          <span
            key={index}
            className={`text-4xl lg:text-6xl font-semibold tracking-[0.3em] transition-all duration-300 ${index < visibleLetters
                ? "opacity-100 translate-y-0 text-arcadia-cream"
                : "opacity-0 translate-y-4"
              }`}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Tagline that fades in after all letters */}
      <p
        className={`text-xs tracking-[0.4em] text-arcadia-moss uppercase mt-4 transition-all duration-700 ${visibleLetters >= word.length
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2"
          }`}
      >
        Modern Nature Residences
      </p>
      {/* Bottom line animation */}
      <div className="absolute bottom-12 flex flex-col items-center gap-2">
        <div
          className={`h-px bg-arcadia-moss transition-all duration-1000 ${visibleLetters >= word.length ? "w-24" : "w-0"
            }`}
        />
      </div>

    </div>
  )
}

export default LoadingScreen