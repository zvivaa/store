import { Brand } from '@/types'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/brands`

const getBrends = async (): Promise<Brand[]> => {
  const res = await fetch(URL)

  return res.json()
}

export default getBrends
