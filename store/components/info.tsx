'use client'

import { Product } from '@/types'
import Currency from '@/components/ui/currency'
import Button from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'

interface InfoProps {
  data: Product
}

const Info: React.FC<InfoProps> = ({ data }) => {
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
          <h3 className="font-semibold text-black">Мощность:</h3>
          <div>{data?.spec?.value}</div>
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button className="flex items-center gap-x-2">
          В корзину
          <ShoppingCart />
        </Button>
      </div>
    </div>
  )
}

export default Info
