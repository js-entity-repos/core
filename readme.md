# core
> Provides common interfaces and tests for concrete implementations of js-entity-repos.

### Usage
- Install it with `npm i @js-entity-repos/core`.
- Understand it by reading the [documenation](./docs/facade.md).

### FeathersJS
The project has some similarities with parts of the [FeathersJS framework](feathersjs.com), but unfortunately I've found the following issues with FeathersJS.

- Their pagination uses skip and limit instead of cursors which causes [issues as discussed by Rakhitha Nimesh](https://www.sitepoint.com/paginating-real-time-data-cursor-based-pagination/).
- Their service interface is missing some functions provided in the [Facade](./docs/facade.md) here.
- Their errors take messages instead of parameters making it harder to support localisation.

### Thanks
Thanks to [James](https://github.com/ht2), [Mariusz](https://github.com/mariocoski), and [Pete](https://github.com/ee0pdt) at [HT2 Labs](https://www.ht2labs.com) for their feedback.
