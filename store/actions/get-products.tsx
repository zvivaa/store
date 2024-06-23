import qs from 'query-string'
import { Product } from '@/types'

const URL = process.env.NEXT_PUBLIC_API_URL + '/products'

interface Query {
  categoryId?: string
  specId?: string
  brandId?: string
  squareId?: string
  isFeatured?: boolean
  minPrice?: number
  maxPrice?: number
  wifi?: string // Add wifi parameter
}

const getProducts = async (query: Query): Promise<Product[]> => {
  const queryString = qs.stringifyUrl({
    url: URL,
    query: {
      categoryId: query.categoryId,
      specId: query.specId,
      brandId: query.brandId,
      squareId: query.squareId,
      isFeatured: query.isFeatured,
      minPrice: query.minPrice,
      maxPrice: query.maxPrice,
      wifi: query.wifi, // Include wifi in the query
    },
  })

  const res = await fetch(queryString)

  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }

  const products = await res.json()

  // Фильтруем продукты по диапазону цен на клиенте, если это необходимо
  return products.filter((product) => {
    return (
      (query.minPrice ? product.price >= query.minPrice : true) &&
      (query.maxPrice ? product.price <= query.maxPrice : true) &&
      (query.wifi ? product.wifi === query.wifi : true) // Filter by wifi on client-side if necessary
    )
  })
}

export default getProducts
