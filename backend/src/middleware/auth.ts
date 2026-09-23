import type { Request, Response, NextFunction } from "express";
import { clerkClient, getAuth } from "@clerk/express";

export type AuthRequest = Request & {
  userId?: string;
};

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Use `getAuth()` to get the user's `userId`
    const { isAuthenticated, userId: clerkId } = getAuth(req);

    if (!isAuthenticated) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    // Use the `getUser()` method to get the user's User object
    const user = await clerkClient.users.getUser(clerkId);
    if (!user) return res.status(404).json({ message: "User not found" });

    console.log(user);
    res.json({ user });

    next();
  } catch (error) {
    console.error("Error in protectRoute middleware", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
