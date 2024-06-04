// pages/category/[categoryId]/page.tsx

import getBrends from '@/actions/get-brends'
import getCategory from '@/actions/get-category'
import getCalculate from '@/actions/get-calculate'
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
    square?: string
    power?: string
    wifi?: string
    noise?: string
    minTemp?: string
    maxTemp?: string
  }
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  const products = await getCalculate({
    square: searchParams.square,
    power: searchParams.power,
    wifi: searchParams.wifi,
    noise: searchParams.noise,
    minTemp: searchParams.minTemp,
    maxTemp: searchParams.maxTemp,
  })
  const brands = await getBrends()
  const specs = await getSpecs()
  const category = await getCategory(params.categoryId)

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Калькулятор</h1>
          <div className="mt-12 lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileFilters brands={brands} specs={specs} />
            <div className="hidden lg:block">
              <Filter valueKey="square" name="Площадь (м2)" data={specs} />
              <Filter valueKey="power" name="Мощность (кВт)" data={specs} />
              <Filter valueKey="noise" name="Уровень шума (дБ)" data={specs} />
              <Filter valueKey="minTemp" name="Мин. температура" data={specs} />
              <Filter
                valueKey="maxTemp"
                name="Макс. температура"
                data={specs}
              />
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
