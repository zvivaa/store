'use client'

import { useEffect, useState } from 'react'

import Container from '@/components/ui/container'
import useFavorite from '@/hooks/use-favorite'

import FavItem from './components/fav-item'

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false)
  const favorite = useFavorite()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Избранное</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {favorite.items.length === 0 && (
                <p className="text-neutral-500">В избранном ничего нет.</p>
              )}
              <ul>
                {favorite.items.map((item) => (
                  <FavItem key={item.id} data={item} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default CartPage
