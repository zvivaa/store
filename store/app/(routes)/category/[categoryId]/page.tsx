import getBrends from '@/actions/get-brends'
import getCategory from '@/actions/get-category'
import getProducts from '@/actions/get-products'
import getSpecs from '@/actions/get-specs'
import Billboard from '@/components/billboard'
import Container from '@/components/ui/container'
import NoResults from '@/components/ui/no-results'
import ProductCard from '@/components/ui/product-card'

import Filter from './components/filter'
import MobileFilters from './components/mobile-filter'

export const revalidate = 0

interface CategoryPageProps {
  params: {
    categoryId: string
  }
  searchParams: {
    brendId: string
    specId: string
  }
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  const products = await getProducts({
    categoryId: params.categoryId,
    brandId: searchParams.brendId,
    specId: searchParams.specId,
  })
  const brands = await getBrends()
  const specs = await getSpecs()
  const category = await getCategory(params.categoryId)

  return (
    <div className="bg-white">
      <Container>
        <Billboard data={category.billboard} />
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileFilters brands={brands} specs={specs} />
            <div className="hidden lg:block">
              <Filter valueKey="brendId" name="Бренд" data={brands} />
              <Filter valueKey="specId" name="Характеристика" data={specs} />
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
