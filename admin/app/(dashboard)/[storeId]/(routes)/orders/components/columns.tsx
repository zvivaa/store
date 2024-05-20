'use client'

import { ColumnDef } from '@tanstack/react-table'

export type OrderColumn = {
  id: string
  phone: string
  addres: string
  isPaid: boolean
  totalPrice: string
  products: string
  createdAt: string
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: 'products',
    header: 'Продукт',
  },
  {
    accessorKey: 'phone',
    header: 'Телефон',
  },
  {
    accessorKey: 'addres',
    header: 'Адрес',
  },
  {
    accessorKey: 'totalPrice',
    header: 'Итоговая сумма',
  },
  {
    accessorKey: 'isPaid',
    header: 'Оплачено?',
  },
]
