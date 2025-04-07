import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import userService from "../services/user.service";
import axios from "axios";

export const getUsers = catchAsync(async (req: Request, res: Response) => {
  const response = await userService.getUsers();

  return res.status(response.httpStatus).json(response);
});

export const feedback = catchAsync(async (req: Request, res: Response) => {
  const DISCORD_WEBHOOK_URL =
    "https://discord.com/api/webhooks/1358747004007747857/QhbJlzF1bqwtAc2uS7UwnsD-sz83U_Y6YHY1wFIS-NQf5Dhj4-LXhu3djLcFtRDwQ1vN";

  const { name, email, message } = req.body;

  // Format the message for Discord
  
  const payload = {
    embeds: [
      {
        title: "New User Feedback",
        color: 3447003, // Blue color
        fields: [
          { name: "User", value: name || "Anonymous", inline: true },
          { name: "Email", value: email || "Not provided", inline: true },
          { name: "Message", value: message || "No message content" },
        ],
        timestamp: new Date().toISOString(),
      },
    ],
  };

  // Send to Discord webhook
  await axios.post(DISCORD_WEBHOOK_URL, payload);

  res
    .status(200)
    .json({ success: true, message: "Feedback sent successfully" });
});
