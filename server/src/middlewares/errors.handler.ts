/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable  @typescript-eslint/no-explicit-any */

import { Request, Response, NextFunction } from "express";
import APIError from "../utils/api.errors";
import mongoose from "mongoose";

const handleValidationError = (err: mongoose.Error.ValidationError) => {
  // Transform Mongoose validation error into a custom format
  const errors = Object.values(err.errors).map((error: any) => ({
    type: "field",
    field: error.path,
    msg: error.message,
    location: "body",
  }));

  return errors;
};

export const errorHandler = (
  err: Error | APIError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Default values

  let statusCode = 500;
  let status = "error";
  let message = "Something went wrong";
  let errors = undefined;

  // If it's our custom APIError

  if ("statusCode" in err) {
    statusCode = err.statusCode;
    status = err.status;
    message = err.message;
    errors = (err as APIError).errors;
  } else if (err instanceof mongoose.Error.ValidationError) {
    // Mongoose validation error

    const formattedErrors = handleValidationError(err);

    statusCode = 422;
    status = "fail";
    message = "Validation Error";
    errors = formattedErrors;
  } else if (err.name === "CastError") {
    // Mongoose cast error

    statusCode = 400;
    status = "fail";
    message = `Invalid mongoose error`;
  }

  // Send the error response
  res.status(statusCode).json({
    statusCode,
    status,
    message,
    ...(errors && { errors }),
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
