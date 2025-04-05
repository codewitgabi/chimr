import { StatusCodes } from "http-status-codes";

export default class APIError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public errors: Array<unknown>,
    public status: "fail" | "error"
  ) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends APIError {
  constructor(message = "Bad Request", errors: Array<unknown> = []) {
    super(message, StatusCodes.BAD_REQUEST, errors, "fail");
  }
}

export class ValidationError extends APIError {
  constructor(message = "Validation failed", errors: Array<unknown> = []) {
    super(message, StatusCodes.UNPROCESSABLE_ENTITY, errors, "fail");
  }
}

export class NotFoundError extends APIError {
  constructor(message = "Not Found", errors: Array<unknown> = []) {
    super(message, StatusCodes.NOT_FOUND, errors, "fail");
  }
}

export class UnauthorizedError extends APIError {
  constructor(message = "Unauthorized", errors: Array<unknown> = []) {
    super(message, StatusCodes.UNAUTHORIZED, errors, "fail");
  }
}

export class ForbiddenError extends APIError {
  constructor(message = "Forbidden", errors: Array<unknown> = []) {
    super(message, StatusCodes.FORBIDDEN, errors, "fail");
  }
}
