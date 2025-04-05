import { Router } from "express";
import { registerUser } from "../controllers/auth.controller";
import { CreateUserSchema } from "../utils/validators/auth.validators";

const router = Router();

router.post("/register", CreateUserSchema, registerUser);

export default router;
