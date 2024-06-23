import getBillboard from '@/actions/get-billboard'
import getProducts from '@/actions/get-products'
import Billboard from '@/components/billboard'
import BrandsSlider from '@/components/brand-slider'
import HelpSection from '@/components/help-section'
import MapSection from '@/components/map-section'
import ProductList from '@/components/product-list'
import Container from '@/components/ui/container'

export const revalidate = 0

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true })
  const billboard = await getBillboard('7193a289-91c9-444a-928a-770df1db8197')

  const brands = [
    { logo: '/img/ballu_logo.jpg', name: 'Ballu' },
    { logo: '/img/electrolux_new_logo.jpg', name: 'Electrolux' },
    { logo: '/img/mitsubishi_logo.jpg', name: 'Mitsubishi' },
    { logo: '/img/shuft_logo.jpg', name: 'Shuft' },
    { logo: '/img/toshiba_logo.jpg', name: 'Toshiba' },
    { logo: '/img/kentatsu_logo.png', name: 'Kentatsu' },
    { logo: '/img/daichi_logo.png', name: 'Daichi' },
  ]

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
      </div>
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <BrandsSlider title="Бренды" brands={brands} />
        <ProductList title="Популярные товары" items={products} />
        <HelpSection title="Нужна помощь?" />
        <MapSection title="Наш офис" />
      </div>
    </Container>
  )
}

export default HomePage
