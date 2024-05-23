import { Product } from '@/types'
import NoResults from '@/components/ui/no-results'
import ProductCard from '@/components/ui/product-card'

interface ProductListProps {
  title: string
  items: Product[]
}

const ProductList: React.FC<ProductListProps> = ({ title, items }) => {
  return (
    <div className="space-y-4 pl-4 pr-4 sm:pl-6 sm:pr-6 lg:pl-8 lg:pr-8">
      <h3 className="font-bold text-3xl">{title}</h3>
      {items.length === 0 && <NoResults />}
      <div className="grid gird-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  )
}

export default ProductList
