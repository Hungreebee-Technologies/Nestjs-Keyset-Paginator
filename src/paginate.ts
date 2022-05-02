import { Model } from 'mongoose'
import { generatePaginationFilter } from './pagination/generate-pagination-filter'
import { generatePaginationQuery } from './pagination/generate-pagination-query'
import { filterDto, projectionDto, startKeyDto } from './pagination/pagination.dto'
import { generatePaginationNextKey } from './pagination/generate-pagination-next-key'
import { generatePaginationNextKeyDtoArr } from './pagination/generate-pagination-next-key-dto-arr'

/**
 * @param  {Model<any>} model - Mongoose model
 * @param  {} skip=0 - Number of documents to skip
 * @param  {} limit=10 - Number of documents to limit
 * @param  {startKeyDto[]} start_key? - Key to start pagination from
 * @param  {string} sort_field? -  Field to sort by
 * @param  {number} sort_order? - Ascending or descending 1 or -1
 * @param  {filterDto[]} filter? - Array of filters
 * @param  {projectionDto[]} projection? - Object of projection
 */
export const paginate = async (
    model: Model<any>,
    skip = 0,
    limit = 10,
    start_key?: startKeyDto[],
    sort_field?: string,
    sort_order?: number,
    filter?: filterDto[],
    projection?: projectionDto[]
) => {
    const model_paths = Object.keys(model.schema.paths)
    let filter_fn = {}
    let query_fn
    // console.log(filter)
    if (filter && filter.length !== 0) filter_fn = generatePaginationFilter(filter)
    // console.log(filter);
    let sort = null
    if (sort_field && sort_order && model_paths.includes(sort_field)) {
        sort = [sort_field, sort_order]
    }
    let start_key_fn = null
    if (start_key) {
        start_key_fn = generatePaginationNextKey(start_key)
    }
    const { paginatedQuery, nextKeyFn } = generatePaginationQuery(filter_fn, sort, start_key_fn)
    // console.log("paginatedQuery: ", paginatedQuery);
    // const aggregate_arr = []
    if (projection) {
        const select_obj = {}
        for (const projectionEle of projection) {
            select_obj[projectionEle.name] = projectionEle.mode
        }
        // console.log('projection: ', select_obj);
        query_fn = model.find(paginatedQuery, select_obj).skip(skip).limit(limit)
    } else query_fn = model.find(paginatedQuery).skip(skip).limit(limit)

    if (sort) {
        query_fn = query_fn.sort([sort])
    }
    // aggregate_arr.push(skip)
    // aggregate_arr.push(limit)
    const docs = await query_fn.exec()
    const next_key = generatePaginationNextKeyDtoArr(nextKeyFn(docs))
    return { docs: docs, next_key: next_key }
}
