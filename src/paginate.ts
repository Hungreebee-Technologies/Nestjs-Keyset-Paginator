import { Model } from 'mongoose'
import { generatePaginationFilter } from './pagination/generate-pagination-filter'
import { generatePaginationQuery } from './pagination/generate-pagination-query'
import { filterDto } from './pagination/pagination.dto'
/**
 * @param  {Model<any>} model - Mongoose model
 * @param  {} skip=0 - Number of documents to skip
 * @param  {} limit=10 - Number of documents to limit
 * @param  {string} start_key? - Key to start pagination from
 * @param  {string} sort_field? -  Field to sort by
 * @param  {number} sort_order? - Ascending or descending 1 or -1
 * @param  {filterDto[]} filter? - Array of filters
 */
export const paginate = async (
    model: Model<any>,
    skip = 0,
    limit = 10,
    start_key?: string,
    sort_field?: string,
    sort_order?: number,
    filter?: filterDto[]
) => {
    let filter_fn = {}
    // console.log(filter);
    if (filter) filter_fn = generatePaginationFilter(filter)
    let next_key
    let docs
    if (sort_field && sort_order) {
        const sort = [sort_field, sort_order]
        // console.log(filter_fn);
        // console.log('in-service');
        const { paginatedQuery, nextKeyFn } = generatePaginationQuery(filter_fn, sort, start_key)
        docs = await model.find(paginatedQuery).skip(skip).limit(limit).sort([sort]).exec()
        // .toArray();
        // console.log('paginatedQuery:\n', paginatedQuery);
        next_key = nextKeyFn(docs)
    } else {
        const { paginatedQuery, nextKeyFn } = generatePaginationQuery(filter_fn)
        docs = await model.find(paginatedQuery).skip(skip).limit(limit).exec()
        next_key = nextKeyFn(docs)
    }
    return { docs: docs, next_key }
}
