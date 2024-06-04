'use client'

import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/data-table'

import { SquareColumn, columns } from './columns'
import { ApiList } from '@/components/ui/api-list'

interface SquareClientProps {
  data: SquareColumn[]
}

export const SquareClient: React.FC<SquareClientProps> = ({ data }) => {
  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Площадь (м2) (${data.length})`}
          description="Управление Площадь (м2)"
        />
        <Button onClick={() => router.push(`/${params.storeId}/square/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Добавить
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="Вызов API для Брендов" />
      <Separator />
      <ApiList entityName="square" entityIdName="squareId" />
    </>
  )
}
