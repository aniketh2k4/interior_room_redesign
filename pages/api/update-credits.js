import { db } from "@/config/db";
import { Users } from "@/config/schema";
import { eq } from "drizzle-orm";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { userId, creditsToAdd } = req.body;

    if (!userId || !creditsToAdd) {
      return res.status(400).json({ error: "Missing data" });
    }

    const result = await db
      .update(Users)
      .set({
        credits: Users.credits + creditsToAdd,
      })
      .where(eq(Users.id, userId))
      .returning();

    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("update-credits error:", error);
    return res.status(500).json({ error: "Failed to update credits" });
  }
}
