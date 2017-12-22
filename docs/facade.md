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
- [Mongo](https://github.com/js-entity-repos/mongo) - Coming Soon
- [Knex](https://github.com/js-entity-repos/knex) - Coming Soon

## Functions

### countEntities
Counts the number of entities that match the `filter` option.

```ts
const { count } = await facade.countEntities({
  filter: { foo: 'bar' },
});
```

This package contains the [count entities tests](../src/tests/countEntities) and the [count entities signature](../src/signatures/CountEntities) for this function.

### createEntity
Creates a new entity using the `entity` option.

```ts
const { entity } = await facade.createEntity({
  entity: { id: 'example_id', foo: 'bar' },
});
```

This package contains the [create entity tests](../src/tests/createEntity) and the [create entity signature](../src/signatures/CreateEntity) for this function.

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

This package contains the [get entities tests](../src/tests/getEntities) and the [get entities signature](../src/signatures/GetEntities) for this function.

### getEntity
Retrieves a single entity that matches the `id` option.

```ts
const { entity } = await facade.getEntity({
  id: { id: 'example_id' },
});
```

This package contains the [get entity tests](../src/tests/getEntity) and the [get entity signature](../src/signatures/GetEntity) for this function.

### overwriteEntity
For an entity that matches the `id` option, it changes all of an entity's properties using the `entity` option.

```ts
const { entity } = await facade.overwriteEntity({
  id: { id: 'example_id' },
  entity: { id: 'example_id', foo: 'bar' },
});
```

This package contains the [overwrite entity tests](../src/tests/overwriteEntity) and the [overwrite entity signature](../src/signatures/OverwriteEntity) for this function.

### patchEntity
For an entity that matches the `id` option, it changes some of an entity's properties using the `patch` option.

```ts
const { entity } = await facade.patchEntity({
  id: { id: 'example_id' },
  patch: { foo: 'bar' },
});
```

This package contains the [patch entity tests](../src/tests/patchEntity) and the [patch entity signature](../src/signatures/PatchEntity) for this function.

### removeEntities
Removes all entities that match the `filter` option.

```ts
await facade.removeEntities({
  filter: { foo: 'bar' },
});
```

This package contains the [remove entities tests](../src/tests/removesEntities) and the [remove entities signature](../src/signatures/RemoveEntities) for this function.

### removeEntity
Removes an entity that matches the `id` option.

```ts
await facade.removeEntity({
  id: { id: 'example_id' },
});
```

This package contains the [remove entity tests](../src/tests/removesEntity) and the [remove entity signature](../src/signatures/RemoveEntity) for this function.

### upsertEntity
Creates an entity when no entity exists that matches the `id` option. Otherwise, it overwrites all of the properties for an entity that matches the `id` option.

```ts
await facade.upsertEntity({
  id: { id: 'example_id' },
  entity: { id: 'example_id', foo: 'bar' },
});
```

This package contains the [upsert entity tests](../src/tests/upsertsEntity) and the [upsert entity signature](../src/signatures/UpsertEntity) for this function.
