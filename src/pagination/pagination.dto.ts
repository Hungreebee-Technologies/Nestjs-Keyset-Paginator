import {
    IsNumber,
    Min,
    IsOptional,
    IsString,
    MinLength,
    MaxLength,
    Max,
    ValidateNested,
    IsEnum,
    ValidateIf,
    Matches,
    IsInt,
    ArrayMinSize,
    ArrayMaxSize
} from 'class-validator'
import { Type } from 'class-transformer'
import { filterOperatorType, filterSearchModeType, mongoRegex } from '../common.types'

class sortDto {
    @IsString()
    @Matches(mongoRegex)
    @MinLength(2)
    @MaxLength(20)
    field

    // @IsInt()
    order: 1 | -1
}

export class filterDto {
    @IsString()
    @Matches(mongoRegex)
    @MinLength(2)
    @MaxLength(20)
    name

    /*@IsNumberString()
      @IsString()
      @Length(3, 20)*/
    value: unknown

    @IsEnum(filterOperatorType)
    operator: filterOperatorType

    @ValidateIf((object) => object.operator === 'regex')
    @IsEnum(filterSearchModeType)
    mode: string
}

export class projectionDto {
    @IsString()
    @Matches(mongoRegex)
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
    @Matches(mongoRegex)
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
    skip?: number

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    @Max(100)
    limit?: number

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
