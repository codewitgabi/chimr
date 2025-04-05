import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import userService from "../services/user.service";

export const getUsers = catchAsync(async (req: Request, res: Response) => {
  const response = await userService.getUsers();

  return res.status(response.httpStatus).json(response);
});
