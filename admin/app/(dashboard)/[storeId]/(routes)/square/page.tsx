import { format } from 'date-fns'

import prismadb from '@/lib/prismadb'

import { SquareClient } from './components/client'
import { SquareColumn } from './components/columns'

const SquarePage = async ({ params }: { params: { storeId: string } }) => {
  const square = await prismadb.square.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const formattedSquares: SquareColumn[] = square.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SquareClient data={formattedSquares} />
      </div>
    </div>
  )
}

export default SquarePage
