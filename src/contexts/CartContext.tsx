import * as React from 'react'
import { CartState, cartReducer } from '../reducers/cart/reducer'
import {
  addOneProductAction,
  clearCartAction,
  removeOneProductAction,
  removeProductAction
} from '../reducers/cart/actions'
import { CartItem } from '../models/CartItem'
import { Product } from '../models/Product'

interface CartContextData {
  cartItems: CartItem[]
  totalProducts: number
  totalCartPrice: number
  addOneProduct(product: Product): void
  removeOneProduct(productId: string): void
  removeProduct(productId: string): void
  clearCart(): void
}

const CartContext = React.createContext({} as CartContextData)

const cartItemsStorageKey = '@igniteshop:cartItems-v2'

function getInitialCartState(initialState: CartState): CartState {
  const storageCartItems = window.localStorage.getItem(cartItemsStorageKey)

  if (storageCartItems) {
    const storedCartItems = JSON.parse(storageCartItems) as CartItem[]
    return {
      cartItems: storedCartItems.map((cartItem) => {
        return new CartItem(cartItem)
      })
    }
  } else {
    return initialState
  }
}

export function CartContextProvider({ children }: React.PropsWithChildren) {
  const [cartState, dispatch] = React.useReducer(
    cartReducer,
    { cartItems: [] } as CartState,
    getInitialCartState
  )

  React.useEffect(() => {
    const cartItemsJson = JSON.stringify(cartState.cartItems)
    window.localStorage.setItem(cartItemsStorageKey, cartItemsJson)
  }, [cartState.cartItems])

  const totalCartPrice = cartState.cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.totalPrice
  }, 0)

  const totalProducts = cartState.cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.quantity
  }, 0)

  function addOneProduct(product: Product) {
    dispatch(addOneProductAction(product))
  }

  function removeOneProduct(productId: string) {
    dispatch(removeOneProductAction(productId))
  }

  function removeProduct(productId: string) {
    dispatch(removeProductAction(productId))
  }

  function clearCart() {
    dispatch(clearCartAction())
  }

  return (
    <CartContext.Provider
      value={{
        cartItems: cartState.cartItems,
        totalCartPrice,
        totalProducts,
        addOneProduct,
        removeOneProduct,
        removeProduct,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCartContext() {
  return React.useContext(CartContext)
}
