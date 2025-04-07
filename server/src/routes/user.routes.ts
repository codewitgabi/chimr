import { Router } from "express";
import { getUsers, feedback } from "../controllers/user.controller";

const router = Router();

router.get("", getUsers);
router.post("/feedback", feedback);

export default router;
