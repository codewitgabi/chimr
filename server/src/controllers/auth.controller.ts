import { Request, Response } from "express";
import authService from "../services/auth.service";

export const registerUser = async (req: Request, res: Response) => {
  const body = req.body;

  console.log({ body });

  const response = await authService.registerUser({ ...body });
  return res.status(response.httpStatus).json(response);
};
