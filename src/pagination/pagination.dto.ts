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
    TYPE_MONGO_FIELD_NAME,
    TYPE_STRING_NUM_ARRAY
} from '../common.types'
import { IsValidMongoFilterValue } from '../decorators/is-valid-mongo-filter-value'
import { IsMongoArrValue } from '../decorators/is-mongo-arr-value'
import { IsValidMongoSortOrderValue } from '../decorators/is-valid-mongo-sort-order-value'
import { IsValidMongoFieldName } from '../decorators/is-valid-mongo-field-name'

export class sortDto {
    @IsString()
    @Matches(REGEX_MONGO_FIELD_NAME)
    @MinLength(2)
    @MaxLength(20)
    field

    @IsValidMongoSortOrderValue()
    order: number
}

export class filterDto {
    @IsValidMongoFieldName()
    name: TYPE_MONGO_FIELD_NAME

    @IsValidMongoFilterValue()
    value

    @ValidateIf((object) => object.operator === (ENUM_FILTER_OPERATOR_TYPE._in || ENUM_FILTER_OPERATOR_TYPE._nin))
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
    @ArrayMinSize(1)
    filter: filterDto[]

    @IsOptional()
    @Type(() => projectionDto)
    @ValidateNested({
        each: true
    })
    projection: projectionDto[]
}
