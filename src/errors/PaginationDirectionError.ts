// tslint:disable:no-class
import { BaseError } from 'make-error';

export default class PaginationDirectionError extends BaseError {
  constructor(public paginationDirection: any, public propertyName: string) {
    super();
  }
}
