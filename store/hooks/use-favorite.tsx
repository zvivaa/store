import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import toast from 'react-hot-toast'

import { Product } from '@/types'

interface Favorite {
  items: Product[]
  addItem: (data: Product) => void
  removeItem: (id: String) => void
  removeAll: () => void
}

const useFavorite = create(
  persist<Favorite>(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        const currentItems = get().items
        const existingItem = currentItems.find((item) => item.id === data.id)

        if (existingItem) {
          return toast('Товар уже находится в избранное.')
        }

        set({ items: [...get().items, data] })
        toast.success('Товар добавлен в избранное.')
      },
      removeItem: (id: String) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] })
        toast.success('Товар удален из избранного.')
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: 'favorite-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useFavorite
