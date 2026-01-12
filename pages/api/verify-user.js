import { db } from "@/config/db";
import { Users } from "@/config/schema";
import { eq } from "drizzle-orm";

/**
 * Pages Router API
 * Safe for Clerk + DB operations
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { user } = req.body;

    if (!user?.primaryEmailAddress?.emailAddress) {
      return res.status(400).json({ error: "Invalid user data" });
    }

    const email = user.primaryEmailAddress.emailAddress;

    // Check if user exists
    const userInfo = await db
      .select()
      .from(Users)
      .where(eq(Users.email, email));

    // Create user if not exists
    if (!userInfo || userInfo.length === 0) {
      const saveResult = await db
        .insert(Users)
        .values({
          name: user.fullName,
          email: email,
          imageUrl: user.imageUrl,
        })
        .returning();

      return res.status(200).json({ result: saveResult[0] });
    }

    return res.status(200).json({ result: userInfo[0] });
  } catch (error) {
    console.error("verify-user error:", error);
    return res.status(500).json({ error: "Failed to verify user" });
  }
}
