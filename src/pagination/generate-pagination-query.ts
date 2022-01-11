/**
 * @param  {} query
 * @param  {} sort?
 * @param  {} nextKey?
 */
export const generatePaginationQuery = (query, sort?, nextKey?) => {
    // console.log('generatePaginationQuery');
    const sortField = sort == null ? null : sort[0]
    /**
     * @param  {} items - array of items
     */
    function nextKeyFn(items) {
        if (items.length === 0) {
            return null
        }

        const item = items[items.length - 1]

        if (sortField == null) {
            return { _id: item._id }
        }

        return { _id: item._id, [sortField]: item[sortField] }
    }

    let paginatedQuery = query

    if (nextKey == null) {
        // console.log('query:\n', paginatedQuery);

        return { paginatedQuery, nextKeyFn }
    }

    if (sort == null) {
        paginatedQuery._id = { $gt: nextKey._id }
        // console.log('sort null return')
        return { paginatedQuery, nextKeyFn }
    }

    const sortOperator = sort[1] === 1 ? '$gt' : '$lt'

    const paginationQuery = [
        { [sortField]: { [sortOperator]: nextKey[sortField] } },
        {
            $and: [{ [sortField]: nextKey[sortField] }, { _id: { [sortOperator]: nextKey._id } }]
        }
    ]

    if (paginatedQuery.$or == null) {
        paginatedQuery.$or = paginationQuery
    } else {
        paginatedQuery = { $and: [query, { $or: paginationQuery }] }
    }

    return { paginatedQuery, nextKeyFn }
}
