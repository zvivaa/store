'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { Dialog } from '@headlessui/react'

import { Brand, Spec } from '@/types'
import Button from '@/components/ui/button'
import IconButton from '@/components/ui/icon-button'
import Filter from './filter'

interface MobileFiltersProps {
  brands: Brand[]
  specs: Spec[]
}

const MobileFilters: React.FC<MobileFiltersProps> = ({ brands, specs }) => {
  const [open, setOpen] = useState(false)

  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)

  return (
    <>
      <Button onClick={onOpen} className="flex items-center gap-x-2 lg:hidden">
        Фильтры
        <Plus size={20} />
      </Button>

      <Dialog
        open={open}
        as="div"
        className="relative z-40 lg:hidden"
        onClose={onClose}
      >
        {/* фон */}
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        {/* диалог позиция */}
        <div className="fixed inset-0 z-40 flex">
          <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
            {/* закрыть */}
            <div className="flex items-center justify-end px-4">
              <IconButton icon={<X size={15} />} onClick={onClose} />
            </div>
            {/* фильтры */}
            <div className="p-4">
              <Filter valueKey="brendId" name="Бренд" data={brands} />
              <Filter valueKey="specId" name="Характеристика" data={specs} />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}

export default MobileFilters
