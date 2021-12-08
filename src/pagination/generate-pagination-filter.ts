import { filterDto } from './pagination.dto'

/**
 * @param  {filterDto[]} filter
 */

export const generatePaginationFilter = (filter: filterDto[]) => {
    const filter_fn = {}
    for (const filterElement of filter) {
        filter_fn[filterElement.name] = {
            ['$' + filterElement.operator]: filterElement.value
        }
    }
    return filter_fn
}
