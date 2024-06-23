import getBrends from '@/actions/get-brends'
import getCategory from '@/actions/get-category'
import getProducts from '@/actions/get-products'
import getSpecs from '@/actions/get-specs'
import getSquare from '@/actions/get-square'
import Billboard from '@/components/billboard'
import Container from '@/components/ui/container'
import NoResults from '@/components/ui/no-results'
import ProductCard from '@/components/ui/product-card'
import Filter from './components/filter'
import MobileFilters from './components/mobile-filter'
import { Brand, Spec, Square } from '@/types'

export const revalidate = 0

interface CategoryPageProps {
  params: {
    categoryId: string
  }
  searchParams: {
    brendId?: string
    specId?: string
    squareId?: string
    minPrice?: string
    maxPrice?: string
    wifi?: string
  }
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  const minPrice = searchParams.minPrice
    ? parseFloat(searchParams.minPrice)
    : undefined
  const maxPrice = searchParams.maxPrice
    ? parseFloat(searchParams.maxPrice)
    : undefined

  const products = await getProducts({
    categoryId: params.categoryId,
    brandId: searchParams.brendId,
    specId: searchParams.specId,
    squareId: searchParams.squareId,
    minPrice,
    maxPrice,
    wifi: searchParams.wifi,
  })

  // Extract unique filter options from products
  const uniqueBrandIds = Array.from(new Set(products.map((p) => p.brandId)))
  const uniqueSpecIds = Array.from(new Set(products.map((p) => p.specId)))
  const uniqueSquareIds = Array.from(new Set(products.map((p) => p.squareId)))
  const hasWifiOptions = products.some((p) => p.wifi)

  const brands = (await getBrends()) as Brand[]
  const specs = (await getSpecs()) as Spec[]
  const squares = (await getSquare()) as Square[]
  const category = await getCategory(params.categoryId)

  const maxProductPrice = products.reduce(
    (max, product) => (product.price > max ? product.price : max),
    0
  )

  return (
    <div className="bg-white">
      <Container>
        <Billboard data={category.billboard} />
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileFilters brands={brands} specs={specs} />
            <div className="hidden lg:block flex">
              <Filter
                valueKey="price"
                name="Цена"
                data={[]}
                maxProductPrice={maxProductPrice}
              />
              {uniqueBrandIds.length > 0 && (
                <Filter
                  valueKey="brendId"
                  name="Бренд"
                  data={brands.filter((b) => uniqueBrandIds.includes(b.id))}
                />
              )}
              {uniqueSpecIds.length > 0 && (
                <Filter
                  valueKey="specId"
                  name="Спецификация"
                  data={specs.filter((s) => uniqueSpecIds.includes(s.id))}
                />
              )}
              {uniqueSquareIds.length > 0 && (
                <Filter
                  valueKey="squareId"
                  name="Площадь"
                  data={squares.filter((s) => uniqueSquareIds.includes(s.id))}
                />
              )}
              {hasWifiOptions && (
                <Filter
                  valueKey="wifi"
                  name="WiFi"
                  data={[
                    { id: 'yes', name: 'Да', value: 'yes' },
                    { id: 'no', name: 'Нет', value: 'no' },
                  ]}
                />
              )}
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {products.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((item) => (
                  <ProductCard key={item.id} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default CategoryPage
