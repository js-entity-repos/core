// tslint:disable:no-class
import { BaseError } from 'make-error';

export default class MissingEntityError extends BaseError {
  constructor(public entityName: string, public entityId: string) {
    super();
  }
}
