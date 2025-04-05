import { IUser } from "../types/auth.types";
import User from "../models/user.model";
import { BadRequestError } from "../utils/api.errors";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { SuccessResponse } from "../utils/responses";
import { config } from "dotenv";
config();

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

    return SuccessResponse({
      message: "User created successfully",
      data: { user: newUser },
    });
  }

  async login({
    username,
    password,
  }: Pick<IUser, "username"> & { password: string }) {
    // Check if user with username exists

    const user = await User.findOne({ username }).select("+password");

    if (!user) {
      throw new BadRequestError("Incorrect username or password");
    }

    // Check if password is correct

    if (!user.checkPassword(password)) {
      throw new BadRequestError("Incorrect username or password");
    }

    // Generate access token

    const accessToken = this.generateAccessToken({
      _id: String(user._id),
      username: user.username,
    });

    return SuccessResponse({
      message: "Login successful",
      data: { accessToken, user: user.toObject() },
      httpStatus: StatusCodes.OK,
    });
  }

  generateAccessToken(user: { _id: string; username: string }) {
    const accessToken = jwt.sign(user, process.env.JWT_SECRET as string, {
      expiresIn: "7d",
    });

    return accessToken;
  }
}

const authService = new AuthService();

export default authService;
