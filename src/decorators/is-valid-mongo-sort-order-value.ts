import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'

export const IsValidMongoSortOrderValue = (validationOptions?: ValidationOptions) => {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'isValidMongoSortOrderValue',
            target: object.constructor,
            propertyName: propertyName,
            // constraints: [property],
            options: {
                message: `${propertyName} value must be 1 or -1`,
                ...validationOptions
            },
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return typeof value === 'number' && (value === -1 || value === 1)
                }
            }
        })
    }
}
