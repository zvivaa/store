// components/BurgerMenu.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Heart, ShoppingBag, Menu, X } from 'lucide-react'
import Button from '@/components/ui/button'
import useCart from '@/hooks/use-cart'
import useFavorite from '@/hooks/use-favorite'
import styles from './BurgerMenu.module.css' // Import the CSS module

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const cart = useCart()
  const favorite = useFavorite()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative flex items-center">
      <Button
        onClick={toggleMenu}
        className="flex items-center rounded-xl bg-black px-5 py-3"
      >
        {isOpen ? (
          <X size={25} color="white" />
        ) : (
          <Menu size={25} color="white" />
        )}
      </Button>
      {isOpen && (
        <div className={styles.overlay}>
          <button className={styles.closeButton} onClick={toggleMenu}>
            <X size={25} color="white" />
          </button>
          <div className={styles.menuContent}>
            <Button
              onClick={() => {
                router.push('/favorite')
                toggleMenu()
              }}
              className="flex items-center rounded-xl gap-2 bg-white px-5 py-3 mb-4"
            >
              <Heart size={25} color="black" />
              <p className="text-black">Избранное</p>
              <span className="ml-2 text-xl font-semibold text-black">
                {favorite.items.length}
              </span>
            </Button>
            <Button
              onClick={() => {
                router.push('/cart')
                toggleMenu()
              }}
              className="flex items-center rounded-xl gap-2 bg-white px-5 py-3"
            >
              <ShoppingBag size={25} color="black" />
              <p className="text-black">Корзина</p>
              <span className="ml-2 text-xl font-semibold text-black">
                {cart.items.length}
              </span>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default BurgerMenu
