import User from "../models/user.model";
import { SuccessResponse } from "../utils/responses";

class UserService {
  async getUsers() {
    // Fetch all users from the database

    const users = await User.find({});

    return SuccessResponse({
      message: "Users fetched successfully",
      data: { count: users.length, users },
    });
  }
}

const userService = new UserService();
export default userService;
