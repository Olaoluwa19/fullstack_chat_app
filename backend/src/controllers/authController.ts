import type { Request, Response } from "express";
import type { AuthRequest } from "../middleware/auth";
import { User } from "../models/User";
import { clerkClient, getAuth } from "@clerk/express";

// todo: add the next later
export async function getMe(req: AuthRequest, res: Response) {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error " });
    // next()
  }
}

export async function authCallback(req: Request, res: Response) {
  try {
    const { isAuthenticated, userId: clerkId } = getAuth(req);

    if (!isAuthenticated) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    let user = await User.findOne({ clerkId });

    if (!user) {
      // get user info from clerk and save to db
      const clerkUser = await clerkClient.users.getUser(clerkId);

      user = await User.create({
        clerkId,
        name: clerkUser.firstName
          ? `${clerkUser.firstName} ${clerkUser.lastName || ""}`.trim()
          : clerkUser.emailAddresses[0]?.emailAddress.split("@")[0] || "User",
        email: clerkUser.emailAddresses[0]?.emailAddress,
        avatar: clerkUser.imageUrl,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error " });
    // next()
  }
}
