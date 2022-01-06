import {
    ArrayMaxSize,
    ArrayMinSize,
    IsEnum,
    IsInt,
    IsNumber,
    IsOptional,
    IsString,
    Matches,
    Max,
    MaxLength,
    Min,
    MinLength,
    ValidateIf,
    ValidateNested
} from 'class-validator'
import { Type } from 'class-transformer'
import {
    ENUM_FILTER_OPERATOR_TYPE,
    REGEX_MONGO_FIELD_NAME,
    REGEX_SEARCH_MODE_TYPE,
    TYPE_STRING_NUM_ARRAY
} from '../common.types'
import { IsValidMongoFilterValue } from '../decorators/is-valid-mongo-filter-value'
import { IsMongoArrValue } from '../decorators/is-mongo-arr-value'
import { IsValidMongoSortOrderValue } from '../decorators/is-valid-mongo-sort-order-value'

class sortDto {
    @IsString()
    @Matches(REGEX_MONGO_FIELD_NAME)
    @MinLength(2)
    @MaxLength(20)
    field

    @IsValidMongoSortOrderValue()
    order: number
}

export class filterDto {
    @IsString()
    @Matches(REGEX_MONGO_FIELD_NAME)
    @MinLength(2)
    @MaxLength(20)
    name

    /*@IsNumberString()
    @IsString()
    @Length(3, 20)*/
    @ValidateIf(
        (object) =>
            object.operator ===
            (ENUM_FILTER_OPERATOR_TYPE.eq ||
                ENUM_FILTER_OPERATOR_TYPE.gt ||
                ENUM_FILTER_OPERATOR_TYPE.gte ||
                ENUM_FILTER_OPERATOR_TYPE.lt ||
                ENUM_FILTER_OPERATOR_TYPE.lte)
    )
    @IsValidMongoFilterValue()
    value

    @ValidateIf((object) => {
        // console.log(object)
        // console.log(object.operator === (ENUM_FILTER_OPERATOR_TYPE._in || ENUM_FILTER_OPERATOR_TYPE._nin))
        return object.operator === (ENUM_FILTER_OPERATOR_TYPE._in || ENUM_FILTER_OPERATOR_TYPE._nin)
    })
    @IsMongoArrValue(100)
    arr_value: TYPE_STRING_NUM_ARRAY

    @IsEnum(ENUM_FILTER_OPERATOR_TYPE)
    operator: ENUM_FILTER_OPERATOR_TYPE

    @ValidateIf((object) => object.operator === 'regex')
    @IsEnum(REGEX_SEARCH_MODE_TYPE)
    mode: string
}

export class projectionDto {
    @IsString()
    @Matches(REGEX_MONGO_FIELD_NAME)
    @MinLength(2)
    @MaxLength(20)
    name

    @IsInt()
    @Min(0)
    @Max(1)
    mode
}

export class startKeyDto {
    @IsString()
    @Matches(REGEX_MONGO_FIELD_NAME)
    @MinLength(2)
    @MaxLength(20)
    key

    value: unknown
}

export class PaginationDto {
    @IsOptional()
    @Type(() => startKeyDto)
    @ValidateNested({
        each: true
    })
    @ArrayMinSize(1)
    @ArrayMaxSize(2)
    start_key: startKeyDto[]

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    skip: number

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    @Max(100)
    limit: number

    @Type(() => sortDto)
    @ValidateNested()
    @IsOptional()
    sort: sortDto

    @IsOptional()
    @Type(() => filterDto)
    @ValidateNested({
        each: true
    })
    filter: filterDto[]

    @IsOptional()
    @Type(() => projectionDto)
    @ValidateNested({
        each: true
    })
    projection: projectionDto[]
}
