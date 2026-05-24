export const paginate = <TItem>(items: TItem[], page: number, pageSize: number): TItem[] => {
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize

  return items.slice(startIndex, endIndex)
}

export const calculatePageCount = (itemCount: number, pageSize: number) => {
  return Math.max(1, Math.ceil(itemCount / pageSize))
}
