import { format } from 'date-fns'

import prismadb from '@/lib/prismadb'

import { SpecClient } from './components/client'
import { SpecColumn } from './components/columns'

const SpecsPage = async ({ params }: { params: { storeId: string } }) => {
  const specs = await prismadb.spec.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  const formattedSpecs: SpecColumn[] = specs.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SpecClient data={formattedSpecs} />
      </div>
    </div>
  )
}

export default SpecsPage
