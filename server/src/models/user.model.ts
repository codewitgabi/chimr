import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 30,
    unique: true,
  },
  profilePic: {
    type: String,
    trim: true,
    minLength: 8,
    maxLength: 8,
  },
  jobTitle: {
    type: String,
    trim: true,
    minLength: 3,
  },
  about: {
    type: String,
    trim: true,
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
