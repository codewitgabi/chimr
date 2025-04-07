import { StatusCodes } from "http-status-codes";
import User from "../models/user.model";
import ApiError from "../utils/api.errors";
import mongoose from "mongoose";
import ChatMessage from "../models/chat-message.models";

export type ObjectId = mongoose.Types.ObjectId;

class SocketService {
  async fetchContacts({ userId }: { userId: ObjectId }) {
    try {
      // First, get all users except the current user
      const allUsers = await User.find(
        { _id: { $ne: userId } },
        "username profilePic about jobTitle"
      ).lean();

      // Get conversation data for each user
      const contactsWithDetails = await Promise.all(
        allUsers.map(async (user) => {
          // Find the most recent message between these users, if any
          const lastMessage = await ChatMessage.findOne({
            $or: [
              { sender: userId, receiver: user._id },
              { sender: user._id, receiver: userId },
            ],
          })
            .sort({ createdAt: -1 })
            .lean();

          // Count unread messages from this contact
          const unreadCount = await ChatMessage.countDocuments({
            sender: user._id,
            receiver: userId,
            isRead: false,
          });

          return {
            contactId: user._id.toString(),
            username: user.username,
            profilePic: user.profilePic || null,
            about: user.about,
            jobTitle: user.jobTitle,
            lastMessage: lastMessage ? lastMessage.message : null,
            timestamp: lastMessage ? lastMessage.createdAt : null,
            isRead: lastMessage ? lastMessage.isRead : true,
            unreadCount,
          };
        })
      );

      // Sort contacts - those with messages first (by most recent), then alphabetically by name
      return contactsWithDetails.sort((a, b) => {
        // If both have messages, sort by timestamp (newest first)
        if (a.timestamp && b.timestamp) {
          return (
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
        }
        // If only one has a message, that one comes first
        if (a.timestamp) return -1;
        if (b.timestamp) return 1;
        // Otherwise sort alphabetically
        return a.username.localeCompare(b.username);
      });
    } catch (error) {
      console.error("Error fetching contacts:", error);
      throw new Error("Failed to fetch contacts");
    }
  }

  async storeMessage({
    senderId,
    receiverId,
    message,
  }: {
    senderId: ObjectId;
    receiverId: ObjectId;
    message: string;
  }) {
    /**
     * Send a message from one user to another.
     */

    try {
      const newMessage = await ChatMessage.create({
        sender: senderId,
        receiver: receiverId,
        message,
      });

      return newMessage.toObject();
    } catch (e) {
      throw new ApiError(
        (e as { message: string })?.message,
        StatusCodes.INTERNAL_SERVER_ERROR,
        []
      );
    }
  }

  async getMessageHistory({
    userId,
    contactId,
    page = 1,
    limit = 20,
  }: {
    userId: string;
    contactId: string;
    page: number;
    limit: number;
  }) {
    try {
      const userObjectId = new mongoose.Types.ObjectId(userId);
      const contactObjectId = new mongoose.Types.ObjectId(contactId);

      // Calculate skip value for pagination

      const skip = (page - 1) * limit;

      // Get total count for pagination info
      const totalCount = await ChatMessage.countDocuments({
        $or: [
          { sender: userObjectId, receiver: contactObjectId },
          { sender: contactObjectId, receiver: userObjectId },
        ],
      });

      // Fetch messages between the two users
      const messages = await ChatMessage.find({
        $or: [
          { sender: userObjectId, receiver: contactObjectId },
          { sender: contactObjectId, receiver: userObjectId },
        ],
      })
        .sort({ createdAt: -1 }) // Most recent messages first
        .skip(skip)
        .limit(limit)
        .populate("sender", "username profilePic") // Adjust fields as needed
        .populate("receiver", "username profilePic") // Adjust fields as needed
        .lean(); // For better performance

      return {
        messages: messages.reverse(), // Return in chronological order
        totalCount,
        hasMore: totalCount > skip + messages.length,
      };
    } catch (error) {
      console.error("Error fetching message history:", error);
      throw new Error("Failed to fetch message history");
    }
  }

  async getUpdatedContact(userId: string, contactId: string) {
    try {
      // Convert string IDs to ObjectIds
      const userObjectId = new mongoose.Types.ObjectId(userId);
      const contactObjectId = new mongoose.Types.ObjectId(contactId);

      // Get contact user details
      const contactUser = await User.findById(
        contactObjectId,
        "name profilePic"
      ).lean();

      if (!contactUser) {
        throw new Error("Contact user not found");
      }

      // Find the most recent message between these users

      const lastMessage = await ChatMessage.findOne({
        $or: [
          { sender: userObjectId, receiver: contactObjectId },
          { sender: contactObjectId, receiver: userObjectId },
        ],
      })
        .sort({ createdAt: -1 })
        .lean();

      // Count unread messages from this contact

      const unreadCount = await ChatMessage.countDocuments({
        sender: contactObjectId,
        receiver: userObjectId,
        isRead: false,
      });

      return {
        contactId: contactId,
        username: contactUser.username,
        profilePic: contactUser.profilePic || null,
        lastMessage: lastMessage ? lastMessage.message : null,
        timestamp: lastMessage ? lastMessage.createdAt : null,
        isRead: lastMessage
          ? lastMessage.sender.toString() === userId
            ? true
            : lastMessage.isRead
          : true,
        unreadCount,
      };
    } catch (error) {
      console.error("Error getting updated contact:", error);
      throw new Error("Failed to get updated contact information");
    }
  }
}

const socketService = new SocketService();
export default socketService;
