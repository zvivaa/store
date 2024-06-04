import { Square } from '@/types'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/square`

const getSquare = async (): Promise<Square[]> => {
  const res = await fetch(URL)

  return res.json()
}

export default getSquare
