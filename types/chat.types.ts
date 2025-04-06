import { StaticImageData } from "next/image";

export interface IChatContact {
  contactId: string;
  about: string;
  isRead: boolean;
  jobTitle: string;
  lastMessage: string;
  profilePic: StaticImageData | string;
  timestamp: string;
  unreadCount: number;
  username: string;
}

export interface IChatMessage {
  _id: string;
  sender: {
    _id: string;
    username: string;
    profilePic: string;
  };
  receiver: {
    _id: string;
    username: string;
    profilePic: string;
  };
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface IChatHistory {
  page: number;
  limit: number;
  totalCount: number;
  hasMore: boolean;
  messages: IChatMessage[];
}
