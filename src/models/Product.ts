import { immerable } from 'immer'

interface ProductConstructor {
  id: string
  price: number | null
  priceId: string
  description: string | null
  imageUrl: string | undefined
  name: string
}

export class Product {
  [immerable] = true

  id: string
  price: number | null
  priceId: string
  description: string | null
  imageUrl: string | undefined
  name: string

  constructor(params: ProductConstructor) {
    this.id = params.id
    this.name = params.name
    this.description = params.description
    this.price = params.price
    this.priceId = params.priceId
    this.imageUrl = params.imageUrl
  }
}
