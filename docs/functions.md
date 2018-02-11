# Functions

The [facade](./facade.md) contains common functions for storage and retrieval of entities from a repository.

- [countEntities](#countentities)
- [createEntity](#createentity)
- [getEntities](#getentities)
- [getEntity](#getentity)
- [replaceEntity](#replaceentity)
- [patchEntity](#patchentity)
- [removeEntities](#removeentities)
- [removeEntity](#removeentity)

### countEntities
Counts the number of entities that match the [`filter`](./filter.md) option.

```ts
const { count } = await facade.countEntities({
  filter: { foo: 'bar' },
});
```

This package contains the [count entities tests](../src/tests/countEntities) and the [count entities signature](../src/signatures/CountEntities.ts) for this function.

### createEntity
Creates a new entity using the [`entity`](./options.md#entity) option if no entity exists that matches the [`id`](./options.md#id) option.

```ts
import ConflictingEntityError from 'js-entity-repos/core/dist/errors/ConflictingEntityError';

try {
  const { entity } = await facade.createEntity({
    id: 'example_id',
    entity: { id: 'example_id', foo: 'bar' },
  });
} catch (err) {
  if (err instanceof ConflictingEntityError) {
    // An entity with the given id already exists.
  }
  throw err;
}
```

This package contains the [create entity tests](../src/tests/createEntity) and the [create entity signature](../src/signatures/CreateEntity.ts) for this function.

### getEntities
Retreives a sorted paginated array of entities that match the [`filter`](./filter.md) option.

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

This package contains the [get entities tests](../src/tests/getEntities) and the [get entities signature](../src/signatures/GetEntities.ts) for this function.

### getEntity
Retrieves a single entity that matches the [`id`](./options.md#id) and [`filter`](./filter.md) options.

```ts
import MissingEntityError from 'js-entity-repos/core/dist/errors/MissingEntityError';

try {
  const { entity } = await facade.getEntity({
    id: 'example_id',
    filter: { foo: 'bar' },
  });
} catch (err) {
  if (err instanceof MissingEntityError) {
    // No entity exists that matches the given id and filter options.
  }
  throw err;
}
```

This package contains the [get entity tests](../src/tests/getEntity) and the [get entity signature](../src/signatures/GetEntity.ts) for this function.

### replaceEntity
For an entity that matches the [`id`](./options.md#id) and [`filter`](./filter.md) options, it changes all of an entity's properties using the [`entity`](./options.md#entity) option.

```ts
import MissingEntityError from 'js-entity-repos/core/dist/errors/MissingEntityError';

try {
  const { entity } = await facade.replaceEntity({
    id: 'example_id',
    entity: { id: 'example_id', foo: 'bar' },
    filter: { foo: 'bar' },
  });
} catch (err) {
  if (err instanceof MissingEntityError) {
    // No entity exists that matches the given id and filter options.
  }
  throw err;
}
```

This package contains the [replace entity tests](../src/tests/replaceEntity) and the [replace entity signature](../src/signatures/ReplaceEntity.ts) for this function.

### patchEntity
For an entity that matches the [`id`](./options.md#id) and [`filter`](./filter.md) options, it changes some of an entity's properties using the [`patch`](./options.md#patch) option.

```ts
import MissingEntityError from 'js-entity-repos/core/dist/errors/MissingEntityError';

try {
  const { entity } = await facade.patchEntity({
    id: 'example_id',
    patch: { foo: 'bar' },
    filter: { foo: 'bar' },
  });
} catch (err) {
  if (err instanceof MissingEntityError) {
    // No entity exists that matches the given id and filter options.
  }
  throw err;
}
```

This package contains the [patch entity tests](../src/tests/patchEntity) and the [patch entity signature](../src/signatures/PatchEntity.ts) for this function.

### removeEntities
Removes all entities that match the [`filter`](./filter.md) option.

```ts
await facade.removeEntities({
  filter: { foo: 'bar' },
});
```

This package contains the [remove entities tests](../src/tests/removesEntities) and the [remove entities signature](../src/signatures/RemoveEntities.ts) for this function.

### removeEntity
Removes an entity that matches the [`id`](./options.md#id) and [`filter`](./filter.md) options.

```ts
import MissingEntityError from 'js-entity-repos/core/dist/errors/MissingEntityError';

try {
  await facade.removeEntity({
    id: 'example_id',
    filter: { foo: 'bar' },
  });
} catch (err) {
  if (err instanceof MissingEntityError) {
    // No entity exists that matches the given id and filter options.
  }
  throw err;
}
```

This package contains the [remove entity tests](../src/tests/removesEntity) and the [remove entity signature](../src/signatures/RemoveEntity.ts) for this function.
