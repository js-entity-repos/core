// tslint:disable:no-class
import { BaseError } from 'make-error';

export default class SortOrderError extends BaseError {
  constructor(public sortOrder: any, public propertyName: string) {
    super();
  }
}
