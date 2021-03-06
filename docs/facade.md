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

This package also contains some utility functions outside of the Facade that you might find useful.

- [convertPropertyFilter](./utils.md#convertpropertyfilter)
- [createCursorFromEntity](./utils.md#createcursorfromentity)
- [createCursorsFromEntities](./utils.md#createcursorsfromentities)
- [createGetEntitiesResult](./utils.md#creategetentitiesresult)
- [createPaginationFilter](./utils.md#createpaginationfilter)

The [facade in this package is a TypeScript interface](../src/Facade.ts), but concrete implementations of the interface are listed below.

- [Memory](https://github.com/js-entity-repos/memory) - This is useful for testing client/server side.
- [Mongo](https://github.com/js-entity-repos/mongo) - Uses the MongoDB Node JS driver.
- [Knex](https://github.com/js-entity-repos/knex) - For SQL databases.
- [Axios](https://github.com/js-entity-repos/axios) - For sending HTTP requests to a HTTP interface for entities.
- [Express](https://github.com/js-entity-repos/express) - For receiving HTTP requests at a HTTP interface for entities.
