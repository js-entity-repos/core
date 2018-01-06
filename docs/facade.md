# Facade

The facade contains common functions for storage and retrieval of entities from a repository.

- [countEntities](./functions.md#countentities)
- [createEntity](./functions.md#createentity)
- [getEntities](./functions.md#getentities)
- [getEntity](./functions.md#getentity)
- [replaceEntity](./functions.md#replaceentity)
- [patchEntity](./functions.md#patchentity)
- [removeEntities](./functions.md#removeentities)
- [removeEntity](./functions.md#removeentity)

The functions have some common options that they use.

- [Id](./options.md#id)
- [Entity](./options.md#entity)
- [Patch](./options.md#patch)
- [Filter](./options.md#filter)
- [Sort](./options.md#sort)
- [Pagination](./options.md#pagination)

The [facade in this package is a TypeScript interface](../src/Facade.ts), but concrete implementations of the interface are listed below.

- [Memory](https://github.com/js-entity-repos/memory) - This is useful for testing client/server side.
- [Mongo](https://github.com/js-entity-repos/mongo) - Uses the MongoDB Node JS driver.
- [Knex](https://github.com/js-entity-repos/knex) - For SQL databases.
- [Axios](https://github.com/js-entity-repos/axios) - For HTTP requests to a HTTP interface for entities.
