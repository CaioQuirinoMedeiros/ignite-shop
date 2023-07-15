
interface ProductProps {
  params: {
    productId: string
  }
}

export default function Product(props: ProductProps) {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1 className='text-text'>{props.params.productId}</h1>
    </main>
  )
}
