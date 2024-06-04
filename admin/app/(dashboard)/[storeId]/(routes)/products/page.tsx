import { format } from 'date-fns'

import prismadb from '@/lib/prismadb'
import { formatter } from '@/lib/utils'

import { ProductClient } from './components/client'
import { ProductColumn } from './components/columns'

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    // отображение данных продукта
    include: {
      category: true,
      brand: true,
      spec: true,
      square: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price.toNumber()),
    category: item.category.name,
    brand: item.brand.name,
    spec: item.spec.value,
    square: item.square.name,
    power: item.power,
    wifi: item.wifi,
    maxTemp: item.maxTemp,
    minTemp: item.minTemp,
    noise: item.noise,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  )
}

export default ProductsPage
