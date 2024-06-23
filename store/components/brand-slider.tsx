'use client'

// components/BrandsSlider.tsx
import React, { useState } from 'react'
import styles from './BrandsSlider.module.css' // Import your CSS module

interface Brand {
  logo: string
  name: string
}

interface BrandsSliderProps {
  brands: Brand[]
  title: string
}

const BrandsSlider: React.FC<BrandsSliderProps> = ({ brands, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const visibleSlides = 3 // Number of slides to show at once

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % brands.length)
  }

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + brands.length) % brands.length
    )
  }

  const getSlidesToShow = () => {
    const totalSlides = brands.length
    const slides = []
    for (let i = 0; i < visibleSlides + 2; i++) {
      slides.push(brands[(currentIndex + i - 1 + totalSlides) % totalSlides])
    }
    return slides
  }

  return (
    <div className="space-y-4 pl-4 pr-4 sm:pl-6 sm:pr-6 lg:pl-8 lg:pr-8">
      <h3 className="font-bold text-3xl">{title}</h3>
      <div className={styles.sliderContainer}>
        <button onClick={prevSlide} className={styles.navButton}>
          ‹
        </button>
        <div className={styles.sliderWrapper}>
          <div
            className={styles.slider}
            style={{ transform: `translateX(-${100 / (visibleSlides + 2)}%)` }}
          >
            {getSlidesToShow().map((brand, index) => (
              <div key={index} className={styles.slide}>
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className={styles.logo}
                />
              </div>
            ))}
          </div>
        </div>
        <button onClick={nextSlide} className={styles.navButton}>
          ›
        </button>
      </div>
    </div>
  )
}

export default BrandsSlider
