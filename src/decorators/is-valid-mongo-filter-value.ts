import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'
import { ENUM_FILTER_OPERATOR_TYPE } from '../common.types'
import { isValidObjectId } from 'mongoose'

export const IsValidMongoFilterValue = (
    mongo_obj_fields: string[] = ['_id'],
    validationOptions?: ValidationOptions
) => {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'isValidMongoValue',
            target: object.constructor,
            propertyName: propertyName,
            // constraints: [property],
            options: {
                ...validationOptions
            },
            validator: {
                validate(value: any, args: ValidationArguments) {
                    // console.log('mongo_obj_fields: ', mongo_obj_fields)
                    // console.log('getMetadataStorage:\n', getMetadataStorage())
                    const operator = (args.object as never)['operator']
                    const field_name = (args.object as never)['name']
                    // console.log('args: ', args)
                    // console.log('field_name: ', field_name)
                    if (mongo_obj_fields.find((item) => item === field_name)) {
                        return isValidObjectId(value)
                    }
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
                    } else if (operator === ENUM_FILTER_OPERATOR_TYPE.regex) {
                        return typeof value === 'string'
                    } else return true
                },
                defaultMessage(validationArguments?: ValidationArguments): string {
                    let errMsg = 'value must be string or number or boolean'
                    const operator = (validationArguments.object as never)['operator']
                    const field_name = (validationArguments.object as never)['name']
                    if (mongo_obj_fields.find((item) => item === field_name)) {
                        errMsg = 'value must be mongo object id'
                    } else if (operator === ENUM_FILTER_OPERATOR_TYPE.regex) {
                        errMsg = 'value must be string only if operator value is regex'
                    }
                    return errMsg
                }
            }
        })
    }
}
