import { useState, useEffect } from "react"

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: "iPhone 17",
      subtitle: "Premium quality, premium experience",
      description: "The future is here",
      image: "/images/Product-7.png",
      buttonText: "Explore Now",
      buttonColor: "from-orange-600 to-red-600"
    },
    {
      id: 2,
      title: "Just Do It",
      subtitle: "Nike Premium Collection",
      description: "Experience premium quality and style",
      image: "/images/Product-9.jpg",
      buttonText: "Shop Nike",
      buttonColor: "from-red-500 to-red-600"
    },
    {
      id: 3,
      title: "Music & Instruments",
      subtitle: "Professional Audio Equipment",
      description: "Discover premium musical instruments and audio gear",
      image: "/images/Product-11.jpg",
      buttonText: "Explore Music",
      buttonColor: "from-amber-600 to-orange-700"
    },
    {
      id: 4,
      title: "Premium Men's Fragrances",
      subtitle: "Legendary Brands",
      description: "American Quality",
      image: "/images/Product-10.jpg",
      buttonText: "Explore",
      buttonColor: "from-gray-600 to-gray-800"
    },
    {
      id: 5,
      title: "Harman Kardon",
      subtitle: "Premium Audio Experience",
      description: "Immerse yourself in crystal clear sound quality",
      image: "/images/Product-8.png",
      buttonText: "Discover Sound",
      buttonColor: "from-slate-600 to-slate-800"
    }
  ]

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentSlide((prev) => (prev + 1) % slides.length)
  //   }, 5000)

  //   return () => clearInterval(timer)
  // }, [slides.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  return (
    <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] mb-8">
      <div className="relative w-full h-full overflow-hidden rounded-2xl">
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="w-full h-full flex-shrink-0 relative"
          >
            <div className="w-full h-full relative">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              
              <div className={`absolute inset-0 flex items-center ${slide.id === 2 || slide.id === 3 || slide.id === 4 ? 'justify-start pl-8' : 'justify-end pr-8'}`}>
                <div className={`text-white px-6 max-w-2xl ${slide.id === 2 || slide.id === 3 || slide.id === 4 ? 'text-left' : 'text-right'}`}>
                  <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg">
                    {slide.title}
                  </h1>
                  {slide.subtitle && (
                    <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-4 drop-shadow-md">
                      {slide.subtitle}
                    </h2>
                  )}
                  <p className="text-base md:text-lg mb-8 drop-shadow-md whitespace-pre-line">
                    {slide.description}
                  </p>
                  <button
                    className={`bg-gradient-to-r ${slide.buttonColor} text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300`}
                  >
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>
      </div>

      <button
        onClick={goToPrevious}
        className="absolute -left-6 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white p-3 rounded-full transition-all duration-300 z-10 shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={goToNext}
        className="absolute -right-6 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white p-3 rounded-full transition-all duration-300 z-10 shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

export default HeroSlider