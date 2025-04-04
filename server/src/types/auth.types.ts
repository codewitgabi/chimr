export interface IUser {
  id: string;
  username: string;
  profilePic:
    | "avatar-1"
    | "avatar-2"
    | "avatar-3"
    | "avatar-4"
    | "avatar-5"
    | "avatar-6";
  jobTitle: string;
  about: string;
}
