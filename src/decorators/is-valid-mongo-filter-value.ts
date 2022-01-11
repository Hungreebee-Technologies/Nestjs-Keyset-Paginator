import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'
import { ENUM_FILTER_OPERATOR_TYPE } from '../common.types'

export const IsValidMongoFilterValue = (validationOptions?: ValidationOptions) => {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'isValidMongoValue',
            target: object.constructor,
            propertyName: propertyName,
            // constraints: [property],
            options: {
                message: 'value must be string or number or boolean and string only if operator value is regex',
                ...validationOptions
            },
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const operator = (args.object as any)['operator']
                    // console.log('operator: ', operator)
                    if (
                        operator ===
                        (ENUM_FILTER_OPERATOR_TYPE.eq ||
                            ENUM_FILTER_OPERATOR_TYPE.gt ||
                            ENUM_FILTER_OPERATOR_TYPE.gte ||
                            ENUM_FILTER_OPERATOR_TYPE.lt ||
                            ENUM_FILTER_OPERATOR_TYPE.lte)
                    ) {
                        // console.log('condition one')
                        return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'
                    } else if (operator === ENUM_FILTER_OPERATOR_TYPE.regex) return typeof value === 'string'
                    else return false
                }
            }
        })
    }
}
