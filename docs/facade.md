# Facade

The facade contains common functions for storage and retrieval of entities from a repository.

- [countEntities](./.mdfunctions#countentities)
- [createEntity](./functions.md#createentity)
- [getEntities](./functions.md#getentities)
- [getEntity](./functions.md#getentity)
- [overwriteEntity](./functions.md#overwriteentity)
- [patchEntity](./functions.md#patchentity)
- [removeEntities](./functions.md#removeentities)
- [removeEntity](./functions.md#removeentity)
- [upsertEntity](./functions.md#upsertentity)

The functions have some common options that they use.

- [Entity](./options.md#entity)
- [Id](./options.md#id)
- [Patch](./options.md#patch)
- [Filter](./options.md#filter)
- [Sort](./options.md#sort)
- [Pagination](./options.md#pagination)

The [facade in this package is a TypeScript interface](../src/Facade.ts), but concrete implementations of the interface are listed below.

- [Memory](https://github.com/js-entity-repos/memory) - Coming Soon
- [Mongo](https://github.com/js-entity-repos/mongo) - Coming Soon
- [Knex](https://github.com/js-entity-repos/knex) - Coming Soon
