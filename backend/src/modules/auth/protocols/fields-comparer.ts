import { HttpError } from '../../../common/errors/http-errors';

export interface FieldsComparer {
  compare(data: any): HttpError | void;
}
