'use client'

import { Heart, ShoppingBag } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/button'
import useCart from '@/hooks/use-cart'
import useFavorite from '@/hooks/use-favorite'
import BurgerMenu from './burger-menu'

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const router = useRouter()
  const cart = useCart()
  const favorite = useFavorite()

  if (!isMounted) {
    return null
  }

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <div className="hidden md:flex items-center gap-x-4">
        <Button
          onClick={() => router.push('/favorite')}
          className="flex items-center rounded-xl bg-black px-5 py-3"
        >
          <Heart size={25} color="white" />
          <span className="ml-2 text-xl font-semibold text-white">
            {favorite.items.length}
          </span>
        </Button>
        <Button
          onClick={() => router.push('/cart')}
          className="flex items-center rounded-xl bg-black px-5 py-3"
        >
          <ShoppingBag size={25} color="white" />
          <span className="ml-2 text-xl font-semibold text-white">
            {cart.items.length}
          </span>
        </Button>
      </div>
      <div className="md:hidden">
        <BurgerMenu />
      </div>
    </div>
  )
}

export default NavbarActions
