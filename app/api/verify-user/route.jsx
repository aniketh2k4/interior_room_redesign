import { db } from "@/config/db";
import { Users } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// ✅ REQUIRED for App Router APIs with runtime logic
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await request.json();
    const { user } = body;

    if (!user?.primaryEmailAddress?.emailAddress) {
      return NextResponse.json(
        { error: "Invalid user data" },
        { status: 400 }
      );
    }

    const email = user.primaryEmailAddress.emailAddress;

    // 🔍 Check if user exists
    const userInfo = await db
      .select()
      .from(Users)
      .where(eq(Users.email, email));

    // ➕ Create new user if not exists
    if (!userInfo || userInfo.length === 0) {
      const saveResult = await db
        .insert(Users)
        .values({
          name: user.fullName,
          email: email,
          imageUrl: user.imageUrl,
        })
        .returning();

      return NextResponse.json({ result: saveResult[0] });
    }

    // ✅ User already exists
    return NextResponse.json({ result: userInfo[0] });
  } catch (error) {
    console.error("verify-user error:", error);
    return NextResponse.json(
      { error: "Failed to verify user" },
      { status: 500 }
    );
  }
}
