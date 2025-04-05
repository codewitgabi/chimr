import { Router } from "express";
import { login, registerUser } from "../controllers/auth.controller";
import {
  CreateUserSchema,
  LoginSchema,
} from "../utils/validators/auth.validators";

const router = Router();

router.post("/register", CreateUserSchema, registerUser);
router.post("/login", LoginSchema, login);

export default router;
