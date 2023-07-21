import { Product } from '../../models/Product'

export enum CartActionTypes {
  ADD_ONE_PRODUCT = 'ADD_ONE_PRODUCT',
  REMOVE_ONE_PRODUCT = 'REMOVE_ONE_PRODUCT',
  REMOVE_PRODUCT = 'REMOVE_PRODUCT',
  CLEAR_CART = 'CLEAR_CART'
}

export type CartAction =
  | GenericAction<CartActionTypes.ADD_ONE_PRODUCT, { product: Product }>
  | GenericAction<CartActionTypes.REMOVE_ONE_PRODUCT, { productId: string }>
  | GenericAction<CartActionTypes.REMOVE_PRODUCT, { productId: string }>
  | GenericAction<CartActionTypes.CLEAR_CART>

export function addOneProductAction(product: Product): CartAction {
  return { type: CartActionTypes.ADD_ONE_PRODUCT, payload: { product } }
}

export function removeOneProductAction(productId: string): CartAction {
  return { type: CartActionTypes.REMOVE_ONE_PRODUCT, payload: { productId } }
}

export function removeProductAction(productId: string): CartAction {
  return { type: CartActionTypes.REMOVE_PRODUCT, payload: { productId } }
}

export function clearCartAction(): CartAction {
  return { type: CartActionTypes.CLEAR_CART }
}
