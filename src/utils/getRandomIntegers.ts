type GetRandomIntegersParams = {
  from: number
  to: number
  size: number
}

type RandomIntegerParams = {
  from: number
  to: number
}

export function getRandomInteger(params: RandomIntegerParams) {
  const { from, to } = params
  return Math.floor(Math.random() * (to - from + 1) + from)
}

export function getRandomIntegers(params: GetRandomIntegersParams) {
  const { from, size, to } = params

  const limit = Math.min(to - from + 1, size)

  const result = []
  const resultMap: { [i: number]: true } = {}
  while (result.length < limit) {
    const randomNumber = getRandomInteger({ from, to })
    if (!resultMap[randomNumber]) {
      result.push(randomNumber)
      resultMap[randomNumber] = true
    }
  }

  return result
}

type RandomItemsParams<T> = {
  array: T[]
  size: number
}

export function getRandomItemsFromArray<T>(params: RandomItemsParams<T>): T[] {
  const { array, size } = params

  const randomIndexes = getRandomIntegers({ from: 0, to: array.length - 1, size })

  return randomIndexes.map((randomIndex) => array[randomIndex])
}

