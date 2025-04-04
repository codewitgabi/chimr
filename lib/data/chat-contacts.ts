import { ChatContactCardProps } from "@/types/chat.types";
import Avatar6 from "@/assets/avatars/avatar-6.png";
import Avatar2 from "@/assets/avatars/avatar-2.png";
import Avatar3 from "@/assets/avatars/avatar-3.png";
import Avatar4 from "@/assets/avatars/avatar-4.png";
import Avatar5 from "@/assets/avatars/avatar-5.png";

const chatContacts: Array<ChatContactCardProps> = [
  {
    userId: "1",
    profilePic: Avatar2,
    username: "Marvin McKinney",
    jobTitle: "Software Engineer",
    lastMessageSent: "5m",
    lastMessage: "Hey! I just sent you $500k, please confirm transaction",
  },
  {
    userId: "2",
    profilePic: Avatar3,
    username: "Jacob Jones",
    jobTitle: "Frontend Engineer",
    lastMessageSent: "5m",
    lastMessage: "Hey! I just sent you $500k, please confirm transaction",
  },
  {
    userId: "3",
    profilePic: Avatar4,
    username: "Leslie Alexander",
    jobTitle: "Backend Engineer",
    lastMessageSent: "1day",
    lastMessage: "Hey! I just sent you $500k, please confirm transaction",
  },
  {
    userId: "4",
    profilePic: Avatar5,
    username: "Eleanor Pena",
    jobTitle: "Devops",
    lastMessageSent: "5m",
    lastMessage: "Hey! I just sent you $500k, please confirm transaction",
  },
  {
    userId: "5",
    profilePic: Avatar6,
    username: "Kathryn Murphy",
    jobTitle: "Software Engineer",
    lastMessageSent: "5m",
    lastMessage: "Hey! I just sent you $500k, please confirm transaction",
  },
];

export default chatContacts;
