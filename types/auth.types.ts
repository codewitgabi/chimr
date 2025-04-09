import { TProfilePicture } from "@/utils/profilePicture.mapping";

export interface SignupFormFields {
  username: string;
  about: string;
  profilePic: TProfilePicture;
  password: string;
  jobTitle: string;
}

export interface LoginFormFields {
  username: string;
  password: string;
}
