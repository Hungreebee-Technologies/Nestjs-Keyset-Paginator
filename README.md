<div align=center>

<img src="https://raw.githubusercontent.com/Hungreebee-Technologies/Nestjs-Keyset-Paginator/master/.github/assets/Hungrebee-Logo.png" alt="Hungreebe Technologies" height="80"/>

# Nestjs-Keyset-Paginator

keyset pagination library made for nestjs(mongoose) by hungreebee technologies

[![npm version](https://badge.fury.io/js/nestjs-keyset-paginator.svg)](https://www.npmjs.com/package/nestjs-keyset-paginator)

<br>

### [Documentation](https://hungreebee-technologies.github.io/Nestjs-Keyset-Paginator/)

</div>

## Installation

Use the package manager [npm](npmjs.com/package/nestjs-keyset-paginator) to install Nestjs-Keyset-Paginator.

```bash
npm i nestjs-keyset-paginator
```

## Usage

-   in example.controller.ts use PaginationDto to Validate params and pass it to service.

```typescript
import { PaginationDto, projectionDto } from 'nestjs-keyset-paginator'

@Controller('example')
export class ExampleController {
    constructor(private readonly exampleService: ExampleService) {}
    @Get()
    findAll(@Body() params: PaginationDto) {
        return this.exampleService.findAll(
            params.skip,
            params.limit,
            params?.start_key,
            params?.sort?.field,
            params?.sort?.order,
            params?.filter,
            params?.projection
        )
    }
}
```

<br>
- then in exapmle.service.ts pass those params to "paginate()" along with you model (Mongoose Model).

```typescript
import paginate, { filterDto, projectionDto } from 'nestjs-keyset-paginator'

@Injectable()
export class ExampleService {
    constructor(
        @Inject(EXAMPLE_MODEL)
        private readonly exampleModel: Model<ExampleDocument>
    ) {}

    async findAll(
        skip = 0,
        limit = 10,
        start_key?,
        sort_field?: string,
        sort_order?: number,
        filter?: filterDto[],
        projection?: projectionDto
    ) {
        return paginate(this.exampleModel, skip, limit, start_key, sort_field, sort_order, filter, projection)
    }
}
```

-   paginate function will return with promise of

```
{ docs: docs, next_key }
```

---

## Example param

-refer [src/common.types.ts](https://github.com/Hungreebee-Technologies/Nestjs-Keyset-Paginator/blob/master/src/common.types.ts) for all supported filters and search types.

Example:-

```json
{
    "filter": [
        {
            "name": "score",
            "value": 400,
            "operator": "lt"
        },
        {
            "name": "isPassed",
            "value": true,
            "operator": "eq"
        }
    ],
    "sort": {
        "field": "score",
        "order": 1
    },
    "projection": {
        "password": 0
    },
    "limit": 4
}
```

-   as response you will also get "next_key".

Example:

```json
{
    "next_key": {
        "_id": "61a842ae229ec188b04581bb"
    }
}
```

-   to get next page use this "next_key" object as "start_key" in next request

Example:

```json
{
    "filter": [
        {
            "name": "score",
            "value": 400,
            "operator": "lt"
        },
        {
            "name": "isPassed",
            "value": true,
            "operator": "eq"
        }
    ],
    "sort": {
        "field": "score",
        "order": 1
    },
    "limit": 4,
    "start_key": {
        "_id": "61a842ae229ec188b04581bb"
    }
}
```

-   if you provide "start_key" this will skip previous Documents

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate if applicable.

## License

[MIT](https://choosealicense.com/licenses/mit/)
