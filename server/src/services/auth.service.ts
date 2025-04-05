import { IUser } from "../types/auth.types";
import User from "../models/user.model";
import { BadRequestError } from "../utils/api.errors";
import { StatusCodes } from "http-status-codes";

class AuthService {
  /**
   *
   * @description Create a new user account for the application
   */
  async registerUser({
    username,
    profilePic,
    jobTitle,
    about,
    password,
  }: Exclude<IUser, "id"> & { password: string }) {
    // Check if user with username already exists

    const user = await User.findOne({ username });

    if (user) {
      throw new BadRequestError("User with username already exists");
    }

    // Create user

    const newUser = await User.create({
      username,
      profilePic,
      jobTitle,
      about,
      password,
    });

    return {
      status: "success",
      message: "User created successfully",
      data: { user: newUser },
      httpStatus: StatusCodes.CREATED,
    };
  }
}

const authService = new AuthService();

export default authService;
