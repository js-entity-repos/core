// tslint:disable:no-class
import { BaseError } from 'make-error';

export default class ConflictingEntityError<Id> extends BaseError {
  constructor(public entityName: string, public entityId: Id) {
    super();
  }
}
