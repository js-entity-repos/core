# Options

The [facade](./facade.md) [functions](./functions.md) have some common options that they use.

- [Id](#id)
- [Entity](#entity)
- [Patch](#patch)
- [Filter](#filter)
- [Sort](#sort)
- [Pagination](#pagination)

### Id
This is a string that uniquely identifies an entity.

### Entity
This is an object that contains all of the entity's properties. The word "entity" has been borrowed from [Entity-Relationship Models/Diagrams](https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model) and has been used instead of the word "model" to avoid confusion with MVC.

This interface is user-defined hence not contained in this package, the interface below demonstrates what this might look like for a todo entity and extends the [TypeScript Entity interface](../src/types/Entity.ts) defined in this package which contains the `id` property.

```ts
import Entity from '@js-entity-repos/core/dist/types/Entity';

interface TodoEntity extends Entity {
  readonly description: string;
  readonly completed: boolean;
}
```

### Patch
This is an object containing some of the entity's properties. This package uses [TypeScript's Partial type](https://www.typescriptlang.org/docs/handbook/advanced-types.html) applied to an [Entity](#entity) (using `Partial<Entity>`).

### Filter
This is an object that filters the entities. More information can be found in the [filter documentation](./filter.md). This package contains the [TypeScript Filter type definition](../src/types/Filter.ts).

### Sort
This is an object where a key represents the entity property to be sorted and the value represents the direction to sort. The value should be `true` to sort in ascending order and `false` to sort in descending order. The properties are sorted in order of their definition in the sort option, for example, the following sort option `{ createdAt: false, id: true }` will sort by the `createdAt` property first and then the the `id` property.

This package contains the [TypeScript Sort type definition](../src/types/Sort.ts).

### Pagination
This is an object with three properties, `limit`, `forward`, and `cursor`. The `limit` property defines how many entities to return (maximum). The `forward` property defines whether the entities should be iterated through forwards (when `true`) or backwards (when `false`) from the `cursor`. The `cursor` property defines where to start iterating through the entities. Cursors have been used instead of `skip` and `limit` to avoid the [pagination issues discussed by Rakhitha Nimesh](https://www.sitepoint.com/paginating-real-time-data-cursor-based-pagination/).

Concrete implementations of the facade can use the [`createCursorFromEntity`](../src/utils/createCursorFromEntity) and [`createPaginationFilter`](../src/utils/createPaginationFilter) util functions to generate cursors.

This package also contains the [TypeScript Pagination interface](../src/types/Pagination.ts) and the [TypeScript Cursor type definition](../src/types/Cursor.ts).