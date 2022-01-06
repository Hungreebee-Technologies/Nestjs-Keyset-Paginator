import { isArray, isInt, registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'

export const IsMongoArrValue = (arr_length: number, validationOptions?: ValidationOptions) => {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'isMongoArrValue',
            target: object.constructor,
            propertyName: propertyName,
            // constraints: [property],
            options: {
                message: 'arr_value must be array of string or number with length between 1 and ' + arr_length,
                ...validationOptions
            },
            validator: {
                validate(value: any, args: ValidationArguments) {
                    if (isArray(value) && isInt(arr_length) && value.length > 0 && value.length <= arr_length) {
                        const test_string_or_no = (item) => typeof item === 'string' || typeof item === 'number'
                        return value.every(test_string_or_no)
                    } else return false
                }
            }
        })
    }
}
