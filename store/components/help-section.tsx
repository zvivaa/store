// components/HelpSection.tsx
import React from 'react'
import styles from './HelpSection.module.css' // Create a CSS module for styling

interface HelpSectionProps {
  title: string
}

const HelpSection: React.FC<HelpSectionProps> = ({ title }) => {
  return (
    <div className="space-y-4 pl-4 pr-4 sm:pl-6 sm:pr-6 lg:pl-8 lg:pr-8">
      <h3 className="font-bold text-3xl">{title}</h3>
      <div className={styles.cardsContainer}>
        <div className={styles.card}>
          <h3 className="font-bold text-3xl">8 (800) 000-00-00</h3>
          <p>Помогаем по любым вопросам продажи и сервиса.</p>
          <div className={styles.icon}>
            <i className="fas fa-headset"></i>
          </div>
        </div>
        <div className={styles.card}>
          <h3 className="font-bold text-3xl">alvent@yandex.ru</h3>
          <p>Не стесняйтесь написать нам письмо.</p>
          <div className={styles.icon}>
            <i className="fas fa-envelope"></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpSection
