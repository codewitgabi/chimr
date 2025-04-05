import { NextFunction, Response, Request } from "express";

const catchAsync =
  <T>(
    controller: (req: Request, res: Response, next: NextFunction) => Promise<T>
  ) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await controller(req, res, next);
    } catch (error: unknown) {
      console.error("Error:", error instanceof Error ? error.message : error);
      next(error);
    }
  };

export default catchAsync;
