export const generatePaginationNextKeyDtoArr = (next_key) => {
    const arr = []

    if (next_key === null) return undefined

    for (const nextKeyElement of Object.keys(next_key)) {
        arr.push({
            key: nextKeyElement,
            value: next_key[nextKeyElement]
        })
    }

    return arr
}
