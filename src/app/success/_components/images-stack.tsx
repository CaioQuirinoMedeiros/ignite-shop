'use client'

import Image from 'next/image'

interface ImagesStackProps {
  images: string[]
}

export function ImagesStack(props: ImagesStackProps) {
  const { images } = props

  return (
    <div className='mb-8 relative flex flex-row'>
      {images.map((image) => {
        return (
          <div
            key={image}
            className='drop-shadow-lg w-full bg-gradient-to-b from-[#1ea483] to-[#7465d4] rounded-full flex items-center justify-center shrink-0 max-w-[140px] h-[140px] p-1 ml-[-52px]'
          >
            <Image src={image} width={520} height={480} alt='product' />
          </div>
        )
      })}
    </div>
  )
}
