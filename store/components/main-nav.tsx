'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Category } from '@/types'
import { useState } from 'react'
import Button from './ui/button'

interface MainNavProps {
  data: Category[]
}

const MainNav: React.FC<MainNavProps> = ({ data }) => {
  const pathname = usePathname()
  const [visible, setVisibility] = useState(false)

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }))

  const toggle = () => {
    setVisibility((current) => !current)
  }

  return (
    <div>
      <div className="mx-6 flex items-center space-x-4 lg:space-x-6">
        <Button className="rounded-xl" onClick={toggle}>
          Категории
        </Button>
      </div>
      {visible && (
        <div className="absolute w-[30%] h-[500px] py-4 sm:px-6 lg:px-8 mt-6 ml-[-223px] bg-gray-800 z-10 mx-6 grid grid-rows-11 grid-cols-2">
          {routes.map((route) => (
            <Link
              onClick={toggle}
              key={route.href}
              href={route.href}
              className={cn(
                'pt-5 text-xl font-medium transition-colors hover:text-gray-400',
                route.active ? 'text-white' : 'text-white'
              )}
            >
              {route.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default MainNav
