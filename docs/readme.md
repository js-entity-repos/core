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
const { count } = await facade.countEntities({ filter: {} });
```

### createEntity
```ts
const { entity } = await facade.createEntity({ entity: { /* ... */ } });
```

### getEntities
```ts
const { entities, nextCursor, previousCursor} = await facade.getEntities({
  filter: {},
  sort: { id: true },
  pagination: { limit: 10, forward: true, cursor: undefined },
});
```

### getEntity
```ts
const { entity } = await facade.getEntity({ id: { /* ... */ } });
```

### overwriteEntity
```ts
const { entity } = await facade.overwriteEntity({
  id: { /* ... */ },
  entity: { /* ... */ },
});
```

### patchEntity
```ts
const { entity } = await facade.patchEntity({
  id: { /* ... */ },
  patch: { /* ... */ },
});
```

### removeEntities
```ts
await facade.removeEntities({
  filter: {},
});
```

### removeEntity
```ts
await facade.removeEntity({ id: { /* ... */ } });
```
