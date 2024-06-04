import prismadb from '@/lib/prismadb'
import { SquareForm } from './components/square-form'

const SquarePage = async ({ params }: { params: { squareId: string } }) => {
  const square = await prismadb.square.findUnique({
    where: {
      id: params.squareId,
    },
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SquareForm initialData={square} />
      </div>
    </div>
  )
}

export default SquarePage
