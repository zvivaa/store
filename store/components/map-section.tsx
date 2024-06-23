// components/MapSection.tsx
'use client'

import React, { useEffect, useRef } from 'react'
import styles from './MapSection.module.css' // Import your CSS module

interface MapSectioProps {
  title: string
}

const MapSection: React.FC<MapSectioProps> = ({ title }) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInitialized = useRef(false)

  useEffect(() => {
    const loadYandexMap = () => {
      const ymaps = (window as any).ymaps
      ymaps.ready(() => {
        const map = new ymaps.Map(mapRef.current, {
          center: [57.987132, 56.23946], // Set your office coordinates here
          zoom: 17,
        })

        const placemark = new ymaps.Placemark(
          [57.987132, 56.23946], // Set your office coordinates here
          { hintContent: 'Наш офис', balloonContent: 'Мы здесь!' }
        )

        map.geoObjects.add(placemark)
      })
    }

    if (!mapInitialized.current) {
      if (!(window as any).ymaps) {
        const script = document.createElement('script')
        script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU'
        script.type = 'text/javascript'
        script.onload = loadYandexMap
        document.head.appendChild(script)
      } else {
        loadYandexMap()
      }
      mapInitialized.current = true
    }
  }, [])

  return (
    <div className="space-y-4 pl-4 pr-4 sm:pl-6 sm:pr-6 lg:pl-8 lg:pr-8">
      <h2 className="font-bold text-3xl">{title}</h2>
      <div ref={mapRef} style={{ width: '100%', height: '400px' }} />
    </div>
  )
}

export default MapSection
