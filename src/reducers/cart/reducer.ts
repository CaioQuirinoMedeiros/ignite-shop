import { produce } from 'immer'

import { CartAction, CartActionTypes } from './actions'
import { CartItem } from '../../models/CartItem'

export type CartState = {
  cartItems: CartItem[]
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case CartActionTypes.ADD_ONE_PRODUCT: {
      const product = action.payload.product

      const cartItemIndex = state.cartItems.findIndex((cartItem) => {
        return cartItem.product.id === product.id
      })

      return produce(state, (draft) => {
        if (cartItemIndex === -1) {
          draft.cartItems.push(new CartItem({ product, quantity: 1 }))
        } else {
          draft.cartItems[cartItemIndex].quantity++
        }
      })
    }

    case CartActionTypes.REMOVE_ONE_PRODUCT: {
      const productId = action.payload.productId

      return produce(state, (draft) => {
        const cartItemIndex = draft.cartItems.findIndex((cartItem) => {
          return cartItem.product.id === productId
        })

        if (cartItemIndex === -1) return

        if (draft.cartItems[cartItemIndex].quantity <= 1) {
          draft.cartItems.splice(cartItemIndex, 1)
        } else {
          draft.cartItems[cartItemIndex].quantity--
        }
      })
    }

    case CartActionTypes.REMOVE_PRODUCT: {
      const productId = action.payload.productId
      return produce(state, (draft) => {
        const cartItemIndex = draft.cartItems.findIndex((cartItem) => {
          return cartItem.product.id === productId
        })

        if (cartItemIndex !== -1) {
          draft.cartItems.splice(cartItemIndex, 1)
        }
      })
    }

    case CartActionTypes.CLEAR_CART: {
      return produce(state, (draft) => {
        draft.cartItems = []
      })
    }

    default:
      return state
  }
}
