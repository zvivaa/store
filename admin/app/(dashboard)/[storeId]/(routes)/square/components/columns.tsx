'use client'

import { ColumnDef } from '@tanstack/react-table'

import { CellAction } from './cell-action'

export type SquareColumn = {
  id: string
  name: string
  value: string
  createdAt: string
}

export const columns: ColumnDef<SquareColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Наименование',
  },
  {
    accessorKey: 'value',
    header: 'Значение',
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
