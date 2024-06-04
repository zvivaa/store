'use client'

import { Product } from '@/types'
import Currency from '@/components/ui/currency'
import Button from '@/components/ui/button'
import { Heart, HeartOff, ShoppingCart } from 'lucide-react'
import { MouseEventHandler } from 'react'
import useCart from '@/hooks/use-cart'
import useFavorite from '@/hooks/use-favorite'

interface InfoProps {
  data: Product
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart()
  const favorite = useFavorite()

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()

    cart.addItem(data)
  }

  const onAddToFavroite: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()

    favorite.addItem(data)
  }

  return (
    <div>
      <h1 className="text-3xl font-bol text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-3">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Бренд:</h3>
          <div>{data?.brand?.name}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Рек. площадь помещения:</h3>
          <div>{data.square?.name} (м2)</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">WI-FI Модуль:</h3>
          <div>{data?.wifi}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Макс. температура:</h3>
          <div>+{data?.maxTemp} °С</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Мин. температура:</h3>
          <div>-{data?.minTemp} °С</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Уровень шума:</h3>
          <div>{data?.noise} дБ</div>
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button onClick={onAddToCart} className="flex items-center gap-x-2">
          В корзину
          <ShoppingCart />
        </Button>
        <Button onClick={onAddToFavroite} className="flex items-center gap-x-2">
          <Heart />
        </Button>
      </div>
    </div>
  )
}

export default Info
