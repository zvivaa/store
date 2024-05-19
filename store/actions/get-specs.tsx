import { Spec } from '@/types'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/specs`

const getSpecs = async (): Promise<Spec[]> => {
  const res = await fetch(URL)

  return res.json()
}

export default getSpecs
