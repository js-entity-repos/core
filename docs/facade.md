# Facade

- [countEntities](#countentities)
- [createEntity](#createentity)
- [getEntities](#getentities)
- [getEntity](#getentity)
- [overwriteEntity](#overwriteentity)
- [patchEntity](#patchentity)
- [removeEntities](#removeentities)
- [removeEntity](#removeentity)

### countEntities
```ts
const { count } = await facade.countEntities({
  filter: { foo: 'bar' },
});
```

### createEntity
```ts
const { entity } = await facade.createEntity({
  entity: { id: 'example_id', foo: 'bar' },
});
```

### getEntities
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
```ts
const { entity } = await facade.getEntity({
  id: { id: 'example_id' },
});
```

### overwriteEntity
```ts
const { entity } = await facade.overwriteEntity({
  id: { id: 'example_id' },
  entity: { id: 'example_id', foo: 'bar' },
});
```

### patchEntity
```ts
const { entity } = await facade.patchEntity({
  id: { id: 'example_id' },
  patch: { foo: 'bar' },
});
```

### removeEntities
```ts
await facade.removeEntities({
  filter: { foo: 'bar' },
});
```

### removeEntity
```ts
await facade.removeEntity({
  id: { id: 'example_id' },
});
```
