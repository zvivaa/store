'use client'

import { ColumnDef } from '@tanstack/react-table'

import { CellAction } from './cell-action'

export type ProductColumn = {
  id: string
  name: string
  price: string
  size: string
  category: string
  spec: string
  brand: string
  isFeatured: boolean
  isArchived: boolean
  createdAt: string
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Наименование',
  },
  {
    accessorKey: 'isArchived',
    header: 'Архив',
  },
  {
    accessorKey: 'isFeatured',
    header: 'Популярность',
  },
  {
    accessorKey: 'price',
    header: 'Цена',
  },
  {
    accessorKey: 'category',
    header: 'Категория',
  },
  {
    accessorKey: 'spec',
    header: 'Характеристика',
  },
  {
    accessorKey: 'brand',
    header: 'Бренд',
  },
  {
    accessorKey: 'createdAt',
    header: 'Дата создания',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
