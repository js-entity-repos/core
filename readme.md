# core
> Provides common interfaces and tests for concrete implementations of js-entity-repos.

### Usage
- Install it with `npm i @js-entity-repos/core`.
- Understand it by reading the [documenation](./docs/facade.md).

### Thanks
This project has been inspired by the work of many people, but especially the following people.

- [Martin Fowler](https://en.wikipedia.org/wiki/Martin_Fowler)
- [Robert Martin](https://en.wikipedia.org/wiki/Robert_Cecil_Martin)
- [Taylor Otwell](http://taylorotwell.com/)
- [Craig Larman](https://en.wikipedia.org/wiki/Craig_Larman)
- [Erich Gamma](https://en.wikipedia.org/wiki/Erich_Gamma)
- [Richard Helm](http://c2.com/cgi/wiki?RichardHelm)
- [Ralph Johnson](https://en.wikipedia.org/wiki/Ralph_Johnson_(computer_scientist))
- [John Vlissides](https://en.wikipedia.org/wiki/John_Vlissides)

The project has some similarities with parts of the [FeathersJS framework](feathersjs.com), but unfortunately I've found the following issues with FeathersJS.

- Their pagination uses skip and limit not cursors which causes issues as discussed by [Rakhitha Nimesh](https://www.sitepoint.com/paginating-real-time-data-cursor-based-pagination/).
- Their service interface is missing some methods provided in the [Facade](./docs/facade.md) here.
- Their errors take messages instead of parameters making it harder to support localisation.

Thanks to colleagues at @HT2-Labs that have used and helped sanity check this project.

- [James](https://github.com/ht2)
- [Mariusz](https://github.com/mariocoski)
- [Pete](https://github.com/ee0pdt)
