import qs from 'query-string'

import { Product } from '@/types'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`

interface CalculateParams {
  categoryId?: string
  specId?: string
  brandId?: string
  square?: string
  power?: string
  wifi?: string
  noise?: string
  minTemp?: string
  maxTemp?: string
}

const getCalculate = async (query: CalculateParams): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      specId: query.specId,
      brandId: query.brandId,
      categoryId: query.categoryId,
      square: query.square,
      power: query.power,
      wifi: query.wifi,
      noise: query.noise,
      minTemp: query.minTemp,
      maxTemp: query.maxTemp,
    },
  })

  const res = await fetch(url)
  const allProducts: Product[] = await res.json()

  // Filter products based on additional parameters
  return allProducts.filter((product) => {
    if (query.square && product.square < query.square) return false
    if (query.power && product.power < query.power) return false
    if (query.minTemp && product.minTemp < query.minTemp) return false
    if (query.maxTemp && product.maxTemp < query.maxTemp) return false
    if (query.wifi && product.wifi.toLowerCase() !== query.wifi.toLowerCase())
      return false
    if (query.noise && product.noise < query.noise) return false
    return true
  })
}

export default getCalculate
