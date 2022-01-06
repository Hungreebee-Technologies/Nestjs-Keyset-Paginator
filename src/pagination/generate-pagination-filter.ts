import { filterDto } from './pagination.dto'

/**
 * @param  {filterDto[]} filter
 */

export const generatePaginationFilter = (filter: filterDto[]) => {
    const filter_fn = {}
    for (const filterElement of filter) {
        if (filterElement.operator === 'regex') {
            let exp = new RegExp(filterElement.value, 'i')
            if (filterElement.mode === 'swm') {
                exp = new RegExp('^' + filterElement.value + '.*', 'i')
            }
            if (filterElement.mode === 'bnm') {
                exp = new RegExp('.*' + filterElement.value + '.*', 'i')
            }
            if (filterElement.mode === 'ewm') {
                // console.log('EWM\n');
                exp = new RegExp(filterElement.value + '.*', 'i')
            }
            filter_fn[filterElement.name] = {
                ['$' + filterElement.operator]: exp
            }
        } else if (filterElement.operator === 'in' || filterElement.operator === 'nin') {
            filter_fn[filterElement.name] = {
                ['$' + filterElement.operator]: filterElement.arr_value
            }
        } else
            filter_fn[filterElement.name] = {
                ['$' + filterElement.operator]: filterElement.value
            }
    }
    return filter_fn
}
