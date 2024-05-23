export interface Billboard {
  id: string
  label: string
  imageUrl: string
}

export interface Category {
  id: string
  name: string
  billboard: Billboard
}

export interface Product {
  id: string
  category: Category
  name: string
  price: string
  isFeatured: boolean
  brand: Brand
  spec: Spec
  square: string
  power: string
  wifi: string
  maxTemp: string
  minTemp: string
  noise: string
  images: Image[]
}

export interface Image {
  id: string
  url: string
}

export interface Brand {
  id: string
  name: string
  value: string
}

export interface Spec {
  id: string
  name: string
  value: string
}
