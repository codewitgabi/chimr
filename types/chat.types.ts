import { StaticImageData } from "next/image";

export interface ChatContactCardProps {
  userId: string;
  profilePic: StaticImageData | string;
  username: string;
  jobTitle: string;
  lastMessageSent: string;
  lastMessage: string;
}
