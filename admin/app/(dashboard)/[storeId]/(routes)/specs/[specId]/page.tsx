import prismadb from '@/lib/prismadb'
import { SpecForm } from './components/spec-form'

const BillboardPage = async ({ params }: { params: { specId: string } }) => {
  const spec = await prismadb.spec.findUnique({
    where: {
      id: params.specId,
    },
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SpecForm initialData={spec} />
      </div>
    </div>
  )
}

export default BillboardPage
