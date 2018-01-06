// tslint:disable:no-class
import { BaseError } from 'make-error';

export default class ConflictingEntityError extends BaseError {
  constructor(public entityName: string, public entityId: string) {
    super();
  }
}
