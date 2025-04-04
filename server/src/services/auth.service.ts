import { IUser } from "../types/auth.types";
import User from "../models/user.model";
import { IErrorResponse, ISuccessResponse } from "../types/response.types";

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
  }: Exclude<IUser, "id"> & { password: string }): Promise<
    IErrorResponse | ISuccessResponse
  > {
    try {
      // Check if user with username already exists

      const user = await User.findOne({ username });

      if (user) {
        return {
          status: "error",
          message: "User with username already exists",
          trace: null,
          httpStatus: 400,
        };
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
        httpStatus: 201,
      };
    } catch (e) {
      return {
        status: "error",
        message: `${e}`,
        trace: `${e}`,
        httpStatus: 500,
      };
    }
  }

  // login({
  //   username,
  //   password,
  // }: Pick<IUser, "username"> & { password: string }) {}
}

const authService = new AuthService();

export default authService;
