import { startKeyDto } from './pagination.dto'

export const generatePaginationNextKey = (arr_start_keys: startKeyDto[]) => {
    const next_key = {}
    for (const arrStartKey of arr_start_keys) {
        next_key[arrStartKey.key] = arrStartKey.value
    }
    return next_key
}
