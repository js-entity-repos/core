# Utils

This package contains some common utility functions that can be used by both users and implementors of the [Facade](./facade.md#facade).

- [convertPropertyFilter](#convertPropertyFilter)
- [createCursorFromEntity](#createCursorFromEntity)
- [createPaginationFilter](#createPaginationFilter)

### convertPropertyFilter
Converts the filter value for a certain property name. For example, if you have a date property on your entity called `createdAt` storing the date at which an entity was created, then if you filter the property using a string (usually via [js-entity-repos/express](https://github.com/js-entity-repos/express)), you can use this util to ensure that the string is converted to a date before using the filter in the database. This is usually used by users of the js-entity-repos inside a `constructFilter` function in the factory config of [concrete implementations of the Facade](./facade.md#facade), the [Knex implementation allows this configuration function](https://github.com/js-entity-repos/knex#construct-the-facade) amongst others.

```ts
import convertPropertyFilter from '@js-entity-repos/core/dist/utils/convertPropertyFilter';

convertPropertyFilter({
  converter: (value: any) => new Date(value),
  propertyName: 'createdAt',
  filter: { createdAt: '2018-01-01' },
});
// Returns the result of { createdAt: new Date('2018-01-01') }
```

### createCursorFromEntity
Exactly what it says on the tin, this creates a cursor from an entity. A cursor is constructed by creating a [filter](./options#filter) that will filter out entities not expected in the next set of paginated results. This filter is then stringified to JSON and base 64 encoded. This function is usually used by [concrete implementations of the Facade](./facade.md#facade) like [Knex's getEntities implementation](https://github.com/js-entity-repos/knex/blob/master/src/functions/getEntities.ts).. 

```ts
import createCursorFromEntity from '@js-entity-repos/core/dist/utils/createCursorFromEntity';
import { asc } from '@js-entity-repos/core/dist/types/SortOrder';

createCursorFromEntity(undefined, { id: asc });
// Returns undefined

createCursorFromEntity({
  booleanProp: true,
  id: 'test_id_1',
  numberProp: 1,
  stringProp: 'test_string_prop',
}, {
  id: asc,
});
// Returns eyJpZCI6InRlc3RfaWQifQ==
```

### createPaginationFilter
Takes a [pagination option](./options#pagination) and a [sort option](./options#sort)) to produces a [filter](./options#filter) that can filter out entities not expected in the next set of paginated results. This function is usually used by [concrete implementations of the Facade](./facade.md#facade) like [Knex's getEntities implementation](https://github.com/js-entity-repos/knex/blob/master/src/functions/getEntities.ts).

```ts
import createPaginationFilter from '@js-entity-repos/core/dist/utils/createPaginationFilter';
import { asc, desc } from '@js-entity-repos/core/dist/types/SortOrder';
import { backward, forward } from '@js-entity-repos/core/dist/types/PaginationDirection';

createPaginationFilter(
  { cursor: undefined, direction: forward, limit: 1 },
  { id: asc, numberProp: desc }
);
// Returns {}

createPaginationFilter(
  { cursor: nextCursor, direction: forward, limit: 1 },
  { id: asc, numberProp: desc }
);
// Returns the result of { id: { $gt: lastEntity.id }, numberProp: { $lte: lastEntity.numberProp } }

createPaginationFilter(
  { cursor: prevCursor, direction: backward, limit: 1 },
  { id: asc, numberProp: desc }
);
// Returns the result of { id: { $lt: firstEntity.id }, numberProp: { $gte: firstEntity.numberProp } }
```
