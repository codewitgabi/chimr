import { Request, Response } from "express";
import authService from "../services/auth.service";
import catchAsync from "../utils/catchAsync";

export const registerUser = catchAsync(async (req: Request, res: Response) => {
  const response = await authService.registerUser({ ...req.body });

  return res.status(response.httpStatus).json(response);
});
