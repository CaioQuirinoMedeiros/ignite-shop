import { immerable } from 'immer'
import { Product } from './Product'

type CartItemConstructor = {
  product: Product
  quantity: number
}

export class CartItem {
  [immerable] = true

  product: Product
  quantity: number

  constructor(params: CartItemConstructor) {
    this.product = params.product
    this.quantity = params.quantity
  }

  get totalPrice() {
    return this.quantity * (this.product.price ?? 0)
  }
}
