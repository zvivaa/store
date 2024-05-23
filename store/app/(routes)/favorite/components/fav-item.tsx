'use client'

import Image from 'next/image'
import { toast } from 'react-hot-toast'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'

import IconButton from '@/components/ui/icon-button'
import Currency from '@/components/ui/currency'
import { Product } from '@/types'
import useFavorite from '@/hooks/use-favorite'

interface FavItemProps {
  data: Product[]
}

const FavItem: React.FC<FavItemProps> = ({ data }) => {
  const favorite = useFavorite()
  const router = useRouter()

  const onRemove = () => {
    favorite.removeItem(data.id)
  }

  const handleClick = () => {
    router.push(`/product/${data?.id}`)
  }

  return (
    <li className="flex py-6 border-b ">
      <div
        onClick={handleClick}
        className="cursor-pointer relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48"
      >
        <Image
          fill
          src={data.images[0].url}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div
            onClick={handleClick}
            className="cursor-pointer flex justify-between"
          >
            <p className="text-lg font-semibold text-black">{data.name}</p>
          </div>

          <Currency value={data.price} />
        </div>
      </div>
    </li>
  )
}

export default FavItem
