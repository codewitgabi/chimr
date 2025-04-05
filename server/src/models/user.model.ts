import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      minLength: 3,
      maxLength: 30,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
      set: (value: string) => {
        // If the password is already hashed (starts with $2), return it as-is

        if (value.startsWith("$2")) return value;

        // Hash and return

        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(value, salt);
      },
    },
    profilePic: {
      type: String,
      trim: true,
      minLength: 8,
      maxLength: 8,
      required: true,
    },
    jobTitle: {
      type: String,
      trim: true,
      minLength: 3,
      required: true,
    },
    about: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamp: true, versionKey: false }
);

const User = mongoose.model("User", UserSchema);
export default User;
