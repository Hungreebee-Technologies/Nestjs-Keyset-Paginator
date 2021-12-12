export enum filterOperatorType {
    /**
     * Equal to
     */
    'eq',
    /**
     * Greater than
     */
    'gt',
    /**
     * Greater than or equal to
     */
    'gte',
    /**
     * Less than
     */
    'lt',
    /**
     * Less than or equal to
     */
    'lte',
    /**
     * Regular expression
     */
    'regex'
}

export enum filterSearchModeType {
    /**
     * Start With Mode
     */
    'swm',
    /**
     * Begin With Mode
     */
    'bnm',
    /**
     * End With Mode
     */
    'ewm'
}

export type ValidMongoField = string & { __validMongoField: true }

export const mongoRegex = /^[a-zA-Z_]+$/

const isValidMongoField = (x: string): x is ValidMongoField => {
    return mongoRegex.test(x)
}
