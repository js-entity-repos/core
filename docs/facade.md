# Facade

The facade contains common functions for storage and retrieval of entities from a repository.

- [countEntities](#countentities)
- [createEntity](#createentity)
- [getEntities](#getentities)
- [getEntity](#getentity)
- [overwriteEntity](#overwriteentity)
- [patchEntity](#patchentity)
- [removeEntities](#removeentities)
- [removeEntity](#removeentity)
- [upsertEntity](#upsertentity)

The facade in this package is a TypeScript interface, but concrete implementations of the interface include:

- [Memory](https://github.com/js-entity-repos/memory) - Coming Soon
- [Mongo](https://github.com/js-entity-repos/memory) - Coming Soon
- [Knex](https://github.com/js-entity-repos/memory) - Coming Soon

### countEntities
Counts the number of entities that match the `filter` option.

```ts
const { count } = await facade.countEntities({
  filter: { foo: 'bar' },
});
```

### createEntity
Creates a new entity using the `entity` option.

```ts
const { entity } = await facade.createEntity({
  entity: { id: 'example_id', foo: 'bar' },
});
```

### getEntities
Retreives a sorted paginated array of entities that match the `filter` option.

```ts
const { entities, nextCursor, previousCursor } = await facade.getEntities({
  filter: { foo: 'bar' },
  sort: { id: true },
  pagination: { limit: 10, forward: true, cursor: undefined },
});
const secondPage = await facade.getEntities({
  filter: { foo: 'bar' },
  sort: { id: true },
  pagination: { limit: 10, forward: true, cursor: nextCursor },
});
const firstPage = await facade.getEntities({
  filter: { foo: 'bar' },
  sort: { id: true },
  pagination: { limit: 10, forward: false, cursor: secondPage.previousCursor },
});
```

### getEntity
Retrieves a single entity that matches the `id` option.

```ts
const { entity } = await facade.getEntity({
  id: { id: 'example_id' },
});
```

### overwriteEntity
For an entity that matches the `id` option, it changes all of an entity's properties using the `entity` option.

```ts
const { entity } = await facade.overwriteEntity({
  id: { id: 'example_id' },
  entity: { id: 'example_id', foo: 'bar' },
});
```

### patchEntity
For an entity that matches the `id` option, it changes some of an entity's properties using the `patch` option.

```ts
const { entity } = await facade.patchEntity({
  id: { id: 'example_id' },
  patch: { foo: 'bar' },
});
```

### removeEntities
Removes all entities that match the `filter` option.

```ts
await facade.removeEntities({
  filter: { foo: 'bar' },
});
```

### removeEntity
Removes an entity that matches the `id` option.

```ts
await facade.removeEntity({
  id: { id: 'example_id' },
});
```

### upsertEntity
Creates an entity when no entity exists that matches the `id` option. Otherwise, it overwrites all of the properties for an entity that matches the `id` option.

```ts
await facade.upsertEntity({
  id: { id: 'example_id' },
  entity: { id: 'example_id', foo: 'bar' },
});
```
