'use client'

import qs from 'query-string'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { Brand, Spec } from '@/types'
import Button from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface FilterProps {
  data: (Brand | Spec)[]
  name: string
  valueKey: string
}

const Filter: React.FC<FilterProps> = ({ data, name, valueKey }) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [inputValue, setInputValue] = useState(searchParams.get(valueKey) || '')

  const selectedValue = searchParams.get(valueKey)

  const onClick = (id: string) => {
    const current = qs.parse(searchParams.toString())

    const query = {
      ...current,
      [valueKey]: id,
    }

    if (current[valueKey] === id) {
      query[valueKey] = null
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    )

    router.push(url)
  }

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValue(value)

    const current = qs.parse(searchParams.toString())
    const query = {
      ...current,
      [valueKey]: value,
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    )

    router.push(url)
  }

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold">{name}</h3>

      <input
        type="text"
        value={inputValue}
        onChange={onInputChange}
        placeholder={`${name}`}
        className="mt-4 p-2 border rounded-md w-full"
      />
    </div>
  )
}

export default Filter
