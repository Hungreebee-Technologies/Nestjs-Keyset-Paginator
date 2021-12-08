import {
    IsNumber,
    Min,
    IsOptional,
    IsString,
    MinLength,
    MaxLength,
    IsInt,
    Max,
    ValidateNested,
    IsEnum,
    ValidateIf
} from 'class-validator'
import { Type } from 'class-transformer'
import { filterOperatorType, filterSearchModeType } from '../common.types'

class sortDto {
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    field

    @IsInt()
    @Min(-1)
    @Max(1)
    order
}

export class filterDto {
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    name

    /*@IsNumberString()
  @IsString()
  @Length(3, 20)*/
    value

    @IsEnum(filterOperatorType)
    operator: filterOperatorType

    @ValidateIf((object) => object.operator === 'regex')
    @IsEnum(filterSearchModeType)
    mode: string
}

export class PaginationDto {
    @IsOptional()
    // @IsMongoId()
    start_key?: any

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
}
