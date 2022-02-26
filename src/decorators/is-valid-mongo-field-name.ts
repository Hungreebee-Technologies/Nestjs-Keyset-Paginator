import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'
import { REGEX_MONGO_FIELD_NAME } from '../common.types'

export const IsValidMongoFieldName = (validationOptions?: ValidationOptions) => {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'isValidMongoFieldName',
            target: object.constructor,
            propertyName: propertyName,
            options: {
                ...validationOptions
            },
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const arr_tester = (item) => typeof item === 'string' && REGEX_MONGO_FIELD_NAME.test(item)
                    if (typeof value === 'string' && REGEX_MONGO_FIELD_NAME.test(value)) return true
                    else
                        return !!(
                            typeof value === 'object' &&
                            Array.isArray(value) &&
                            value.length > 0 &&
                            value.length <= 10 &&
                            value.every(arr_tester)
                        )
                },
                defaultMessage(validationArguments?: ValidationArguments): string {
                    const { value } = validationArguments
                    if (typeof value === 'object' && Array.isArray(value) && (value.length === 0 || value.length > 10))
                        return 'name must be an array of string of length greater than 0 and less than 10'
                    return 'name must be an string or array of strings matching with regex: ' + REGEX_MONGO_FIELD_NAME
                }
            }
        })
    }
}
