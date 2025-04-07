import { validateRequest } from "../../middlewares/validation.middleware";
import { body } from "express-validator";

export const CreateUserSchema = [
  body("username").notEmpty().withMessage("This field is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  body("profilePic")
    .notEmpty()
    .withMessage("This field is required")
    .isIn([
      "avatar-1",
      "avatar-2",
      "avatar-3",
      "avatar-4",
      "avatar-5",
      "avatar-6",
      "avatar-7",
    ])
    .withMessage("Invalid avatar"),
  body("jobTitle")
    .notEmpty()
    .withMessage("This field is required")
    .isLength({ min: 3 })
    .withMessage("Job title must be minimum of 3 characters"),
  body("about").notEmpty().withMessage("This field is required"),
  validateRequest, // ! Always add this at the end of the validation chain
];

export const LoginSchema = [
  body("username").notEmpty().withMessage("This field is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  validateRequest, // ! Always add this at the end of the validation chain
];
