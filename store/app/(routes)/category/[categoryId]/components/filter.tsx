'use client'

import { useState, useEffect } from 'react'
import qs from 'query-string'
import { useRouter, useSearchParams } from 'next/navigation'
import { Brand, Spec } from '@/types'
import Button from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface FilterProps {
  data: (Brand | Spec)[]
  name: string
  valueKey: string
  maxProductPrice?: number // Add this prop to pass the maximum product price
}

const Filter: React.FC<FilterProps> = ({
  data,
  name,
  valueKey,
  maxProductPrice,
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined)
  const [maxPrice, setMaxPrice] = useState<number | undefined>(maxProductPrice) // Set initial value to maxProductPrice
  const selectedValue = searchParams.get(valueKey)

  useEffect(() => {
    // Temporarily disable scroll restoration
    history.scrollRestoration = 'manual'
    return () => {
      history.scrollRestoration = 'auto'
    }
  }, [])

  const updateURL = (query: any) => {
    const url = qs.stringifyUrl(
      {
        url: window.location.href.split('?')[0], // Ensure to use the base URL without existing query parameters
        query,
      },
      { skipNull: true }
    )
    // Save current scroll position
    const scrollY = window.scrollY

    router.replace(url, undefined, { scroll: false }) // Use replace instead of push

    // Restore scroll position after the URL is updated
    setTimeout(() => window.scrollTo(0, scrollY), 1) // Small timeout to ensure URL is updated first
  }

  const onClick = (id: string) => {
    const current = qs.parse(searchParams.toString())
    const query = {
      ...current,
      [valueKey]: current[valueKey] === id ? undefined : id,
    }
    updateURL(query)
  }

  const onPriceChange = () => {
    const current = qs.parse(searchParams.toString())
    const query = {
      ...current,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
    }
    updateURL(query)
  }

  const onReset = () => {
    updateURL({}) // Reset to an empty query object
    setMinPrice(undefined)
    setMaxPrice(maxProductPrice)
  }

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold">{name}</h3>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2 flex-row">
        {valueKey !== 'price' ? (
          data.map((filter) => (
            <div key={filter.id} className="flex items-center">
              <Button
                className={cn(
                  'rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300',
                  selectedValue === filter.id && 'bg-black text-white'
                )}
                onClick={() => onClick(filter.id)}
              >
                {filter.name}
              </Button>
            </div>
          ))
        ) : (
          <div className="flex flex-col w-[100%] gap-1">
            <label>Цена от:</label>
            <input
              type="number"
              value={minPrice !== undefined ? minPrice : ''}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="border p-2 rounded-md"
              placeholder="0 ₽"
            />
            <label>Цена до:</label>
            <input
              type="number"
              value={maxPrice !== undefined ? maxPrice : maxProductPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="border p-2 rounded-md"
              placeholder={`${maxProductPrice || 0} ₽`}
            />
            <Button onClick={onPriceChange} className="mt-2">
              Применить
            </Button>
            <Button
              onClick={onReset}
              className="mt-4 bg-white text-black border border-gray-300"
            >
              Сбросить
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Filter
