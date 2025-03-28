export class HttpError extends Error {
  constructor(public readonly statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string) {
    super(400, message);
  }
}

export class UnauthorizedError extends HttpError {
  constructor() {
    super(401, 'Unauthorized');
  }
}
export class UnprocessableEntity extends HttpError {
  constructor(message: string) {
    super(422, message);
  }
}
export class NotFound extends HttpError {
  constructor(message: string) {
    super(404, message);
  }
}
