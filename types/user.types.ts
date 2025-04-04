import { StaticImageData } from "next/image";

export interface IUser {
  id: string;
  username: string;
  profilePic: string | null | StaticImageData;
  jobTitle: string;
  about: string;
}
