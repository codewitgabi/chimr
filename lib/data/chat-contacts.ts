import { IChatContact } from "@/types/chat.types";
import Avatar6 from "@/assets/avatars/avatar-6.png";
import Avatar2 from "@/assets/avatars/avatar-2.png";
import Avatar3 from "@/assets/avatars/avatar-3.png";
import Avatar4 from "@/assets/avatars/avatar-4.png";
import Avatar5 from "@/assets/avatars/avatar-5.png";

const chatContacts: Array<Omit<IChatContact, "isRead">> = [
  {
    contactId: "1",
    profilePic: Avatar2,
    username: "Marvin McKinney",
    jobTitle: "Software Engineer",
    timestamp: "5m",
    unreadCount: 0,
    about: "",
    lastMessage: "Hey! I just sent you $500k, please confirm transaction",
  },
  {
    contactId: "2",
    profilePic: Avatar3,
    username: "Jacob Jones",
    jobTitle: "Frontend Engineer",
    timestamp: "5m",
    unreadCount: 0,
    about: "",
    lastMessage: "Hey! I just sent you $500k, please confirm transaction",
  },
  {
    contactId: "3",
    profilePic: Avatar4,
    username: "Leslie Alexander",
    jobTitle: "Backend Engineer",
    timestamp: "1day",
    unreadCount: 0,
    about: "",
    lastMessage: "Hey! I just sent you $500k, please confirm transaction",
  },
  {
    contactId: "4",
    profilePic: Avatar5,
    username: "Eleanor Pena",
    jobTitle: "Devops",
    timestamp: "5m",
    unreadCount: 0,
    about: "",
    lastMessage: "Hey! I just sent you $500k, please confirm transaction",
  },
  {
    contactId: "5",
    profilePic: Avatar6,
    username: "Kathryn Murphy",
    jobTitle: "Software Engineer",
    timestamp: "5m",
    unreadCount: 0,
    about: "",
    lastMessage: "Hey! I just sent you $500k, please confirm transaction",
  },
];

export default chatContacts;
