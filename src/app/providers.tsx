"use client"

import { CartContextProvider } from '@/contexts/CartContext'

export function Providers(props: React.PropsWithChildren) {
  const { children } = props

  return <CartContextProvider>{children}</CartContextProvider>
}
