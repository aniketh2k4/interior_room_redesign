import { db } from "@/config/db";
import { storage } from "@/config/firebaseConfig";
import { AiGeneratedImage } from "@/config/schema";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextResponse } from "next/server";
import axios from "axios";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    // 🔥 CRITICAL: dynamic import (prevents build-time crash)
    const { default: Replicate } = await import("replicate");

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const {
      imageUrl,
      roomType,
      designType,
      additionalReq,
      userEmail,
    } = await request.json();

    if (!imageUrl || !roomType || !designType || !userEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let inputImage;
    try {
      inputImage = await convertImageToBase64(imageUrl);
    } catch {
      inputImage = imageUrl;
    }

    const input = {
      image: inputImage,
      prompt: `A ${roomType} with a ${designType} style interior ${
        additionalReq || ""
      }`,
    };

    const output = await replicate.run(
      "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
      { input }
    );

    const resultUrl = Array.isArray(output) ? output[0] : output;
    if (!resultUrl) throw new Error("No output from Replicate");

    const base64Image = await convertImageToBase64(resultUrl);

    const fileName = `${Date.now()}.png`;
    const storageRef = ref(storage, "room-redesign/" + fileName);
    await uploadString(storageRef, base64Image, "data_url");
    const downloadUrl = await getDownloadURL(storageRef);

    await db.insert(AiGeneratedImage).values({
      roomType,
      designType,
      orgImage: imageUrl,
      aiImage: downloadUrl,
      userEmail,
    });

    return NextResponse.json({ result: downloadUrl });
  } catch (error) {
    console.error("redesign-room error:", error);
    return NextResponse.json(
      { error: "AI generation failed" },
      { status: 500 }
    );
  }
}

async function convertImageToBase64(imageUrl) {
  const resp = await axios.get(imageUrl, { responseType: "arraybuffer" });
  return (
    "data:image/png;base64," +
    Buffer.from(resp.data).toString("base64")
  );
}
