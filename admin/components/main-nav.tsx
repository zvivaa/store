'use client'

import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()
  const params = useParams()

  const routes = [
    {
      href: `/${params.storeId}`,
      label: 'Просмотр',
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: 'Доски',
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: 'Категории',
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/brands`,
      label: 'Бренд',
      active: pathname === `/${params.storeId}/brands`,
    },
    {
      href: `/${params.storeId}/specs`,
      label: 'Характеристики',
      active: pathname === `/${params.storeId}/specs`,
    },
    {
      href: `/${params.storeId}/products`,
      label: 'Продукция',
      active: pathname === `/${params.storeId}/products`,
    },
    {
      href: `/${params.storeId}/orders`,
      label: 'Заказы',
      active: pathname === `/${params.storeId}/orders`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Настройки',
      active: pathname === `/${params.storeId}/settings`,
    },
  ]
  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      {routes.map((routes) => (
        <Link
          key={routes.href}
          href={routes.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            routes.active
              ? 'text-black dark:text-white'
              : 'text-muted-foreground'
          )}
        >
          {routes.label}
        </Link>
      ))}
    </nav>
  )
}
