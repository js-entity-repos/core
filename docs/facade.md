# Facade

The facade contains common functions for storage and retrieval of entities from a repository.

- [countEntities](./functions#countentities)
- [createEntity](./functions#createentity)
- [getEntities](./functions#getentities)
- [getEntity](./functions#getentity)
- [overwriteEntity](./functions#overwriteentity)
- [patchEntity](./functions#patchentity)
- [removeEntities](./functions#removeentities)
- [removeEntity](./functions#removeentity)
- [upsertEntity](./functions#upsertentity)

The functions have some common options that they use.

- [Entity](./options#entity)
- [Id](./options#id)
- [Patch](./options#patch)
- [Filter](./options#filter)
- [Sort](./options#sort)
- [Pagination](./options#pagination)

The [facade in this package is a TypeScript interface](../src/Facade.ts), but concrete implementations of the interface are listed below.

- [Memory](https://github.com/js-entity-repos/memory) - Coming Soon
- [Mongo](https://github.com/js-entity-repos/mongo) - Coming Soon
- [Knex](https://github.com/js-entity-repos/knex) - Coming Soon
