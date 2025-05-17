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

export type TOauthSuccessCallback = (
  isNewUser: boolean,
  idToken: string,
  username?: string | null,
  provider?: "google" | "github" | "facebook"
) => void;
