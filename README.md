<div align=center>

<img src="https://raw.githubusercontent.com/Hungreebee-Technologies/Nestjs-Keyset-Paginator/master/.github/assets/Hungrebee-Logo.png" alt="Hungreebe Technologies" height="80"/>

# Nestjs-Keyset-Paginator

keyset pagination library made for nestjs(mongoose) by hungreebee technologies

[![npm version](https://badge.fury.io/js/nestjs-keyset-paginator.svg)](https://www.npmjs.com/package/nestjs-keyset-paginator)

</div>

## Installation

Use the package manager [npm](npmjs.com/package/nestjs-keyset-paginator) to install Nestjs-Keyset-Paginator.

```bash
npm i nestjs-keyset-paginator
```

## Usage

-   in example.controller.ts use PaginationDto to Validate params and pass it to service.

```typescript
import { PaginationDto } from 'nestjs-keyset-paginator/dist'

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
            params?.filter
        )
    }
}
```

<br>
- then in exapmle.service.ts pass those params to "paginate()" along with you model (Mongoose Model).

```typescript
import paginate, { filterDto } from 'nestjs-keyset-paginator/dist'

@Injectable()
export class ExampleService {
    constructor(
        @Inject(EXAMPLE_MODEL)
        private readonly exampleModel: Model<ExampleDocument>
    ) {}

    async findAll(
        skip = 0,
        limit = 10,
        start_key?: string,
        sort_field?: string,
        sort_order?: number,
        filter?: filterDto[]
    ) {
        return paginate(this.notificationModel, skip, limit, start_key, sort_field, sort_order, filter)
    }
}
```

-   paginate function will return with promise of

```
{ docs: docs, next_key }
```

---

## Example param

```json
{
    "filter": [
        {
            "name": "score",
            "value": 400,
            "operator": "lt"
        },
        {
            "name": "is_in_comp",
            "value": true,
            "operator": "eq"
        }
    ],
    "sort": {
        "field": "score",
        "order": 1
    },
    "limit": 4
}
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate if applicable.

## License

[MIT](https://choosealicense.com/licenses/mit/)
