# Options

The [facade](./facade) [functions](./functions) have some common options that they use.

- [Entity](#entity)
- [Id](#id)
- [Patch](#patch)
- [Filter](#filter)
- [Sort](#sort)
- [Pagination](#pagination)

### Entity
This is an object contains all of the entity's properties. The word "entity" has been borrowed from Entity-Relationship Models/Diagrams and has been used instead of the word "model" to avoid confusion with MVC.

### Id
This is an object that contains only the properties required to distinctly identify an entity. In most common cases there is a single property making the [unique key](https://en.wikipedia.org/wiki/Unique_key) so it will likely just contain the `id` property. However, for entities with multiple properties making the unique key it will contain those properties.

### Patch
This is an object containing some of the entity's properties.

### Filter
This is an object that filters the entities. More information can be found in the [filter documentation](./filter).

### Sort
This is an object where a key represents the entity property to be sorted and the value represents the direction to sort. The value should be `true` to sort in ascending order and `false` to sort in descending order. The properties are sorted in order of their definition in the sort option, for example, the following sort option `{ createdAt: false, id: true }` will sort by the `createdAt` property first and then the the `id` property.

### Pagination
This is an object with three properties, `limit`, `forward`, and `cursor`. The `limit` property defines how many entities to return (maximum). The `forward` property defines whether the entities should be iterate through the entities forwards (when `true`) or backwards (when `false`) from the `cursor`. The `cursor` property defines where to start iterating through the entities.

Concrete implementations of the facade can use the [`createCursorFromEntity`](../src/utils/createCursorFromEntity) and [`createPaginationFilter`](../src/utils/createPaginationFilter) util functions to generate cursors.