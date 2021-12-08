export enum filterOperatorType {
    'eq',
    /**
     * Equal to
     */ 'gt',
    /**
     * Greater than
     */ 'gte',
    /**
     * Greater than or equal to
     */ 'lt',
    /**
     * Less than
     */ 'lte',
    /**
     * Less than or equal to
     */ 'regex'
    /**
     * Regular expression
     */
}

export enum filterSearchModeType {
    'swm'
    /**
     * Start With Mode
     */,
    'bnm'
    /**
     * Begin With Mode
     */,
    'ewm'
    /**
     * End With Mode
     */
}
