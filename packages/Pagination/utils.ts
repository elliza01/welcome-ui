import { useMemo } from 'react'

const RANGE = 4

function fill(length: number, transform: (arg: number) => number): number[] {
  return Array.from({ length }, (_, i) => transform(i))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function joinArrays(arrays: any[], separator: string): number[] | string[] {
  return arrays.reduce((all: number[] | string[], array: number[] | string[], i: number) => {
    const next = []
    next.push(...all)
    next.push(...array)
    if (array.length && i < arrays.length - 1) next.push(separator)
    return next
  }, [])
}

interface usePagesProps {
  page: number
  pageCount: number
  rangeDisplay: number
}

export function usePages({ page, pageCount, rangeDisplay }: usePagesProps): string[] | number[] {
  return useMemo(() => {
    if (pageCount <= rangeDisplay) {
      return fill(pageCount, i => i + 1)
    }
    const before = page < RANGE ? fill(Math.min(pageCount, page + 1), i => i + 1) : [1]
    const center =
      page >= RANGE && page <= pageCount - RANGE + 1 ? fill(RANGE - 1, i => i + page - 1) : []
    const after =
      page > pageCount - RANGE + 1
        ? fill(Math.min(RANGE, pageCount - page + RANGE / 2), i => i + page - 1)
        : [pageCount]
    return joinArrays([before, center, after], '-')
  }, [page, pageCount, rangeDisplay])
}
