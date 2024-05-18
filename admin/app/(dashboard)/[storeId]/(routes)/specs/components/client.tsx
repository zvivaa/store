'use client'

import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/data-table'

import { SpecColumn, columns } from './columns'
import { ApiList } from '@/components/ui/api-list'

interface SpecClientProps {
  data: SpecColumn[]
}

export const SpecClient: React.FC<SpecClientProps> = ({ data }) => {
  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Характеристики (${data.length})`}
          description="Управление характеристиками для магазина"
        />
        <Button onClick={() => router.push(`/${params.storeId}/specs/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Добавить
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="Вызов API для Досок" />
      <Separator />
      <ApiList entityName="specs" entityIdName="specId" />
    </>
  )
}
