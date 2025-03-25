import { BadRequestError, HttpError } from '../errors/http-errors';
import { FieldsComparer } from '../../modules/auth/protocols/fields-comparer';

export class CompareFieldsValidation implements FieldsComparer {
  constructor(
    private readonly field: string,
    private readonly fieldToCompare: string
  ) {
    this.field = field;
    this.fieldToCompare = fieldToCompare;
  }
  compare(data: any): HttpError | void {
    if (data[this.field] !== data[this.fieldToCompare])
      throw new BadRequestError(
        `Field ${this.fieldToCompare} does not match ${this.field}`
      );
  }
}
