# Options

The [facade](./facade.md) [functions](./functions.md) have some common options that they use.

- [Id](#id)
- [Entity](#entity)
- [Patch](#patch)
- [Filter](#filter)
- [Sort](#sort)
- [Pagination](#pagination)

### Id
This is an object that contains only the properties required to distinctly identify an entity. In most common cases there is a single property making the [unique key](https://en.wikipedia.org/wiki/Unique_key) so it will likely just contain the `id` property. However, for entities with multiple properties making the unique key it will contain those properties.

This interface is user-defined hence not contained in this package, the interface below demonstrates what this will look like in most cases.

```ts
interface Id {
  readonly id: string;
}
```

### Entity
This is an object that contains all of the entity's properties. The word "entity" has been borrowed from [Entity-Relationship Models/Diagrams](https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model) and has been used instead of the word "model" to avoid confusion with MVC.

This interface is user-defined hence not contained in this package, the interface below demonstrates what this might look like for a todo entity and extends the [Id interface from the Id example](#id).

```ts
interface TodoEntity extends Id {
  readonly description: string;
  readonly completed: boolean;
}
```

### Patch
This is an object containing some of the entity's properties. This package uses [TypeScript's Partial type](https://www.typescriptlang.org/docs/handbook/advanced-types.html) applied to an [Entity](#entity) (using `Partial<Entity>`).

### Filter
This is an object that filters the entities. More information can be found in the [filter documentation](./filter.md).

### Sort
This is an object where a key represents the entity property to be sorted and the value represents the direction to sort. The value should be `true` to sort in ascending order and `false` to sort in descending order. The properties are sorted in order of their definition in the sort option, for example, the following sort option `{ createdAt: false, id: true }` will sort by the `createdAt` property first and then the the `id` property.

This package contains the [TypeScript Sort type definition](../src/types/Sort.ts)

### Pagination
This is an object with three properties, `limit`, `forward`, and `cursor`. The `limit` property defines how many entities to return (maximum). The `forward` property defines whether the entities should be iterate through the entities forwards (when `true`) or backwards (when `false`) from the `cursor`. The `cursor` property defines where to start iterating through the entities.

Concrete implementations of the facade can use the [`createCursorFromEntity`](../src/utils/createCursorFromEntity) and [`createPaginationFilter`](../src/utils/createPaginationFilter) util functions to generate cursors.

This package also contains the [TypeScript Pagination interface](../src/types/Pagination.ts) and the [TypeScript Cursor type definition](../src/types/Cursor.ts).